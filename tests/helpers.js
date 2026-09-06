// Test helper: loads the ACTUAL index.html and app.js from the repo root
// into a fresh jsdom window for each test. Nothing here modifies the
// real site files — it only reads them.
'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { JSDOM } = require('jsdom');

const ROOT = path.resolve(__dirname, '..');
const HTML = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const APP_JS = fs.readFileSync(path.join(ROOT, 'app.js'), 'utf8');

// Creates a fresh window WITHOUT running app.js yet. Call loadApp(win)
// once you're ready (immediately, or after seeding localStorage for a
// "restore on load" test) — app.js must only run once per window, since
// it declares top-level consts that throw on redeclaration.
function makeWindow() {
  const dom = new JSDOM(HTML, {
    url: 'https://ibloud.github.io/made-sick/',
    runScripts: 'dangerously',
    pretendToBeVisual: true
  });
  return dom.window;
}

function loadApp(win) {
  const scriptEl = win.document.createElement('script');
  scriptEl.textContent = APP_JS;
  win.document.body.appendChild(scriptEl);
}

function openPixiePanel(win) {
  loadApp(win);
  const toggle = win.document.querySelector('[data-tool="pixie"]');
  toggle.click();
  return win.document.querySelector('#pixie-checkin');
}

function fillAndSubmit(win, { cue, action, response }) {
  const form = win.document.querySelector('#pixie-checkin');
  if (cue !== undefined) form.elements.cue.value = cue;
  if (action !== undefined) form.elements.action.value = action;
  if (response) {
    form.querySelector(`[name="response"][value="${response}"]`).checked = true;
  }
  form.dispatchEvent(new win.Event('submit', { bubbles: true, cancelable: true }));
}

module.exports = { makeWindow, loadApp, openPixiePanel, fillAndSubmit };
