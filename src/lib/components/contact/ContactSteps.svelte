<script lang="ts">
  /**
   * I tre passi dopo la richiesta, con il loro tempo: una linea verticale con tre punti. Uno solo per la conferma del foglio
   * (`done`, con i passi che entrano uno dopo l'altro) e per la colonna della pagina /contatti (`page`).
   */
  import { CONTACT_STEPS } from '$lib/data/contact-steps';

  export let variant: 'done' | 'page' = 'page';
</script>

<ol class="cxs cxs--{variant}">
  {#each CONTACT_STEPS as step, i}
    <li style="--i:{i}">
      <span class="cxs__n" aria-hidden="true">{i + 1}</span>
      <div class="cxs__body">
        <p class="cxs__when">{step.when}</p>
        <p class="cxs__title">{step.title}</p>
        <p class="cxs__text">{step.text}</p>
      </div>
    </li>
  {/each}
</ol>

<style>
  .cxs { margin: 0; padding: 0; list-style: none; display: grid; width: 100%; text-align: left; }
  .cxs li { position: relative; display: grid; grid-template-columns: 2rem minmax(0, 1fr); gap: var(--cx-4); padding-bottom: var(--cx-5); }
  .cxs li:last-child { padding-bottom: 0; }
  /* la linea che unisce i punti: un filo, non un elemento in piu' */
  .cxs li:not(:last-child)::before { content: ''; position: absolute; left: 1rem; top: 2.1rem; bottom: 0.15rem; width: 1px; margin-left: -0.5px; background: var(--border-color); }
  .cxs__n { display: grid; place-items: center; width: 2rem; height: 2rem; border-radius: 50%; border: 1px solid var(--brand-pink); color: var(--brand-pink-ink); background: var(--bg-secondary); font-size: 0.8rem; font-weight: 700; font-variant-numeric: tabular-nums; position: relative; }
  .cxs__body { min-width: 0; }
  .cxs__body p { margin: 0; }
  .cxs__when { font-family: var(--font-label); font-size: 0.74rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--brand-pink-ink); }
  .cxs__title { margin-top: 0.1rem !important; font-size: 1.05rem; font-weight: 700; line-height: 1.3; color: var(--text-primary); }
  .cxs__text { margin-top: 0.15rem !important; font-size: 0.95rem; line-height: 1.5; color: var(--text-secondary); }
  .cxs--done .cxs__title { font-size: 1rem; }
  .cxs--done .cxs__text { font-size: 0.92rem; }

  /* conferma da 640 px in su: i tre passi in fila, con la linea che li unisce in orizzontale (poca altezza: il foglio sta in 900 px) */
  @media (min-width: 640px) {
    .cxs--done { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: var(--cx-4); }
    .cxs--done li { grid-template-columns: minmax(0, 1fr); row-gap: var(--cx-2); padding-bottom: 0; }
    .cxs--done li:not(:last-child)::before { left: 2.5rem; right: calc(-1 * var(--cx-4) + 0.5rem); top: 1rem; bottom: auto; width: auto; height: 1px; margin: 0; }
  }

  /* conferma: i passi entrano uno dopo l'altro, solo opacita' e un filo di spostamento */
  .cxs--done li { animation: cxs-in 0.4s calc(0.42s + var(--i) * 0.07s) var(--cx-ease) backwards; }
  @keyframes cxs-in { from { opacity: 0; transform: translateY(0.5rem); } }
  @media (prefers-reduced-motion: reduce) { .cxs--done li { animation: none; } }
</style>
