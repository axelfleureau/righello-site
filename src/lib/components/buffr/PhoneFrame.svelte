<script lang="ts">
  /** Cornice iPhone che scala con la propria larghezza: dentro si usa l'unità cqw. */
  export let label = '';
  /** Le schermate vere hanno già la Dynamic Island disegnata; i mockup no. */
  export let island = true;
</script>

<div class="phone" role="img" aria-label={label || undefined} aria-hidden={label ? undefined : 'true'}>
  <div class="phone__body">
    <div class="phone__screen">
      <slot />
      {#if island}<i class="phone__island" aria-hidden="true"></i>{/if}
    </div>
  </div>
</div>

<style>
  .phone {
    container-type: inline-size;
    width: 100%;
    aspect-ratio: 9 / 19.5;
  }

  .phone__body {
    position: relative;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 2.4cqw;
    border-radius: 15.5cqw;
    background: linear-gradient(160deg, #2a2a30, #0e0e11);
    border: 0.3cqw solid rgba(255, 255, 255, 0.18);
    box-shadow:
      0 6cqw 12cqw -2cqw rgba(0, 0, 0, 0.65),
      0 0 0 0.25cqw #000;
  }

  .phone__screen {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 13.2cqw;
    background: #000;
    isolation: isolate;
  }

  .phone__island {
    position: absolute;
    z-index: 5;
    top: 3.2cqw;
    left: 50%;
    width: 31cqw;
    height: 9cqw;
    transform: translateX(-50%);
    border-radius: 999px;
    background: #000;
  }

  .phone__screen :global(img.shot) {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
  }
</style>
