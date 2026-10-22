<script context="module" lang="ts">
  // Il comportamento da dito e da tastiera viaggia con il modulo, non con ogni pagina.
  export { attachSheetBehavior } from '$lib/contact/sheetBehavior';
</script>

<script lang="ts">
  /**
   * Il contenuto del foglio: modulo e brief in diretta. Si scarica a parte (in idle, o al primo
   * sfioramento di un pulsante di contatto) perche' porta con se il flusso, la convalida e le
   * schede prodotto: il guscio (`ContactSheet.svelte`) e' gia' nel pacchetto di ogni pagina.
   */
  import ContactBrief from './ContactBrief.svelte';
  import ContactForm from '$lib/components/ContactForm.svelte';
  import { contactEvents } from '$lib/analytics/contact';
  import { inferCta } from '$lib/contact/cta';
  import { sheetFlow } from '$lib/contact/flow';
  import { sheetOrigin } from '$lib/contact/sheet';
  import type { ContactContext } from '$lib/data/contact-prefill';

  export let ctx: ContactContext;
  export let autofocus = false;
  export let onClose: () => void;

  const flow = sheetFlow();
  // Dove stava il pulsante (testata, hero, chiusura, piede, barra...): si ricava ora, non a ogni clic su ogni pagina.
  const origin = sheetOrigin();
  const cta = ctx.cta ?? (origin ? inferCta(origin) : 'pagina');
  contactEvents.ctaClick(cta, ctx.path);
  // Prima del primo disegno: il modulo nasce gia' con bozza e contesto, senza un fotogramma vuoto.
  flow.open({ ...ctx, cta });
</script>

<div class="csb">
  <div class="csb__form">
    <ContactForm {flow} layout="sheet" {autofocus} {onClose} />
  </div>
  <aside class="csb__brief" aria-label="Anteprima della richiesta">
    <ContactBrief {flow} />
  </aside>
</div>

<style>
  .csb { display: grid; grid-template-columns: minmax(0, 1fr); gap: 1.2rem; min-width: 0; }
  .csb__brief { display: none; }
  @media (min-width: 960px) {
    .csb { grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); gap: clamp(1.5rem, 3vw, 2.5rem); align-items: start; }
    .csb__brief { display: block; position: sticky; top: 0; }
  }
</style>
