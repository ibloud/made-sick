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

test('PIXIE navigation never carries identity or consent in URLs', () => {
  const join = fs.readFileSync(path.join(root, 'join.js'), 'utf8');
  const markup = fs.readFileSync(path.join(root, 'join.html'), 'utf8');
  assert.doesNotMatch(join, /did:\s*session\.did|displayName:\s*record\.displayName|milestone:\s*record\.milestone/);
  assert.doesNotMatch(join, /params\.get\(["'](?:consent|public_record_consent|displayName|milestone)["']\)/);
  assert.match(markup, /<meta name="referrer" content="no-referrer">/);
  assert.match(markup, /id="open-pixie-link"[^>]*rel="noreferrer"/);
});

async function joinFixture(query = '', existing = null) {
  const dom = new JSDOM(fs.readFileSync(path.join(root, 'join.html'), 'utf8'), {
    url: 'https://made-sick.org/join.html' + query, runScripts: 'outside-only'
  });
  const writes = [], win = dom.window;
  const session = { did: 'did:plc:syntheticparticipant', async fetchHandler(url, options = {}) {
    if (options.method === 'POST') {
      writes.push({url, body: JSON.parse(options.body)});
      return Response.json({uri: 'at://did:plc:syntheticparticipant/org.made-sick.participant/self'});
    }
    return existing ? Response.json(existing) : new Response('', {status: 404});
  }};
  win.BrowserOAuthClient = class { async init() { return {session}; } };
  win.fetch = async () => Response.json({did: 'did:plc:syntheticadmin'});
  win.eval(fs.readFileSync(path.join(root, 'join.js'), 'utf8')
    .replace(/^import .*;\n/, '').replace(/init\(\);\s*$/, 'window.joinReady = init();'));
  await win.joinReady;
  return {dom, win, writes};
}

for (const marker of ['pixie_onboarding=1', 'pixie_return=1']) {
  test(`forged ${marker} cannot publish or prefill participant consent`, async () => {
    const {dom, win, writes} = await joinFixture('?' + marker + '&displayName=Forged&milestone=Private&consent=1&public_record_consent=1');
    try {
      assert.equal(writes.length, 0);
      assert.equal(win.location.search, '');
      assert.equal(win.document.querySelector('#display-name').value, '');
      assert.equal(win.document.querySelector('#directory-consent').checked, false);
      assert.equal(win.document.querySelector('#public-record-consent').checked, false);
      assert.match(win.document.querySelector('#join-status').textContent, /No new participant record was published/);
    } finally { win.close(); }
  });
}

test('existing participant navigation contains no identity, report or consent query', async () => {
  const {win, writes} = await joinFixture('', {
    uri: 'at://did:plc:syntheticparticipant/org.made-sick.participant/self',
    value: {displayName: 'Synthetic private name', milestone: 'Synthetic milestone', directory: true}
  });
  try {
    const link = win.document.querySelector('#open-pixie-link');
    assert.equal(link.hidden, false);
    assert.equal(link.href, 'https://holdings.loptrlab.com/radar-core.html');
    assert.equal(link.rel, 'noreferrer');
    assert.equal(writes.length, 0);
  } finally { win.close(); }
});

for (const consent of [[false, false], [true, false], [false, true], [true, true]]) {
  test(`on-page publish requires both consent choices: ${consent}`, async () => {
    const {win, writes} = await joinFixture();
    try {
      const doc = win.document;
      doc.querySelector('#display-name').value = 'Reviewed synthetic name';
      doc.querySelector('#milestone').value = 'Reviewed synthetic milestone';
      doc.querySelector('#directory-consent').checked = consent[0];
      doc.querySelector('#public-record-consent').checked = consent[1];
      doc.querySelector('#participant-form').dispatchEvent(new win.Event('submit', {bubbles: true, cancelable: true}));
      await new Promise(resolve => setTimeout(resolve, 0));
      assert.equal(writes.length, consent.every(Boolean) ? 1 : 0);
      if (writes.length) {
        assert.equal(writes[0].body.repo, 'did:plc:syntheticparticipant');
        assert.equal(writes[0].body.record.displayName, 'Reviewed synthetic name');
        assert.equal(new URL(doc.querySelector('#open-pixie-link').href).search, '');
      }
    } finally { win.close(); }
  });
}
