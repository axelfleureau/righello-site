#!/usr/bin/env python3
"""Scrive src/lib/data/logo-dimensioni.json: larghezza e altezza vere di ogni logo in static/logos.

Servono al server per mettere `width` e `height` su ogni <img> della fascia clienti: il
browser riserva la forma prima che il file arrivi e la corsia non si sposta (ne' salta) quando
i loghi si decodificano uno alla volta. scripts/check-hero-loghi.mjs verifica che il file sia
allineato ai PNG/WebP/AVIF veri: dopo aver cambiato un logo, rilanciare questo script.

Uso: python3 scripts/logo-dimensioni.py   (serve Pillow, con supporto AVIF)
"""
import json
from pathlib import Path
from PIL import Image

base = Path(__file__).resolve().parent.parent
root = base / 'static' / 'logos'
dati = {}
for f in sorted(root.rglob('*')):
    if f.suffix.lower() in ('.png', '.webp', '.avif', '.jpg', '.jpeg'):
        with Image.open(f) as im:
            dati['/logos/' + f.relative_to(root).as_posix()] = [im.width, im.height]
dest = base / 'src' / 'lib' / 'data' / 'logo-dimensioni.json'
righe = ',\n'.join(f' {json.dumps(k)}: {json.dumps(v)}' for k, v in dati.items())
dest.write_text('{\n' + righe + '\n}\n')
print(f'{dest.relative_to(base)}: {len(dati)} loghi')
