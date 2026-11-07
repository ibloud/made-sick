"""Render cards from Made-Sick's single public resource contract."""
import json, pathlib, re, html, sys
root = pathlib.Path(__file__).resolve().parents[1]
data = json.loads((root / 'directory-resources.json').read_text())
e = html.escape
cards = []
for r in data['resources']:
    for field in ['url', 'evidenceUrl']:
        if not r[field].startswith('https://'):
            raise ValueError('HTTPS resource required')
    anchor = f'<span id="{e(r["legacyAnchor"])}"></span>' if r.get('legacyAnchor') else ''
    extra = ''.join(f'<a href="{e(x["url"])}" rel="noreferrer">{e(x["label"])} ↗</a>' for x in r.get('additionalLinks', []))
    detail_links = ''.join(f'<a href="{e(x["url"])}" rel="noreferrer">{e(x["label"])} ↗</a>' for x in r.get('detailLinks', []))
    evidence = f'<a href="{e(r["evidenceUrl"])}" rel="noreferrer">Source evidence ↗</a>' if r['evidenceUrl'] != r['url'] else ''
    audience = f'<p>{e(r["audience"])}</p>\n' if r.get('audience') else ''
    practice = f'<p>{e(r["practicalAction"])}</p>\n' if r.get('practicalAction') else ''
    role = r['jurisdiction'] or 'Independent community resource'
    cards.append(f'''<article class="directory-card" id="resource-{e(r['id'])}">
<div class="card-top"><span class="status status-reference">Public resource</span></div>
<h3>{anchor}{e(r['name'])}</h3>
<p class="role">{e(role)}</p>
<p>{e(r['description'])}</p>
<p class="notice">{e(r['relationship'])}</p>
<details><summary>Source, scope &amp; checks</summary>
{audience}{practice}<p>{e(r['verification'])}</p>
<p>Record type: {e(r['recordType'])} · Accessibility: {e(r['accessibility'])}</p>
<p>Source review: {e(r['reviewedOn'] or 'Date unverified')} · Fees: {e(r['fees'])} · Availability: {e(r['availability'])}</p>
{evidence}{detail_links}</details>
<div class="card-actions">
<a href="{e(r['url'])}" rel="noreferrer">{e(r.get('actionLabel', 'Open resource'))} ↗</a>
{extra}
<a href="https://pixie-project-companion-production.up.railway.app/?resource={e(r['id'])}#find-help">Prepare an enquiry with PIXIE ↗</a>
</div>
</article>''')
block = '<!-- BEGIN GENERATED RESOURCES -->\n<div class="cards">\n' + '\n'.join(cards) + '\n</div>\n<!-- END GENERATED RESOURCES -->'
p = root / 'directory.html'
old = p.read_text()
new = re.sub(r'<!-- BEGIN GENERATED RESOURCES -->.*?<!-- END GENERATED RESOURCES -->', lambda _: block, old, flags=re.S)
if '--check' in sys.argv:
    if old != new:
        raise SystemExit('Run python3 scripts/build-resources.py')
else:
    p.write_text(new)
