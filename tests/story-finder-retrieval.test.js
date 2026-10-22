'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {JSDOM}=require('jsdom');
const html=fs.readFileSync(require('node:path').join(__dirname,'../story-finder.html'),'utf8');
function setup(fetch){
 const dom=new JSDOM(html,{url:'https://made-sick.org/story-finder.html',runScripts:'outside-only'});
 dom.window.fetch=fetch;
 dom.window.eval([...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]).join('\n')+'\nwindow.finderTest={state,loadPage,render,parsePostLink};');
 return dom;
}
function post(id,date,text,embed){return {post:{uri:`at://did:plc:test/app.bsky.feed.post/${id}`,author:{handle:'test.bsky.social',did:'did:plc:test'},record:{text,createdAt:date,embed}}}}
const ok=data=>({ok:true,json:async()=>data});
test('media descriptions and titles are searchable and video filter excludes image posts',()=>{
 const dom=setup();const w=dom.window;
 w.eval(`finderTest.state.posts=${JSON.stringify([post('a','2026-10-20T00:00:00Z','hello',{$type:'app.bsky.embed.video',alt:'beige shirt'}),post('b','2026-10-20T00:00:00Z','hello',{$type:'app.bsky.embed.images',images:[{alt:'beige shirt'}]})])}`);
 w.document.getElementById('query').value='beige';w.finderTest.render();assert.equal(w.document.querySelectorAll('article').length,2);
 w.document.getElementById('videos-only').checked=true;w.finderTest.render();assert.equal(w.document.querySelectorAll('article').length,1);
 dom.window.close();
});
test('date search ignores old pinned/repost entries when determining coverage',async()=>{
 let calls=0;
 const dom=setup(async url=>{
  if(url.includes('resolveHandle'))return ok({did:'did:plc:test'});
  calls++;assert.match(url,/includePins=false/);
  const old=post('pin','2020-01-01T00:00:00Z','old');old.reason={$type:'app.bsky.feed.defs#reasonRepost'};
  return ok(calls===1?{feed:[old,post('a','2026-10-20T00:00:00Z','new')],cursor:'next'}:{feed:[post('b','2026-09-01T00:00:00Z','older')]});
 });
 dom.window.document.getElementById('date-from').value='2026-10-01';
 await dom.window.finderTest.loadPage(true,true);assert.equal(calls,2);dom.window.close();
});
test('stop cancels loading and retains already loaded posts',async()=>{
 let secondStarted;
 const pending=new Promise(resolve=>secondStarted=resolve);
 let calls=0;
 const dom=setup(async(url,options)=>{
  if(url.includes('resolveHandle'))return ok({did:'did:plc:test'});
  if(++calls===1)return ok({feed:[post('a','2026-10-20T00:00:00Z','retained')],cursor:'next'});
  secondStarted();return new Promise((_,reject)=>options.signal.addEventListener('abort',()=>reject(Object.assign(new Error('aborted'),{name:'AbortError'}))));
 });
 const loading=dom.window.finderTest.loadPage(true,false,true);await pending;
 dom.window.document.getElementById('stop').click();await loading;
 assert.equal(dom.window.document.querySelectorAll('article').length,1);
 assert.match(dom.window.document.getElementById('status').textContent,/stopped/);dom.window.close();
});
test('post URL parser accepts supported public links and rejects unrelated destinations',()=>{
 const dom=setup();
 assert.equal(dom.window.eval(`finderTest.parsePostLink('https://mu.social/profile/sifa.id/post/3mygz3t3ee227')`),'at://sifa.id/app.bsky.feed.post/3mygz3t3ee227');
 assert.throws(()=>dom.window.eval(`finderTest.parsePostLink('https://evil.example/profile/sifa.id/post/abc')`));dom.window.close();
});
test('conversation view renders parent, target and replies safely without changing the ledger',async()=>{
 const parent=post('parent','2026-10-20T00:00:00Z','Earlier context');
 const target=post('target','2026-10-20T00:00:00Z','<script>unsafe</script>');
 const reply=post('reply','2026-10-20T00:00:00Z','Reply');
 const dom=setup(async url=>{assert.match(url,/getPostThread/);return ok({thread:{...target,parent,replies:[reply]}})});
 const w=dom.window;w.document.getElementById('post-link').value='https://mu.social/profile/sifa.id/post/3mygz3t3ee227';
 w.document.getElementById('thread-form').dispatchEvent(new w.Event('submit',{cancelable:true}));
 await new Promise(resolve=>setImmediate(resolve));
 assert.equal(w.document.querySelectorAll('#thread-results article').length,3);
 assert.equal(w.document.querySelector('#thread-results script'),null);
 assert.match(w.document.getElementById('thread-results').textContent,/<script>unsafe/);
 assert.equal(w.finderTest.state.selected.size,0);dom.window.close();
});
