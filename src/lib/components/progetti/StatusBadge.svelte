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

  .sb--compact {
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
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--c) 70%, transparent);
    flex: none;
  }

  .sb--store .sb__dot,
  .sb--live .sb__dot {
    animation: sb-pulse 2.4s ease-out infinite;
  }

  @keyframes sb-pulse {
    0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--c) 65%, transparent); }
    70%, 100% { box-shadow: 0 0 0 0.55rem transparent; }
  }

  @media (prefers-reduced-motion: reduce) {
    .sb__dot { animation: none !important; }
  }
</style>
