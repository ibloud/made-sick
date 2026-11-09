const {test}=require('node:test');
const assert=require('node:assert/strict');
const R=require('../story-retrieval');
const did='did:plc:b5uem672ci23lqrcz6j6bs2c',actor={did,handle:'ibloud.xyz',pds:'https://eurosky.social'};
const record=(id='a',text='Diary of Death’s Daughter')=>({uri:`at://${did}/app.bsky.feed.post/${id}`,cid:'bafyreiaaaaaaaaaaaaaaaaaaaaa',value:{$type:'app.bsky.feed.post',text,createdAt:'2024-01-01T00:00:00Z'}});
const ok=data=>({ok:true,status:200,text:async()=>JSON.stringify(data)});
function fake(pages,observe=()=>{}){let n=0;return async(url,opts)=>{observe(url,opts);if(url.includes('resolveHandle'))return ok({did});if(url.includes('plc.directory'))return ok({id:did,alsoKnownAs:['at://ibloud.xyz'],service:[{id:'#atproto_pds',type:'AtprotoPersonalDataServer',serviceEndpoint:actor.pds}]});return typeof pages[n]==='function'?pages[n++]():ok(pages[n++]);}}
test('handle/DID forward and reverse verification and closed public endpoint policy',async()=>{
 for(const account of ['@ibloud.xyz',did])assert.equal((await R.resolveAccount(account,fake([]))).did,did);
 for(const url of ['http://eurosky.social','https://127.0.0.1','https://[::1]','https://eurosky.social.evil.test','https://user@eurosky.social','https://eurosky.social:8080','https://eurosky.social/path','https://evil.test'])assert.throws(()=>R.publicOrigin(url));
 await assert.rejects(R.resolveAccount('https://evil.test',fake([])));
 await assert.rejects(R.resolveAccount('ibloud.xyz',async u=>ok(u.includes('resolveHandle')?{did}:{id:'wrong'})),/mismatch/);
});
test('apostrophe variants, exact phrases, words and metadata retain original source text',()=>{
 const item=R.recordItem(record(),actor);for(const q of ["Death's Daughter",'Death’s Daughter','Deaths Daughter'])assert.ok(R.matches(item,q,true));
 assert.ok(!R.matches(item,'daughter diary',true));assert.ok(R.matches(item,'daughter diary',false));
 item.post.record.embed={images:[{alt:'Walking the Path'}]};assert.ok(R.matches(item,'walking the path',true));assert.equal(item.post.record.text,'Diary of Death’s Daughter');
});
test('pagination passes cursor, deduplicates, reports dates and continues across bounded batches',async()=>{
 const calls=[];const fetcher=fake([{records:[record()],cursor:'next'},{records:[record(),record('b')]}],(u,o)=>{calls.push(u);assert.equal(o.credentials,'omit');assert.equal(o.redirect,'manual')});
 const a=await R.search({account:actor.handle,maxPages:1},fetcher);assert.equal(a.coverage.recordsChecked,1);assert.equal(a.complete,false);assert.equal(a.cursor,'next');assert.match(a.conclusion,/Incomplete/);
 const b=await R.search({account:actor.handle,cursor:a.cursor},fetcher);assert.equal(b.complete,true);assert.equal(b.coverage.recordsChecked,2);assert.ok(calls.some(u=>u.includes('cursor=next')));assert.equal(b.matches[0].repost,false);assert.equal(b.matches[0].authorDid,did);
 const c=await R.search({account:actor.handle},fake([{records:[record()],cursor:'next'},{records:[record(),record('b')]}]));assert.equal(c.coverage.recordsChecked,2);
});
test('2500 cap is 25 requests with retained continuation; no date early exit',async()=>{
 let n=0;const fetcher=fake(Array.from({length:25},()=>({records:Array.from({length:100},()=>record(String(++n))),cursor:String(n)})));
 const a=await R.search({account:actor.handle},fetcher);assert.equal(a.coverage.recordsChecked,2500);assert.equal(a.cursor,'2500');assert.equal(a.complete,false);
 await assert.rejects(R.search({account:actor.handle,maxPages:26},fetcher));
});
test('rate limits, repeated cursors and cancellation retain completed pages and retry cursor',async()=>{
 const failure=()=>({ok:false,status:429,headers:{get:()=> '60'}});
 const a=await R.search({account:actor.handle},fake([{records:[record()],cursor:'next'},failure]));assert.equal(a.error.status,429);assert.equal(a.error.retryAfter,'60');assert.equal(a.cursor,'next');assert.equal(a.matches.length,1);assert.equal(a.complete,false);
 const b=await R.search({account:actor.handle},fake([{records:[record()],cursor:'next'},{records:[record('b')],cursor:'next'}]));assert.match(b.error.message,/Repeated/);assert.equal(b.matches.length,1);
 const c=await R.search({account:actor.handle},fake([{records:[record()],cursor:'next'},()=>{throw Object.assign(Error('abort'),{name:'AbortError'})}]));assert.equal(c.matches.length,1);assert.equal(c.cursor,'next');assert.match(c.error.message,/cancelled/);
});
test('unsupported lexicons, malformed provenance, redirects and oversized responses fail explicitly',async()=>{
 const p=await R.page({actor,collection:'unknown.app.record'},()=>{throw Error('must not fetch')});assert.equal(p.status,'unsupported-collection');assert.equal(p.complete,false);
 for(const mutate of [r=>r.uri=r.uri.replace(did,'did:plc:other'),r=>r.cid='',r=>r.value.createdAt='bad',r=>r.value.$type='unknown']){const r=record();mutate(r);assert.throws(()=>R.recordItem(r,actor));}
 await assert.rejects(R.page({actor},async()=>({ok:false,status:302})),/302/);
 await assert.rejects(R.page({actor},async()=>({ok:true,text:async()=> ' '.repeat(3000001)})),/3 MB/);
});
test('streamed oversized responses are cancelled before full buffering',async()=>{
 let cancelled=false,read=0;
 const response={ok:true,body:{getReader:()=>({read:async()=>({done:false,value:new Uint8Array(++read===1?2000000:1000001)}),cancel:async()=>{cancelled=true},releaseLock(){}})}};
 await assert.rejects(R.page({actor},async()=>response),/3 MB/);assert.equal(cancelled,true);assert.equal(read,2);
});
