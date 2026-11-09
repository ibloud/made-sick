const {test}=require('node:test'),assert=require('node:assert/strict');
const S=require('../standard-references'),R=require('../story-retrieval'),W=require('../published-work');
const did='did:plc:o6kuv3yieti2vqrb7ckmd5vg',pub=`at://${did}/site.standard.publication/pub`,uri=`at://${did}/site.standard.document/doc`,cid='bafyreiaaaaaaaaaaaaaaaaaaaaa';
const value=()=>({$type:'site.standard.document',site:pub,path:'/story',title:'A source',publishedAt:'2026-01-01T00:00:00Z',content:{$type:'blog.pckt.content',items:[]},textContent:'Plain original text'});
const entry=()=>({uri,cid,value:value()});
function fake(page={records:[entry()]},observe=()=>{}){return async(url,opts)=>{observe(url,opts);let data=url.includes('resolveHandle')?{did}:url.includes('plc.directory')?{id:did,alsoKnownAs:['at://made-sick.org'],service:[{id:'#atproto_pds',type:'AtprotoPersonalDataServer',serviceEndpoint:'https://eurosky.social'}]}:url.includes('getRecord')?{uri:pub,cid,value:{$type:'site.standard.publication',name:'Publication',url:'https://made-sick.pckt.blog'}}:page;return {ok:true,text:async()=>JSON.stringify(data)};};}
const reader=fetcher=>S.createReader({retrieval:R,work:W,fetcher});
test('bounded Standard records reuse verified identity, publication relationships and plain text without Ledger changes',async()=>{
 const calls=[];const result=await reader(fake(undefined,(u,o)=>calls.push([u,o]))).page({account:'made-sick.org'});const r=result.references[0];assert.equal(r.uri,uri);assert.equal(r.cid,cid);assert.equal(r.canonicalUrl,'https://made-sick.pckt.blog/story');assert.equal(r.publication.uri,pub);assert.equal(r.textContent,'Plain original text');assert.equal(r.contentType,'blog.pckt.content');assert.equal(r.representation,'text/plain');assert.equal(r.verification.website,'not-checked');
 for(const [url,opts]of calls){assert.equal(opts.credentials,'omit');assert.equal(opts.redirect,'manual');assert.doesNotMatch(url,/createRecord|putRecord|deleteRecord|getBlob/);}
 assert.equal((await reader(fake()).record(pub)).collection,'site.standard.publication');
});
test('unsupported and oversized bodies remain references; malformed records/cursors fail',async()=>{
 for(const textContent of [undefined,'x'.repeat(20001)]){const e=entry();e.value.textContent=textContent;const r=(await reader(fake({records:[e]})).page({account:'made-sick.org'})).references[0];assert.equal(r.representation,null);assert.equal(r.textContent,null);assert.match(r.contentStatus,/reference/);}
 for(const patch of [{cid:'bad'},{uri:uri.replace(did,'did:plc:other')},{value:{...value(),publishedAt:'bad'}}])await assert.rejects(reader(fake({records:[{...entry(),...patch}]})).page({account:'made-sick.org'}));
 await assert.rejects(reader(fake({records:[],cursor:'again'})).page({account:'made-sick.org',cursor:'again'}),/cursor/);
 const r=await reader(fake({records:[],cursor:'next'})).page({account:'made-sick.org'});assert.equal(r.complete,false);assert.equal(r.cursor,'next');
});
test('byte limits, unsafe links, missing sources and HTTP errors fail explicitly',async()=>{
 for(const u of ['http://evil.test','https://127.0.0.1','https://localhost','https://user:pass@example.org','https://example.org:8080'])assert.throws(()=>S.https(u));
 await assert.rejects(S.boundedText({ok:true,text:async()=> 'x'.repeat(10)},9),/byte limit/);
 let cancelled=false;await assert.rejects(S.boundedText({ok:true,body:{getReader:()=>({read:async()=>({done:false,value:new Uint8Array(20)}),cancel:async()=>{cancelled=true},releaseLock(){}})}},10));assert.equal(cancelled,true);
 await assert.rejects(S.boundedText({ok:false,status:429,headers:{get:()=> '60'}}),e=>e.status===429&&e.retryAfter==='60');
 const r=await S.verifyWebsite({canonicalUrl:'https://internal.example/path',verification:{}},()=>{throw Error('must not fetch')});assert.equal(r.verification.website,'unavailable');
 await assert.rejects(reader(fake()).record('https://pckt.blog/no-record'),/AT-URI/);
});
test('publication verification checks exact AT-URI with no redirects or credentials',async()=>{
 const r=await reader(fake()).record(pub);const checked=await S.verifyWebsite(r,async(url,opts)=>{assert.equal(url,'https://made-sick.pckt.blog/.well-known/site.standard.publication');assert.equal(opts.credentials,'omit');assert.equal(opts.redirect,'manual');return {ok:true,text:async()=>pub};});assert.equal(checked.verification.website,'matched');
 assert.equal((await S.verifyWebsite(r,async()=>({ok:true,text:async()=>uri}))).verification.website,'mismatch');
});

test('exact supplied identity, unavailable records and cancellation fail without replacing sources',async()=>{
 await assert.rejects(reader(fake()).record(uri),/identity mismatch/);
 const blocked=async(url,options)=>{if(url.includes('resolveHandle'))return {ok:true,text:async()=>JSON.stringify({did})};if(url.includes('plc.directory'))return {ok:true,text:async()=>JSON.stringify({id:did,alsoKnownAs:['at://made-sick.org'],service:[{id:'#atproto_pds',type:'AtprotoPersonalDataServer',serviceEndpoint:'https://127.0.0.1'}]})};throw Error('No unsafe request allowed');};
 await assert.rejects(reader(blocked).page({account:'made-sick.org'}),/provider|endpoint/i);
 const controller=new AbortController();controller.abort();await assert.rejects(S.createReader({retrieval:R,work:W,signal:controller.signal,fetcher:async(u,o)=>{if(o.signal.aborted)throw Object.assign(Error('cancelled'),{name:'AbortError'});return fake()(u,o);}}).page({account:'made-sick.org'}),/cancelled/);
});
