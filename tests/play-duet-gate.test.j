'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { makeWindow, loadApp } = require('./helpers');

function setPilotConsent(win, { duetInvite }) {
  const form = win.document.querySelector('#pilot-console');
  form.elements.duetInvite.checked = duetInvite;
  // Setting .checked via script doesn't fire a native change event the way
  // a real click does — app.js's visibility toggle is wired to 'change',
  // so we dispatch it explicitly to match actual user interaction.
  form.elements.duetInvite.dispatchEvent(new win.Event('change', { bubbles: true }));
  form.dispatchEvent(new win.Event('submit', { bubbles: true, cancelable: true }));
}

test('Play panel Duet link is hidden and locked by default (no consent given)', () => {
  const win = makeWindow();
  loadApp(win);

  const link = win.document.querySelector('#play-duet-link');
  const locked = win.document.querySelector('#play-duet-locked');

  assert.equal(link.hidden, true, 'Duet link should be hidden until consent is given');
  assert.equal(locked.hidden, false, 'locked message should be visible until consent is given');
});

test('Play panel Duet link unlocks after the pilot record grants duetInvite consent', () => {
  const win = makeWindow();
  loadApp(win);

  setPilotConsent(win, { duetInvite: true });

  const link = win.document.querySelector('#play-duet-link');
  const locked = win.document.querySelector('#play-duet-locked');

  assert.equal(link.hidden, false, 'Duet link should become visible once consent is granted');
  assert.equal(locked.hidden, true, 'locked message should hide once consent is granted');
});

test('Play panel Duet link re-locks if consent is withdrawn and re-saved', () => {
  const win = makeWindow();
  loadApp(win);

  setPilotConsent(win, { duetInvite: true });
  assert.equal(win.document.querySelector('#play-duet-link').hidden, false);

  setPilotConsent(win, { duetInvite: false });

  const link = win.document.querySelector('#play-duet-link');
  const locked = win.document.querySelector('#play-duet-locked');
  assert.equal(link.hidden, true, 'Duet link should re-hide once consent is withdrawn');
  assert.equal(locked.hidden, false, 'locked message should reappear once consent is withdrawn');
});

test('Play panel Duet link matches the pilot console\'s own duet-link state exactly', () => {
  const win = makeWindow();
  loadApp(win);
  setPilotConsent(win, { duetInvite: true });

  const pilotConsoleLink = win.document.querySelector('#duet-link');
  const playPanelLink = win.document.querySelector('#play-duet-link');
  assert.equal(pilotConsoleLink.hidden, playPanelLink.hidden, 'both Duet entry points should agree on consent state');
});

test('restoring a previously saved consent=true record unlocks the Play panel on load, not just after a fresh submit', () => {
  const win = makeWindow();
  win.localStorage.setItem('made-sick:pilot:ibloud.xyz:v1', JSON.stringify({
    schema: 'org.made-sick.pilot-consent/1',
    subject: { handle: 'ibloud.xyz', did: 'did:plc:b5uem672ci23lqrcz6j6bs2c' },
    consent: { directory: true, duetInvite: true, sessionRecord: false },
    session: null,
    storage: 'device-local',
    updatedAt: new Date().toISOString()
  }));

  loadApp(win);

  assert.equal(win.document.querySelector('#play-duet-link').hidden, false);
  assert.equal(win.document.querySelector('#play-duet-locked').hidden, true);
});
