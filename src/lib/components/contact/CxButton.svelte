<script lang="ts">
  /**
   * Il pulsante del percorso di contatto (foglio, conferma, barra del telefono, pagina /contatti): uno solo.
   * Stessa forma e stesso rosa della testata del sito. Ha quattro stati nello stesso rettangolo (pronto, in corso,
   * fatto, da riprovare = di nuovo pronto) e non cambia MAI dimensioni: i livelli stanno sovrapposti nella stessa cella
   * e si danno il cambio con `opacity` e `transform`, cosi' non si sposta niente intorno a lui.
   * Niente si anima fuori da `transform`/`opacity` (e dal tratto della spunta): sfondo e bordo rispondono con uno strato.
   */
  export let href = '';
  export let variant: 'primary' | 'soft' | 'ghost' = 'primary';
  export let size: 'md' | 'lg' = 'md';
  export let type: 'button' | 'submit' = 'button';
  export let external = false;
  export let full = false;
  /** Invio in corso: la rotellina e la barra sottile prendono il posto dell'etichetta. */
  export let busy = false;
  export let busyLabel = '';
  /** Fatto: la spunta si disegna al posto dell'etichetta. */
  export let done = false;
  export let doneLabel = '';
  export let label = '';
</script>

<!-- el. nativo (a o button): il ruolo e' gia' quello giusto -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<svelte:element
  this={href ? 'a' : 'button'}
  class="cxb cxb--{variant} cxb--{size}"
  class:cxb--full={full}
  class:is-busy={busy}
  class:is-done={done}
  href={href || undefined}
  type={href ? undefined : type}
  target={href && external ? '_blank' : undefined}
  rel={href && external ? 'noopener noreferrer' : undefined}
  aria-label={label || undefined}
  aria-disabled={busy || done ? 'true' : undefined}
  aria-busy={busy ? 'true' : undefined}
  on:click
>
  <span class="cxb__layer cxb__idle"><slot /></span>
  {#if busyLabel}
    <span class="cxb__layer cxb__busy" aria-hidden={!busy}>
      <svg class="cxb__spin" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-opacity="0.3" stroke-width="2.4" /><path d="M21 12a9 9 0 0 0-9-9" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" /></svg>
      {busyLabel}
    </span>
  {/if}
  {#if doneLabel}
    <span class="cxb__layer cxb__done" aria-hidden={!done}>
      <svg class="cxb__tick" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M5 12.5l4.2 4.2L19 7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" /></svg>
      {doneLabel}
    </span>
  {/if}
  {#if busyLabel}<span class="cxb__bar" aria-hidden="true"></span>{/if}
</svelte:element>

<style>
  .cxb {
    position: relative;
    display: inline-grid;
    grid-template: 'c' / 1fr;
    place-items: center;
    min-height: 3rem;
    padding: 0 var(--cx-6);
    border: 0;
    border-radius: 999px;
    font: inherit;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.1;
    letter-spacing: 0.005em;
    text-align: center;
    text-decoration: none;
    white-space: nowrap;
    cursor: pointer;
    overflow: hidden;
    isolation: isolate;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
    transition: transform 0.14s var(--cx-ease);
  }
  .cxb--lg { min-height: 3.4rem; padding: 0 var(--cx-8); }
  .cxb--full { display: grid; width: 100%; }

  /* lo strato sopra: si accende al passaggio, senza animare il colore sotto */
  .cxb::after { content: ''; position: absolute; inset: 0; z-index: -1; border-radius: inherit; background: currentColor; opacity: 0; transition: opacity 0.2s ease; }
  .cxb--ghost::before { content: ''; position: absolute; inset: 0; border-radius: inherit; border: 1px solid var(--brand-pink); opacity: 0; transition: opacity 0.2s ease; }
  .cxb:active { transform: scale(0.98); }
  .cxb:focus-visible { outline: 2px solid var(--focus-ring); outline-offset: 3px; }
  @media (hover: hover) {
    .cxb:hover::after { opacity: 0.1; }
    .cxb--ghost:hover::before { opacity: 1; }
    .cxb--primary:hover { transform: translateY(-1px); }
    .cxb--primary:active { transform: scale(0.98); }
  }

  .cxb--primary { background: var(--cx-fill); color: #fff; box-shadow: 0 8px 22px -10px rgba(214, 72, 126, 0.7); }
  .cxb--soft { background: var(--brand-pink-soft); color: var(--cx-soft-ink); }
  .cxb--ghost { background: transparent; color: var(--text-primary); box-shadow: inset 0 0 0 1px var(--border-color); }

  /* i tre livelli stanno nella stessa cella: la larghezza e' quella del piu' largo, l'altezza non cambia */
  .cxb__layer { grid-area: c; display: inline-flex; align-items: center; justify-content: center; gap: var(--cx-2); transition: opacity 0.2s ease, transform 0.28s var(--cx-ease); }
  .cxb__busy, .cxb__done { opacity: 0; transform: translateY(0.6rem); pointer-events: none; }
  .cxb.is-busy .cxb__idle, .cxb.is-done .cxb__idle { opacity: 0; transform: translateY(-0.6rem); }
  .cxb.is-busy .cxb__busy, .cxb.is-done .cxb__done { opacity: 1; transform: none; }
  .cxb.is-busy, .cxb.is-done { cursor: progress; pointer-events: none; }
  .cxb.is-done { cursor: default; }

  .cxb__spin { flex: none; animation: cxb-rot 0.8s linear infinite; }
  .cxb__tick path { stroke-dasharray: 26; stroke-dashoffset: 26; }
  .cxb.is-done .cxb__tick path { animation: cxb-draw 0.34s 0.08s var(--cx-ease) forwards; }

  /* barra sottile sul bordo basso: dice che sta lavorando, senza dire quanto manca (non lo sappiamo) */
  .cxb__bar { grid-area: c; align-self: end; justify-self: stretch; height: 3px; background: rgba(255, 255, 255, 0.85); transform: translateX(-100%); opacity: 0; }
  .cxb.is-busy .cxb__bar { opacity: 1; animation: cxb-bar 1.3s var(--cx-ease) infinite; }
  .cxb--soft .cxb__bar, .cxb--ghost .cxb__bar { background: var(--brand-pink); }

  @keyframes cxb-rot { to { transform: rotate(360deg); } }
  @keyframes cxb-draw { to { stroke-dashoffset: 0; } }
  @keyframes cxb-bar { from { transform: translateX(-100%); } to { transform: translateX(100%); } }

  @media (prefers-reduced-motion: reduce) {
    .cxb, .cxb::after, .cxb--ghost::before, .cxb__layer { transition: none; }
    .cxb:active, .cxb--primary:hover { transform: none; }
    .cxb__spin { animation-duration: 2.4s; }
    .cxb__bar { display: none; }
    .cxb.is-done .cxb__tick path { animation: none; stroke-dashoffset: 0; }
  }
</style>
