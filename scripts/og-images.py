#!/usr/bin/env python3
"""Disegna le immagini di condivisione 1200 x 630 dal file di carte scritto da og-images.ts."""
import json
import os
import sys

from PIL import Image, ImageDraw, ImageFilter, ImageFont

W, H = 1200, 630
BG = (5, 5, 5)
INK = (255, 255, 255)
MUTED = (168, 168, 179)
FONTS = 'static/fonts/DegularDisplay-{}_1768475446675.otf'
PAD = 64


def font(weight, size):
    return ImageFont.truetype(FONTS.format(weight), size)


def hex_rgb(h):
    h = h.lstrip('#')
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def glow(canvas, color, center, radius, alpha):
    layer = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    cx, cy = center
    d.ellipse((cx - radius, cy - radius, cx + radius, cy + radius), fill=color + (alpha,))
    layer = layer.filter(ImageFilter.GaussianBlur(radius * 0.55))
    canvas.alpha_composite(layer)


def wrap(draw, text, fnt, max_w):
    lines, line = [], ''
    for word in text.split():
        trial = f'{line} {word}'.strip()
        if draw.textlength(trial, font=fnt) <= max_w:
            line = trial
        else:
            if line:
                lines.append(line)
            line = word
    if line:
        lines.append(line)
    return lines


def fit_title(draw, text, max_w, max_h, start, floor, max_lines):
    size = start
    while size >= floor:
        fnt = font('Bold', size)
        lines = wrap(draw, text, fnt, max_w)
        if len(lines) <= max_lines and len(lines) * size * 1.08 <= max_h and all(draw.textlength(l, font=fnt) <= max_w for l in lines):
            return fnt, lines, size
        size -= 2
    fnt = font('Bold', floor)
    return fnt, wrap(draw, text, fnt, max_w), floor


def spaced(draw, xy, text, fnt, fill, tracking):
    x, y = xy
    for ch in text:
        draw.text((x, y), ch, font=fnt, fill=fill)
        x += draw.textlength(ch, font=fnt) + tracking


def rounded(img, radius):
    mask = Image.new('L', img.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0) + img.size, radius=radius, fill=255)
    out = img.convert('RGBA')
    out.putalpha(mask)
    return out


def cover(img, w, h):
    ratio = max(w / img.width, h / img.height)
    img = img.resize((round(img.width * ratio), round(img.height * ratio)), Image.LANCZOS)
    left, top = (img.width - w) // 2, (img.height - h) // 2
    return img.crop((left, top, left + w, top + h))


def place_photo(canvas, path, accent):
    """La foto vera del prodotto, a destra: orizzontale, verticale o piccola icona, mai deformata."""
    src = Image.open(path).convert('RGB')
    ratio = src.width / src.height
    area = (620, 64, W - PAD, H - 64)  # x0, y0, x1, y1
    if min(src.size) < 600 and 0.9 < ratio < 1.1:  # icona dell'app
        side = 300
        photo = rounded(src.resize((side, side), Image.LANCZOS), 68)
    elif ratio >= 1.15:  # schermata orizzontale
        w = area[2] - area[0]
        h = round(w / 1.6)
        photo = rounded(cover(src, w, h), 28)
    else:  # schermata verticale (telefono)
        h = area[3] - area[1]
        w = round(min(h * ratio, 330))
        photo = rounded(cover(src, w, h), 34)
    x = area[0] + (area[2] - area[0] - photo.width) // 2
    y = area[1] + (area[3] - area[1] - photo.height) // 2
    # ombra morbida e filo di luce: la foto si stacca dallo sfondo scuro
    shadow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(shadow).rounded_rectangle((x, y + 14, x + photo.width, y + photo.height + 14), radius=30, fill=(0, 0, 0, 170))
    canvas.alpha_composite(shadow.filter(ImageFilter.GaussianBlur(26)))
    canvas.alpha_composite(photo, (x, y))
    ImageDraw.Draw(canvas).rounded_rectangle((x, y, x + photo.width - 1, y + photo.height - 1), radius=30, outline=(255, 255, 255, 34), width=2)


def draw_card(card, out_path):
    pink, violet = hex_rgb(card['accent'][0]), hex_rgb(card['accent'][1])
    canvas = Image.new('RGBA', (W, H), BG + (255,))
    glow(canvas, pink, (140, 60), 360, 120)
    glow(canvas, violet, (W - 120, H - 40), 380, 95)
    d = ImageDraw.Draw(canvas)

    logo = Image.open('static/logo-white.png').convert('RGBA')
    logo = logo.resize((round(logo.width * 40 / logo.height), 40), Image.LANCZOS)
    canvas.alpha_composite(logo, (PAD, 52))

    has_photo = bool(card.get('image'))
    text_w = 500 if has_photo else W - 2 * PAD - 80
    d.rounded_rectangle((PAD, 168, PAD + 56, 173), radius=3, fill=pink)
    spaced(d, (PAD, 188), card['kicker'].upper(), font('Semibold', 22), pink, 3.2)

    fnt, lines, size = fit_title(d, card['title'], text_w, 250 if has_photo else 270, 92 if has_photo else 104, 50, 4)
    y = 232
    for line in lines:
        d.text((PAD, y), line, font=fnt, fill=INK)
        y += round(size * 1.08)

    if card.get('note'):
        nf = font('Regular', 29)
        for line in wrap(d, card['note'], nf, text_w)[:3]:
            d.text((PAD, y + 20), line, font=nf, fill=MUTED)
            y += 38

    d.text((PAD, H - 58), 'wearerighello.com', font=font('Medium', 23), fill=(130, 130, 142))

    if has_photo:
        place_photo(canvas, card['image'], pink)

    canvas.convert('RGB').save(out_path, 'JPEG', quality=84, optimize=True, progressive=True, subsampling=0)


def main():
    cards = json.load(open(sys.argv[1]))
    os.makedirs('static/og', exist_ok=True)
    for card in cards:
        out = os.path.join('static/og', card['file'])
        draw_card(card, out)
        print(f"{out}  {os.path.getsize(out) // 1024} kB")


if __name__ == '__main__':
    main()
