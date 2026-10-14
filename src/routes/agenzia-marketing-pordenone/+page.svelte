<script lang="ts">
  import SeoHead from '$lib/components/SeoHead.svelte';
  import { pordenoneFaqs } from '$lib/data/faqs/pordenone';
  import ServicePage from '$lib/components/servizi/ServicePage.svelte';
  import { agencyModel } from '$lib/components/servizi/models';
  import { getServiceBySlug } from '$lib/data/service-details';

  const services = [
    {
      title: 'Marketing & Social Media',
      description: 'Contenuti, social e direzione editoriale per non sembrare l\'ennesima azienda con il feed acceso e il mercato spento.',
    },
    {
      title: 'Advertising',
      description: 'Meta Ads, Google Ads, TikTok Ads e tracking: meno "speriamo funzioni", piu\' numeri leggibili.',
    },
    {
      title: 'Siti Web & Software',
      description: 'Siti, landing, e-commerce e strumenti su misura che non fanno solo presenza: fanno strada alle richieste.',
    },
    {
      title: 'Automazioni e Agenti AI',
      description: 'Workflow e agenti digitali collegati a CRM, email e documenti per togliere lavoro ripetitivo dal tavolo.',
    },
  ];

  const proofPoints = [
    'Strategia, produzione, campagne e sviluppo nello stesso tavolo: niente rimpalli tra reparti.',
    'Partiamo dai numeri, ma sappiamo raccontarli in modo che si capiscano.',
    'Ogni contenuto sa dove sta andando: attenzione, fiducia, richiesta, vendita.',
    'Il territorio conta, ma non basta: serve un sistema digitale che si faccia ricordare.',
  ];

  const localAreas = ['Pordenone', 'Cordenons', 'Porcia', 'Sacile', 'Spilimbergo', 'San Vito al Tagliamento', 'Maniago', 'Friuli-Venezia Giulia'];

  const m = agencyModel({
    city: 'Pordenone',
    kicker: 'Pordenone, provincia e Friuli-Venezia Giulia',
    title: 'Agenzia marketing a Pordenone, ma senza la solita agenzia.',
    lead: 'Se il tuo marketing non si fa notare, non è colpa di Pordenone. Righello costruisce sistemi digitali che mettono in fila strategia, contenuti, advertising, sito e automazioni: meno rumore, più direzione.',
    panel: { title: 'Perché Righello', points: proofPoints },
    scope: {
      kicker: 'Cosa facciamo',
      title: 'Le leve giuste, nella sequenza giusta.',
      highlight: 'nella sequenza giusta',
      texts: Object.fromEntries(services.map((x, i) => [['marketing', 'advertising', 'web', 'agenti-ai'][i], x.description])),
    },
    proof: [{ id: 'fiumedica' }, { id: 'scuola-sci-piancavallo' }, { id: 'reguta' }, { id: 'tetha' }],
    note: getServiceBySlug('agenti-ai')?.note
      ? (() => {
          const n = getServiceBySlug('agenti-ai')!.note!;
          return { kicker: n.kicker, title: n.title, text: n.text, link: { href: n.href, label: n.label } };
        })()
      : undefined,
    local: {
      kicker: 'Dove operiamo',
      title: 'Locali quando serve. Ambiziosi sempre.',
      paragraphs: [
        'La ricerca «agenzia marketing Pordenone» deve trovare una risposta chiara, ma la pagina non deve sembrare scritta per un motore di ricerca. Raccontiamo dove operiamo, cosa facciamo e perché un’azienda dovrebbe ricordarsi di Righello dopo dieci risultati tutti uguali.',
      ],
      areas: localAreas,
      links: [
        { href: '/servizi/marketing', label: 'Social media marketing' },
        { href: '/servizi/advertising', label: 'Google Ads e Meta Ads' },
        { href: '/servizi/web', label: 'Siti web e landing page' },
        { href: '/servizi/agenti-ai', label: 'Automazioni e agenti AI' },
        { href: '/progetti', label: 'Progetti e casi studio' },
      ],
    },
    faq: pordenoneFaqs.map((f) => ({ q: f.question, a: f.answer })),
    closing: {
      kicker: 'Audit gratuito',
      title: 'Vuoi essere trovato a Pordenone e scelto per un motivo?',
      highlight: 'scelto per un motivo',
      text: 'Guardiamo sito, contenuti, Google Business Profile, tracciamento e concorrenti locali. Poi decidiamo cosa va sistemato prima: visibilità, messaggio o conversione.',
    },
    other: { href: '/agenzia-marketing-mestre', name: 'Agenzia marketing a Mestre' },
  });
</script>

<SeoHead
  path="/agenzia-marketing-pordenone"
  title="Agenzia marketing a Pordenone: social, ads e siti web"
  description="Agenzia marketing a Pordenone: social media, advertising, siti web, software e automazioni AI per aziende in Friuli-Venezia Giulia."
/>

<ServicePage {m} />
