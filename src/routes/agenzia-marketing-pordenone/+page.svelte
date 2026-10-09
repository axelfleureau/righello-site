<script lang="ts">
  import { CONTACT } from '$lib/data/contact';
  import ServicePage from '$lib/components/servizi/ServicePage.svelte';
  import { agencyModel } from '$lib/components/servizi/models';
  import { getServiceBySlug, serviceFaqs } from '$lib/data/service-details';

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

  const faqs = [
    {
      question: 'Righello è una agenzia marketing di Pordenone?',
      answer: 'Righello lavora con aziende a Pordenone e in Friuli-Venezia Giulia su marketing, advertising, siti web, software e automazioni. Siamo un partner operativo: strategia, contenuti, campagne e tecnologia nello stesso processo.',
    },
    {
      question: 'Lavorate anche con aziende fuori dal centro di Pordenone?',
      answer: 'Si. Gestiamo progetti in tutta la provincia di Pordenone e nel Nord Italia, con incontri da remoto e sessioni operative sul territorio quando servono shooting, workshop o contenuti.',
    },
    {
      question: 'Che cosa include un progetto di marketing locale?',
      answer: 'Di solito partiamo da audit, posizionamento, tracking e piano di crescita. Poi mettiamo in fila contenuti, campagne, sito o landing page e reportistica: il marketing locale deve essere riconoscibile, non solo geolocalizzato.',
    },
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': 'https://www.wearerighello.com/agenzia-marketing-pordenone#service',
        name: 'Agenzia marketing a Pordenone',
        serviceType: 'Marketing, advertising, sviluppo web e automazioni',
        provider: {
          '@type': 'LocalBusiness',
          '@id': 'https://www.wearerighello.com/#localbusiness',
          name: 'Righello S.r.l.',
          url: 'https://www.wearerighello.com',
          email: CONTACT.email,
          image: 'https://www.wearerighello.com/og.png',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Via Pio X 21',
            addressLocality: 'Mestre',
            addressRegion: 'Venezia',
            addressCountry: 'IT',
          },
        },
        areaServed: [
          { '@type': 'City', name: 'Pordenone' },
          { '@type': 'AdministrativeArea', name: 'Provincia di Pordenone' },
          { '@type': 'AdministrativeArea', name: 'Friuli-Venezia Giulia' },
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Servizi marketing e sviluppo per aziende a Pordenone',
          itemListElement: services.map((service) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: service.title,
              description: service.description,
            },
          })),
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://www.wearerighello.com/agenzia-marketing-pordenone#breadcrumb',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://www.wearerighello.com/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Agenzia marketing Pordenone',
            item: 'https://www.wearerighello.com/agenzia-marketing-pordenone',
          },
        ],
      },
    ],
  };

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
    faq: [
      ...faqs.map((f) => ({ q: f.question, a: f.answer })),
      ...serviceFaqs.filter((f) => ['Che garanzie offrite sui risultati?', 'Come funziona il pagamento?'].includes(f.q)).map((f) => ({ q: f.q, a: f.a })),
    ],
    closing: {
      kicker: 'Audit gratuito',
      title: 'Vuoi essere trovato a Pordenone e scelto per un motivo?',
      highlight: 'scelto per un motivo',
      text: 'Guardiamo sito, contenuti, Google Business Profile, tracciamento e concorrenti locali. Poi decidiamo cosa va sistemato prima: visibilità, messaggio o conversione.',
    },
    other: { href: '/agenzia-marketing-mestre', name: 'Agenzia marketing a Mestre' },
  });
</script>

<svelte:head>
  <title>Agenzia Marketing Pordenone | Righello - Web, Advertising e AI</title>
  <meta
    name="description"
    content="Agenzia marketing a Pordenone: social media, advertising, siti web, software e automazioni AI per aziende in Friuli-Venezia Giulia."
  />
  <link rel="canonical" href="https://www.wearerighello.com/agenzia-marketing-pordenone" />
  <meta property="og:title" content="Agenzia Marketing Pordenone | Righello" />
  <meta
    property="og:description"
    content="Marketing, advertising, siti web e automazioni per aziende a Pordenone e in Friuli-Venezia Giulia."
  />
  <meta property="og:image" content="https://www.wearerighello.com/og.png?v=3" />
  <meta property="og:url" content="https://www.wearerighello.com/agenzia-marketing-pordenone" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="it_IT" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Agenzia Marketing Pordenone | Righello" />
  <meta
    name="twitter:description"
    content="Strategia, contenuti, campagne, siti web e automazioni per aziende a Pordenone."
  />
  <meta name="twitter:image" content="https://www.wearerighello.com/og.png?v=3" />
  {@html `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>`}
</svelte:head>

<ServicePage {m} />
