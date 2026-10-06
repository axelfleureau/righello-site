<script lang="ts">
  import type { CaseStudy } from '$lib/data/case-studies';

  export let study: Pick<CaseStudy, 'name' | 'icon' | 'accent'>;
  export let size = 56;

  $: initial = study.name.trim().charAt(0).toUpperCase();
</script>

{#if study.icon}
  <img
    class="pi"
    src={study.icon}
    alt=""
    width={size}
    height={size}
    loading="lazy"
    decoding="async"
    style="--s:{size}px"
  />
{:else}
  <span
    class="pi pi--initial"
    aria-hidden="true"
    style="--s:{size}px; background: linear-gradient(135deg, {study.accent[0]}, {study.accent[1]})"
  >{initial}</span>
{/if}

<style>
  .pi {
    display: inline-block;
    width: var(--s);
    height: var(--s);
    flex: none;
    border-radius: 22.37%;
    object-fit: cover;
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.12), 0 8px 24px rgba(0, 0, 0, 0.35);
  }

  .pi--initial {
    display: inline-grid;
    place-items: center;
    color: #fff;
    font-weight: var(--pg-display-weight);
    font-size: calc(var(--s) * 0.46);
    letter-spacing: -0.02em;
  }
</style>
