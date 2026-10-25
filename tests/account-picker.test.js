'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {JSDOM} = require('jsdom');
const root = path.resolve(__dirname,'..');
const picker = fs.readFileSync(path.join(root,'shared/atproto-account.js'),'utf8');
const signin = fs.readFileSync(path.join(root,'shared/atproto-sign-in.js'),'utf8');
const wait = () => new Promise(resolve => setTimeout(resolve,20));
const actor = (handle='made-sick.org',name='Made Sick') => ({did:'did:plc:fixture',handle,displayName:name});
function setup(fetcher = async () => ({ok:true,json:async()=>({actors:[actor()]})})) {
 const dom = new JSDOM('<label for="handle">Account</label><input id="handle"><button id="next">Continue</button>',{url:'https://test.example/',runScripts:'outside-only'});
 const w = dom.window;w.fetch = fetcher;w.eval(picker);
 const input = w.document.getElementById('handle');const ui = w.PixieAccounts.mount(input,{delay:0});
 const type = value => {input.focus();input.value=value;input.dispatchEvent(new w.Event('input',{bubbles:true}));};
 const key = value => input.dispatchEvent(new w.KeyboardEvent('keydown',{key:value,bubbles:true,cancelable:true}));
 return {dom,w,input,ui,type,key,close(){ui.destroy();w.close();}};
}
test('no requests before typing; custom handles and inert profile text',async()=>{
 let calls=0;const a=setup(async(url,options)=>{calls++;assert.match(url,/searchActorsTypeahead/);assert.equal(options.credentials,'omit');return {ok:true,json:async()=>({actors:[actor('custom.example','<img src=x onerror=alert(1)>')]})};});
 assert.equal(calls,0);a.type('custom');await wait();assert.equal(calls,1);
 assert.equal(a.input.getAttribute('aria-expanded'),'true');assert.equal(a.w.document.querySelector('img'),null);
 assert.match(a.w.document.querySelector('[role=option]').textContent,/<img/);a.close();
});
test('keyboard selection fills handle and notifies existing controls without submitting',async()=>{
 const a=setup();let views=0,changes=0;
 a.input.addEventListener('keydown',e=>{if(e.key==='Enter')views++;});a.input.addEventListener('input',()=>changes++);
 a.type('made');await wait();a.key('ArrowDown');assert.ok(a.input.getAttribute('aria-activedescendant'));a.key('Enter');
 assert.equal(views,0);assert.equal(a.input.value,'made-sick.org');assert.equal(changes,2);assert.equal(a.input.getAttribute('aria-expanded'),'false');
 assert.equal(a.key('Enter'),true,'manual full handle preserves the existing Enter action');assert.equal(views,1);a.close();
});
test('out-of-order responses cannot overwrite the latest query',async()=>{
 const pending=[];const a=setup(url=>new Promise(resolve=>pending.push({url,resolve})));
 a.type('first');await wait();a.type('second');await wait();
 pending[1].resolve({ok:true,json:async()=>({actors:[actor('second.example')]})});await wait();
 pending[0].resolve({ok:true,json:async()=>({actors:[actor('first.example')]})});await wait();
 assert.equal(a.w.document.querySelector('[role=option] span').textContent,'@second.example');a.close();
});
test('Escape cancels pending results; blur and Tab close suggestions',async()=>{
 let resolve;const a=setup(()=>new Promise(r=>resolve=r));a.type('made');await wait();a.key('Escape');
 resolve({ok:true,json:async()=>({actors:[actor()]})});await wait();assert.equal(a.input.getAttribute('aria-expanded'),'false');a.close();
 const b=setup();b.type('made');await wait();b.key('Tab');assert.equal(b.input.getAttribute('aria-expanded'),'false');
 b.type('made');await wait();b.w.document.getElementById('next').focus();assert.equal(b.input.getAttribute('aria-expanded'),'false');b.close();
});
test('malformed and repeated profiles are ignored; click selection works',async()=>{
 const a=setup(async()=>({ok:true,json:async()=>({actors:[actor(),actor(),{did:'bad',handle:'bad.example'},actor('https://bad.example')]})}));
 a.type('made');await wait();assert.equal(a.w.document.querySelectorAll('[role=option]').length,1);
 a.w.document.querySelector('[role=option]').click();assert.equal(a.input.value,'made-sick.org');assert.equal(a.w.document.activeElement,a.input);a.close();
});
test('IME input waits for completion; unmount restores input and permits remount',async()=>{
 let calls=0;const a=setup(async()=>{calls++;return {ok:true,json:async()=>({actors:[]})};});
 a.input.dispatchEvent(new a.w.Event('compositionstart'));a.type('made');await wait();assert.equal(calls,0);
 a.input.dispatchEvent(new a.w.Event('compositionend'));await wait();assert.equal(calls,1);
 a.ui.destroy();assert.equal(a.input.hasAttribute('role'),false);assert.equal(a.w.document.querySelector('.account-picker'),null);
 const next=a.w.PixieAccounts.mount(a.input,{delay:0});assert.equal(a.w.document.querySelectorAll('.account-picker').length,1);next.destroy();a.w.close();
});
test('search failures and accounts outside the index retain manual entry',async()=>{
 const a=setup(async()=>({ok:false}));a.type('custom.example');await wait();assert.match(a.w.document.querySelector('[role=status]').textContent,/Enter your full handle/);assert.equal(a.input.disabled,false);a.close();
 const b=setup(async()=>({ok:true,json:async()=>({actors:[]})}));b.type('unindexed.example');await wait();assert.match(b.w.document.querySelector('[role=status]').textContent,/still enter a full handle/);b.close();
});
function identity({cached=false,callback=false,fail=false}={}) {
 const a=setup();a.w.eval(signin);const container=a.w.document.createElement('div');container.id='identity';
 container.dataset.clientId='https://test.example/oauth-client-metadata.json';container.dataset.redirectUri='https://test.example/';container.dataset.appName='Test PIXIE';a.w.document.body.append(container);
 const key='pixie.identity:https://test.example/oauth-client-metadata.json';if(cached)a.w.localStorage.setItem(key,'1');
 if(callback)a.w.history.replaceState(null,'','?state=fixture&code=fixture&iss=https://pds.example');
 const calls=[];let config,deleted,loads=0;
 class BrowserOAuthClient {
  constructor(value){config=value;}
  addEventListener(name,fn){deleted=fn;}
  async init(){calls.push('init');if(fail)throw Error('offline');return cached||callback?{session:{sub:'did:plc:authenticated'}}:undefined;}
  async signIn(handle,options){calls.push({handle,options});}
  async revoke(did){calls.push({revoke:did});}
 }
 const ui=a.w.PixieIdentity.mount(container,{loadSDK:async()=>{loads++;return {BrowserOAuthClient};},picker:{delay:0}});
 return {...a,container,identityUI:ui,calls,key,loads:()=>loads,config:()=>config,deleted:()=>deleted,cleanup(){ui.destroy();a.close();}};
}
test('OAuth is lazy, rejects partial names, requests only identity and resolves custom handles with SDK',async()=>{
 const a=identity();assert.equal(a.loads(),0);const input=a.container.querySelector('input');const form=a.container.querySelector('form');
 input.value='partial';form.dispatchEvent(new a.w.Event('submit',{cancelable:true}));await wait();assert.equal(a.loads(),0);
 input.value='@custom.example';form.dispatchEvent(new a.w.Event('submit',{cancelable:true}));await wait();
 assert.equal(a.loads(),1);assert.equal(a.calls[1].handle,'custom.example');assert.deepEqual(JSON.parse(JSON.stringify(a.calls[1].options)),{scope:'atproto',prompt:'consent'});
 assert.equal(a.config().responseMode,'query');assert.equal(a.config().clientMetadata.scope,'atproto');a.cleanup();
});
test('authenticated callback stores only a restore flag; logout revokes; session deletion updates UI',async()=>{
 const a=identity({callback:true});await wait();assert.equal(a.container.querySelector('code').textContent,'did:plc:authenticated');
 assert.equal(a.w.localStorage.getItem(a.key),'1');assert.equal(a.w.localStorage.length,1);
 a.deleted()({detail:{sub:'did:plc:authenticated'}});assert.match(a.container.textContent,/Your session ended/);assert.equal(a.w.localStorage.length,0);a.cleanup();
 const b=identity({cached:true});await wait();b.container.querySelectorAll('button')[1].click();await wait();assert.deepEqual(JSON.parse(JSON.stringify(b.calls.at(-1))),{revoke:'did:plc:authenticated'});assert.equal(b.w.localStorage.length,0);b.cleanup();
});
test('OAuth failure leaves retry and anonymous use available',async()=>{
 const a=identity({fail:true});const input=a.container.querySelector('input');input.value='custom.example';a.container.querySelector('form').dispatchEvent(new a.w.Event('submit',{cancelable:true}));await wait();
 assert.match(a.container.textContent,/Sign-in could not finish/);assert.equal(a.container.querySelector('button').disabled,false);assert.equal(input.readOnly,false);a.cleanup();
});
