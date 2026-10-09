<script lang="ts">
  import { onMount } from 'svelte';
  import '../progetti/tokens.css';
  import '../progetti/landing/landing.css';
  import SectionNav from '../progetti/landing/SectionNav.svelte';
  import ServiceHero from './ServiceHero.svelte';
  import ServiceScope from './ServiceScope.svelte';
  import ServiceLocal from './ServiceLocal.svelte';
  import ServiceNote from './ServiceNote.svelte';
  import ServiceMethod from './ServiceMethod.svelte';
  import ServiceProof from './ServiceProof.svelte';
  import ServiceFaq from './ServiceFaq.svelte';
  import ServiceClosing from './ServiceClosing.svelte';
  import ServiceFlow from './ServiceFlow.svelte';
  import type { PageModel } from './types';

  /**
   * La struttura unica di una pagina di servizio e di una landing di agenzia:
   * apertura (con il riquadro "cosa ottieni"), cosa facciamo, come lavoriamo, lavori veri, domande, un solo invito, poi il percorso verso il servizio dopo.
   * `variant` e le sezioni facoltative sono i modificatori: nessuna pagina ha una sua copia della struttura.
   */
  export let m: PageModel;

  /** L'ordine vero delle sezioni: la barra di navigazione e i toni dello sfondo lo seguono, cosi' non c'e' mai una voce per una sezione assente. */
  $: flow = [
    { id: 'cosa-facciamo', label: m.variant === 'indice' ? 'I servizi' : 'Cosa facciamo', on: m.scope.items.length > 0 },
    { id: m.scope2?.id ?? 'richiesti', label: m.scope2?.label ?? '', on: !!m.scope2?.items.length },
    { id: 'come-lavoriamo', label: 'Come lavoriamo', on: m.method.steps.length > 0 },
    { id: 'lavori', label: 'Lavori', on: m.proof.items.length > 0 },
    { id: 'zona', label: 'Dove operiamo', on: !!m.local },
    { id: 'domande', label: 'Domande', on: !!m.faq?.items.length },
  ].filter((s) => s.on);

  $: nav = [...flow, { id: 'chiusura', label: 'Parliamone' }];
  $: tone = Object.fromEntries([...flow, { id: 'chiusura' }].map((s, i) => [s.id, i])) as Record<string, number>;
  $: back = m.crumb.trail[m.crumb.trail.length - 1] ?? null;

  // Le entrate al passaggio nascondono i blocchi solo quando il JavaScript c'e': senza, la pagina resta intera.
  let js = false;
  onMount(() => (js = true));
</script>

<div class="lp sv sv--{m.variant}" class:lp-js={js} style="--a:{m.accent[0]}; --b:{m.accent[1]}">
  <ServiceHero {m} />

  <!-- la barra delle sezioni resta attaccata solo finche' ci sono sezioni da scorrere: finisce con questo blocco -->
  <div>
    <SectionNav items={nav} back={back ? { href: back.href, label: back.label } : null} />
    <ServiceScope id="cosa-facciamo" head={m.scope} items={m.scope.items} layout={m.variant === 'indice' ? 'rows' : 'cards'} tone={tone['cosa-facciamo']} />
    {#if m.scope2?.items.length}<ServiceScope id={m.scope2.id} head={m.scope2} items={m.scope2.items} tone={tone[m.scope2.id]} />{/if}
    {#if m.note}<ServiceNote note={m.note} />{/if}
    <ServiceMethod head={m.method} steps={m.method.steps} tone={tone['come-lavoriamo']} />
    {#if m.proof.items.length}<ServiceProof head={m.proof} items={m.proof.items} more={m.proof.more} tone={tone['lavori']} />{/if}
    {#if m.local}<ServiceLocal block={m.local} tone={tone['zona']} />{/if}
    {#if m.faq?.items.length}<ServiceFaq head={m.faq} items={m.faq.items} tone={tone['domande']} />{/if}
  </div>
  <ServiceClosing c={m.closing} tone={tone['chiusura']} />
</div>

<ServiceFlow flow={m.flow} accent={m.accent} />
