<script lang="ts">
  import InfoIcon from './InfoIcon.svelte';

  /** Chi risponde nella chat. */
  export let title: string;
  export let sub = '';
  /** Colori chiari, come nelle schermate di DICO. */
  export let light = false;
  /** Colore della tematica o del Comune: tinge appena lo sfondo della chat (solo con light). */
  export let tint = '#213a59';
</script>

<!-- Finestra di chat stilizzata, in tinta con WhatsApp ma senza copiarne il marchio. -->
<div class="wa" class:wa--light={light} style="--tint:{tint}">
  <div class="wa__bar">
    <span class="wa__av"><InfoIcon name="shield" /></span>
    <span class="wa__who">
      <b>{title}</b>
      {#if sub}<small>{sub}</small>{/if}
    </span>
    <slot name="action" />
  </div>
  <div class="wa__body"><slot /></div>
</div>

<style>
  .wa {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    border-radius: 0.9rem;
    border: 1px solid var(--line);
    background: #0b141a;
  }

  .wa__bar {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.55rem 0.7rem;
    background: #1f2c34;
  }

  .wa__av {
    flex: none;
    width: 2rem;
    height: 2rem;
    padding: 0.4rem;
    border-radius: 50%;
    background: #f2b83b;
    color: #1e3a5f;
  }

  .wa__who {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    line-height: 1.2;
  }

  .wa__who b {
    font-size: 0.82rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .wa__who small {
    font-size: 0.7rem;
    color: var(--ink2);
  }

  .wa--light {
    border-color: rgba(0, 0, 0, 0.12);
    background: #efeae2;
  }

  .wa--light .wa__bar {
    background: #fff;
    color: #111b21;
  }

  .wa--light .wa__who small {
    color: #667781;
  }

  .wa--light .wa__av {
    background: #213a59;
    color: #fff;
  }

  .wa--light .wa__body {
    background-color: color-mix(in srgb, var(--tint) 6%, #efeae2);
    background-image: none;
  }

  .wa__body {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
    padding: 0.7rem;
    background-image: radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1.4px);
    background-size: 14px 14px;
  }
</style>
