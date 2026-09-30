const { test } = require('node:test');
const assert = require('node:assert/strict');
const { exportLedger } = require('../story-ledger');
const did = 'did:plc:owner';
function item(author = did) { return { post: { uri: `at://${author}/app.bsky.feed.post/key`, cid: 'bafy-source', author: { did: author }, record: { text: 'Original words', createdAt: '2026-09-30T12:00:00Z' } } }; }
function ledger(items) { return exportLedger({ actor: { handle: 'ibloud.xyz', did }, items, selectedAt: new Map(items.map(x => [x.post.uri, '2026-09-30T13:00:00Z'])) }); }
test('v2 own post preserves version, identity, selection time and text; missing viewer is unknown', () => {
  const l = ledger([item()]); assert.equal(l.schemaVersion, 2); assert.equal(l.actor.did, did);
  assert.equal(l.posts[0].text, 'Original words'); assert.equal(l.posts[0].embedding, 'unknown');
  assert.equal(l.posts[0].selectedAt, '2026-09-30T13:00:00Z'); assert.match(l.notice, /does not grant/);
});
test('reposts retain references without copying another author or nested quoted text', () => {
  const p = item('did:plc:other'); p.reason = { $type: 'app.bsky.feed.defs#reasonRepost' };
  p.post.record.embed = { record: { text: 'Nested words' } };
  const exported = ledger([p]).posts[0]; assert.equal(exported.repost, true); assert.ok(!('text' in exported)); assert.ok(!('embed' in exported));
});
test('confirmed restrictions stay disabled; explicit false is allowed', () => {
  for (const disabled of [true, false]) { const p = item(); p.post.viewer = { embeddingDisabled: disabled }; assert.equal(ledger([p]).posts[0].embedding, disabled ? 'disabled' : 'allowed'); }
});
test('missing CID, contradictory author, and invalid timestamp fail export', () => {
  for (const mutate of [p => delete p.post.cid, p => p.post.author.did = 'did:plc:other', p => p.post.record.createdAt = 'invalid']) {
    const p = item(); mutate(p); assert.throws(() => ledger([p]));
  }
});
