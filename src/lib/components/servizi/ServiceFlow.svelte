<script lang="ts">
  import '../progetti/tokens.css';
  import type { PageModel } from './types';

  /** In fondo a ogni pagina di servizio: la stessa uscita delle schede progetto (prossimo, precedente, elenco). */
  export let flow: PageModel['flow'];
  export let accent: [string, string];

  $: next = flow.next;
  $: na = next.accent ?? accent;
</script>

<a class="next" href={next.href} style="--a:{na[0]}; --b:{na[1]}">
  <span class="next__bg" aria-hidden="true"></span>
  <span class="section-container next__in">
    <span class="next__kicker">{flow.nextKicker}</span>
    <span class="next__row">
      <span class="next__name">{next.name}</span>
      <span class="next__arrow" aria-hidden="true">→</span>
    </span>
    {#if next.sub}<span class="next__sub">{next.sub}</span>{/if}
  </span>
</a>

<nav class="bar" aria-label="Spostarsi fra i servizi" style="--a:{accent[0]}">
  <div class="section-container bar__in">
    {#if flow.prev}
      <a class="bar__link" href={flow.prev.href}><span aria-hidden="true">←</span><span><small>Precedente</small><br />{flow.prev.name}</span></a>
    {:else}
      <span></span>
    {/if}
    <a class="bar__link" href={flow.all.href}>{flow.all.label} <span aria-hidden="true">↗</span></a>
  </div>
</nav>

<style>
  .next {
    position: relative;
    display: block;
    overflow: hidden;
    isolation: isolate;
    padding: clamp(3.2rem, 7vw, 5rem) 0;
    color: #fff;
    text-decoration: none;
    background: #050505;
  }
  .next__bg { position: absolute; inset: 0; z-index: -1; background: linear-gradient(120deg, color-mix(in srgb, var(--a) 70%, #050505), color-mix(in srgb, var(--b) 80%, #050505)); transition: filter 0.4s; }
  .next:hover .next__bg { filter: brightness(1.15) saturate(1.1); }
  .next__in { display: flex; flex-direction: column; gap: 0.9rem; }
  .next__kicker { font: 600 0.78rem/1 ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(255, 255, 255, 0.85); }
  .next__row { display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
  .next__name { font-weight: var(--pg-display-weight); font-size: clamp(2.4rem, 8vw, 6.5rem); line-height: 0.95; letter-spacing: var(--pg-display-tracking); text-wrap: balance; overflow-wrap: anywhere; }
  .next__arrow { flex: none; font-size: clamp(2rem, 6vw, 4.5rem); transition: transform 0.35s cubic-bezier(0.2, 0.9, 0.2, 1); }
  .next:hover .next__arrow { transform: translateX(14px); }
  .next:focus-visible { outline: 3px solid #fff; outline-offset: -6px; }
  .next__sub { font: 500 0.8rem/1.4 ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255, 255, 255, 0.85); }

  .bar { background: var(--bg-primary); border-bottom: 1px solid var(--border-color); }
  .bar__in { display: flex; flex-wrap: wrap; align-items: stretch; justify-content: space-between; gap: 0.5rem 1.5rem; }
  .bar__link { display: inline-flex; align-items: center; gap: 0.6rem; min-height: 3.4rem; color: var(--text-secondary); font-size: 0.92rem; font-weight: 600; text-decoration: none; transition: color 0.25s; }
  .bar__link:hover { color: var(--text-primary); }
  .bar__link:focus-visible { outline: 2px solid var(--a); outline-offset: 2px; border-radius: 0.4rem; }
  .bar__link small { font: 500 0.7rem/1 ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-muted); }

  @media (prefers-reduced-motion: reduce) { .next__arrow, .bar__link, .next__bg { transition: none; } }
</style>
