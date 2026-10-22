<script lang="ts">
  /**
   * La conferma, sul posto: codice della richiesta, dove risponderemo, tre passi con il loro tempo, e l'alternativa
   * WhatsApp con il codice gia' scritto. Uguale nel foglio e nella pagina /contatti.
   *
   * Si disegna in meno di un secondo: cerchio e spunta, il codice lettera per lettera, poi i passi. Tutto con `transform`
   * e `opacity` (e il tratto della spunta); con `prefers-reduced-motion` compare gia' tutto.
   */
  import { onMount } from 'svelte';
  import ContactDock from '$lib/components/contact/ContactDock.svelte';
  import ContactSteps from '$lib/components/contact/ContactSteps.svelte';
  import CxButton from '$lib/components/contact/CxButton.svelte';
  import { whatsappConfirmHref, type ContactFlow } from '$lib/contact/flow';

  export let flow: ContactFlow;
  /** Nel foglio: il pulsante principale chiude. Nella pagina: riporta dov'eri, e se ne puo' scrivere un'altra. */
  export let layout: 'sheet' | 'page' = 'sheet';
  export let onClose: () => void = () => {};
  export let onBack: () => void = () => {};

  let heading: HTMLElement;
  let copied = false;
  let copyTimer: ReturnType<typeof setTimeout>;

  $: s = $flow;
  $: reference = s.reference;

  onMount(() => {
    heading?.focus({ preventScroll: true });
    // "Due campi e basta" non ha piu' senso dopo l'invio: il foglio toglie la frase sotto il titolo
    const panel = heading?.closest('.cs-panel');
    panel?.classList.add('is-sent');
    // il modulo era lungo e scorso: la conferma si legge dall'inizio
    const scroller = heading?.closest('.cs-scroll');
    if (scroller) scroller.scrollTop = 0;
    else heading?.scrollIntoView({ block: 'center' });
    return () => {
      clearTimeout(copyTimer);
      panel?.classList.remove('is-sent');
    };
  });

  async function copy() {
    try {
      await navigator.clipboard.writeText(reference);
      copied = true;
    } catch {
      // senza permesso sugli appunti si seleziona il codice: basta un tocco lungo
      const sel = window.getSelection();
      const node = document.getElementById('cd-code');
      if (sel && node) {
        sel.selectAllChildren(node);
        copied = false;
      }
    }
    clearTimeout(copyTimer);
    copyTimer = setTimeout(() => (copied = false), 2200);
  }
</script>

<div class="cd cd--{layout}" role="status">
  <div class="cd__mark" aria-hidden="true">
    <svg viewBox="0 0 24 24" width="30" height="30"><path class="cd__tick" d="M5 12.5l4.2 4.2L19 7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" /></svg>
  </div>
  <h2 class="cd__title" tabindex="-1" bind:this={heading}>Richiesta inviata{s.sent?.name ? `, ${s.sent.name}` : ''}.</h2>

  {#if reference}
    <div class="cd__ref">
      <span class="cd__ref-label">Il codice della tua richiesta</span>
      <span class="cd__ref-row">
        <strong id="cd-code" class="cd__code" role="img" aria-label={reference}>{#each reference.split('') as ch, i}<span aria-hidden="true" style="--i:{i}">{ch}</span>{/each}</strong>
        <button type="button" class="cd__copy" class:is-copied={copied} aria-label="Copia il codice {reference}" on:click={copy}>
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <g class="cd__copy-i"><rect x="8.5" y="8.5" width="11" height="11" rx="2.5" fill="none" stroke="currentColor" stroke-width="2" /><path d="M15.5 8.5V6.5a2 2 0 0 0-2-2h-7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></g>
            <path class="cd__copy-ok" d="M5 12.5l4.2 4.2L19 7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span>{copied ? 'Copiato' : 'Copia'}</span>
        </button>
        <span class="cd__sr" aria-live="polite">{copied ? 'Codice copiato' : ''}</span>
      </span>
    </div>
  {/if}

  {#if s.sent?.email && s.delivered?.client}
    <p class="cd__text">Ti abbiamo mandato una copia a <strong>{s.sent.email}</strong>. Se non la trovi, guarda nella posta indesiderata.</p>
  {:else if s.sent?.email}
    <p class="cd__text">La richiesta è arrivata, ma non siamo riusciti a mandarti la copia: controlla che l’email <strong>{s.sent.email}</strong> sia giusta.</p>
  {:else if s.sent?.phone}
    <p class="cd__text">Ti contattiamo al numero <strong>{s.sent.phone}</strong>.</p>
  {/if}

  <div class="cd__steps">
    <h3 class="cd__h3">Cosa succede adesso</h3>
    <ContactSteps variant="done" />
  </div>

  <div class="cd__wa">
    <p>Hai fretta? Il messaggio parte {reference ? 'già con il codice scritto' : 'già pronto'}.</p>
    <CxButton variant="soft" href={whatsappConfirmHref(reference || 'dal sito', s.sent?.name ?? '')} external>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 11.5a8 8 0 0 1-11.9 7L4 20l1.5-4A8 8 0 1 1 20 11.5Z" /><path d="M9 9.2c.2 2.2 2.6 4.6 4.8 4.8l1.2-1.1-1.6-1-.8.6a3.3 3.3 0 0 1-1.6-1.6l.6-.8-1-1.6L9 9.2Z" /></svg>
      Scrivici su WhatsApp
    </CxButton>
  </div>

  <ContactDock {layout}>
    {#if layout === 'sheet'}
      <CxButton variant="primary" full on:click={onClose}>Chiudi</CxButton>
    {:else}
      <CxButton variant="primary" size="lg" full on:click={onBack}>Torna dove eri</CxButton>
      <CxButton variant="ghost" size="lg" full on:click={() => flow.again()}>Scrivi un altro messaggio</CxButton>
    {/if}
  </ContactDock>
</div>

<style>
  .cd { display: grid; justify-items: center; gap: var(--cx-4); text-align: center; padding: var(--cx-4) 0 0; min-height: 100%; align-content: start; }
  .cd--page { padding-top: var(--cx-6); }
  .cd > :global(.cxd) { align-self: end; width: 100%; }
  .cd--sheet > :global(.cxd) { margin-top: auto; }

  .cd__mark { position: relative; display: grid; place-items: center; width: 4.2rem; height: 4.2rem; border-radius: 50%; color: var(--cx-ok); background: color-mix(in srgb, var(--cx-ok) 14%, transparent); box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--cx-ok) 40%, transparent); animation: cd-pop 0.5s var(--cx-ease-pop) backwards; }
  /* un solo alone che si allarga e svanisce: la conferma "respira" una volta, poi sta ferma */
  .cd__mark::after { content: ''; position: absolute; inset: 0; border-radius: 50%; box-shadow: 0 0 0 1px var(--cx-ok); opacity: 0; animation: cd-halo 0.9s 0.25s var(--cx-ease) backwards; }
  .cd__tick { stroke-dasharray: 26; stroke-dashoffset: 0; animation: cd-draw 0.36s 0.2s var(--cx-ease) backwards; }
  .cd__title { margin: 0; font-size: clamp(1.5rem, 3vw, 1.9rem); font-weight: 700; line-height: 1.15; outline: none; animation: cd-up 0.4s 0.16s var(--cx-ease) backwards; }
  .cd__text { margin: 0; max-width: 34rem; font-size: 1rem; line-height: 1.55; color: var(--text-secondary); animation: cd-up 0.4s 0.34s var(--cx-ease) backwards; }
  .cd__text strong { color: var(--text-primary); overflow-wrap: anywhere; }

  .cd__ref { display: grid; gap: var(--cx-2); justify-items: center; width: 100%; max-width: 24rem; padding: var(--cx-3) var(--cx-4) var(--cx-4); border: 1px solid var(--border-color); border-radius: var(--cx-r-m); background: var(--bg-tertiary); animation: cd-up 0.4s 0.22s var(--cx-ease) backwards; }
  .cd__ref-label { font-family: var(--font-label); font-size: 0.76rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--cx-muted); }
  .cd__ref-row { display: inline-flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: var(--cx-3) var(--cx-4); }
  .cd__code { font-family: var(--font-label); font-size: 1.5rem; font-weight: 700; letter-spacing: 0.1em; font-variant-numeric: tabular-nums; color: var(--brand-pink-ink); user-select: all; white-space: nowrap; }
  .cd__code span { display: inline-block; animation: cd-letter 0.34s calc(0.34s + var(--i) * 0.045s) var(--cx-ease) backwards; }
  .cd__copy { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: var(--cx-2); min-width: 5.6rem; min-height: 2.75rem; padding: 0 var(--cx-4); border: 0; border-radius: 999px; background: transparent; box-shadow: inset 0 0 0 1px var(--border-color); color: var(--text-primary); font: inherit; font-size: 0.9rem; font-weight: 600; cursor: pointer; touch-action: manipulation; -webkit-tap-highlight-color: transparent; transition: transform 0.14s var(--cx-ease); }
  .cd__copy:active { transform: scale(0.96); }
  .cd__copy:focus-visible { outline: 2px solid var(--focus-ring); outline-offset: 2px; }
  .cd__copy svg { flex: none; overflow: visible; }
  .cd__copy-i { transition: opacity 0.16s ease; }
  .cd__copy-ok { stroke-dasharray: 26; stroke-dashoffset: 26; }
  .cd__copy.is-copied { color: var(--cx-ok); }
  .cd__copy.is-copied .cd__copy-i { opacity: 0; }
  .cd__copy.is-copied .cd__copy-ok { animation: cd-draw-in 0.26s var(--cx-ease) forwards; }
  @media (hover: hover) { .cd__copy:hover { box-shadow: inset 0 0 0 1px var(--brand-pink); } }
  .cd__sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }

  .cd__steps { display: grid; gap: var(--cx-3); justify-items: start; width: 100%; max-width: 34rem; text-align: left; margin-top: var(--cx-2); }
  @media (min-width: 640px) {
    .cd { gap: var(--cx-3); }
    .cd__mark { width: 3.4rem; height: 3.4rem; }
    .cd__steps { max-width: none; }
  }
  .cd__h3 { margin: 0; font-family: var(--font-label); font-size: 0.78rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--cx-muted); animation: cd-up 0.4s 0.4s var(--cx-ease) backwards; }

  .cd__wa { display: grid; justify-items: center; gap: var(--cx-3); animation: cd-up 0.4s 0.62s var(--cx-ease) backwards; }
  .cd__wa p { margin: 0; font-size: 0.95rem; color: var(--text-secondary); }

  @keyframes cd-pop { from { opacity: 0; transform: scale(0.6); } }
  @keyframes cd-halo { 0% { opacity: 0.7; transform: scale(1); } 100% { opacity: 0; transform: scale(1.55); } }
  @keyframes cd-draw { from { stroke-dashoffset: 26; } }
  @keyframes cd-draw-in { to { stroke-dashoffset: 0; } }
  @keyframes cd-up { from { opacity: 0; transform: translateY(0.5rem); } }
  @keyframes cd-letter { from { opacity: 0; transform: translateY(0.4em); } }

  @media (prefers-reduced-motion: reduce) {
    .cd__mark, .cd__mark::after, .cd__tick, .cd__title, .cd__text, .cd__ref, .cd__code span, .cd__h3, .cd__wa { animation: none; }
    .cd__copy, .cd__copy-i { transition: none; }
    .cd__copy.is-copied .cd__copy-ok { animation: none; stroke-dashoffset: 0; }
  }
</style>
