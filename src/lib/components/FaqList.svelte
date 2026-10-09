<script lang="ts">
  /**
   * Domande e risposte a fisarmonica, una aperta alla volta, funziona anche senza JavaScript.
   * Con `schema` aggiunge il FAQPage JSON-LD dagli stessi dati: testo e markup non possono divergere.
   */
  export let items: Array<{ question: string; answer: string }>;
  export let name = 'faq';
  export let schema = false;

  $: jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({ '@type': 'Question', name: i.question, acceptedAnswer: { '@type': 'Answer', text: i.answer } })),
  }).replace(/</g, '\\u003c');
</script>

<svelte:head>
  {#if schema}{@html `<script type="application/ld+json">${jsonLd}</script>`}{/if}
</svelte:head>

<div class="faq">
  {#each items as item}
    <details class="faq__item" {...{ name }}>
      <summary class="faq__q">
        <span>{item.question}</span>
        <svg class="faq__chev" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
          <path d="M3.5 6l4.5 4.5L12.5 6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </summary>
      <p class="faq__a">{item.answer}</p>
    </details>
  {/each}
</div>

<style>
  .faq { border-top: 1px solid var(--border-color); }
  .faq__item { border-bottom: 1px solid var(--border-color); }

  .faq__q {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    min-height: 3.5rem;
    padding: 0.9rem 0;
    font-weight: 600;
    font-size: 1.02rem;
    line-height: 1.35;
    cursor: pointer;
    list-style: none;
    -webkit-tap-highlight-color: transparent;
  }

  .faq__q::-webkit-details-marker { display: none; }
  .faq__q:focus-visible { outline: 2px solid var(--gradient-start); outline-offset: 2px; border-radius: 0.4rem; }

  .faq__chev { flex: none; color: var(--text-muted); transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1); }
  .faq__item[open] .faq__chev { transform: rotate(180deg); color: var(--gradient-start); }

  .faq__a { padding: 0 2.2rem 1.2rem 0; color: var(--text-secondary); line-height: 1.65; max-width: 62ch; }

  @media (prefers-reduced-motion: reduce) { .faq__chev { transition: none; } }
</style>
