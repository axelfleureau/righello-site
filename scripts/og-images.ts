/**
 * Disegna le immagini di condivisione (1200 x 630) in `static/og/`.
 *
 *   npx tsx scripts/og-images.ts
 *
 * Cosa scrivere in ogni immagine sta in `src/lib/seo/og-cards.ts`; il disegno (sfondo scuro, rosa
 * Righello, Degular Display, foto vera del prodotto) sta in `scripts/og-images.py`, che usa solo Pillow.
 * Dopo averle rifatte, alza `OG_VERSION` in `src/lib/data/site.ts`: i social tengono in memoria l'indirizzo.
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { ogCards } from '../src/lib/seo/og-cards';

mkdirSync('static/og', { recursive: true });
const manifest = '.og-cards.json';
writeFileSync(manifest, JSON.stringify(ogCards, null, 1));
const script = ['scripts/og-images.py', manifest];
try {
  try {
    execFileSync('python3', script, { stdio: 'inherit' });
  } catch (error) {
    // Node sotto Rosetta (x64 su Mac Apple Silicon) fa partire anche python3 in x64, dove Pillow arm64 non si carica.
    if (process.platform !== 'darwin' || process.arch !== 'x64') throw error;
    execFileSync('arch', ['-arm64', 'python3', ...script], { stdio: 'inherit' });
  }
} finally {
  execFileSync('rm', ['-f', manifest]);
}
