<script lang="ts">
  import { CONTACT } from '$lib/data/contact';
  import ServicePage from '$lib/components/servizi/ServicePage.svelte';
  import { agencyModel } from '$lib/components/servizi/models';

  const services = [
    {
      title: 'Marketing & Social Media',
      description: 'Contenuti, social e direzione editoriale per non confondersi nel rumore digitale tra Mestre, Venezia e Veneto.',
      href: '/servizi/marketing',
    },
    {
      title: 'Advertising',
      description: 'Meta Ads, Google Ads, TikTok Ads e tracking: meno budget bruciato, piu\' segnali leggibili.',
      href: '/servizi/advertising',
    },
    {
      title: 'Siti Web & Software',
      description: 'Siti, landing, e-commerce e strumenti su misura che trasformano attenzione locale in richieste concrete.',
      href: '/servizi/web',
    },
    {
      title: 'Automazioni e Agenti AI',
      description: 'Workflow e agenti digitali collegati a CRM, email e documenti per liberare tempo dove oggi si perde energia.',
      href: '/servizi/agenti-ai',
    },
  ];

  const proofPoints = [
    'Base operativa a Mestre, Venezia: lavoriamo con aziende locali e progetti nel Nord Italia.',
    'Strategia, contenuti, campagne e sviluppo nello stesso tavolo: meno passaggi, più controllo.',
    'Tracciamo richieste, campagne e conversioni senza perdere il lato umano del marchio.',
    'Portiamo prove reali: schede progetto, prodotti digitali, video e sistemi costruiti per clienti veri.',
  ];

  const localAreas = ['Mestre', 'Venezia', 'Marghera', 'Mogliano Veneto', 'Spinea', 'Mirano', 'Treviso', 'Veneto'];

  const searchIntentCards = [
    {
      title: 'Agenzia di marketing a Mestre',
      text: 'Strategia, contenuti, campagne e sito web devono lavorare insieme. Se un canale cresce ma non porta richieste, il sistema non sta facendo il suo lavoro.',
      terms: ['strategia marketing', 'lead generation', 'consulenza marketing Mestre'],
    },
    {
      title: 'Web agency a Mestre e Venezia',
      text: 'Realizziamo siti aziendali, landing page, e-commerce e pagine locali pensate per essere trovate, capite e contattate da clienti reali.',
      terms: ['siti web Mestre', 'landing page', 'e-commerce'],
    },
    {
      title: 'Social media marketing Mestre',
      text: 'Il piano editoriale non è un calendario riempito. Serve una linea chiara: cosa dire, a chi, con quale prova e con quale obiettivo commerciale.',
      terms: ['social media', 'contenuti', 'community'],
    },
    {
      title: 'Google Ads, Meta Ads e SEO locale a Mestre',
      text: 'Campagne, tracciamento, pagine di atterraggio e Google Business Profile devono parlare la stessa lingua. Altrimenti il budget lavora a metà.',
      terms: ['Google Ads', 'Meta Ads', 'SEO Mestre'],
    },
  ];

  const localSeoSignals = [
    {
      title: 'Google Business Profile',
      text: 'Scheda verificata, categorie corrette, recensioni, servizi, foto e post aiutano soprattutto il local pack. Il sito da solo non basta.',
    },
    {
      title: 'Pagina locale leggibile',
      text: 'Google deve capire subito che Righello lavora su marketing, comunicazione, siti web e advertising a Mestre, Venezia e Veneto.',
    },
    {
      title: 'Risposte alle domande commerciali',
      text: 'Prezzi, tempi, servizi inclusi e metodo devono essere chiari. Chi cerca una agenzia vuole capire se può fidarsi prima di scrivere.',
    },
    {
      title: 'Prove e progetti',
      text: 'Schede progetto, video, prodotti e risultati rendono credibile la promessa. La pagina locale deve rimandare al lavoro vero, non sostituirlo.',
    },
  ];

  const processSteps = [
    { title: 'Audit locale', text: 'Controlliamo sito, contenuti, Google Business Profile, parole chiave, concorrenti e tracciamento.' },
    { title: 'Priorità operative', text: 'Decidiamo cosa sistemare prima: messaggio, pagine, campagne, SEO locale, percorso del cliente o automazioni.' },
    { title: 'Produzione', text: 'Costruiamo contenuti, pagine, creatività, campagne e strumenti con un ritmo sostenibile.' },
    { title: 'Misura e miglioramento', text: 'Leggiamo richieste, conversioni, costo per richiesta, qualità dei contatti e segnali di crescita.' },
  ];

  const internalLinks = [
    { href: '/servizi/marketing', label: 'Social media marketing' },
    { href: '/servizi/advertising', label: 'Google Ads e Meta Ads' },
    { href: '/servizi/web', label: 'Siti web e landing page' },
    { href: '/servizi/agenti-ai', label: 'Automazioni e agenti AI' },
    { href: '/progetti', label: 'Progetti e casi studio' },
    { href: '/buffr', label: 'Prodotti digitali Righello' },
    { href: '/contatti', label: 'Audit gratuito' },
  ];

  const faqs = [
    {
      question: 'Righello è una agenzia marketing di Mestre?',
      answer: 'Righello ha sede indicata a Mestre e lavora con aziende a Mestre, Venezia e Veneto su marketing, advertising, siti web, software e automazioni. Il team unisce strategia, contenuti, campagne e tecnologia in un processo unico.',
    },
    {
      question: 'Lavorate anche con aziende fuori da Mestre?',
      answer: 'Si. Gestiamo progetti per aziende a Venezia, in Veneto e nel Nord Italia, con incontri da remoto e sessioni operative sul territorio quando servono contenuti, shooting o workshop.',
    },
    {
      question: 'Che cosa include un progetto di marketing locale?',
      answer: 'Di solito partiamo da audit, posizionamento, tracking e piano di crescita. Poi costruiamo contenuti, campagne, sito o landing page e reportistica: il marketing locale deve farsi trovare, ma soprattutto scegliere.',
    },
    {
      question: 'Quanto costa una agenzia marketing a Mestre?',
      answer: 'Dipende da obiettivi, canali e lavoro necessario. Per questo partiamo da una consulenza gratuita: prima capiamo dove il budget puo\' produrre impatto, poi proponiamo un piano con priorita\', tempi e costi chiari.',
    },
    {
      question: 'Righello segue anche Google Ads e Meta Ads?',
      answer: 'Si. Gestiamo campagne Google Ads, Meta Ads e TikTok Ads con tracking, landing page, creativita\' e lettura dei dati. L\'obiettivo non e\' spendere di piu\', ma capire quali campagne generano richieste utili.',
    },
    {
      question: 'Potete migliorare il posizionamento locale su Google?',
      answer: 'Possiamo lavorare su struttura del sito, contenuti, SEO tecnica, pagine locali, Google Business Profile e segnali di fiducia. Nessuno puo\' garantire una posizione precisa, ma si puo\' rendere la presenza molto piu\' forte e coerente.',
    },
    {
      question: 'Meglio una agenzia o un consulente freelance?',
      answer: 'Dipende dal progetto. Se ti serve solo una singola competenza, un freelance puo\' bastare. Se vuoi collegare strategia, sito, contenuti, campagne, tracking e automazioni, un team integrato riduce passaggi e dispersione.',
    },
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://www.wearerighello.com/agenzia-marketing-mestre#webpage',
        url: 'https://www.wearerighello.com/agenzia-marketing-mestre',
        name: 'Agenzia di marketing a Mestre',
        description: 'Pagina locale Righello per aziende che cercano agenzia marketing, agenzia di comunicazione, web agency, social media marketing, advertising e SEO a Mestre e Venezia.',
        inLanguage: 'it-IT',
        isPartOf: {
          '@type': 'WebSite',
          '@id': 'https://www.wearerighello.com/#website',
          name: 'Righello',
          url: 'https://www.wearerighello.com',
        },
        about: [
          'agenzia marketing Mestre',
          'agenzia di marketing a Mestre',
          'agenzia comunicazione Mestre',
          'agenzia di comunicazione a Mestre',
          'web agency Mestre',
          'social media marketing Mestre',
          'Google Ads Mestre',
          'SEO locale Mestre',
        ],
        mainEntity: {
          '@id': 'https://www.wearerighello.com/agenzia-marketing-mestre#service',
        },
      },
      {
        '@type': 'ProfessionalService',
        '@id': 'https://www.wearerighello.com/agenzia-marketing-mestre#service',
        name: 'Agenzia di marketing e comunicazione a Mestre',
        alternateName: [
          'Agenzia marketing Mestre',
          'Agenzia comunicazione Mestre',
          'Web agency Mestre',
          'Digital marketing agency Mestre',
        ],
        serviceType: 'Marketing digitale, comunicazione, advertising, sviluppo web, SEO locale e automazioni',
        url: 'https://www.wearerighello.com/agenzia-marketing-mestre',
        description: 'Servizi di marketing digitale, comunicazione, social media, advertising, sviluppo siti web, e-commerce, SEO locale e automazioni per aziende a Mestre, Venezia e Veneto.',
        termsOfService: 'https://www.wearerighello.com/contatti',
        image: 'https://www.wearerighello.com/og.png?v=3',
        slogan: 'Strategia, contenuti, campagne e sviluppo digitale per aziende a Mestre.',
        audience: {
          '@type': 'BusinessAudience',
          audienceType: 'PMI, professionisti, hospitality, retail, sport, B2B e servizi locali',
        },
        provider: {
          '@type': 'ProfessionalService',
          '@id': 'https://www.wearerighello.com/#localbusiness',
          name: 'Righello S.r.l.',
          url: 'https://www.wearerighello.com',
          email: CONTACT.email,
          image: 'https://www.wearerighello.com/og.png',
          priceRange: '€€€',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Via Pio X 21',
            addressLocality: 'Mestre',
            addressRegion: 'Veneto',
            postalCode: '30174',
            addressCountry: 'IT',
          },
          sameAs: [
            'https://www.instagram.com/wearerighello',
            'https://www.linkedin.com/company/righello',
            'https://www.tiktok.com/@wearerighello',
          ],
        },
        areaServed: [
          { '@type': 'City', name: 'Mestre' },
          { '@type': 'City', name: 'Venezia' },
          { '@type': 'City', name: 'Marghera' },
          { '@type': 'City', name: 'Treviso' },
          { '@type': 'AdministrativeArea', name: 'Veneto' },
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Servizi marketing, comunicazione e sviluppo per aziende a Mestre',
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
        '@type': 'FAQPage',
        '@id': 'https://www.wearerighello.com/agenzia-marketing-mestre#faq',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://www.wearerighello.com/agenzia-marketing-mestre#breadcrumb',
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
            name: 'Agenzia marketing Mestre',
            item: 'https://www.wearerighello.com/agenzia-marketing-mestre',
          },
        ],
      },
    ],
  };

  const m = agencyModel({
    city: 'Mestre',
    kicker: 'Mestre, Venezia e Veneto',
    title: 'Agenzia di marketing a Mestre per aziende che vogliono farsi scegliere.',
    lead: 'Righello lavora su marketing, comunicazione, SEO locale, campagne Google Ads e Meta Ads, siti web e automazioni per aziende a Mestre, Venezia e Veneto. Meno rumore, più direzione: contenuti che spiegano, pagine che convertono e campagne che portano richieste leggibili.',
    panel: { title: 'Perché Righello', points: proofPoints },
    scope: {
      kicker: 'Agenzia comunicazione Mestre',
      title: 'Marketing, comunicazione e sviluppo digitale nello stesso sistema.',
      highlight: 'nello stesso sistema',
      texts: Object.fromEntries(services.map((x) => [x.href.split('/').pop()!, x.description])),
    },
    scope2: {
      id: 'richiesti',
      label: 'Cosa cercano le aziende',
      kicker: 'Servizi richiesti a Mestre',
      title: 'Chi cerca una agenzia di marketing a Mestre vuole capire subito cosa sai far crescere.',
      lead: 'Le aziende cercano spesso agenzia di comunicazione, web agency, social media marketing, Google Ads, Meta Ads, SEO locale e siti web a Mestre. Per noi non sono servizi separati da vendere in fila: sono pezzi dello stesso sistema, da mettere in ordine in base agli obiettivi.',
      items: searchIntentCards,
    },
    method: {
      kicker: 'Metodo',
      title: 'Prima si mette ordine. Poi si accelera.',
      highlight: 'Poi si accelera.',
      lead: 'Non partiamo dal post o dalla campagna. Partiamo da cosa deve succedere dopo il clic: richiesta, chiamata, preventivo, appuntamento, vendita.',
      steps: processSteps,
    },
    proof: [{ id: 'bibione-sand-storm' }, { id: 'portopiccolo-apartments' }, { id: 'elite-hotel-spa' }, { id: 'optima' }],
    local: {
      kicker: 'Presenza locale',
      title: 'Essere trovati e scelti sono due lavori diversi.',
      paragraphs: [
        'Mestre e Venezia sono il punto di partenza, non il limite. La ricerca «agenzia di marketing a Mestre» deve trovare una risposta precisa, ma non una pagina senz’anima: meno comunicazione decorativa, più lavoro che porta da qualche parte.',
        'Per una ricerca locale contano contenuti, coerenza geografica, scheda Google, recensioni, servizi espliciti e segnali di fiducia. Noi possiamo intervenire sulla parte che controlliamo: sito, contenuti, tracciamento, campagne, profilo locale e conversione.',
        'Base operativa: Via Pio X 21, 30174 Mestre, Venezia. Sede legale a Pordenone. Operiamo tra Mestre, Venezia, Veneto, Friuli-Venezia Giulia e Nord Italia.',
      ],
      areas: localAreas,
      signals: localSeoSignals,
      links: internalLinks,
    },
    faq: faqs.map((f) => ({ q: f.question, a: f.answer })),
    closing: {
      kicker: 'Audit gratuito',
      title: 'Vuoi essere trovato a Mestre e ricordato dopo il primo clic?',
      highlight: 'ricordato',
      text: 'Guardiamo sito, contenuti, Google Business Profile, tracciamento e concorrenti locali. Poi decidiamo cosa va sistemato prima: visibilità, messaggio o conversione.',
    },
    other: { href: '/agenzia-marketing-pordenone', name: 'Agenzia marketing a Pordenone' },
  });
</script>

<svelte:head>
  <title>Agenzia di Marketing a Mestre | SEO, Ads, Social | Righello</title>
  <meta
    name="description"
    content="Agenzia di marketing e comunicazione a Mestre: SEO locale, Google Ads, Meta Ads, social media, siti web e automazioni per aziende a Venezia e Veneto."
  />
  <link rel="canonical" href="https://www.wearerighello.com/agenzia-marketing-mestre" />
  <meta property="og:title" content="Agenzia di Marketing a Mestre | SEO, Ads, Social | Righello" />
  <meta
    property="og:description"
    content="Marketing e comunicazione a Mestre: SEO locale, Google Ads, Meta Ads, social media, siti web e automazioni per aziende a Venezia e Veneto."
  />
  <meta property="og:image" content="https://www.wearerighello.com/og.png?v=3" />
  <meta property="og:url" content="https://www.wearerighello.com/agenzia-marketing-mestre" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="it_IT" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Agenzia di Marketing a Mestre | SEO, Ads, Social | Righello" />
  <meta
    name="twitter:description"
    content="Strategia, contenuti, campagne, siti web, SEO locale e automazioni per aziende a Mestre e Venezia."
  />
  <meta name="twitter:image" content="https://www.wearerighello.com/og.png?v=3" />
  {@html `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>`}
</svelte:head>

<ServicePage {m} />
