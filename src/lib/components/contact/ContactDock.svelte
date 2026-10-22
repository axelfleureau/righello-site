<script lang="ts">
  /**
   * La barra col pulsante principale in fondo al foglio: resta sempre in vista (sticky nello scorrimento del foglio), con la
   * dissolvenza sopra e l'area sicura dell'iPhone sotto, anche con la tastiera aperta e con il modulo o la conferma da scorrere.
   * Nella pagina /contatti e' un blocco normale in fondo. Una sola per il modulo e per la conferma.
   * La sua altezza diventa il margine di scorrimento del foglio (`--cx-dock`): un campo che prende il fuoco non finisce sotto di lei.
   */
  export let layout: 'sheet' | 'page' = 'sheet';

  function dock(node: HTMLElement) {
    const scroller = node.closest<HTMLElement>('.cs-scroll');
    if (!scroller) return {};
    const read = () => scroller.style.setProperty('--cx-dock', `${Math.ceil(node.getBoundingClientRect().height)}px`);
    read();
    const ro = new ResizeObserver(read);
    ro.observe(node);
    return {
      destroy() {
        ro.disconnect();
        scroller.style.removeProperty('--cx-dock');
      },
    };
  }
</script>

<div class="cxd cxd--{layout}" use:dock><slot /></div>

<style>
  .cxd { display: grid; gap: var(--cx-2); }
  .cxd--sheet {
    position: sticky;
    bottom: 0;
    z-index: 2;
    margin: auto calc(-1 * var(--cs-pad, 1.25rem)) 0;
    padding: var(--cx-2) var(--cs-pad, 1.25rem) calc(var(--cx-4) + env(safe-area-inset-bottom, 0px));
    background: var(--bg-secondary);
  }
  .cxd--sheet::before { content: ''; position: absolute; left: 0; right: 0; bottom: 100%; height: var(--cx-5); background: linear-gradient(to top, var(--bg-secondary), transparent); pointer-events: none; }
</style>
