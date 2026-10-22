#!/usr/bin/env python3
"""Riduce i loghi dei clienti (static/logos) a una risoluzione che serve davvero.

I loghi si mostrano a 28 px (striscia della home) e a 48 px di altezza (carosello clienti):
un file alto 640 px pesa 360 kB per disegnare 48 px. Qui l'altezza massima e' 192 px (4x
quella piu' grande, quindi nitidi anche su schermi a 3x); cio' che e' gia' piu' piccolo non
si tocca. Stessi nomi e stessi formati: nessun riferimento nel codice cambia.

Uso: python3 scripts/ottimizza-loghi.py [--dry-run]   (serve Pillow)
Dopo aver cambiato un logo: python3 scripts/logo-dimensioni.py (larghezze/altezze per la fascia clienti)
e, se e' uno dei loghi con targa piena, python3 scripts/loghi-mono.py.
"""
import sys
from pathlib import Path
from PIL import Image

MAX_H = 192
DRY = '--dry-run' in sys.argv
root = Path(__file__).resolve().parent.parent / 'static' / 'logos'
tot_prima = tot_dopo = 0

for f in sorted(root.iterdir()):
    if f.suffix.lower() not in ('.png', '.webp'):
        continue
    prima = f.stat().st_size
    im = Image.open(f)
    w, h = im.size
    if h > MAX_H:
        nw = max(1, round(w * MAX_H / h))
        # ridimensionamento in alfa premoltiplicato: i bordi trasparenti non sporcano il colore
        src = im.convert('RGBA').convert('RGBa')
        im = src.resize((nw, MAX_H), Image.LANCZOS).convert('RGBA')
    else:
        continue
    tmp = f.with_name(f.stem + '.tmp' + f.suffix)
    if f.suffix.lower() == '.png':
        im.save(tmp, optimize=True)
    else:
        im.save(tmp, 'WEBP', quality=92, method=6)
    dopo = tmp.stat().st_size
    if dopo >= prima or DRY:  # mai peggiorare un file: se non guadagna, resta com'e'
        tmp.unlink()
        dopo = prima
    else:
        tmp.replace(f)
    tot_prima += prima
    tot_dopo += dopo
    print(f'{f.name:34s} {w}x{h} -> {im.size[0]}x{im.size[1]}  {prima:7d} -> {dopo:7d}')

print(f'totale file toccati: {tot_prima} -> {tot_dopo} byte')
