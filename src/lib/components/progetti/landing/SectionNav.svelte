<script lang="ts">
  import { onMount } from 'svelte';

  export let items: Array<{ id: string; label: string }>;
  /** Uscita fissa verso l'elenco: sempre a un tocco, da qualunque punto della pagina. */
  export let back: { href: string; label: string } | null = null;

  let active = items[0]?.id ?? '';
  let rail: HTMLElement;

  /** Centra nel binario (non nella pagina) la voce attiva: su telefono il binario scorre. */
  function follow(id: string) {
    const el = rail?.querySelector<HTMLElement>(`[data-id="${id}"]`);
    if (!el || rail.scrollWidth <= rail.clientWidth) return;
    rail.scrollTo({ left: el.offsetLeft - (rail.clientWidth - el.offsetWidth) / 2, behavior: 'smooth' });
  }

  $: if (rail) follow(active);

  onMount(() => {
    const sections = items.map((i) => document.getElementById(i.id)).filter((s): s is HTMLElement => !!s);
    // La sezione attiva e' quella che attraversa la fascia centrale-alta della finestra.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) active = e.target.id;
        // sopra la prima sezione (hero e numeri) la voce attiva e' la prima
        if (sections[0] && sections[0].getBoundingClientRect().top > window.innerHeight * 0.35) active = items[0].id;
      },
      { rootMargin: '-35% 0px -60% 0px' }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  });
</script>

<nav class="sn" aria-label="Sezioni della pagina">
  <div class="sn__rail" bind:this={rail}>
    {#if back}<a class="sn__back" href={back.href} aria-label={`Torna all'elenco: ${back.label}`}><span aria-hidden="true">←</span> {back.label}</a>{:else}<span class="sn__jump" aria-hidden="true">Vai a</span>{/if}
    {#each items as item}
      <a
        href={`#${item.id}`}
        data-id={item.id}
        class="sn__item"
        class:is-active={active === item.id}
        aria-current={active === item.id ? 'true' : undefined}
        on:click={() => (active = item.id)}>{item.label}</a>
    {/each}
  </div>
</nav>

<style>
  .sn {
    position: sticky;
    top: var(--lp-nav-top);
    z-index: 20;
    display: flex;
    justify-content: center;
    padding: 0.8rem 1rem;
    pointer-events: none;
  }

  .sn__rail {
    pointer-events: auto;
    display: flex;
    align-items: center;
    gap: 0.2rem;
    max-width: 100%;
    padding: 0.3rem;
    overflow-x: auto;
    scrollbar-width: none;
    border: 1px solid var(--lp-line-strong);
    border-radius: 999px;
    background: rgba(12, 12, 16, 0.94);
    box-shadow: 0 14px 40px -12px rgba(0, 0, 0, 0.8);
  }
  .sn__rail::-webkit-scrollbar { display: none; }

  .sn__jump {
    flex: none;
    padding: 0 0.7rem 0 0.9rem;
    font: 500 0.66rem/1 var(--lp-mono);
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--lp-ink-3);
  }

  @media (max-width: 640px) { .sn__jump { display: none; } }

  .sn__item {
    flex: none;
    display: inline-flex;
    align-items: center;
    min-height: 2.75rem;
    padding: 0 1rem;
    border-radius: 999px;
    font-size: 0.86rem;
    font-weight: 600;
    white-space: nowrap;
    color: var(--lp-ink-2);
    text-decoration: none;
    transition: background-color 0.25s, color 0.25s;
  }

  .sn__back {
    flex: none;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    min-height: 2.75rem;
    padding: 0 0.9rem 0 0.8rem;
    margin-right: 0.15rem;
    border-radius: 999px;
    border-right: 1px solid var(--lp-line-strong);
    font-size: 0.82rem;
    font-weight: 600;
    white-space: nowrap;
    color: var(--lp-ink-3);
    text-decoration: none;
    transition: color 0.25s;
  }

  .sn__back:hover { color: var(--lp-ink); }
  .sn__item:hover { color: var(--lp-ink); }
  .sn__item.is-active { background: #fff; color: #0a0a0a; }
</style>
