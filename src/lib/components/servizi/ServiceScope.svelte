<script lang="ts">
  import SectionHead from '../progetti/landing/SectionHead.svelte';
  import Icon from '../progetti/landing/Icon.svelte';
  import { reveal } from '../progetti/landing/actions';
  import type { Heading, ScopeItem } from './types';

  export let id: string;
  export let head: Heading;
  export let items: ScopeItem[];
  export let tone = 0;
  /** Schede (le attivita' di un servizio) oppure righe numerate (i servizi, nell'indice). */
  export let layout: 'cards' | 'rows' = 'cards';
</script>

<section {id} class="ss lp-section" class:lp-tone-alt={tone % 2 === 1}>
  <div class="section-container">
    <SectionHead kicker={head.kicker} title={head.title} highlight={head.highlight} lead={head.lead} />
    {#if layout === 'rows'}
      <ol class="rw">
        {#each items as it, k (it.title)}
          <li class="rw__row lp-reveal" use:reveal={(k % 4) * 60} style="--a:{it.accent?.[0]}; --b:{it.accent?.[1]}">
            <a class="rw__link" href={it.href}>
              <span class="rw__n" aria-hidden="true">{String(k + 1).padStart(2, '0')}</span>
              <div class="rw__main">
                {#if it.tagline}<p class="rw__tag">{it.tagline}</p>{/if}
                <h3 class="rw__name">{it.title}</h3>
                <p class="rw__text">{it.text}</p>
              </div>
              {#if it.bullets?.length}
                <ul class="rw__bul">{#each it.bullets as b}<li>{b}</li>{/each}</ul>
              {/if}
              <span class="rw__go" aria-hidden="true">→</span>
            </a>
          </li>
        {/each}
      </ol>
    {:else}
    <ul class="ss__grid" data-n={items.length}>
      {#each items as it, k (it.title)}
        <li class="ss__cell lp-reveal" use:reveal={(k % 3) * 70}>
          <svelte:element this={it.href ? 'a' : 'div'} class="ss__card lp-card" class:ss__card--link={!!it.href} href={it.href}>
            <span class="ss__head">
              {#if it.icon}<span class="ss__icon"><Icon name={it.icon} size={22} /></span>{/if}
              <h3>{it.title}</h3>
            </span>
            <p>{it.text}</p>
            {#if it.terms?.length}
              <ul class="ss__terms" aria-label="Parole chiave">
                {#each it.terms as t}<li>{t}</li>{/each}
              </ul>
            {/if}
            {#if it.href}<span class="ss__go" aria-hidden="true">→</span>{/if}
          </svelte:element>
        </li>
      {/each}
    </ul>
    {/if}
  </div>
</section>

<style>
  /* ---------- righe numerate (indice dei servizi) ---------- */
  .rw { margin: clamp(2rem, 4.5vw, 3rem) 0 0; padding: 0; list-style: none; border-bottom: 1px solid var(--lp-line-strong); }
  .rw__row { border-top: 1px solid var(--lp-line-strong); }

  .rw__link {
    position: relative;
    display: grid;
    gap: 0.9rem 1.6rem;
    grid-template-columns: 2.2rem minmax(0, 1fr) 2rem;
    padding: clamp(1.4rem, 2.6vw, 2rem) 0;
    color: inherit;
    text-decoration: none;
  }
  .rw__n { grid-row: 1; padding-top: 0.35rem; font: 600 0.78rem/1 var(--lp-mono); letter-spacing: 0.1em; color: var(--lp-pink); }
  .rw__main { grid-column: 2; display: flex; flex-direction: column; gap: 0.45rem; min-width: 0; }
  .rw__main > * { margin: 0; }
  .rw__tag { font: 600 0.7rem/1.3 var(--lp-mono); letter-spacing: 0.14em; text-transform: uppercase; color: color-mix(in srgb, var(--a) 70%, #fff); }
  .rw__main .rw__name { font-weight: var(--pg-display-weight); font-size: clamp(1.6rem, 2.6vw, 2.2rem); line-height: 1.05; letter-spacing: var(--pg-display-tracking); }
  .rw__text { max-width: 34rem; font-size: 0.96rem; line-height: 1.55; color: var(--lp-ink-2); text-wrap: pretty; }
  .rw__bul { grid-column: 2; margin: 0; padding: 0; list-style: none; display: grid; gap: 0.5rem 1.4rem; grid-template-columns: repeat(2, minmax(0, 1fr)); align-content: start; }
  .rw__bul li { position: relative; padding-left: 1rem; font-size: 0.9rem; line-height: 1.35; color: var(--lp-ink-2); }
  .rw__bul li::before { content: ''; position: absolute; left: 0; top: 0.5em; width: 0.4rem; height: 0.4rem; border-radius: 50%; background: linear-gradient(135deg, var(--a), var(--b)); }
  .rw__go { grid-column: 3; grid-row: 1; align-self: start; padding-top: 0.2rem; font-size: 1.5rem; color: var(--lp-ink-3); transition: transform 0.3s var(--lp-ease), color 0.3s; }
  .rw__link:hover .rw__go { transform: translateX(4px); color: #fff; }
  .rw__link:hover .rw__name { color: color-mix(in srgb, var(--a) 40%, #fff); }
  .rw__link:focus-visible { outline-offset: 6px; border-radius: 0.5rem; }

  @media (max-width: 639px) { .rw__bul li:nth-child(n + 5) { display: none; } .rw__bul { grid-template-columns: 1fr; gap: 0.4rem; } }

  @media (min-width: 1000px) {
    .rw__link { grid-template-columns: 3rem minmax(0, 5fr) minmax(0, 5fr) 2.4rem; align-items: start; padding-block: 1.7rem; }
    .rw__bul { grid-column: 3; grid-row: 1; padding-top: 0.5rem; }
    .rw__go { grid-column: 4; }
  }

  /* ---------- schede (attivita' di un servizio, pagine di agenzia) ---------- */
  .ss__grid {
    margin: clamp(2rem, 4.5vw, 3rem) 0 0;
    padding: 0;
    list-style: none;
    display: grid;
    gap: var(--lp-gap);
    grid-template-columns: minmax(0, 1fr);
  }
  @media (min-width: 640px) { .ss__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  /* sei voci in 3x2, nove in 3x3; quattro e cinque restano in due colonne (mai una riga a meta') */
  @media (min-width: 1000px) {
    .ss__grid[data-n='6'], .ss__grid[data-n='3'], .ss__grid[data-n='9'] { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  }

  .ss__cell { min-width: 0; display: flex; }

  .ss__card {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    width: 100%;
    padding: clamp(1.3rem, 2.2vw, 1.8rem);
    color: inherit;
    text-decoration: none;
    transition: transform 0.35s var(--lp-ease), border-color 0.35s;
  }
  .ss__card--link:hover { transform: translateY(-3px); border-color: color-mix(in srgb, var(--a) 70%, var(--lp-line-strong)); }

  .ss__icon {
    display: grid;
    place-items: center;
    width: 2.8rem;
    height: 2.8rem;
    border-radius: 0.85rem;
    color: #fff;
    background: linear-gradient(135deg, color-mix(in srgb, var(--a) 70%, #000), color-mix(in srgb, var(--b) 80%, #000));
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.14);
  }

  .ss__head { display: flex; flex-direction: column; gap: 0.7rem; }
  @media (max-width: 639px) { .ss__head { flex-direction: row; align-items: center; gap: 0.9rem; } .ss__card { gap: 0.6rem; padding: 1.1rem 1.2rem; } }
  .ss__card h3 { margin: 0.2rem 0 0; font-weight: var(--pg-display-weight); font-size: 1.25rem; line-height: 1.15; letter-spacing: var(--pg-display-tracking); }
  .ss__card p { margin: 0; font-size: 0.96rem; line-height: 1.55; color: var(--lp-ink-2); text-wrap: pretty; }

  .ss__terms { display: flex; flex-wrap: wrap; gap: 0.4rem; margin: 0.4rem 0 0; padding: 0; list-style: none; }
  .ss__terms li { padding: 0.3rem 0.7rem; border: 1px solid var(--lp-line-strong); border-radius: 999px; font: 500 0.7rem/1.2 var(--lp-mono); letter-spacing: 0.04em; color: var(--lp-ink-2); }

  .ss__go { margin-top: auto; padding-top: 0.6rem; font-size: 1.2rem; color: var(--lp-ink-3); transition: transform 0.3s var(--lp-ease), color 0.3s; }
  .ss__card--link:hover .ss__go { transform: translateX(4px); color: #fff; }

  @media (prefers-reduced-motion: reduce) {
    .ss__card, .ss__go, .rw__go { transition: none; }
  }
</style>
