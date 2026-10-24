'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {JSDOM}=require('jsdom');
const work=require('../published-work.js');
const DID='did:plc:o6kuv3yieti2vqrb7ckmd5vg';
const publication=`at://${DID}/site.standard.publication/pub`;
const entry=()=>({uri:`at://${DID}/site.standard.document/one`,value:{$type:'site.standard.document',site:publication,path:'/a-story',title:'My work',publishedAt:'2026-10-21T12:00:00Z'}});
const ok=data=>({ok:true,json:async()=>data});
function fetcher(calls){return async(url,options)=>{
 calls.push([url,options]);
 if(url.includes('resolveHandle'))return ok({did:DID});
 if(url.includes('plc.directory'))return ok({id:DID,service:[{id:'#atproto_pds',type:'AtprotoPersonalDataServer',serviceEndpoint:'https://eurosky.social'}]});
 if(url.includes('getRecord'))return ok({value:{url:'https://made-sick.pckt.blog'}});
 if(url.includes('listRecords'))return ok({records:[entry()],cursor:'older'});
 throw new Error('Unexpected URL '+url);
}}
function page(fetch){
 const dom=new JSDOM(fs.readFileSync(path.join(__dirname,'../stories.html'),'utf8'),{url:'https://made-sick.org/stories.html',runScripts:'outside-only'});
 dom.window.fetch=fetch;dom.window.eval(fs.readFileSync(path.join(__dirname,'../published-work.js'),'utf8'));return dom;
}
const settle=()=>new Promise(resolve=>setImmediate(resolve));
test('reader resolves the current PDS and publication URI without credentials or writes',async()=>{
 const calls=[],reader=work.createReader(fetcher(calls));const actor=await reader.identity('@made-sick.org');assert.equal(actor.pds,'https://eurosky.social');
 const data=await reader.page(actor);assert.equal(data.records.length,1);assert.equal(await reader.link(data.records[0].value),'https://made-sick.pckt.blog/a-story');
 for(const [url,options] of calls){assert.equal(options.credentials,'omit');assert.equal(options.referrerPolicy,'no-referrer');assert.equal(options.method,undefined);assert.doesNotMatch(url,/createRecord|putRecord|deleteRecord/);}
});
test('unsafe link schemes and malformed identities are rejected',()=>{
 assert.throws(()=>work.documentUrl('javascript:alert(1)','/a'));assert.throws(()=>work.documentUrl('https://safe.example','//evil.example'));assert.throws(()=>work.documentUrl('https://user:secret@safe.example','/a'));assert.throws(()=>work.didDocumentUrl('did:web:example.com:..'));
 assert.equal(work.didDocumentUrl('did:web:example.com:people:alice'),'https://example.com/people/alice/did.json');
});
test('an identity document with another DID is not trusted',async()=>{
 const reader=work.createReader(async()=>ok({id:'did:plc:wrong'}));await assert.rejects(()=>reader.identity(DID),/did not match/);
});
test('lookup waits for submit and leaves the curated collection unchanged',async()=>{
 const calls=[],dom=page(fetcher(calls)),d=dom.window.document;assert.equal(calls.length,0);const curated=d.querySelectorAll('#story-list article').length;
 d.getElementById('work-handle').value='made-sick.org';d.getElementById('work-form').dispatchEvent(new dom.window.Event('submit',{cancelable:true}));await settle();
 assert.equal(d.querySelectorAll('#work-list article').length,1);assert.equal(d.querySelectorAll('#story-list article').length,curated);assert.equal(d.querySelector('#work-list a').href,'https://made-sick.pckt.blog/a-story');assert.equal(d.getElementById('work-sifa').hidden,false);
 d.getElementById('work-more').click();await settle();assert.equal(d.querySelectorAll('#work-list article').length,1);assert.match(d.getElementById('work-status').textContent,/repeated a page cursor/);dom.window.close();
});
test('unsafe titles stay text and broken links keep the record URI visible',async()=>{
 const dom=page(async(url,options)=>{if(url.includes('listRecords')){const r=entry();r.value.title='<img src=x onerror=alert(1)>';r.value.site='javascript:alert(1)';return ok({records:[r]});}return fetcher([])(url,options);});
 const d=dom.window.document;d.getElementById('work-handle').value=DID;d.getElementById('work-form').dispatchEvent(new dom.window.Event('submit',{cancelable:true}));await settle();
 assert.equal(d.querySelectorAll('#work-list img').length,0);assert.match(d.getElementById('work-list').textContent,/<img/);assert.match(d.getElementById('work-list').textContent,/at:\/\/did:/);assert.match(d.getElementById('work-status').textContent,/could not be resolved/);dom.window.close();
});
test('Stop aborts a pending public request and offers a retry',async()=>{
 const dom=page((url,options)=>new Promise((_,reject)=>options.signal.addEventListener('abort',()=>reject(Object.assign(new Error('aborted'),{name:'AbortError'})))));const d=dom.window.document;
 d.getElementById('work-handle').value=DID;d.getElementById('work-form').dispatchEvent(new dom.window.Event('submit',{cancelable:true}));d.getElementById('work-stop').click();await settle();
 assert.match(d.getElementById('work-status').textContent,/Stopped/);assert.equal(d.getElementById('work-load').disabled,false);dom.window.close();
});
