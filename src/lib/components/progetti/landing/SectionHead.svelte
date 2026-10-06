<script lang="ts">
  import { reveal } from './actions';

  export let kicker: string;
  export let title: string;
  export let highlight: string | undefined = undefined;
  export let lead: string | undefined = undefined;
  /** Titolo centrato (infografica, demo) oppure a sinistra (capitoli). */
  export let align: 'left' | 'center' = 'left';

  $: parts = highlight && title.includes(highlight) ? title.split(highlight) : null;
</script>

<header class="sh sh--{align} lp-reveal" use:reveal>
  <p class="lp-kicker">{kicker}</p>
  <h2 class="lp-title">
    {#if parts}{parts[0]}<span class="lp-hl">{highlight}</span>{parts.slice(1).join(highlight)}{:else}{title}{/if}
  </h2>
  {#if lead}<p class="lp-lead">{lead}</p>{/if}
</header>

<style>
  .sh { display: flex; flex-direction: column; gap: 1rem; align-items: flex-start; }
  .sh--center { align-items: center; text-align: center; margin-inline: auto; max-width: 48rem; }
  .sh--center .lp-lead { margin-inline: auto; }
</style>
