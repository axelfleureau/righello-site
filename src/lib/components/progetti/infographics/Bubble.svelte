<script lang="ts">
  /** 'me' è il cittadino (a destra), 'them' è l'assistente o il messaggio del Comune (a sinistra). */
  export let from: 'me' | 'them' = 'them';
  /** Il fumetto occupa tutta la larghezza (messaggio lungo del Comune). */
  export let wide = false;
  /** Fumetto bianco su fondo chiaro. */
  export let light = false;
  /** Meno spazio attorno al contenuto, per le liste di righe da toccare. */
  export let tight = false;
</script>

<div class="bub bub--{from}" class:bub--wide={wide} class:bub--light={light} class:bub--tight={tight}><slot /></div>

<style>
  .bub {
    max-width: 86%;
    padding: 0.5rem 0.65rem;
    border-radius: 0.7rem;
    font-size: 0.8rem;
    line-height: 1.35;
    color: #e9edef;
    animation: pop 0.45s cubic-bezier(0.2, 0.9, 0.2, 1) backwards;
  }

  .bub--wide {
    max-width: 100%;
    width: 100%;
  }

  .bub--me {
    align-self: flex-end;
    border-bottom-right-radius: 0.2rem;
    background: #005c4b;
  }

  .bub--them {
    align-self: flex-start;
    border-bottom-left-radius: 0.2rem;
    background: #202c33;
  }

  .bub--light {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0.7rem;
    background: #fff;
    color: #111b21;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12);
  }

  .bub--tight {
    padding-block: 0.1rem;
  }

  @keyframes pop {
    from { opacity: 0; transform: translateY(0.6rem) scale(0.97); }
  }
</style>
