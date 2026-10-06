<script lang="ts">
  /**
   * Cornice iPhone unica per tutta la pagina Progetti.
   * Scala con la propria larghezza: dentro tutto è in cqw, quindi si ridimensiona
   * senza toccare nulla. Le schermate vere hanno già la Dynamic Island disegnata.
   */
  export let island = false;
</script>

<div class="phone">
  <i class="phone__btn phone__btn--action" aria-hidden="true"></i>
  <i class="phone__btn phone__btn--up" aria-hidden="true"></i>
  <i class="phone__btn phone__btn--down" aria-hidden="true"></i>
  <i class="phone__btn phone__btn--power" aria-hidden="true"></i>

  <div class="phone__body">
    <div class="phone__screen">
      <slot />
      {#if island}<i class="phone__island" aria-hidden="true"></i>{/if}
      <i class="phone__glare" aria-hidden="true"></i>
    </div>
  </div>
</div>

<style>
  .phone {
    container-type: inline-size;
    position: relative;
    width: 100%;
    aspect-ratio: 9 / 19.5;
  }

  /* telaio in titanio scuro: riflesso sul bordo, nero pieno tra bordo e schermo */
  .phone__body {
    position: relative;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 1.7cqw;
    border-radius: 15cqw;
    background:
      linear-gradient(150deg, #6a6a72 0%, #2b2b30 22%, #111114 55%, #3c3c42 82%, #1a1a1e 100%);
    box-shadow:
      inset 0 0 0 0.35cqw rgba(255, 255, 255, 0.22),
      inset 0 0 0 1.1cqw #060607,
      0 7cqw 14cqw -3cqw rgba(0, 0, 0, 0.7);
  }

  .phone__screen {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 13.4cqw;
    background: #000;
    isolation: isolate;
  }

  .phone__island {
    position: absolute;
    z-index: 3;
    top: 3cqw;
    left: 50%;
    width: 28cqw;
    height: 8.2cqw;
    transform: translateX(-50%);
    border-radius: 999px;
    background: #000;
  }

  /* un solo riflesso diagonale, appena visibile */
  .phone__glare {
    position: absolute;
    inset: 0;
    z-index: 4;
    pointer-events: none;
    background: linear-gradient(118deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 32%);
  }

  .phone__screen :global(img.shot) {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
  }

  /* tasti laterali */
  .phone__btn {
    position: absolute;
    width: 0.9cqw;
    border-radius: 0.5cqw;
    background: linear-gradient(90deg, #3a3a40, #17171a);
  }

  .phone__btn--action { left: -0.7cqw; top: 17%; height: 4%; }
  .phone__btn--up { left: -0.7cqw; top: 24%; height: 7%; }
  .phone__btn--down { left: -0.7cqw; top: 33%; height: 7%; }
  .phone__btn--power { right: -0.7cqw; top: 28%; height: 11%; }
</style>
