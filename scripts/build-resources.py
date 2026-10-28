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
    evidence = f'<a href="{e(r["evidenceUrl"])}" rel="noreferrer">Source evidence ↗</a>' if r['evidenceUrl'] != r['url'] else ''
    cards.append(f'''<article id="resource-{e(r['id'])}">
{anchor}<h3>{e(r['name'])}</h3>
<p>{e(r['description'])}</p>
<p class="notice">{e(r['relationship'])} · {e(r['recordType'])}</p>
<details><summary>Source, scope &amp; checks</summary>
<p>{e(r['verification'])}</p>
<p>Source review: {e(r['reviewedOn'] or 'Date unverified')} · Fees: {e(r['fees'])} · Availability: {e(r['availability'])}</p>
{evidence}</details>
<a href="{e(r['url'])}" rel="noreferrer">Open resource ↗</a>
{extra}
<a href="https://pixie-project-companion-production.up.railway.app/?resource={e(r['id'])}#find-help">Prepare an enquiry with PIXIE ↗</a>
</article>''')
block = '<!-- BEGIN GENERATED RESOURCES -->\n<div class="system-grid">\n' + '\n'.join(cards) + '\n</div>\n<!-- END GENERATED RESOURCES -->'
p = root / 'directory.html'
old = p.read_text()
new = re.sub(r'<!-- BEGIN GENERATED RESOURCES -->.*?<!-- END GENERATED RESOURCES -->', lambda _: block, old, flags=re.S)
if '--check' in sys.argv:
    if old != new:
        raise SystemExit('Run python3 scripts/build-resources.py')
else:
    p.write_text(new)
