'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM } = require('jsdom');

const root = path.resolve(__dirname, '..');
const htmlFiles = fs.readdirSync(root).filter((file) => file.endsWith('.html'));

for (const file of htmlFiles) {
  test(`${file} has valid local links and unique IDs`, () => {
    const html = fs.readFileSync(path.join(root, file), 'utf8');
    const document = new JSDOM(html).window.document;
    const ids = [...document.querySelectorAll('[id]')].map((element) => element.id);
    assert.equal(new Set(ids).size, ids.length, `${file} contains duplicate IDs`);

    for (const element of document.querySelectorAll('[href], [src]')) {
      const reference = element.getAttribute('href') || element.getAttribute('src');
      if (!reference || /^(https?:|mailto:|tel:|data:|javascript:)/.test(reference)) continue;

      const [relativePath, fragment] = reference.split('#');
      const targetFile = relativePath || file;
      const targetPath = path.resolve(root, targetFile.split('?')[0]);
      assert.ok(targetPath.startsWith(root), `${file} points outside the site: ${reference}`);
      assert.ok(fs.existsSync(targetPath), `${file} points to missing local resource: ${reference}`);

      if (fragment && targetFile.endsWith('.html')) {
        const targetDocument = targetFile === file
          ? document
          : new JSDOM(fs.readFileSync(targetPath, 'utf8')).window.document;
        assert.ok(targetDocument.getElementById(fragment), `${file} points to missing fragment: ${reference}`);
      }
    }
  });
}
