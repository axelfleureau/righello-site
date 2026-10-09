<script lang="ts">
  import { page } from '$app/stores';
  import MagneticButton from '$lib/components/MagneticButton.svelte';
  import { COMPANY } from '$lib/data/site';

  $: notFound = $page.status === 404;
  $: title = notFound ? 'Pagina non trovata' : 'Qualcosa non ha funzionato';
  $: lead = notFound
    ? 'L’indirizzo non esiste più o è stato spostato. Da qui puoi ripartire da una di queste pagine.'
    : 'Il problema è nostro, non tuo. Riprova fra qualche istante, oppure riparti da una di queste pagine.';

  // Dove si puo' andare da qui: le pagine che portano a un risultato, in ordine di utilita'.
  const ways = [
    { href: '/progetti', label: 'Cosa abbiamo costruito', note: 'App, gestionali e siti' },
    { href: '/servizi', label: 'Di cosa ci occupiamo', note: 'Marketing, advertising, web, AI' },
    { href: '/contatti', label: 'Scrivici', note: 'Rispondiamo entro 72 ore' },
  ];
</script>

<svelte:head>
  <title>{title} | Righello</title>
  <meta name="robots" content="noindex, nofollow" />
  <meta name="googlebot" content="noindex, nofollow" />
</svelte:head>

<section class="err">
  <div class="section-container err__inner">
    <p class="err__code" aria-hidden="true">{$page.status}</p>
    <h1 class="err__title">{title}</h1>
    <p class="err__lead">{lead}</p>

    <div class="err__actions">
      <MagneticButton href="/" variant="primary">Torna alla home</MagneticButton>
      <MagneticButton href="/progetti" variant="secondary">Vedi i progetti</MagneticButton>
    </div>

    <ul class="err__ways">
      {#each ways as way}
        <li>
          <a href={way.href} class="err__way">
            <span class="err__way-label">{way.label}</span>
            <span class="err__way-note">{way.note}</span>
          </a>
        </li>
      {/each}
    </ul>

    <p class="err__mail">
      Cercavi qualcosa di preciso? Scrivi a <a href="mailto:{COMPANY.email}">{COMPANY.email}</a>.
    </p>
  </div>
</section>

<style>
  .err {
    display: flex;
    align-items: center;
    min-height: 70vh;
    padding: 8rem 0 4rem;
    text-align: center;
  }

  .err__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .err__code {
    margin: 0 0 0.5rem;
    font-size: clamp(5rem, 22vw, 9rem);
    font-weight: 700;
    line-height: 1;
    letter-spacing: -0.02em;
    color: var(--brand-pink-ink);
  }

  .err__title {
    margin: 0 0 1rem;
    font-size: clamp(1.75rem, 5vw, 2.5rem);
    font-weight: 700;
    line-height: 1.1;
    color: var(--text-primary);
  }

  .err__lead {
    max-width: 34rem;
    margin: 0 0 2rem;
    font-size: 1.0625rem;
    color: var(--text-secondary);
  }

  .err__actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.75rem;
    margin-bottom: 3rem;
  }

  .err__ways {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.75rem;
    width: 100%;
    max-width: 46rem;
    margin: 0 0 2rem;
    padding: 0;
    list-style: none;
  }

  .err__way {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    height: 100%;
    min-height: 44px;
    padding: 1rem 1.125rem;
    text-align: left;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 1rem;
    transition: border-color 0.2s ease, background 0.2s ease;
  }

  .err__way-label {
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary);
  }

  .err__way-note {
    font-size: 0.875rem;
    line-height: 1.4;
    color: var(--text-secondary);
  }

  @media (hover: hover) {
    .err__way:hover {
      border-color: var(--brand-pink-ink);
      background: var(--brand-pink-soft);
    }
  }

  .err__mail {
    margin: 0;
    font-size: 0.9375rem;
    color: var(--text-secondary);
  }

  .err__mail a {
    color: var(--brand-pink-ink);
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  @media (max-width: 640px) {
    .err {
      padding-top: 6.5rem;
    }

    .err__ways {
      grid-template-columns: 1fr;
    }
  }
</style>
