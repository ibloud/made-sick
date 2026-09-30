'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM } = require('jsdom');
const root = path.resolve(__dirname, '..');
function page() {
  const dom = new JSDOM(fs.readFileSync(path.join(root, 'story-finder.html'), 'utf8'), { url: 'https://made-sick.org/story-finder.html', runScripts: 'outside-only' });
  const { window } = dom;
  const link = window.document.querySelector('link[href="pixie-launcher.css"]');
  assert.ok(link, 'Standalone Finder must load launcher styles');
  const style = window.document.createElement('style');
  style.textContent = fs.readFileSync(path.join(root, link.getAttribute('href')), 'utf8');
  window.document.head.appendChild(style);
  window.eval(fs.readFileSync(path.join(root, 'pixie-launcher.js'), 'utf8'));
  return dom;
}
test('standalone Finder launcher stays fixed with a bounded icon', () => {
  const dom = page(), w = dom.window;
  assert.equal(w.getComputedStyle(w.document.querySelector('.pixie-launcher')).position, 'fixed');
  const icon = w.getComputedStyle(w.document.querySelector('.pixie-launcher-icon'));
  assert.equal(icon.width, '24px'); assert.equal(icon.height, '24px'); assert.equal(icon.maxWidth, '24px');
  dom.window.close();
});
test('date controls can shrink within the grid and action typography inherits the page font', () => {
  const dom = page(), w = dom.window;
  for (const id of ['date-from', 'date-to']) {
    const input = w.document.getElementById(id), computed = w.getComputedStyle(input);
    assert.equal(parseFloat(computed.minWidth), 0); assert.equal(computed.maxWidth, '100%');
    assert.equal(parseFloat(w.getComputedStyle(input.parentElement).minWidth), 0);
  }
  assert.equal(w.getComputedStyle(w.document.getElementById('load')).fontWeight, '800');
  dom.window.close();
});
test('popup header is not constrained by the page header and Escape returns focus', () => {
  const dom = page(), w = dom.window;
  const launcher = w.document.getElementById('open-pixie-os'); launcher.focus(); launcher.click();
  const overlay = w.document.getElementById('pixie-radar-overlay'); assert.equal(overlay.hidden, false);
  assert.equal(w.getComputedStyle(overlay.querySelector('header')).maxWidth, 'none');
  assert.equal(w.document.activeElement.className, 'pixie-radar-close');
  w.document.dispatchEvent(new w.KeyboardEvent('keydown', { key: 'Escape' }));
  assert.equal(overlay.hidden, true); assert.equal(w.document.activeElement, launcher);
  dom.window.close();
});
