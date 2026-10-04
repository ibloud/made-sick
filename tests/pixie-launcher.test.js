'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM } = require('jsdom');
const root = path.resolve(__dirname, '..');
const script = fs.readFileSync(path.join(root, 'pixie-launcher.js'), 'utf8');
for (const file of fs.readdirSync(root).filter(file => file.endsWith('.html'))) {
  test(`${file} includes exactly one shared PIXIE script and stylesheet`, () => {
    const doc = new JSDOM(fs.readFileSync(path.join(root, file), 'utf8')).window.document;
    assert.equal(doc.querySelectorAll('script[src="pixie-launcher.js"]').length, 1);
    assert.equal(doc.querySelectorAll('link[href="pixie-launcher.css"]').length, 1);
  });
}
test('launcher is lazy, isolates the dialog, unloads on Close, and restores focus', () => {
  const win = new JSDOM('<main><button id="other">Other</button></main>', { url:'https://made-sick.org/stories.html',runScripts:'outside-only' }).window;
  win.eval(script); win.eval(script);
  const doc = win.document, launch = doc.getElementById('open-pixie-os'), frame = doc.querySelector('iframe');
  assert.equal(doc.querySelectorAll('#open-pixie-os').length, 1);
  assert.equal(frame.hasAttribute('src'), false);
  const originalInert = doc.querySelector('main').inert;
  launch.focus(); launch.click();
  assert.equal(doc.querySelector('[role="dialog"]').closest('#pixie-radar-overlay').hidden, false);
  assert.equal(doc.querySelector('main').inert, true);
  assert.equal(launch.getAttribute('aria-expanded'), 'true');
  assert.equal(doc.activeElement, doc.querySelector('.pixie-radar-close'));
  doc.getElementById('other').focus();
  assert.equal(doc.activeElement, doc.querySelector('.pixie-radar-close'));
  assert.equal(doc.querySelector('.pixie-radar-head a').href, frame.src);
  doc.querySelector('.pixie-radar-close').click();
  assert.equal(frame.hasAttribute('src'), false);
  assert.equal(doc.querySelector('main').inert, originalInert);
  assert.equal(doc.activeElement, launch);
  assert.equal(launch.getAttribute('aria-expanded'), 'false');
  launch.click();
  doc.dispatchEvent(new win.KeyboardEvent('keydown', {key:'Escape',bubbles:true}));
  assert.equal(doc.getElementById('pixie-radar-overlay').hidden, true);
  assert.equal(doc.activeElement, launch);
});
