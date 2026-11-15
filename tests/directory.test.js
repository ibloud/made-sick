'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {JSDOM} = require('jsdom');
const root = path.resolve(__dirname, '..');
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
test('homepage stays bounded while the directory retains all entries and source-owned resource cards', () => {
 const home = new JSDOM(read('index.html')).window.document;
 const directory = new JSDOM(read('directory.html')).window.document;
 const stories = new JSDOM(read('stories.html')).window.document;
 assert.equal(home.querySelectorAll('.profile-card').length, 3);
 assert.equal(home.querySelectorAll('.story-card').length, 3);
 assert.ok(directory.querySelectorAll('.profile-card').length > 3);
 assert.equal(directory.querySelectorAll('#resources article').length, JSON.parse(read('directory-resources.json')).resources.length);
 assert.equal(stories.querySelector('#resources'), null);
});
test('directory filters distinguish participants from public references', () => {
 const win = new JSDOM(read('directory.html'), {runScripts:'outside-only',url:'https://made-sick.org/directory.html'}).window;
 win.eval(read('app.js'));
 win.document.querySelector('[data-filter="participant"]').click();
 const visible = [...win.document.querySelectorAll('.profile-card:not(.hidden)')];
 assert.ok(visible.length > 0);
 assert.ok(visible.every(card => card.dataset.kind.split(/\s+/).includes('participant')));
 assert.equal(win.document.querySelectorAll('#resources article').length, JSON.parse(read('directory-resources.json')).resources.length);
 win.close();
});
test('directory prioritizes the canonical Companion and does not embed legacy PIXIE', () => {
 const d = new JSDOM(read('directory.html')).window.document;
 const section = d.getElementById('pixie-demo');
 assert.equal(d.querySelector('#resources').nextElementSibling, section);
 assert.equal(section.querySelector('h2').textContent, 'PIXIE · Project Companion');
 const companion = section.querySelector('a.button');
 assert.equal(companion.href, 'https://pixie-project-companion-production.up.railway.app/');
 assert.ok(companion.rel.includes('noreferrer'));
 const legacy = section.querySelector('details a');
 assert.equal(legacy.href, 'https://50ways.loptrlab.com/pixie/demo/index.html');
 assert.ok(legacy.closest('details'));
 assert.equal(section.querySelectorAll('iframe').length, 0);
 assert.equal(d.querySelector('script[src="directory-pixie.js"]'), null);
 assert.ok(d.querySelector('script[src="pixie-launcher.js"]'));
});

test('resource contract and visible cards stay aligned without enrolling professionals',()=>{
 const data=JSON.parse(read('directory-resources.json'));const doc=new JSDOM(read('directory.html')).window.document;
 assert.equal(data.schema,'made-sick-resources/v1');assert.equal(new Set(data.resources.map(r=>r.id)).size,data.resources.length);
 for(const r of data.resources){const card=doc.getElementById('resource-'+r.id);assert.ok(card);assert.ok(card.textContent.includes(r.name));assert.ok(card.textContent.includes(r.verification));assert.ok([...card.querySelectorAll('a')].some(a=>a.href===r.evidenceUrl));assert.match(r.relationship,/no partnership|Not a confirmed partner/i);assert.equal(new URL(r.url).protocol,'https:');}
 const law=data.resources.find(r=>r.id==='smb-music');assert.equal(law.location,'London');assert.match(law.verification,/require separate checks/);
});
