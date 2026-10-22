#!/usr/bin/env python3
"""Versioni «sagoma» dei loghi che, passati dal filtro bianco/nero della fascia clienti
(`brightness(0) invert(1)`), diventano un blocco pieno.

Il filtro tiene solo l'alfa: un logo con una targa o un disco colorato che contiene il
simbolo (Neura: disco viola con la N bianca; Ricci Group: quadrato blu con l'auto bianca)
esce come un disco/quadrato bianco senza segno. Qui il simbolo chiaro viene bucato
(alfa = alfa x (1 - quanto e' chiaro)), cosi' dopo il filtro il segno si legge.

Sorgenti e soglie sono nella tabella MONO: per aggiungerne uno basta una riga.
Uso: python3 scripts/loghi-mono.py   (serve Pillow; scrive static/logos/mono/*.png)
"""
from pathlib import Path
import numpy as np
from PIL import Image

# nome file -> (luminanza sotto cui il pixel resta pieno, luminanza sopra cui diventa buco)
MONO = {
    'neura.png': (200, 235),
    'ricci-group.webp': (150, 215),
}

root = Path(__file__).resolve().parent.parent / 'static' / 'logos'
out = root / 'mono'
out.mkdir(exist_ok=True)

for nome, (lo, hi) in MONO.items():
    im = Image.open(root / nome).convert('RGBA')
    a = np.asarray(im).astype(np.float32)
    lum = 0.299 * a[..., 0] + 0.587 * a[..., 1] + 0.114 * a[..., 2]
    buco = np.clip((lum - lo) / (hi - lo), 0, 1)
    a[..., 3] = a[..., 3] * (1 - buco)
    # colore uniforme: dopo il filtro conta solo l'alfa, e cosi' il PNG e' piu' leggero
    a[..., :3] = 255
    dest = out / (Path(nome).stem + '.png')
    Image.fromarray(a.round().astype(np.uint8), 'RGBA').save(dest, optimize=True)
    print(f'{dest.relative_to(root.parent.parent)}  {im.size[0]}x{im.size[1]}  {dest.stat().st_size} byte')
