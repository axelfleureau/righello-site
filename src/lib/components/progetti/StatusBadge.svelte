<script lang="ts">
  import type { ProjectStatus } from '$lib/data/case-studies';

  export let status: ProjectStatus;
  export let compact = false;
</script>

<span class="sb sb--{status.tone}" class:sb--compact={compact}>
  <i class="sb__dot" aria-hidden="true"></i>
  <span>{status.label}</span>
</span>

<style>
  .sb {
    --c: #9ca3af;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.38rem 0.8rem 0.38rem 0.65rem;
    border-radius: 999px;
    border: 1px solid color-mix(in srgb, var(--c) 45%, transparent);
    background: color-mix(in srgb, var(--c) 12%, transparent);
    color: var(--text-primary);
    font-size: 0.74rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    line-height: 1;
    white-space: nowrap;
  }

  /* la versione compatta sta in righe e schede strette: un'etichetta lunga va a capo invece di spingere fuori la pagina */
  .sb--compact {
    min-width: 0;
    max-width: 100%;
    white-space: normal;
    line-height: 1.25;
    padding: 0;
    border: 0;
    background: none;
    font-weight: 500;
    color: var(--text-secondary);
  }

  .sb--store { --c: #3ddc97; }
  .sb--live { --c: #4cc9f0; }
  .sb--beta { --c: #f5b942; }
  .sb--internal { --c: #9ca3af; }

  .sb__dot {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: var(--c);
    position: relative;
    flex: none;
  }

  /* l'onda è un cerchio che cresce e svanisce: solo transform e opacity, niente repaint */
  .sb--store .sb__dot::after,
  .sb--live .sb__dot::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: var(--c);
    animation: sb-pulse 2.4s ease-out infinite;
  }

  @keyframes sb-pulse {
    0% { transform: scale(1); opacity: 0.6; }
    70%, 100% { transform: scale(3.2); opacity: 0; }
  }

  @media (prefers-reduced-motion: reduce) {
    .sb__dot::after { animation: none !important; display: none; }
  }
</style>
