'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM } = require('jsdom');
const root = path.resolve(__dirname, '..');
const files = fs.readdirSync(root).filter(file => file.endsWith('.html'));
const canonical = new JSDOM(fs.readFileSync(path.join(root, 'index.html'), 'utf8')).window.document.querySelector('.grouped-header').outerHTML;
test('every site page uses the shared theme and canonical working navigation', () => {
  for (const file of files) {
    const doc = new JSDOM(fs.readFileSync(path.join(root, file), 'utf8')).window.document;
    const sheets = [...doc.querySelectorAll('link[rel="stylesheet"]')];
    assert.ok(doc.body.classList.contains('made-sick-site'), `${file}: missing theme scope`);
    assert.match(sheets.at(-1).getAttribute('href'), /^site-theme\.css\?/, `${file}: theme must load last`);
    assert.equal(doc.querySelector('.grouped-header')?.outerHTML, canonical, `${file}: navigation drift`);
    assert.equal(doc.querySelectorAll('script[src="navigation.js"]').length, 1, `${file}: navigation must initialize once`);
  }
});
test('lead paragraphs use the full container through the loaded CSS cascade', () => {
  for (const file of files) {
    const dom = new JSDOM(fs.readFileSync(path.join(root, file), 'utf8'));
    const doc = dom.window.document;
    for (const link of doc.querySelectorAll('link[rel="stylesheet"]')) {
      const sheet = path.join(root, link.getAttribute('href').split('?')[0]);
      const style = doc.createElement('style');
      style.textContent = fs.readFileSync(sheet, 'utf8');
      link.replaceWith(style);
    }
    for (const paragraph of doc.querySelectorAll('main p.lede')) {
      assert.equal(dom.window.getComputedStyle(paragraph).maxWidth, 'none', `${file}: lead paragraph width cap`);
    }
    dom.window.close();
  }
});
