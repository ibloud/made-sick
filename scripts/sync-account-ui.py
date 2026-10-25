#!/usr/bin/env python3
"""Sync canonical account assets into existing applications, or check for drift.
Usage: python scripts/sync-account-ui.py [--check] ../companion ../pixie-creator-os
No runtime CDN dependency on another ecosystem site is introduced.
"""
import sys
from pathlib import Path
source = Path(__file__).resolve().parents[1]
check = '--check' in sys.argv
start = '/* Shared account UI.'
end = '/* End shared account UI. */'
css = (source / 'shared/account-ui.css.txt').read_text()
targets = [source] + [Path(p).resolve() for p in sys.argv[1:] if p != '--check']
for target in targets:
    if target == source:
        dest, sheets = source / 'shared', ['styles.css']
    elif (target / 'app/companion.tsx').is_file():
        dest, sheets = target / 'public/shared', ['app/globals.css']
    elif (target / 'creator.js').is_file():
        dest, sheets = target / 'shared', ['creator.css', 'styles.css']
    else:
        raise SystemExit(f'Not a recognized existing application checkout: {target}')
    if not check: dest.mkdir(parents=True, exist_ok=True)
    for name in ('atproto-account.js', 'atproto-sign-in.js'):
        original = (source / 'shared' / name).read_text()
        if check:
            if (dest / name).read_text() != original: raise SystemExit(f'Account script drift: {dest/name}')
        elif target != source: (dest / name).write_text(original)
    for name in sheets:
        path = target / name
        current = path.read_text()
        if check:
            if css not in current: raise SystemExit(f'Account style drift: {path}')
        else:
            before, marker, rest = current.partition(start)
            if marker:
                # The initial rollout has no closing marker yet; preserve project overrides.
                if end in rest: after = rest.split(end,1)[1].lstrip('\n')
                else:
                    tail = rest.split('@media(forced-colors:active)',1)
                    after = tail[1].split('\n',1)[1] if len(tail)>1 and '\n' in tail[1] else ''
            else: after = ''
            path.write_text((before.rstrip()+'\n\n'+css+'\n'+after).rstrip()+'\n')
print('Account assets match the canonical source.' if check else 'Account assets synchronized.')
