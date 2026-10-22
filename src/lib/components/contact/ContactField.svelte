<script lang="ts">
  /**
   * Un campo del modulo di contatto: etichetta, controllo, spunta quando e' giusto, frase sotto (suggerimento o errore).
   * Uno solo per nome, recapito e messaggio, nel foglio e nella pagina.
   *
   * Il bordo che si accende al fuoco e' uno strato sopra il controllo (`opacity` e `transform`), non un colore che cambia;
   * lo spazio sotto il campo e' riservato (`reserve`), cosi' suggerimento ed errore si danno il cambio senza spostare niente;
   * l'errore ha sempre un segno e una frase, mai solo il colore.
   */
  export let id: string;
  export let label: string;
  export let optional = false;
  export let error = '';
  export let hint = '';
  /** Il valore scritto e' giusto: compare la spunta dentro il campo e il suggerimento diventa verde. */
  export let valid = false;
  export let reserve = false;
</script>

<div class="cxf">
  <div class="cxf__row">
    <label for={id} class="cxf__label">{label}{#if optional}<span class="cxf__opt">facoltativo</span>{/if}</label>
    <slot name="aside" />
  </div>
  <div class="cxf__ctl" class:is-bad={!!error} class:is-ok={valid && !error}>
    <slot />
    <span class="cxf__ring" aria-hidden="true"></span>
    {#if valid && !error}
      <svg class="cxf__tick" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M5 12.5l4.2 4.2L19 7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" /></svg>
    {/if}
  </div>
  {#if error}
    <p class="cxf__msg cxf__msg--bad" id="{id}-err"><svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><circle cx="10" cy="10" r="9" fill="currentColor" /><path d="M10 5.5v5.5M10 13.6v.1" fill="none" style="stroke: var(--bg-secondary)" stroke-width="2" stroke-linecap="round" /></svg><span>{error}</span></p>
  {:else if hint}
    <p class="cxf__msg" class:is-ok={valid} id="{id}-hint">{hint}</p>
  {:else if reserve}
    <p class="cxf__msg" aria-hidden="true">&nbsp;</p>
  {/if}
</div>

<style>
  .cxf { min-width: 0; }
  .cxf__row { display: flex; align-items: center; justify-content: space-between; gap: var(--cx-3); margin-bottom: var(--cx-2); min-height: 1.4rem; }
  .cxf__label { min-width: 0; font-size: 0.95rem; font-weight: 600; line-height: 1.25; color: var(--text-primary); }
  .cxf__opt { margin-left: var(--cx-2); font-size: 0.8rem; font-weight: 500; color: var(--cx-muted); }

  .cxf__ctl { position: relative; }
  /* il fuoco e l'errore sono un anello sopra il campo: compare con opacita' e un filo di scala, il campo non cambia */
  .cxf__ring {
    position: absolute;
    inset: 0;
    border-radius: var(--cx-r-s);
    pointer-events: none;
    box-shadow: inset 0 0 0 1px var(--brand-pink), 0 0 0 3px rgba(214, 72, 126, 0.22);
    opacity: 0;
    transform: scale(0.985);
    transition: opacity 0.18s ease, transform 0.22s var(--cx-ease);
  }
  .cxf__ctl:focus-within .cxf__ring { opacity: 1; transform: none; }
  .cxf__ctl.is-bad .cxf__ring { opacity: 1; transform: none; box-shadow: inset 0 0 0 1px var(--cx-bad); }
  .cxf__ctl.is-bad:focus-within .cxf__ring { box-shadow: inset 0 0 0 1px var(--cx-bad), 0 0 0 3px color-mix(in srgb, var(--cx-bad) 28%, transparent); }

  .cxf__tick { position: absolute; top: 50%; right: var(--cx-4); margin-top: -10px; color: var(--cx-ok); pointer-events: none; }
  .cxf__tick path { stroke-dasharray: 26; stroke-dashoffset: 26; animation: cxf-draw 0.26s var(--cx-ease) forwards; }
  /* la spunta sta accanto al testo di un messaggio, non sopra: sul messaggio non compare */

  .cxf__msg { display: flex; gap: var(--cx-2); margin: var(--cx-2) 0 0; min-height: 1.4rem; font-size: 0.88rem; line-height: 1.4; color: var(--cx-muted); }
  .cxf__msg.is-ok { color: var(--cx-ok); }
  .cxf__msg--bad { color: var(--cx-bad); animation: cxf-in 0.2s var(--cx-ease); }
  .cxf__msg--bad svg { flex: none; margin-top: 1px; }

  @keyframes cxf-draw { to { stroke-dashoffset: 0; } }
  @keyframes cxf-in { from { opacity: 0; transform: translateY(-3px); } }

  @media (prefers-reduced-motion: reduce) {
    .cxf__ring { transition: none; }
    .cxf__tick path { animation: none; stroke-dashoffset: 0; }
    .cxf__msg--bad { animation: none; }
  }
</style>
