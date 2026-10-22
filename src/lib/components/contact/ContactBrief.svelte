<script lang="ts">
  /**
   * Il brief in diretta: il documento che il team riceve, ordinato, che si compila mentre si
   * sceglie e si scrive. Le righe sono quelle dell'email vera (chi, recapito, cosa serve,
   * messaggio, da dove arrivi): niente che non esista davvero. In forma `compact` (telefono)
   * e' una riga che si apre con un tocco.
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
          <div class="cbf__row" class:is-empty={r.empty}>
            <dt>{r.label}</dt>
            <dd>{r.empty ? r.hint || '—' : r.value}</dd>
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
        <div class="cbf__row" class:is-empty={r.empty}>
          <dt>{r.label}</dt>
          {#key r.empty}
            <dd class:cbf__fill={!r.empty}>{r.empty ? r.hint || '—' : r.value}</dd>
          {/key}
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
    border-radius: 1.1rem;
    background: var(--bg-tertiary);
    color: var(--text-primary);
  }
  .cbf--panel { padding: 1.1rem 1.2rem 1.2rem; position: relative; overflow: hidden; }
  .cbf--panel::before {
    content: '';
    position: absolute;
    inset: 0 auto 0 0;
    width: 3px;
    background: linear-gradient(to bottom, var(--brand-pink), transparent 85%);
  }

  .cbf__head, .cbf--compact summary { display: flex; align-items: center; gap: 0.6rem; }
  .cbf__head { justify-content: space-between; margin-bottom: 0.3rem; }
  .cbf__tag { font-family: var(--font-label); font-size: 0.78rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-secondary); }
  .cbf__code {
    font-family: var(--font-label);
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    padding: 0.15rem 0.6rem;
    border-radius: 999px;
    border: 1px dashed var(--border-color);
    color: var(--text-muted);
  }
  .cbf__code.is-set { border-style: solid; border-color: var(--brand-pink); color: var(--brand-pink-ink); background: var(--brand-pink-soft); }

  dl { margin: 0; }
  .cbf__row { display: grid; grid-template-columns: 6.2rem minmax(0, 1fr); gap: 0.2rem 0.9rem; padding: 0.65rem 0; border-top: 1px solid var(--border-color); font-size: 0.95rem; line-height: 1.45; }
  .cbf__row:first-child { border-top: 0; }
  dt { font-family: var(--font-label); font-size: 0.76rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-muted); padding-top: 0.12rem; }
  dd { margin: 0; min-width: 0; overflow-wrap: anywhere; white-space: pre-wrap; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 5; line-clamp: 5; overflow: hidden; }
  .cbf__row.is-empty dd { color: var(--text-muted); font-style: italic; }

  .cbf__status { margin: 0.5rem 0 0; font-size: 0.88rem; line-height: 1.4; color: var(--text-secondary); }
  .cbf__status.is-ok { color: #16a34a; }
  :global([data-theme='dark']) .cbf__status.is-ok { color: #4ade80; }
  .cbf__note { margin: 0.5rem 0 0; font-size: 0.82rem; line-height: 1.45; color: var(--text-muted); }

  /* riga che si apre (telefono e tablet) */
  .cbf--compact { overflow: hidden; }
  .cbf--compact summary { min-height: 2.9rem; padding: 0 0.95rem; cursor: pointer; list-style: none; touch-action: manipulation; -webkit-tap-highlight-color: transparent; }
  .cbf--compact summary::-webkit-details-marker { display: none; }
  .cbf--compact summary:focus-visible { outline: 2px solid var(--focus-ring); outline-offset: -2px; border-radius: 1.1rem; }
  .cbf__sum { flex: 1; min-width: 0; font-size: 0.92rem; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .cbf__chev { flex: none; color: var(--text-muted); transition: transform 0.2s ease; }
  .cbf--compact[open] .cbf__chev { transform: rotate(180deg); }
  .cbf__doc { padding: 0 0.95rem 0.85rem; }

  .cbf__fill { animation: cbf-fill 0.5s ease-out; }
  @keyframes cbf-fill { from { background: var(--brand-pink-soft); box-shadow: 0 0 0 0.3rem var(--brand-pink-soft); border-radius: 0.3rem; } to { background: transparent; box-shadow: 0 0 0 0.3rem transparent; } }

  @media (prefers-reduced-motion: reduce) {
    .cbf__fill { animation: none; }
    .cbf__chev { transition: none; }
  }
</style>
