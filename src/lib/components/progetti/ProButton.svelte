<script lang="ts">
  /**
   * Il pulsante di tutta la pagina Progetti (una sola definizione).
   *  - primary: rosa Righello, l'azione principale
   *  - solid:   bianco pieno, per le isole scure (vetrina, schede)
   *  - ghost:   solo bordo, prende il colore del testo attorno: vale su scuro e su chiaro
   * Riferimenti Mobbin: Square, Intercom, Flora (coppia pieno + contorno, freccia che scorre).
   */
  export let href = '';
  export let variant: 'primary' | 'solid' | 'ghost' = 'primary';
  export let arrow: 'none' | 'right' | 'up-right' = 'none';
  export let external = false;
  export let size: 'md' | 'lg' = 'md';
  export let label = '';
</script>

<svelte:element
  this={href ? 'a' : 'button'}
  class="pb pb--{variant} pb--{size}"
  href={href || undefined}
  type={href ? undefined : 'button'}
  target={href && external ? '_blank' : undefined}
  rel={href && external ? 'noopener noreferrer' : undefined}
  aria-label={label || undefined}
  on:click
>
  <span class="pb__text"><slot /></span>
  {#if arrow !== 'none'}
    <svg class="pb__arrow pb__arrow--{arrow}" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
      {#if arrow === 'right'}
        <path d="M3 8h9.5M8.5 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
      {:else}
        <path d="M4.5 11.5l7-7M5.5 4.5h6v6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
      {/if}
    </svg>
  {/if}
</svelte:element>

<style>
  .pb {
    --ring: var(--a, #d6487e);
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    min-height: 3rem;
    padding: 0 1.5rem;
    border: 1px solid transparent;
    border-radius: 999px;
    font: inherit;
    font-size: 0.95rem;
    font-weight: 600;
    line-height: 1;
    letter-spacing: 0.005em;
    text-decoration: none;
    white-space: nowrap;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
    transition:
      transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1),
      background-color 0.2s,
      border-color 0.2s,
      color 0.2s,
      box-shadow 0.2s;
  }

  .pb--lg { min-height: 3.4rem; padding: 0 1.9rem; font-size: 1rem; }

  /* rosa Righello: pieno, con una luce morbida che si accende al passaggio */
  .pb--primary {
    background: #d6487e;
    color: #fff;
    box-shadow: 0 8px 22px -10px rgba(214, 72, 126, 0.7);
  }

  .pb--primary:hover { background: #e0558a; box-shadow: 0 12px 28px -10px rgba(214, 72, 126, 0.85); }

  /* bianco pieno (isole scure) */
  .pb--solid { background: #fff; color: #0a0a0a; }
  .pb--solid:hover { background: color-mix(in srgb, var(--a, #d6487e) 20%, #fff); }

  /* solo contorno: eredita il colore del contesto */
  .pb--ghost {
    background: transparent;
    color: inherit;
    border-color: color-mix(in srgb, currentColor 32%, transparent);
  }

  .pb--ghost:hover {
    border-color: currentColor;
    background: color-mix(in srgb, currentColor 8%, transparent);
  }

  .pb:hover { transform: translateY(-1px); }
  .pb:active { transform: translateY(0) scale(0.975); transition-duration: 0.08s; }

  .pb:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px var(--bg-primary, #000), 0 0 0 4px var(--ring);
  }

  .pb[disabled],
  .pb[aria-disabled='true'] { opacity: 0.45; pointer-events: none; }

  .pb__arrow { flex: none; transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1); }
  .pb:hover .pb__arrow--right { transform: translateX(3px); }
  .pb:hover .pb__arrow--up-right { transform: translate(2px, -2px); }

  @media (prefers-reduced-motion: reduce) {
    .pb, .pb__arrow { transition: none; }
    .pb:hover, .pb:active { transform: none; }
  }
</style>
