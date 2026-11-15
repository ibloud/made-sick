const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'); const path=require('node:path');
const root=path.resolve(__dirname,'..'); const data=JSON.parse(fs.readFileSync(path.join(root,'directory-resources.json')));
test('new opportunities preserve the public contract and render unique links',()=>{
 const html=fs.readFileSync(path.join(root,'directory.html'),'utf8');
 const ids=data.resources.map(r=>r.id);assert.equal(new Set(ids).size,ids.length);
 for(const id of ['xsens-animation-contest-2026','psyonic-ability-hand','psyonic-ability-fund','eeoc-accommodation','jan-accommodation','state-vr-at','ifixit-repair-learning','ifixit-community-repair','ifixit-edu','ifixit-partnerships']){
  const r=data.resources.find(x=>x.id===id);assert.ok(r,id);assert.equal(r.recordType,'resource');assert.equal(r.reviewedOn,'2026-11-15');assert.match(r.relationship,/no .*affiliation|no partnership/);assert.ok(r.fees&&r.availability&&r.accessibility);assert.equal(html.split('id="resource-'+id+'"').length,2);
  for(const link of [r.url,r.evidenceUrl,...(r.detailLinks||[]).map(x=>x.url)])assert.equal(new URL(link).protocol,'https:');
 }
});
test('contest restrictions are visible before expanding source details',()=>{
 const r=data.resources.find(x=>x.id==='xsens-animation-contest-2026');assert.match(r.description,/No generative AI/);assert.match(r.description,/outside the competition/);assert.match(r.description,/AI training/);assert.match(r.availability,/guardian/);
});
test('medical, benefits and repair sources retain distinct limits',()=>{
 const by=id=>JSON.stringify(data.resources.find(r=>r.id===id));
 assert.match(by('psyonic-ability-fund'),/ROMP/);assert.match(by('psyonic-ability-fund'),/unverified/);assert.match(by('state-vr-at'),/prior approval|prior authorisation/);assert.match(by('eeoc-accommodation'),/effective/);assert.match(by('ifixit-repair-learning'),/qualified/);assert.match(by('ifixit-partnerships'),/grant/);
});
