<script lang="ts">
  /**
   * La conferma, sul posto: codice della richiesta, dove risponderemo, tre passi, e l'alternativa
   * WhatsApp con il codice gia' scritto. Uguale nel foglio e nella pagina /contatti.
   */
  import { onMount } from 'svelte';
  import ProButton from '$lib/components/progetti/ProButton.svelte';
  import { whatsappConfirmHref, type ContactFlow } from '$lib/contact/flow';
  import { CONTACT_STEPS } from '$lib/data/contact-steps';

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
    // il modulo era lungo e scorso: la conferma si legge dall'inizio
    const scroller = heading?.closest('.cs-scroll');
    if (scroller) scroller.scrollTop = 0;
    else heading?.scrollIntoView({ block: 'center' });
    return () => clearTimeout(copyTimer);
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

<div class="cd" role="status">
  <div class="cd__mark" aria-hidden="true">
    <svg viewBox="0 0 24 24" width="30" height="30"><path class="cd__tick" d="M5 12.5l4.2 4.2L19 7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" /></svg>
  </div>
  <h2 class="cd__title" tabindex="-1" bind:this={heading}>Richiesta inviata{s.sent?.name ? `, ${s.sent.name}` : ''}.</h2>

  {#if reference}
    <div class="cd__ref">
      <span class="cd__ref-label">Il codice della tua richiesta</span>
      <span class="cd__ref-row">
        <strong id="cd-code" class="cd__code">{reference}</strong>
        <button type="button" class="cd__copy" on:click={copy}>{copied ? 'Copiato' : 'Copia'}</button>
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

  <ol class="cd__steps">
    {#each CONTACT_STEPS as step, i}
      <li>
        <span class="cd__n" aria-hidden="true">{i + 1}</span>
        <span><strong>{step.title}.</strong> {step.text}</span>
      </li>
    {/each}
  </ol>

  <p class="cd__wa">
    Hai fretta? <a href={whatsappConfirmHref(reference || 'dal sito', s.sent?.name ?? '')} target="_blank" rel="noopener noreferrer">Scrivici su WhatsApp</a>
    con {reference ? 'il codice già scritto' : 'il messaggio già pronto'}.
  </p>

  <div class="cd__cta">
    {#if layout === 'sheet'}
      <ProButton variant="primary" on:click={onClose}>Chiudi</ProButton>
    {:else}
      <ProButton variant="primary" arrow="right" on:click={onBack}>Torna dove eri</ProButton>
      <ProButton variant="ghost" on:click={() => flow.again()}>Scrivi un altro messaggio</ProButton>
    {/if}
  </div>
</div>

<style>
  .cd { display: grid; justify-items: center; gap: 0.95rem; text-align: center; padding: clamp(0.5rem, 3vw, 1.5rem) 0 0.5rem; }
  .cd__mark { display: grid; place-items: center; width: 4.2rem; height: 4.2rem; border-radius: 50%; color: #16a34a; background: rgba(34, 197, 94, 0.14); border: 1px solid rgba(34, 197, 94, 0.4); }
  .cd__tick { stroke-dasharray: 26; stroke-dashoffset: 0; animation: cd-draw 0.5s 0.1s ease-out backwards; }
  @keyframes cd-draw { from { stroke-dashoffset: 26; } }
  .cd__title { font-size: clamp(1.5rem, 3vw, 1.9rem); font-weight: 700; line-height: 1.15; outline: none; margin: 0; }
  .cd__text { color: var(--text-secondary); max-width: 34rem; line-height: 1.55; font-size: 1rem; margin: 0; }
  .cd__text strong { color: var(--text-primary); overflow-wrap: anywhere; }

  .cd__ref { display: grid; gap: 0.35rem; justify-items: center; padding: 0.8rem 1.1rem; border: 1px solid var(--border-color); border-radius: 1rem; background: var(--bg-tertiary); }
  .cd__ref-label { font-family: var(--font-label); font-size: 0.76rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-muted); }
  .cd__ref-row { display: inline-flex; align-items: center; gap: 0.8rem; }
  .cd__code { font-family: var(--font-label); font-size: 1.6rem; letter-spacing: 0.1em; color: var(--brand-pink-ink); user-select: all; }
  .cd__copy { min-height: 2.75rem; min-width: 4.6rem; padding: 0 1rem; border-radius: 999px; border: 1px solid var(--border-color); background: transparent; color: var(--text-primary); font: inherit; font-size: 0.9rem; font-weight: 600; cursor: pointer; touch-action: manipulation; }
  .cd__copy:hover { border-color: var(--brand-pink); }

  .cd__steps { display: grid; gap: 0.6rem; max-width: 34rem; width: 100%; text-align: left; margin: 0.2rem 0 0; padding: 0; list-style: none; }
  .cd__steps li { display: grid; grid-template-columns: 1.7rem minmax(0, 1fr); gap: 0.7rem; font-size: 0.95rem; line-height: 1.5; color: var(--text-secondary); }
  .cd__steps strong { color: var(--text-primary); }
  .cd__n { display: grid; place-items: center; width: 1.7rem; height: 1.7rem; border-radius: 50%; border: 1px solid var(--brand-pink); color: var(--brand-pink-ink); font-weight: 700; font-size: 0.8rem; }

  .cd__wa { margin: 0; font-size: 0.95rem; color: var(--text-secondary); }
  .cd__wa a { display: inline-flex; align-items: center; min-height: 2.75rem; text-decoration: underline; text-underline-offset: 3px; color: var(--text-primary); font-weight: 600; }
  .cd__cta { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.7rem; margin-top: 0.3rem; }

  @media (prefers-reduced-motion: reduce) { .cd__tick { animation: none; } }
</style>
