<script lang="ts">
  /**
   * Il brief in diretta: il documento che il team riceve, ordinato, che si compila mentre si
   * sceglie e si scrive. Le righe sono quelle dell'email vera (chi, recapito, cosa serve,
   * messaggio, da dove arrivi): niente che non esista davvero. In forma `compact` (telefono)
   * e' una riga che si apre con un tocco.
   *
   * Quando una riga cambia si illumina e sfuma (uno strato che cambia `opacity`, dopo una piccola pausa nella scrittura: non a ogni
   * tasto). Niente cambia altezza: la frase di stato ha lo spazio di due righe.
   */
  import { buildBrief, missingFields, type ContactFlow } from '$lib/contact/flow';
  import { CONTACT } from '$lib/data/contact';
  import { FIELD_LABEL } from '$lib/utils/contact-validation';

  export let flow: ContactFlow;
  export let compact = false;
  let className = '';
  export { className as class };

  $: rows = buildBrief($flow);
  $: missing = missingFields($flow.fields);
  $: sent = $flow.status === 'sent';
  $: summary = rows.find((r) => r.key === 'service')?.value || 'da compilare';
  $: statusText = sent
    ? 'Inviata: la stanno leggendo.'
    : missing.length
      ? `Per inviarla manca: ${missing.map((f) => FIELD_LABEL[f].toLowerCase()).join(' e ')}.`
      : `Pronta. La leggono ${CONTACT.recipients}.`;
  /** Una riga vuota invita a compilarla; dopo l'invio non c'e' piu' niente da compilare, e lo dice. */
  const placeholder = (hint: string, wasSent: boolean) => (wasSent ? 'Non indicato' : hint || '—');

  /** Evidenzia la riga quando il suo valore cambia: subito se la scelta e' discreta (una pastiglia), dopo una pausa se si sta scrivendo. */
  function flash(node: HTMLElement, p: { v: string; wait: number }) {
    let prev = p.v;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const run = () => {
      node.classList.remove('is-flash');
      void node.offsetWidth;
      node.classList.add('is-flash');
    };
    return {
      update(next: { v: string; wait: number }) {
        if (next.v === prev) return;
        prev = next.v;
        clearTimeout(timer);
        if (!next.v) return;
        if (next.wait === 0) run();
        else timer = setTimeout(run, next.wait);
      },
      destroy: () => clearTimeout(timer),
    };
  }
</script>

{#if compact}
  <details class="cbf cbf--compact {className}">
    <summary>
      <span class="cbf__tag">La tua richiesta</span>
      <span class="cbf__sum">{summary}</span>
      <svg class="cbf__chev" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
    </summary>
    <div class="cbf__doc">
      <dl>
        {#each rows as r (r.key)}
          <div class="cbf__row" class:is-empty={r.empty} use:flash={{ v: r.value, wait: r.key === 'service' ? 0 : 350 }}>
            <dt>{r.label}</dt>
            <dd>{r.empty ? placeholder(r.hint, sent) : r.value}</dd>
          </div>
        {/each}
      </dl>
      <p class="cbf__status" class:is-ok={sent || missing.length === 0}>{statusText}</p>
    </div>
  </details>
{:else}
  <section class="cbf cbf--panel {className}" aria-label="La tua richiesta, come la riceve il team">
    <header class="cbf__head">
      <span class="cbf__tag">La tua richiesta</span>
      <span class="cbf__code" class:is-set={$flow.reference}>{$flow.reference || 'Bozza'}</span>
    </header>
    <dl>
      {#each rows as r (r.key)}
        <div class="cbf__row" class:is-empty={r.empty} use:flash={{ v: r.value, wait: r.key === 'service' ? 0 : 350 }}>
          <dt>{r.label}</dt>
          <dd>{r.empty ? placeholder(r.hint, sent) : r.value}</dd>
        </div>
      {/each}
    </dl>
    <p class="cbf__status" class:is-ok={sent || missing.length === 0} aria-live="polite">{statusText}</p>
    <p class="cbf__note">Questo è ciò che leggono {CONTACT.recipients}. Rispondiamo {CONTACT.reply}.</p>
  </section>
{/if}

<style>
  .cbf {
    min-width: 0;
    border: 1px solid var(--border-color);
    border-radius: var(--cx-r-m);
    background: var(--bg-tertiary);
    color: var(--text-primary);
  }
  .cbf--panel { padding: var(--cx-4) var(--cx-5) var(--cx-5); position: relative; overflow: hidden; }
  .cbf--panel::before {
    content: '';
    position: absolute;
    inset: 0 auto 0 0;
    width: 3px;
    background: linear-gradient(to bottom, var(--brand-pink), transparent 85%);
  }

  .cbf__head, .cbf--compact summary { display: flex; align-items: center; gap: var(--cx-3); }
  .cbf__head { justify-content: space-between; margin-bottom: var(--cx-1); }
  .cbf__tag { font-family: var(--font-label); font-size: 0.78rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-secondary); }
  .cbf__code {
    font-family: var(--font-label);
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    font-variant-numeric: tabular-nums;
    padding: 0.15rem var(--cx-3);
    border-radius: 999px;
    border: 1px dashed var(--border-color);
    color: var(--cx-muted);
  }
  .cbf__code.is-set { border-style: solid; border-color: var(--brand-pink); color: var(--cx-soft-ink); background: var(--brand-pink-soft); }

  dl { margin: 0; }
  .cbf__row { position: relative; isolation: isolate; display: grid; grid-template-columns: 6.2rem minmax(0, 1fr); gap: var(--cx-1) var(--cx-4); padding: var(--cx-3) 0; border-top: 1px solid var(--border-color); font-size: 0.95rem; line-height: 1.45; }
  .cbf__row:first-child { border-top: 0; }
  dt { font-family: var(--font-label); font-size: 0.76rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--cx-muted); padding-top: 0.12rem; }
  dd { margin: 0; min-width: 0; overflow-wrap: anywhere; white-space: pre-wrap; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 5; line-clamp: 5; overflow: hidden; }
  .cbf__row.is-empty dd { color: var(--cx-muted); font-style: italic; }

  /* la riga cambiata: uno strato rosa che si accende e sfuma (solo opacity), dietro al testo */
  .cbf__row::after { content: ''; position: absolute; inset: 0 calc(-1 * var(--cx-2)); z-index: -1; border-radius: var(--cx-r-s); background: var(--brand-pink-soft); opacity: 0; pointer-events: none; }
  .cbf__row:global(.is-flash)::after { animation: cbf-flash 0.9s ease-out; }
  @keyframes cbf-flash { from { opacity: 1; } to { opacity: 0; } }

  .cbf__status { margin: var(--cx-2) 0 0; min-height: 2.8em; font-size: 0.88rem; line-height: 1.4; color: var(--text-secondary); }
  .cbf__status.is-ok { color: var(--cx-ok); }
  .cbf__note { margin: var(--cx-2) 0 0; font-size: 0.82rem; line-height: 1.45; color: var(--cx-muted); }

  /* riga che si apre (telefono e tablet) */
  .cbf--compact { overflow: hidden; }
  .cbf--compact summary { min-height: 2.9rem; padding: 0 var(--cx-4); cursor: pointer; list-style: none; touch-action: manipulation; -webkit-tap-highlight-color: transparent; }
  .cbf--compact summary::-webkit-details-marker { display: none; }
  .cbf--compact summary:focus-visible { outline: 2px solid var(--focus-ring); outline-offset: -2px; border-radius: var(--cx-r-m); }
  .cbf__sum { flex: 1; min-width: 0; font-size: 0.92rem; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .cbf__chev { flex: none; color: var(--cx-muted); transition: transform 0.24s var(--cx-ease); }
  .cbf--compact[open] .cbf__chev { transform: rotate(180deg); }
  .cbf__doc { padding: 0 var(--cx-4) var(--cx-3); }
  .cbf--compact .cbf__row { grid-template-columns: 5.4rem minmax(0, 1fr); }

  @media (prefers-reduced-motion: reduce) {
    .cbf__row:global(.is-flash)::after { animation: none; }
    .cbf__chev { transition: none; }
  }
</style>
