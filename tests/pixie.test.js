'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { makeWindow, loadApp, openPixiePanel, fillAndSubmit } = require('./helpers');

const STORAGE_KEY = 'made-sick:pixie-cue:v1';

test('saves a cue to localStorage on submit', () => {
  const win = makeWindow();
  openPixiePanel(win);
  fillAndSubmit(win, { cue: 'when my stream break starts', action: 'drink water', response: 'done' });

  const raw = win.localStorage.getItem(STORAGE_KEY);
  assert.ok(raw, 'expected a record to be saved');
  const record = JSON.parse(raw);
  assert.equal(record.cue, 'when my stream break starts');
  assert.equal(record.action, 'drink water');
  assert.equal(record.response, 'done');
  assert.equal(record.paused, false);
  assert.equal(record.storage, 'device-local');

  const status = win.document.querySelector('#pixie-state').textContent;
  assert.equal(status, 'Active on this device');
});

test('restores a previously saved cue into the form on load', () => {
  const win = makeWindow();
  win.localStorage.setItem(STORAGE_KEY, JSON.stringify({
    schema: 'org.made-sick.pixie-cue/1',
    cue: 'when I sit down to stream',
    action: 'stretch my hands',
    response: 'smaller',
    paused: false,
    storage: 'device-local',
    updatedAt: new Date().toISOString()
  }));

  // Seed localStorage BEFORE app.js runs, since restoreCue() only runs
  // once, at script load — this matches how a real page load behaves.
  loadApp(win);

  const form = win.document.querySelector('#pixie-checkin');
  assert.equal(form.elements.cue.value, 'when I sit down to stream');
  assert.equal(form.elements.action.value, 'stretch my hands');
  assert.equal(form.querySelector('[name="response"][value="smaller"]').checked, true);

  const status = win.document.querySelector('#pixie-state').textContent;
  assert.equal(status, 'Active on this device');
});

test('pause sets paused:true and keeps the record (does not delete it)', () => {
  const win = makeWindow();
  openPixiePanel(win);
  fillAndSubmit(win, { cue: 'evening wind-down', action: 'dim the lights', response: 'done' });

  win.document.querySelector('#pause-pixie').click();

  const record = JSON.parse(win.localStorage.getItem(STORAGE_KEY));
  assert.equal(record.paused, true, 'record should still exist and be marked paused');
  assert.equal(win.document.querySelector('#pixie-state').textContent, 'Paused by you');
});

test('pause with no saved cue shows a message and does not throw', () => {
  const win = makeWindow();
  openPixiePanel(win);
  assert.doesNotThrow(() => {
    win.document.querySelector('#pause-pixie').click();
  });
  assert.equal(
    win.document.querySelector('#pixie-message').textContent,
    'There is no saved cue to pause.'
  );
});

test('delete removes the record from localStorage and resets the form', () => {
  const win = makeWindow();
  openPixiePanel(win);
  fillAndSubmit(win, { cue: 'morning routine', action: 'hip mobility flow', response: 'done' });
  assert.ok(win.localStorage.getItem(STORAGE_KEY), 'sanity check: record was saved');

  win.document.querySelector('#delete-pixie').click();

  assert.equal(win.localStorage.getItem(STORAGE_KEY), null, 'record should be gone');
  assert.equal(win.document.querySelector('#pixie-checkin').elements.cue.value, '');
  assert.equal(
    win.document.querySelector('#pixie-message').textContent,
    'Deleted from this device. Nothing remains for PIXIE to act on.'
  );
});

test('corrupt localStorage data does not crash the panel on load', () => {
  const win = makeWindow();
  win.localStorage.setItem(STORAGE_KEY, '{not valid json::');

  assert.doesNotThrow(() => {
    loadApp(win);
  });

  // Form should be left blank/default rather than populated with garbage
  const form = win.document.querySelector('#pixie-checkin');
  assert.equal(form.elements.cue.value, '');
});

test('empty required fields: browser-level "required" prevents submission with no cue', () => {
  const win = makeWindow();
  openPixiePanel(win);
  const form = win.document.querySelector('#pixie-checkin');

  // jsdom does not run its own constraint-validation UI, but it does
  // implement checkValidity() against the required attribute — use
  // that to confirm the HTML contract is actually in place.
  form.elements.cue.value = '';
  form.elements.action.value = 'do something';
  assert.equal(form.checkValidity(), false, 'form should be invalid with an empty required cue field');

  form.elements.cue.value = 'a cue';
  form.elements.action.value = '';
  assert.equal(form.checkValidity(), false, 'form should be invalid with an empty required action field');
});

for (const response of ['done', 'smaller', 'rest']) {
  test(`response choice "${response}" saves correctly and is treated as valid`, () => {
    const win = makeWindow();
    openPixiePanel(win);
    fillAndSubmit(win, { cue: 'a cue', action: 'an action', response });

    const record = JSON.parse(win.localStorage.getItem(STORAGE_KEY));
    assert.equal(record.response, response);
    // No response choice should be treated as a failure state in the UI copy
    const message = win.document.querySelector('#pixie-message').textContent;
    assert.match(message, /No notification, score, message, or health data was sent\./);
  });
}

test('submitting with no response selected still saves (response is optional, not gated)', () => {
  const win = makeWindow();
  openPixiePanel(win);
  fillAndSubmit(win, { cue: 'a cue', action: 'an action' });

  const record = JSON.parse(win.localStorage.getItem(STORAGE_KEY));
  assert.equal(record.response, null);
});
