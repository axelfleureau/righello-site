<script lang="ts">
  /**
   * Il guscio del foglio di contatto: la finestra che si apre sopra OGNI pagina quando si tocca un
   * pulsante verso /contatti. Sta nel pacchetto di ogni pagina (poche righe), cosi' l'apertura e'
   * immediata; il modulo vero (`ContactSheetBody`) e il comportamento da dito e da tastiera
   * (`sheetBehavior`) si scaricano a parte, prima del clic se c'e' tempo.
   *
   * Accessibile: `role=dialog`, `aria-modal`, fuoco dentro, Esc, clic sul fondo, ritorno del fuoco al
   * pulsante, il resto della pagina `inert` (la trappola del Tab e' in `sheetBehavior`).
   * Nessun blocco dello scorrimento che sposti il layout: la home ha una hero fissata da ScrollTrigger,
   * quindi `html` e `body` non si toccano. Rotella e tocco sul fondo sono fermati qui, e il contenuto
   * del foglio non fa scorrere la pagina sotto (`overscroll-behavior`).
   */
  import { onMount, tick, type ComponentType } from 'svelte';
  import { closeContactSheet, contactSheet, sheetTrigger } from '$lib/contact/sheet';
  import { loadSheetBody } from '$lib/contact/preload';
  import { CONTACT } from '$lib/data/contact';

  type BodyModule = typeof import('$lib/components/contact/ContactSheetBody.svelte');

  let Body: ComponentType | null = null;
  let attach: BodyModule['attachSheetBehavior'] | null = null;
  let detach: (() => void) | null = null;
  let root: HTMLElement;
  let panel: HTMLElement;
  let grip: HTMLElement;
  let scroller: HTMLElement;
  let shown = false;
  let closing = false;
  let autofocus = false;
  /** Il guscio si disegna da solo per primo; il modulo entra un fotogramma dopo (la finestra compare prima, il lavoro pesante dopo). */
  let ready = false;
  let inerted: Element[] = [];
  let closeTimer: ReturnType<typeof setTimeout>;

  // Il rettangolo davvero visibile: sotto la tastiera del telefono e sopra l'avviso cookie.
  let stageTop = 0;
  let stageH = 0;

  $: if ($contactSheet.open) open();
  $: if (!$contactSheet.open && shown && !closing) close();
  // il comportamento da dito e da tastiera parte appena e' scaricato e il foglio e' in pagina
  $: if (attach && shown && !closing && panel && grip && scroller && !detach) detach = attach(panel, grip, scroller, closeContactSheet);

  const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  /** Il pulsante delle preferenze cookie ha il livello piu' alto che esiste: finche' il foglio e' aperto non deve coprirlo. */
  const cookieButton = () => document.querySelector<HTMLElement>('.iubenda-tp-btn');

  async function open() {
    if (shown && !closing) return;
    clearTimeout(closeTimer);
    shown = true;
    closing = false;
    ready = false;
    autofocus = matchMedia('(hover: hover) and (pointer: fine)').matches;
    syncViewport();
    void loadSheetBody().then((m) => {
      Body = m.default;
      attach = m.attachSheetBehavior;
    });
    await tick();
    if (!root) return;
    window.visualViewport?.addEventListener('resize', syncViewport);
    window.visualViewport?.addEventListener('scroll', syncViewport);
    // se il modulo e' gia' pronto e ha preso il fuoco da solo (il nome, con mouse e tastiera) non glielo si toglie
    if (!panel.contains(document.activeElement)) panel.focus({ preventScroll: true });
    // Il resto si fa dopo il primo disegno del guscio: il modulo da montare e rendere `inert` mezza pagina costano un ricalcolo degli stili,
    // e la finestra deve comparire prima.
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (!shown || closing || !root) return;
      ready = true;
      inerted = [...(root.parentElement?.children ?? [])].filter((el) => el !== root && !el.hasAttribute('inert'));
      inerted.forEach((el) => el.setAttribute('inert', ''));
      cookieButton()?.style.setProperty('visibility', 'hidden', 'important');
    }));
  }

  function release() {
    detach?.();
    detach = null;
    cookieButton()?.style.removeProperty('visibility');
    inerted.forEach((el) => el.removeAttribute('inert'));
    inerted = [];
    window.visualViewport?.removeEventListener('resize', syncViewport);
    window.visualViewport?.removeEventListener('scroll', syncViewport);
  }

  function close() {
    closing = true;
    release();
    const trigger = sheetTrigger();
    if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    closeTimer = setTimeout(() => ((shown = false), (closing = false)), reduced() ? 0 : 180);
  }

  // (onMount e non onDestroy: quest'ultimo gira anche sul server, dove `window` non esiste)
  onMount(() => () => {
    clearTimeout(closeTimer);
    release();
  });

  function syncViewport() {
    const vv = window.visualViewport;
    if (vv && vv.scale > 1.01) return; // chi sta ingrandendo con le dita non vuole che il foglio si muova
    const h = vv?.height ?? window.innerHeight;
    const top = vv?.offsetTop ?? 0;
    const keyboard = Math.round(window.innerHeight - h - top) > 40;
    // l'avviso cookie (iubenda) sta in basso e ci passa sopra: il foglio resta sopra di lui. Con la tastiera aperta e' sotto di lei.
    const banner = document.querySelector('#iubenda-cs-banner.iubenda-cs-visible .iubenda-cs-container');
    const hold = !keyboard && banner ? Math.ceil(banner.getBoundingClientRect().height) : 0;
    stageTop = Math.round(top);
    stageH = Math.max(240, Math.round(h - hold));
  }

  function onKeydown(e: KeyboardEvent) {
    if (shown && !closing && e.key === 'Escape') {
      e.preventDefault();
      closeContactSheet();
    }
  }
</script>

<svelte:window on:keydown={onKeydown} on:resize={() => shown && syncViewport()} />

{#if shown}
  <div class="cs-root" class:is-closing={closing} class:is-tight={stageH < 620} bind:this={root} data-contact-root>
    <div class="cs-backdrop" role="presentation" on:click={closeContactSheet} on:wheel|preventDefault|nonpassive on:touchmove|preventDefault|nonpassive></div>
    <div class="cs-stage" style="top:{stageTop}px;height:{stageH}px">
      <div class="cs-panel" role="dialog" aria-modal="true" aria-labelledby="cs-title" tabindex="-1" bind:this={panel}>
        <div class="cs-grip" bind:this={grip} role="presentation">
          <span class="cs-handle" aria-hidden="true"></span>
          <header class="cs-head">
            <div class="cs-head__text">
              <h2 id="cs-title" class="cs-title">Parliamone</h2>
              <p class="cs-sub">Due campi e basta. Ti rispondiamo {CONTACT.reply}.</p>
            </div>
            <button type="button" class="cs-close" aria-label="Chiudi" on:click={closeContactSheet}>
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" /></svg>
            </button>
          </header>
        </div>
        <div class="cs-scroll" bind:this={scroller}>
          {#if ready && Body && $contactSheet.ctx}
            {#key $contactSheet.seq}
              <svelte:component this={Body} ctx={$contactSheet.ctx} {autofocus} onClose={closeContactSheet} />
            {/key}
          {:else}
            <div class="cs-skel" aria-hidden="true"><i></i><i></i><i class="w"></i><i></i></div>
          {/if}
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .cs-root { position: fixed; inset: 0; z-index: 1000; }
  .cs-backdrop { position: absolute; inset: 0; background: var(--scrim); overscroll-behavior: contain; animation: cs-fade 0.2s ease-out; }
  .cs-stage { position: absolute; left: 0; right: 0; display: flex; align-items: flex-end; justify-content: center; pointer-events: none; }
  .cs-panel {
    --cs-pad: 1.25rem;
    pointer-events: auto;
    display: flex;
    flex-direction: column;
    width: 100%;
    /* altezza fissa sul telefono: il guscio, il modulo che arriva e la conferma non fanno saltare il foglio */
    height: 92%;
    min-height: 0;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-bottom: 0;
    border-radius: 1.5rem 1.5rem 0 0;
    box-shadow: var(--surface-menu-shadow);
    color: var(--text-primary);
    outline: none;
    overflow: hidden;
    animation: cs-up 0.26s cubic-bezier(0.2, 0.8, 0.2, 1);
    transition: transform 0.2s ease;
  }
  .cs-panel:global(.is-dragging) { transition: none; }
  .is-closing .cs-panel { animation: cs-down 0.18s ease-in forwards; }
  .is-closing .cs-backdrop { animation: cs-fade 0.18s ease-in reverse forwards; }

  .cs-grip { touch-action: none; flex: none; cursor: default; }
  .cs-handle { display: block; width: 2.6rem; height: 0.3rem; margin: 0.55rem auto 0; border-radius: 999px; background: var(--border-color); }
  .cs-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.7rem var(--cs-pad) 0.9rem;
    background: radial-gradient(70% 140% at 0% 0%, var(--brand-pink-soft), transparent 70%);
  }
  .cs-head__text { min-width: 0; }
  .cs-title { margin: 0; font-size: clamp(1.4rem, 3vw, 1.75rem); font-weight: 700; line-height: 1.15; letter-spacing: -0.01em; }
  .is-tight .cs-sub { display: none; }
  .cs-sub { margin: 0.25rem 0 0; font-size: 0.95rem; line-height: 1.4; color: var(--text-secondary); }
  .cs-close {
    flex: none;
    display: grid;
    place-items: center;
    width: 2.75rem;
    height: 2.75rem;
    margin: -0.2rem -0.3rem 0 0;
    border: 1px solid var(--border-color);
    border-radius: 50%;
    background: var(--bg-primary);
    color: var(--text-primary);
    cursor: pointer;
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
  }
  .cs-close:hover { border-color: var(--brand-pink); color: var(--brand-pink-ink); }
  .cs-close:focus-visible { outline: 2px solid var(--focus-ring); outline-offset: 2px; }

  .cs-scroll {
    flex: 1 1 auto;
    min-height: 0;
    overflow-y: auto;
    overscroll-behavior: contain;
    touch-action: pan-y;
    -webkit-overflow-scrolling: touch;
    padding: 0.2rem var(--cs-pad) calc(1.1rem + env(safe-area-inset-bottom, 0px));
  }

  .cs-skel { display: grid; gap: 0.9rem; padding-top: 0.5rem; }
  .cs-skel i { display: block; height: 3rem; border-radius: 0.8rem; background: var(--bg-tertiary); animation: cs-pulse 1.2s ease-in-out infinite; }
  .cs-skel i.w { height: 5rem; }

  /* Tablet verticale e schermi piu' larghi: finestra centrata. Da 960 px, due colonne larghe quanto il contenitore del sito. */
  @media (min-width: 640px) {
    .cs-stage { align-items: center; }
    .cs-panel {
      --cs-pad: 1.75rem;
      width: min(40rem, calc(100% - 2rem));
      height: auto;
      min-height: min(34rem, calc(100% - 2rem));
      max-height: calc(100% - 2rem);
      border-bottom: 1px solid var(--border-color);
      border-radius: 1.6rem;
      animation-name: cs-pop;
    }
    .cs-handle { display: none; }
    .cs-head { padding-top: 1.4rem; }
    .is-closing .cs-panel { animation-name: cs-pop-out; }
  }
  @media (min-width: 960px) {
    .cs-panel { width: min(var(--container-max), calc(100% - 2 * var(--space-lg))); max-height: min(52rem, calc(100% - 3rem)); min-height: min(34rem, calc(100% - 3rem)); --cs-pad: 2rem; }
  }

  @keyframes cs-fade { from { opacity: 0; } }
  @keyframes cs-up { from { transform: translateY(100%); } }
  @keyframes cs-down { to { transform: translateY(100%); } }
  @keyframes cs-pop { from { opacity: 0; transform: translateY(0.8rem) scale(0.985); } }
  @keyframes cs-pop-out { to { opacity: 0; transform: translateY(0.5rem) scale(0.99); } }
  @keyframes cs-pulse { 50% { opacity: 0.5; } }

  @media (prefers-reduced-motion: reduce) {
    .cs-backdrop, .cs-panel, .is-closing .cs-panel, .is-closing .cs-backdrop, .cs-skel i { animation: none; }
    .cs-panel { transition: none; }
  }
</style>
