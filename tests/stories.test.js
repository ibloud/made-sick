'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM } = require('jsdom');
const root = path.resolve(__dirname, '..');
function setup(run = true) {
  const win = new JSDOM(fs.readFileSync(path.join(root, 'stories.html'), 'utf8'), {runScripts: 'outside-only'}).window;
  if (run) win.eval(fs.readFileSync(path.join(root, 'stories.js'), 'utf8'));
  return win;
}
test('all stories remain readable without JavaScript', () => {
  const win = setup(false);
  assert.equal(win.document.querySelectorAll('.story-card:not([hidden])').length, 8);
  assert.equal(win.document.getElementById('story-filters').hidden, true);
  win.close();
});
test('load more reveals the remaining stories and moves focus to the first new link', () => {
  const win = setup(); const d = win.document;
  assert.equal(d.querySelectorAll('.story-card:not([hidden])').length, 6);
  const firstNew = d.querySelector('.story-card[hidden] a');
  d.getElementById('load-stories').click();
  assert.equal(d.querySelectorAll('.story-card:not([hidden])').length, 8);
  assert.equal(d.activeElement, firstNew);
  assert.equal(d.getElementById('load-stories').hidden, true);
  win.close();
});
test('topic filters reset pagination and announce the matching collection', () => {
  const win = setup(); const d = win.document;
  const filter = d.querySelector('[data-topic-filter="Accessibility"]'); filter.click();
  assert.equal(d.querySelectorAll('.story-card:not([hidden])').length, 1);
  assert.equal(d.querySelector('.story-card:not([hidden])').dataset.topic, 'Accessibility');
  assert.equal(filter.getAttribute('aria-pressed'), 'true');
  assert.equal(d.getElementById('story-count').textContent, '1 of 1 stories');
  d.querySelector('[data-topic-filter="All"]').click();
  assert.equal(d.querySelectorAll('.story-card:not([hidden])').length, 6);
  assert.equal(d.getElementById('load-stories').hidden, false);
  win.close();
});
