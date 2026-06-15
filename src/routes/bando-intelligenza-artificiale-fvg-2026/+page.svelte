<script lang="ts">
  import AIGrantScrollStory from '$lib/components/AIGrantScrollStory.svelte';
  import AnimatedCountdown from '$lib/components/AnimatedCountdown.svelte';
  import GlowCard from '$lib/components/GlowCard.svelte';
  import MagneticButton from '$lib/components/MagneticButton.svelte';
  import RevealOnScroll from '$lib/components/RevealOnScroll.svelte';
  import RippleGrid from '$lib/components/RippleGrid.svelte';
  import SectionDivider from '$lib/components/SectionDivider.svelte';

  type IconKey = 'percent' | 'wallet' | 'fund' | 'users' | 'brain' | 'chart' | 'file' | 'bot' | 'search' | 'dashboard' | 'quote' | 'workflow';

  const agencySourceUrl = 'https://www.lavoroimpresa.fvg.it/portale/incentivi_dettaglio.aspx?AltID=1681&GUID=9e99d2dc-470e-463c-b695-adf01428af32&ID=9e99d2dc-470e-463c-b695-adf01428af32&PreviewKey=manduph3cvcxpm2yuuputsw0';
  const regionNoticeUrl = 'https://www.regione.fvg.it/rafvg/cms/RAFVG/economia-imprese/industria/FOGLIA204/articolo.html';
  const regionPressUrl = 'https://www.regione.fvg.it/rafvg/comunicati/comunicato.act;jsessionid=8F18B21A1BB38C039AF6ABC6E1EAAF32?dir=/rafvg/cms/RAFVG/&nm=20260608134346003';
  const incentivesPortalUrl = 'https://incentivi.regione.fvg.it/';
  const onlineApplicationsUrl = 'https://istanze-web.regione.fvg.it/CruscottoBeneficiario/login.aspx?ID_CON=2&ID_PROC=646459';
  const guidePdfUrl = 'https://www.regione.fvg.it/rafvg/export/sites/default/RAFVG/economia-imprese/industria/FOGLIA204/allegati/LineeGuida_IA.pdf';
  const facsimilePdfUrl = 'https://www.regione.fvg.it/rafvg/export/sites/default/RAFVG/economia-imprese/industria/FOGLIA204/allegati/Fac-simile_Intelligenza_artificiale.pdf';
  const decreePdfUrl = 'https://www.regione.fvg.it/rafvg/export/sites/default/RAFVG/economia-imprese/industria/FOGLIA204/allegati/Decreto_bando_IA_n._29347_2026_allegato.pdf';
  const faqPdfUrl = 'https://www.regione.fvg.it/rafvg/export/sites/default/RAFVG/economia-imprese/industria/FOGLIA204/allegati/FAQ_IA_14.05.26.pdf';
  const formsUrl = 'https://www.regione.fvg.it/rafvg/cms/RAFVG/economia-imprese/industria/FOGLIA204/modulistica/modulistica.html';
  const stampDutyPdfUrl = 'https://www.regione.fvg.it/rafvg/export/sites/default/RAFVG/economia-imprese/industria/FOGLIA204/allegati/Modello_assolvimento_imposta_di_bollo.pdf';
  const deMinimisPdfUrl = 'https://www.regione.fvg.it/rafvg/export/sites/default/RAFVG/economia-imprese/industria/FOGLIA204/allegati/istruzioni_per_dichiarazioni_de_minimis.pdf';
  const procedureNoticePdfUrl = 'https://www.regione.fvg.it/rafvg/export/sites/default/RAFVG/economia-imprese/industria/FOGLIA204/allegati/nota_informativa_procedimento.pdf';
  const privacyPdfUrl = 'https://www.regione.fvg.it/rafvg/export/sites/default/RAFVG/economia-imprese/industria/FOGLIA204/allegati/Informativa_privacy.pdf';
  const informationDate = '15 giugno 2026';

  const icons: Record<IconKey, string> = {
    percent: '<path d="M19 5 5 19"/><circle cx="7.5" cy="7.5" r="2.5"/><circle cx="16.5" cy="16.5" r="2.5"/>',
    wallet: '<path d="M20 7H5a2 2 0 0 0 0 4h15v8H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14v4"/><path d="M16 13h.01"/>',
    fund: '<path d="M4 19V5"/><path d="M4 19h16"/><path d="M8 15v-4"/><path d="M12 15V8"/><path d="M16 15v-6"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    brain: '<path d="M9.5 2a3.5 3.5 0 0 0-3.35 4.5A3.5 3.5 0 0 0 5 13.25 4 4 0 0 0 9 20h1V2z"/><path d="M14.5 2a3.5 3.5 0 0 1 3.35 4.5A3.5 3.5 0 0 1 19 13.25 4 4 0 0 1 15 20h-1V2z"/><path d="M10 8H7"/><path d="M17 8h-3"/><path d="M10 14H7"/><path d="M17 14h-3"/>',
    chart: '<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 5-7"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M9 13h6"/><path d="M9 17h4"/>',
    bot: '<path d="M12 8V4"/><rect x="4" y="8" width="16" height="12" rx="3"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M9 13h.01"/><path d="M15 13h.01"/><path d="M9 17h6"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/><path d="M8 11h6"/><path d="M11 8v6"/>',
    dashboard: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 17V9"/><path d="M12 17v-5"/><path d="M16 17v-8"/>',
    quote: '<path d="M4 7h16"/><path d="M4 12h10"/><path d="M4 17h7"/><path d="M17 14l3 3-3 3"/>',
    workflow: '<path d="M6 3v6a3 3 0 0 0 3 3h6"/><path d="M18 21v-6a3 3 0 0 0-3-3H9"/><circle cx="6" cy="3" r="2"/><circle cx="18" cy="21" r="2"/><circle cx="18" cy="12" r="2"/><circle cx="6" cy="12" r="2"/>',
  };

  const grantCards = [
    { title: 'Fino al 75% coperto', text: 'Per ogni euro investito in un progetto AI, la Regione può coprirne fino a 75 centesimi.', icon: 'percent' },
    { title: 'Fino a 10.000€', text: 'Un aiuto concreto per partire con un progetto utile, senza bloccare mesi di budget.', icon: 'wallet' },
    { title: 'Sportello aperto', text: 'Le domande risultano presentabili dal 10 giugno al 31 luglio 2026, salvo esaurimento risorse.', icon: 'fund' },
    { title: 'Per realtà FVG', text: 'Pensato per micro e piccole imprese e liberi professionisti con sede in Friuli Venezia Giulia.', icon: 'users' },
    { title: 'AI più formazione', text: 'Non solo strumenti: anche metodo, persone e uso quotidiano dentro l’azienda.', icon: 'brain' },
    { title: 'Meno sprechi operativi', text: 'Obiettivo semplice: risparmiare tempo, ridurre errori e aumentare produttività.', icon: 'chart' },
  ] satisfies Array<{ title: string; text: string; icon: IconKey }>;

  const useCases = [
    { title: 'Automazione documentale', text: 'Lettura intelligente di PDF, email, allegati e documentazione aziendale.', icon: 'file' },
    { title: 'Assistenti AI', text: 'Chat aziendali addestrate sui documenti e sulle procedure interne.', icon: 'bot' },
    { title: 'Knowledge Base Aziendale', text: 'Trasforma anni di documentazione in un motore di ricerca intelligente.', icon: 'search' },
    { title: 'Analisi Dati', text: 'Dashboard, KPI e strumenti di supporto alle decisioni.', icon: 'dashboard' },
    { title: 'Preventivi e Offerte', text: 'Riduci i tempi di preparazione delle offerte commerciali.', icon: 'quote' },
    { title: 'Workflow e Processi', text: 'Elimina attività ripetitive e riduci gli errori.', icon: 'workflow' },
  ] satisfies Array<{ title: string; text: string; icon: IconKey }>;

  const serviceOffers = [
    {
      title: 'Troviamo il progetto giusto',
      text: 'Non partiamo dallo strumento. Guardiamo dove perdi tempo, dove si accumulano errori e quale processo può migliorare subito.',
    },
    {
      title: 'Verifichiamo la coerenza tecnica',
      text: 'Traduciamo l’idea in un progetto AI leggibile: obiettivo, processo, dati, strumenti, integrazioni e benefici attesi.',
    },
    {
      title: 'Prepariamo materiali chiari',
      text: 'Ti aiutiamo a spiegare cosa vuoi realizzare, perché serve e come verrà usato. Se hai un consulente per la pratica, lavoriamo al suo fianco.',
    },
    {
      title: 'Realizziamo e formiamo',
      text: 'Costruiamo agenti AI, automazioni, dashboard o software su misura e prepariamo il team a usarli nel lavoro quotidiano.',
    },
  ];

  const scrollProcessSteps = [
    {
      label: '01',
      title: 'Analisi gratuita',
      description: 'Guardiamo processi, documenti, persone e strumenti. L’obiettivo è trovare dove l’azienda perde tempo davvero.',
      metric: 'Mappa operativa',
    },
    {
      label: '02',
      title: 'Caso d’uso ad alto impatto',
      description: 'Scegliamo un progetto AI piccolo abbastanza da partire, ma utile abbastanza da cambiare il lavoro quotidiano.',
      metric: 'Priorità reale',
    },
    {
      label: '03',
      title: 'Progetto pronto da costruire',
      description: 'Mettiamo in fila flussi, costi, benefici, dati necessari e cosa deve fare la soluzione per essere usata dal team.',
      metric: 'Costi e benefici',
    },
    {
      label: '04',
      title: 'Sviluppo e integrazione',
      description: 'Realizziamo agenti AI, automazioni, dashboard o software su misura e li colleghiamo agli strumenti già presenti.',
      metric: 'Soluzione operativa',
    },
  ];

  const examples = [
    { title: 'Azienda manifatturiera', points: ['Preventivi automatici', 'Documentazione tecnica', 'Controllo qualità'] },
    { title: 'Studio professionale', points: ['Gestione documenti', 'Ricerca normativa', 'Assistente interno'] },
    { title: 'PMI commerciale', points: ['CRM intelligente', 'Email automatiche', 'Supporto vendite'] },
  ];

  const clientProofs = [
    {
      name: 'Óptima',
      text: 'Una piattaforma AI per marketing, task, clienti, preventivi, contenuti e automazioni. Non una demo: un sistema operativo per far lavorare meglio un team.',
    },
    {
      name: 'Tetha',
      text: 'Gestionale con documenti, scadenze, preventivi, PDF e assistente AI. Il tipo di progetto in cui l’AI serve a trovare informazioni e ridurre lavoro manuale.',
    },
    {
      name: 'Hermes',
      text: 'Infrastruttura agentica e gateway per collegare strumenti, servizi e automazioni in modo controllato. AI che entra nei processi, non solo in una chat.',
    },
    {
      name: 'Reguta',
      text: 'Dalla comunicazione al gestionale operativo: lavoratori, sicurezza, macchinari, botti, manutenzioni, scadenze e documenti in un sistema più ordinato.',
    },
  ];

  const faqs = [
    {
      question: 'Cos’è il Bando AI FVG 2026?',
      answer: 'È il bando della Regione Friuli Venezia Giulia per aiutare micro e piccole imprese e liberi professionisti a introdurre tecnologie di Intelligenza Artificiale nei processi aziendali.',
    },
    {
      question: 'Chi può partecipare?',
      answer: 'Il bando è rivolto a micro e piccole imprese e liberi professionisti con sede legale o operativa attiva in Friuli Venezia Giulia.',
    },
    {
      question: 'Quanto posso ottenere?',
      answer: 'Il contributo può arrivare fino al 75% della spesa ammissibile, con un massimo di 10.000 euro per singolo beneficiario.',
    },
    {
      question: 'Il bando è già aperto?',
      answer: 'Sì. Al 15 giugno 2026 le fonti ufficiali indicano termini dal 10 giugno 2026 al 31 luglio 2026. Le domande sono a sportello e vanno presentate online entro le ore 16:00 del 31 luglio 2026.',
    },
    {
      question: 'Posso finanziare software su misura?',
      answer: 'Sì, se il progetto rientra nell’introduzione di tecnologie basate sull’intelligenza artificiale. Le spese indicate includono anche personalizzazione, configurazione e integrazione di soluzioni IA con i sistemi aziendali esistenti.',
    },
    {
      question: 'Quali spese tecniche risultano ammissibili?',
      answer: 'La scheda ufficiale cita software, piattaforme e sistemi di IA, licenze, dispositivi digitali intelligenti, integrazione con sistemi aziendali, manutenzione, aggiornamento, assistenza tecnica, consulenze specialistiche, addestramento dei modelli sui dati aziendali e formazione.',
    },
    {
      question: 'Il contributo copre anche crediti IA o API?',
      answer: 'Sì, se coerenti con l’utilizzo di soluzioni IA e classificati come canoni, abbonamenti o costi di utilizzo con utilità limitata all’esercizio, secondo quanto previsto dal bando.',
    },
    {
      question: 'L’IVA è finanziata?',
      answer: 'Solo se costituisce un costo per il beneficiario. Se l’impresa recupera o detrae l’IVA, la base di calcolo è al netto IVA.',
    },
    {
      question: 'Quando posso iniziare le spese?',
      answer: 'Le spese devono essere sostenute successivamente alla presentazione della domanda.',
    },
    {
      question: 'Quanto devo spendere per ottenere 10.000€ di contributo?',
      answer: 'Poiché il contributo è pari al 75%, per ottenere il massimo di 10.000€ servono circa 13.333,33€ di spese ammissibili. Con 10.000€ di spese ammissibili, il contributo stimato è 7.500€.',
    },
    {
      question: 'Posso comprare la marca da bollo in tabaccheria?',
      answer: 'Sì. In alternativa a F23/F24 puoi usare il modello ufficiale di assolvimento bollo con contrassegno da 16€ acquistato presso intermediario convenzionato.',
    },
    {
      question: 'Serve già un progetto definito?',
      answer: 'No. La prima consulenza serve proprio a trasformare un problema operativo in un progetto AI chiaro e realizzabile.',
    },
    {
      question: 'Righello segue anche la parte progettuale?',
      answer: 'Sì. Ti aiutiamo a capire dove usare l’AI, a progettare la soluzione e a realizzarla con un approccio concreto.',
    },
    {
      question: 'Righello presenta la domanda al posto mio?',
      answer: 'Righello segue la parte tecnica e progettuale della soluzione AI. Per la pratica amministrativa possiamo coordinare materiali e informazioni con il tuo consulente, commercialista o soggetto incaricato.',
    },
    {
      question: 'Quanto dura la consulenza iniziale?',
      answer: 'Circa 30 minuti. È gratuita e serve a capire requisiti, priorità e primi casi d’uso possibili.',
    },
  ];

  const officialSources = [
    {
      label: 'Scheda Agenzia Lavoro & SviluppoImpresa',
      href: agencySourceUrl,
    },
    {
      label: 'Pagina ufficiale Regione FVG',
      href: regionNoticeUrl,
    },
    {
      label: 'Istanze On Line',
      href: onlineApplicationsUrl,
    },
    {
      label: 'Linee guida domanda',
      href: guidePdfUrl,
    },
    {
      label: 'Comunicato Regione FVG',
      href: regionPressUrl,
    },
    {
      label: 'Portale Incentivi FVG',
      href: incentivesPortalUrl,
    },
  ];

  const officialResources = [
    { label: 'Pagina ufficiale bando Regione FVG', href: regionNoticeUrl },
    { label: 'Accesso Istanze On Line', href: onlineApplicationsUrl },
    { label: 'Linee guida presentazione domanda', href: guidePdfUrl },
    { label: 'Fac-simile domanda', href: facsimilePdfUrl },
    { label: 'Bando ufficiale allegato al decreto', href: decreePdfUrl },
    { label: 'FAQ ufficiali Regione FVG', href: faqPdfUrl },
    { label: 'Modulistica', href: formsUrl },
    { label: 'Modello assolvimento imposta di bollo', href: stampDutyPdfUrl },
    { label: 'Istruzioni dichiarazioni de minimis', href: deMinimisPdfUrl },
    { label: 'Nota informativa procedimento', href: procedureNoticePdfUrl },
    { label: 'Informativa privacy', href: privacyPdfUrl },
  ];

  const eligibilityChecks = [
    { id: 'fvg', label: 'Hai una sede legale o operativa in Friuli Venezia Giulia?', critical: true },
    { id: 'size', label: 'Sei micro o piccola impresa, oppure libero professionista con P.IVA attiva?', critical: true },
    { id: 'active', label: 'L’impresa è attiva e in regola con i requisiti dichiarativi del bando?', critical: true },
    { id: 'aiProject', label: 'Hai un progetto per introdurre l’IA nei processi aziendali?', critical: true },
    { id: 'futureCosts', label: 'Le spese saranno sostenute dopo la presentazione della domanda?', critical: true },
    { id: 'access', label: 'Hai SPID, CIE, CNS o CRS del legale rappresentante/titolare?', critical: false },
  ];

  const expenseRows = [
    ['Software, piattaforme e sistemi IA', 'Piattaforme IA cloud o on-premise, sistemi software IA acquistati per il progetto.'],
    ['Licenze pluriennali', 'Licenze IA con utilità pluriennale iscritte tra immobilizzazioni immateriali.'],
    ['Dispositivi digitali intelligenti', 'Sensori, sistemi di visione, dispositivi IoT con funzionalità IA.'],
    ['Personalizzazione e integrazione', 'Setup, configurazione e integrazione con archivi, gestionali, workflow e dati aziendali.'],
    ['Manutenzione e assistenza tecnica', 'Assistenza iniziale, aggiornamenti, correzioni e supporto operativo dei sistemi IA.'],
    ['Formazione accreditata FVG', 'Formazione in ambito IA erogata da enti accreditati dalla Regione FVG.'],
    ['Canoni e abbonamenti IA', 'Abbonamenti, crediti API, consumo modelli e servizi cloud IA con utilità limitata all’esercizio.'],
    ['Consulenze e addestramento modelli', 'Analisi dati, configurazione modelli, dataset, prompt engineering e ottimizzazione sui processi aziendali.'],
  ];

  const categoryOptions = expenseRows.map(([label]) => label);

  const technicalProjectModules = [
    'Caricamento e archiviazione documenti',
    'OCR o document intelligence per PDF e scansioni',
    'Estrazione dati e metadati',
    'Classificazione automatica',
    'Assistente conversazionale interno',
    'Dashboard scadenze',
    'Workflow di controllo',
    'Report e riepiloghi automatici',
    'Ruoli, permessi e accessi',
    'Assistenza tecnica e aggiornamenti',
  ];

  const documentChecklist = [
    'Partita IVA, denominazione, PEC e sede FVG',
    'Dimensione impresa, codice ATECO e dati legale rappresentante',
    'SPID, CIE, CNS o CRS del legale rappresentante',
    'Preventivo tecnico del fornitore',
    'Scheda tecnica del progetto IA',
    'Bollo da 16€ e modello assolvimento bollo o F23/F24',
    'Dati de minimis',
    'Eventuali allegati tecnici e visura camerale aggiornata',
  ];

  const applicationSteps = [
    ['Accesso', 'Accedi a Istanze On Line dalla pagina ufficiale del bando con SPID, CIE, CNS o CRS.'],
    ['Nuova istanza', 'Clicca Nuova Istanza e seleziona la linea contributiva dedicata all’intelligenza artificiale.'],
    ['Tipo soggetto', 'Se sei impresa, seleziona Impresa iscritta al Registro Imprese.'],
    ['Anagrafica', 'Controlla denominazione, sede, PEC, REA, forma giuridica, stato impresa, ATECO e dimensione impresa.'],
    ['Descrizione intervento', 'Inserisci titolo, descrizione sintetica, descrizione dettagliata, date presunte e ATECO collegato al progetto.'],
    ['Dati finanziari', 'Suddividi le spese tra investimento e correnti. Il contributo richiesto non può superare il 75% e il massimo di 10.000€.'],
    ['Dichiarazioni e de minimis', 'Conferma solo dichiarazioni vere e compila i dati relativi ad aiuti, impresa unica e requisiti richiesti.'],
    ['Allegati', 'Carica bollo, preventivo tecnico, scheda progetto e documenti richiesti.'],
    ['Controlla e trasmetti', 'Visualizza il PDF generato, controlla dati e allegati. Firma e trasmette il legale rappresentante/titolare.'],
  ];

  const avoidErrors = [
    'Inviare la domanda senza bollo.',
    'Sostenere spese o pagamenti prima dell’invio della domanda.',
    'Inserire IVA recuperabile nella base di calcolo.',
    'Descrivere il progetto come consulenza informatica generica.',
    'Usare voci di spesa non coerenti con l’introduzione dell’IA.',
    'Inserire formazione non erogata da ente accreditato FVG.',
    'Non controllare PDF, allegati e dichiarazioni prima dell’invio.',
    'Non conservare fatture, pagamenti tracciabili e CUP quando richiesto.',
  ];

  const exampleProjectText = 'Introduzione nei processi aziendali di una soluzione software personalizzata basata su intelligenza artificiale per gestione documentale, analisi automatizzata dei dati, controllo scadenze e consultazione assistita delle informazioni interne.';

  let eligibilityAnswers: Record<string, boolean | null> = Object.fromEntries(eligibilityChecks.map((item) => [item.id, null]));
  let selectedCategories: Record<string, boolean> = Object.fromEntries(categoryOptions.map((item) => [item, false]));
  let preparedDocuments: Record<string, boolean> = Object.fromEntries(documentChecklist.map((item) => [item, false]));
  let expenseAmount = 10000;
  let ivaRecoverable = true;
  let nonRecoverableVat = 0;
  let activeApplicationStep = 0;
  let copiedExample = false;

  $: eligibilityAnswered = eligibilityChecks.filter((item) => eligibilityAnswers[item.id] !== null).length;
  $: eligibilityYes = eligibilityChecks.filter((item) => eligibilityAnswers[item.id] === true).length;
  $: hasCriticalEligibilityNo = eligibilityChecks.some((item) => item.critical && eligibilityAnswers[item.id] === false);
  $: eligibilityProgress = Math.round((eligibilityAnswered / eligibilityChecks.length) * 100);
  $: eligibilityResult = hasCriticalEligibilityNo
    ? 'Potrebbe esserci un problema di ammissibilità. Verifica la tua situazione prima di procedere.'
    : eligibilityAnswered === eligibilityChecks.length && eligibilityYes >= 5
      ? 'Probabilmente puoi procedere alla preparazione della domanda. Verifica sempre i requisiti sul bando ufficiale.'
      : 'Rispondi alle domande per avere un primo orientamento operativo.';

  $: spendBase = Math.max(0, Number(expenseAmount) || 0) + (ivaRecoverable ? 0 : Math.max(0, Number(nonRecoverableVat) || 0));
  $: estimatedGrant = Math.min(10000, spendBase * 0.75);
  $: companyShare = Math.max(0, spendBase - estimatedGrant);
  $: selectedCategoryCount = Object.values(selectedCategories).filter(Boolean).length;
  $: preparedCount = Object.values(preparedDocuments).filter(Boolean).length;
  $: documentProgress = Math.round((preparedCount / documentChecklist.length) * 100);
  $: missingDocuments = documentChecklist.filter((item) => !preparedDocuments[item]);

  function formatCurrency(value: number) {
    return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 2 }).format(value);
  }

  async function copyExampleProject() {
    try {
      await navigator.clipboard?.writeText(exampleProjectText);
      copiedExample = true;
      setTimeout(() => {
        copiedExample = false;
      }, 1800);
    } catch {
      copiedExample = false;
    }
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://www.wearerighello.com/bando-intelligenza-artificiale-fvg-2026#webpage',
        url: 'https://www.wearerighello.com/bando-intelligenza-artificiale-fvg-2026',
        name: 'Bando AI FVG 2026: guida e contributo 75% | Righello',
        dateModified: '2026-06-15',
        citation: officialSources.map((source) => source.href),
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://www.wearerighello.com/bando-intelligenza-artificiale-fvg-2026#faq',
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
        '@type': 'LocalBusiness',
        '@id': 'https://www.wearerighello.com/#localbusiness',
        name: 'Righello S.r.l.',
        url: 'https://www.wearerighello.com',
        image: 'https://www.wearerighello.com/logo-full.png',
        email: 'hello@wearerighello.com',
        priceRange: '€€€',
        vatID: 'IT01979970934',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Via Pio X 21',
          addressLocality: 'Mestre',
          addressRegion: 'Venezia',
          addressCountry: 'IT',
        },
        areaServed: ['Friuli-Venezia Giulia', 'Pordenone', 'Udine', 'Gorizia', 'Trieste', 'Mestre', 'Venezia'],
        description: 'Righello S.r.l. progetta siti web, software, automazioni e soluzioni di Intelligenza Artificiale per aziende, PMI e professionisti.',
      },
    ],
  };

  let formData = {
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  };

  let isSubmitting = false;
  let submitStatus: 'idle' | 'success' | 'error' = 'idle';
  let submitMessage = '';

  async function handleSubmit() {
    if (isSubmitting) return;

    isSubmitting = true;
    submitStatus = 'idle';
    submitMessage = '';

    const message = [
      formData.phone ? `Telefono: ${formData.phone}` : '',
      'Richiesta: consulenza gratuita per Bando Intelligenza Artificiale FVG 2026',
      formData.message,
    ].filter(Boolean).join('\n\n');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          company: formData.company,
          email: formData.email,
          phone: formData.phone,
          service: 'Bando Intelligenza Artificiale FVG 2026',
          budget: 'Da definire - contributo fino a 10.000€',
          message,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Errore durante l’invio');
      }

      submitStatus = 'success';
      submitMessage = 'Richiesta inviata. Ti ricontatteremo entro 72 ore lavorative.';
      formData = { name: '', company: '', email: '', phone: '', message: '' };
    } catch (error) {
      submitStatus = 'error';
      submitMessage = error instanceof Error ? error.message : 'Errore durante l’invio. Riprova più tardi.';
    } finally {
      isSubmitting = false;
    }
  }
</script>

<svelte:head>
  <title>Bando AI FVG 2026: guida e contributo 75% | Righello</title>
  <meta name="description" content="Guida interattiva Righello al Bando AI FVG 2026: requisiti, calcolo contributo, documenti e progetto tecnico per Intelligenza Artificiale." />
  <link rel="canonical" href="https://www.wearerighello.com/bando-intelligenza-artificiale-fvg-2026" />
  <meta property="og:title" content="Bando AI FVG 2026: guida e contributo 75% | Righello" />
  <meta property="og:description" content="Guida interattiva Righello al Bando AI FVG 2026: requisiti, calcolo contributo, documenti e progetto tecnico per Intelligenza Artificiale." />
  <meta property="og:url" content="https://www.wearerighello.com/bando-intelligenza-artificiale-fvg-2026" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="it_IT" />
  <meta property="og:image" content="https://www.wearerighello.com/og.png?v=3" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Bando AI FVG 2026: guida e contributo 75% | Righello" />
  <meta name="twitter:description" content="Guida interattiva Righello al Bando AI FVG 2026: requisiti, calcolo contributo, documenti e progetto tecnico per Intelligenza Artificiale." />
  <meta name="twitter:image" content="https://www.wearerighello.com/og.png?v=3" />
  {@html `<script type="application/ld+json">${JSON.stringify(structuredData).replace(/</g, '\\u003c')}</script>`}
</svelte:head>

<div class="ai-grant-page">
  <section class="hero-section">
    <div class="ripple-bg" aria-hidden="true">
      <RippleGrid
        mouseInteraction={true}
        gridColor="#D6487E"
        opacity={0.16}
        rippleIntensity={0.035}
        gridSize={14}
        gridThickness={18}
        fadeDistance={1.7}
        vignetteStrength={2.6}
        disableOnMobile={true}
      />
    </div>
    <div class="section-container hero-grid">
      <RevealOnScroll animation="fly-up">
      <div class="hero-copy">
        <a class="source-pill" href={agencySourceUrl} target="_blank" rel="noopener noreferrer">
          Bando aperto fino al 31 luglio
        </a>
        <h1>Bando AI FVG 2026: fino a 10.000€ per portare l’AI nella tua azienda</h1>
        <p class="hero-subtitle">
          La misura può coprire fino al 75% della spesa ammissibile. Righello ti aiuta a usare questa occasione per costruire un progetto utile: meno attività manuali, meno errori, più tempo per il lavoro che conta.
        </p>
        <p class="status-line">
          Situazione al {informationDate}: il bando risulta aperto. Le domande sono a sportello e vanno presentate online entro le ore 16:00 del 31 luglio 2026.
        </p>
        <p class="search-intent-line">
          In breve: il bando AI FVG 2026 finanzia progetti di intelligenza artificiale in Friuli Venezia Giulia. Righello ti aiuta a capire requisiti, spese ammissibili e progetto da costruire.
        </p>
        <div class="hero-actions" aria-label="Azioni principali">
          <MagneticButton href="#consulenza" variant="primary" class="landing-magnetic">
            Richiedi una consulenza gratuita
          </MagneticButton>
          <MagneticButton href="#guida-bando" variant="secondary" class="landing-magnetic">
            Verifica i requisiti
          </MagneticButton>
        </div>
        <div class="badge-row" aria-label="Punti chiave del bando">
          <span><span aria-hidden="true">✓</span> Fino al 75% a fondo perduto</span>
          <span><span aria-hidden="true">✓</span> Fino a 10.000€</span>
          <span><span aria-hidden="true">✓</span> Domande fino al 31 luglio 2026</span>
        </div>
      </div>
      </RevealOnScroll>

      <RevealOnScroll animation="scale" delay={120}>
      <div class="hero-panel" aria-label="Sintesi contributo">
        <div class="panel-topline">Sportello aperto</div>
        <div class="grant-number">75%</div>
        <p>del progetto può essere coperto dal contributo regionale</p>
        <div class="panel-divider"></div>
        <div class="panel-stats">
          <div>
            <strong>10.000€</strong>
            <span>massimo previsto</span>
          </div>
          <div>
            <strong>31 luglio</strong>
            <span>scadenza ore 16:00</span>
          </div>
        </div>
        <MagneticButton href="#consulenza" variant="primary" class="panel-magnetic">
          Partiamo dal tuo processo
        </MagneticButton>
      </div>
      </RevealOnScroll>
    </div>
  </section>

  <SectionDivider fromColor="var(--bg-primary)" toColor="var(--bg-primary)" height="56px" mobileHeight="24px" />

  <section id="requisiti" class="section-padding">
    <div class="section-container">
      <RevealOnScroll animation="fly-up">
      <div class="landing-section-header">
        <p>Cosa prevede</p>
        <h2>Il bando è il punto di partenza. Il valore è il progetto che costruisci.</h2>
      </div>
      </RevealOnScroll>

      <div class="card-grid">
        {#each grantCards as card, i}
          <RevealOnScroll animation="fly-up" stagger={70} index={i}>
          <GlowCard borderRadius="24px" class="h-full">
          <article class="feature-card">
            <div class="icon-box">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                {@html icons[card.icon]}
              </svg>
            </div>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </article>
          </GlowCard>
          </RevealOnScroll>
        {/each}
      </div>

      <RevealOnScroll animation="fade">
      <div class="source-note">
        <p>
          Situazione aggiornata al {informationDate}: le informazioni sono basate sulla scheda ufficiale LavoroImpresa FVG, sul bando pubblicato dalla Regione Friuli Venezia Giulia e sul comunicato regionale dell’8 giugno 2026. Prima di presentare domanda è sempre necessario verificare la documentazione ufficiale.
        </p>
        <div class="official-source-links" aria-label="Fonti ufficiali sul bando Intelligenza Artificiale FVG">
          <span>Fonti ufficiali</span>
          {#each officialSources as source}
            <a href={source.href} target="_blank" rel="noopener noreferrer">{source.label}</a>
          {/each}
        </div>
      </div>
      </RevealOnScroll>
    </div>
  </section>

  <SectionDivider fromColor="var(--bg-primary)" toColor="var(--bg-secondary)" height="56px" mobileHeight="24px" />

  <section id="guida-bando" class="section-padding muted-section interactive-guide-section">
    <div class="section-container">
      <RevealOnScroll animation="fly-up">
      <div class="landing-section-header">
        <p>Guida interattiva</p>
        <h2>Capisci requisiti, budget e documenti prima di aprire la domanda</h2>
        <p class="section-copy centered">
          Questa guida non sostituisce bando, commercialista o consulente amministrativo. Serve a mettere ordine nella parte tecnica: progetto IA, preventivo, spese, allegati e passaggi pratici.
        </p>
      </div>
      </RevealOnScroll>

      <div class="guide-tool-grid">
        <RevealOnScroll animation="fly-up">
        <article class="interactive-panel">
          <div class="panel-heading">
            <span>01</span>
            <div>
              <h3>Mini-check requisiti</h3>
              <p>Una prima lettura pratica prima di entrare in Istanze On Line.</p>
            </div>
          </div>
          <div class="progress-track" aria-label={`Completamento requisiti ${eligibilityProgress}%`}>
            <span style={`width: ${eligibilityProgress}%`}></span>
          </div>
          <div class="check-list">
            {#each eligibilityChecks as check}
              <div class="yes-no-row">
                <p>{check.label}</p>
                <div>
                  <button type="button" class:active={eligibilityAnswers[check.id] === true} on:click={() => (eligibilityAnswers[check.id] = true)}>Sì</button>
                  <button type="button" class:active={eligibilityAnswers[check.id] === false} on:click={() => (eligibilityAnswers[check.id] = false)}>No</button>
                </div>
              </div>
            {/each}
          </div>
          <p class:warning-result={hasCriticalEligibilityNo} class="tool-result">{eligibilityResult}</p>
        </article>
        </RevealOnScroll>

        <RevealOnScroll animation="fly-up" delay={90}>
        <article class="interactive-panel">
          <div class="panel-heading">
            <span>02</span>
            <div>
              <h3>Calcolatore contributo</h3>
              <p>Stima rapida: 75% della spesa ammissibile, massimo 10.000€.</p>
            </div>
          </div>
          <label class="calculator-field">
            Spese ammissibili stimate, netto IVA
            <input type="number" min="0" step="100" bind:value={expenseAmount} />
          </label>
          <label class="switch-row">
            <input type="checkbox" bind:checked={ivaRecoverable} />
            IVA recuperabile o detraibile
          </label>
          {#if !ivaRecoverable}
            <label class="calculator-field">
              IVA non recuperabile stimata
              <input type="number" min="0" step="100" bind:value={nonRecoverableVat} />
            </label>
          {/if}
          <div class="category-picker">
            <p>Categorie spesa previste</p>
            {#each categoryOptions as category}
              <label>
                <input type="checkbox" bind:checked={selectedCategories[category]} />
                {category}
              </label>
            {/each}
          </div>
          <div class="calculator-results">
            <div><span>Spesa ammissibile stimata</span><strong>{formatCurrency(spendBase)}</strong></div>
            <div><span>Contributo stimato</span><strong>{formatCurrency(estimatedGrant)}</strong></div>
            <div><span>Quota a carico impresa</span><strong>{formatCurrency(companyShare)}</strong></div>
          </div>
          <p class="tool-result">Hai selezionato {selectedCategoryCount} categorie. La stima non sostituisce la valutazione ufficiale della Regione.</p>
        </article>
        </RevealOnScroll>
      </div>
    </div>
  </section>

  <section class="section-padding">
    <div class="section-container">
      <RevealOnScroll animation="fly-up">
      <div class="landing-section-header">
        <p>Spese ammissibili</p>
        <h2>Traduciamo le voci del bando in esempi pratici</h2>
      </div>
      </RevealOnScroll>

      <table class="expense-table" aria-label="Spese ammissibili Bando AI FVG 2026">
        <thead>
          <tr>
            <th>Categoria bando</th>
            <th>Esempi pratici</th>
          </tr>
        </thead>
        <tbody>
          {#each expenseRows as row}
            <tr>
              <th scope="row">{row[0]}</th>
              <td>{row[1]}</td>
            </tr>
          {/each}
        </tbody>
      </table>

      <div class="guide-callout">
        <strong>Nota IVA</strong>
        <p>L’IVA è ammissibile solo se rappresenta un costo per il beneficiario. Se l’impresa detrae l’IVA, la base della domanda va considerata al netto IVA.</p>
      </div>
    </div>
  </section>

  <section class="section-padding muted-section">
    <div class="section-container guide-two-columns">
      <RevealOnScroll animation="fly-up">
      <article class="interactive-panel">
        <div class="panel-heading">
          <span>03</span>
          <div>
            <h3>Esempio di progetto tecnico</h3>
            <p>Un testo di partenza, generico, da adattare al caso reale.</p>
          </div>
        </div>
        <h4>Assistente AI per documenti, scadenze e processi aziendali</h4>
        <p>{exampleProjectText}</p>
        <div class="module-grid">
          {#each technicalProjectModules as item}
            <span>{item}</span>
          {/each}
        </div>
        <button type="button" class="outline-action" on:click={copyExampleProject}>
          {copiedExample ? 'Testo copiato' : 'Copia testo esempio'}
        </button>
      </article>
      </RevealOnScroll>

      <RevealOnScroll animation="fly-up" delay={90}>
      <article class="interactive-panel">
        <div class="panel-heading">
          <span>04</span>
          <div>
            <h3>Documenti da preparare</h3>
            <p>Spunta quello che hai già. La lista dei mancanti si aggiorna da sola.</p>
          </div>
        </div>
        <div class="progress-track" aria-label={`Documenti preparati ${documentProgress}%`}>
          <span style={`width: ${documentProgress}%`}></span>
        </div>
        <div class="document-checklist">
          {#each documentChecklist as item}
            <label>
              <input type="checkbox" bind:checked={preparedDocuments[item]} />
              {item}
            </label>
          {/each}
        </div>
        <div class="missing-documents">
          <strong>{preparedCount}/{documentChecklist.length} pronti</strong>
          <p>{missingDocuments.length ? `Mancano ancora: ${missingDocuments.slice(0, 3).join(', ')}${missingDocuments.length > 3 ? '...' : ''}` : 'Checklist completa. Verifica comunque la modulistica ufficiale prima dell’invio.'}</p>
        </div>
      </article>
      </RevealOnScroll>
    </div>
  </section>

  <section class="section-padding">
    <div class="section-container guide-two-columns">
      <RevealOnScroll animation="fly-up">
      <article class="interactive-panel">
        <div class="panel-heading">
          <span>05</span>
          <div>
            <h3>Marca da bollo da 16€</h3>
            <p>La domanda richiede assolvimento dell’imposta di bollo.</p>
          </div>
        </div>
        <ol class="compact-steps">
          <li>Acquista una marca da bollo da 16€ oppure prepara F23/F24.</li>
          <li>Scarica il modello ufficiale di assolvimento bollo.</li>
          <li>Applica la marca, annullala, compila dati e firma il modulo.</li>
          <li>Scansiona il PDF e caricalo tra gli allegati della domanda.</li>
        </ol>
        <a class="outline-action link-action" href={stampDutyPdfUrl} target="_blank" rel="noopener noreferrer">Apri modello bollo</a>
        <p class="tool-result">Conserva originale della marca e modulo firmato insieme alla pratica.</p>
      </article>
      </RevealOnScroll>

      <RevealOnScroll animation="fly-up" delay={90}>
      <article class="interactive-panel">
        <div class="panel-heading">
          <span>06</span>
          <div>
            <h3>Domanda passo-passo</h3>
            <p>Uno stepper leggero per non perdere i passaggi chiave.</p>
          </div>
        </div>
        <div class="stepper-tabs" role="tablist" aria-label="Passaggi compilazione domanda">
          {#each applicationSteps as step, i}
            <button type="button" class:active={activeApplicationStep === i} on:click={() => (activeApplicationStep = i)}>{i + 1}</button>
          {/each}
        </div>
        <div class="stepper-content">
          <span>Step {activeApplicationStep + 1}</span>
          <h4>{applicationSteps[activeApplicationStep][0]}</h4>
          <p>{applicationSteps[activeApplicationStep][1]}</p>
        </div>
        <a class="outline-action link-action" href={onlineApplicationsUrl} target="_blank" rel="noopener noreferrer">Apri Istanze On Line</a>
      </article>
      </RevealOnScroll>
    </div>
  </section>

  <section class="section-padding muted-section">
    <div class="section-container guide-two-columns">
      <RevealOnScroll animation="fly-up">
      <article class="interactive-panel">
        <div class="panel-heading">
          <span>07</span>
          <div>
            <h3>Errori da evitare</h3>
            <p>Piccoli errori possono rendere debole una domanda anche quando l’idea è buona.</p>
          </div>
        </div>
        <ul class="avoid-list">
          {#each avoidErrors as error}
            <li>{error}</li>
          {/each}
        </ul>
      </article>
      </RevealOnScroll>

      <RevealOnScroll animation="fly-up" delay={90}>
      <article class="interactive-panel">
        <div class="panel-heading">
          <span>08</span>
          <div>
            <h3>Fonti ufficiali</h3>
            <p>Tutti i documenti da aprire prima di inviare la pratica.</p>
          </div>
        </div>
        <div class="resource-list">
          {#each officialResources as resource}
            <a href={resource.href} target="_blank" rel="noopener noreferrer">{resource.label}</a>
          {/each}
        </div>
      </article>
      </RevealOnScroll>
    </div>
  </section>

  <SectionDivider fromColor="var(--bg-primary)" toColor="var(--bg-secondary)" height="56px" mobileHeight="24px" />

  <section class="section-padding muted-section">
    <div class="section-container service-offer-layout">
      <RevealOnScroll animation="fly-up">
      <div class="landing-section-header left">
        <p>Cosa fa Righello</p>
        <h2>Ti aiutiamo a trasformare il bando in un progetto digitale concreto.</h2>
        <p class="section-copy">
          Non siamo l’ente erogatore e non sostituiamo chi segue la pratica amministrativa. Il nostro ruolo è progettare e realizzare la parte tecnica: capire il bisogno, definire la soluzione AI, stimare il lavoro e costruire qualcosa che venga usato davvero.
        </p>
      </div>
      </RevealOnScroll>

      <div class="service-offer-grid">
        {#each serviceOffers as offer, i}
          <RevealOnScroll animation="fly-up" stagger={70} index={i}>
          <article class="service-offer-card">
            <span>{String(i + 1).padStart(2, '0')}</span>
            <h3>{offer.title}</h3>
            <p>{offer.text}</p>
          </article>
          </RevealOnScroll>
        {/each}
      </div>
    </div>
  </section>

  <SectionDivider fromColor="var(--bg-secondary)" toColor="var(--bg-primary)" height="56px" mobileHeight="24px" />

  <section class="section-padding">
    <div class="section-container">
      <RevealOnScroll animation="fly-up">
      <div class="landing-section-header">
        <p>Cosa puoi realizzare</p>
        <h2>Servizi AI pensati per togliere lavoro ripetitivo dal tavolo</h2>
      </div>
      </RevealOnScroll>

      <div class="use-case-grid">
        {#each useCases as item, i}
          <RevealOnScroll animation="fly-up" stagger={70} index={i}>
          <article class="use-case-card">
            <div class="icon-box compact">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                {@html icons[item.icon]}
              </svg>
            </div>
            <div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </article>
          </RevealOnScroll>
        {/each}
      </div>
    </div>
  </section>

  <SectionDivider fromColor="var(--bg-primary)" toColor="var(--bg-primary)" height="56px" mobileHeight="24px" />

  <section class="section-padding">
    <div class="section-container proof-layout">
      <RevealOnScroll animation="fly-up">
      <div class="landing-section-header left">
        <p>Non partiamo da zero</p>
        <h2>Abbiamo già trasformato idee, processi e comunicazione in strumenti che lavorano.</h2>
        <p class="section-copy">
          Il bando è una buona occasione solo se dietro c’è un progetto utile. Per questo non vendiamo “AI” come parola magica:
          costruiamo sistemi digitali che aiutano team, clienti e aziende a fare meglio il lavoro di tutti i giorni.
        </p>
      </div>
      </RevealOnScroll>

      <div class="client-proof-grid">
        {#each clientProofs as proof, i}
          <RevealOnScroll animation="fly-up" stagger={70} index={i}>
            {#if proof.href}
              <a href={proof.href} class="client-proof-card">
                <span>{proof.name}</span>
                <p>{proof.text}</p>
              </a>
            {:else}
              <article class="client-proof-card">
                <span>{proof.name}</span>
                <p>{proof.text}</p>
              </article>
            {/if}
          </RevealOnScroll>
        {/each}
      </div>
    </div>
  </section>

  <SectionDivider fromColor="var(--bg-primary)" toColor="var(--bg-primary)" height="56px" mobileHeight="24px" />

  <section id="metodo-righello" class="righello-scroll-section">
    <AIGrantScrollStory
      title="Prima capiamo il lavoro. Poi scegliamo l’AI giusta."
      eyebrow="Come lavora Righello"
      items={scrollProcessSteps}
    />
  </section>

  <SectionDivider fromColor="var(--bg-primary)" toColor="var(--bg-secondary)" height="56px" mobileHeight="24px" />

  <section class="section-padding muted-section">
    <div class="section-container">
      <RevealOnScroll animation="fly-up">
      <div class="landing-section-header">
        <p>Esempi concreti</p>
        <h2>Da dove potresti partire</h2>
      </div>
      </RevealOnScroll>

      <div class="example-grid">
        {#each examples as example, i}
          <RevealOnScroll animation="fly-up" stagger={90} index={i}>
          <GlowCard borderRadius="24px" class="h-full">
          <article class="example-card">
            <h3>{example.title}</h3>
            <ul>
              {#each example.points as point}
                <li>
                  <span aria-hidden="true"></span>
                  {point}
                </li>
              {/each}
            </ul>
          </article>
          </GlowCard>
          </RevealOnScroll>
        {/each}
      </div>
    </div>
  </section>

  <section id="urgenza" class="section-padding urgency-section">
    <div class="section-container urgency-grid">
      <RevealOnScroll animation="fly-up">
      <div>
        <p class="eyebrow">Perché muoversi subito</p>
        <h2>Le risorse sono limitate</h2>
        <p>
          Il fondo disponibile è pari a 1 milione di euro. La procedura è a sportello: muoversi subito significa scegliere il progetto giusto, capire quanto investire e arrivare con una proposta chiara prima che le risorse si esauriscano.
        </p>
      </div>
      </RevealOnScroll>
      <RevealOnScroll animation="scale" delay={100}>
      <AnimatedCountdown
        targetDate="2026-07-31T16:00:00+02:00"
        title="Lo sportello chiude il 31 luglio 2026."
        subtitle="Le domande sono valutate a sportello: prima si chiarisce il progetto, meglio si può decidere se procedere."
        footnote="Countdown informativo basato sulla scadenza ufficiale del 31 luglio 2026, ore 16:00."
      />
      </RevealOnScroll>
    </div>
  </section>

  <SectionDivider fromColor="var(--bg-secondary)" toColor="var(--bg-primary)" height="56px" mobileHeight="24px" />

  <section class="section-padding">
    <div class="section-container faq-layout">
      <RevealOnScroll animation="fly-up">
      <div class="landing-section-header left">
        <p>FAQ</p>
        <h2>Le domande che ci farebbe un imprenditore, non un ufficio tecnico</h2>
      </div>
      </RevealOnScroll>
      <div class="faq-list">
        {#each faqs as faq, i}
          <RevealOnScroll animation="fly-up" stagger={60} index={i}>
          <details>
            <summary>{faq.question}</summary>
            <p>{faq.answer}</p>
          </details>
          </RevealOnScroll>
        {/each}
      </div>
    </div>
  </section>

  <section id="consulenza" class="section-padding final-cta-section">
    <div class="section-container cta-grid">
      <RevealOnScroll animation="fly-up">
      <div class="final-copy">
        <p class="eyebrow">Consulenza gratuita</p>
        <h2>Scopri se la tua azienda può ottenere il contributo</h2>
        <p>In 30 minuti capiamo se ha senso muoversi, quali processi migliorare e quale progetto AI può portare più valore.</p>
        <div class="final-points">
          <span>Requisiti</span>
          <span>Idea progetto</span>
          <span>Prossimi passi</span>
        </div>
      </div>
      </RevealOnScroll>

      <RevealOnScroll animation="scale" delay={120}>
      <form class="lead-form" on:submit|preventDefault={handleSubmit}>
        <label>
          Nome
          <input bind:value={formData.name} name="name" type="text" autocomplete="name" required />
        </label>
        <label>
          Azienda
          <input bind:value={formData.company} name="company" type="text" autocomplete="organization" />
        </label>
        <label>
          Email
          <input bind:value={formData.email} name="email" type="email" autocomplete="email" required />
        </label>
        <label>
          Telefono
          <input bind:value={formData.phone} name="phone" type="tel" autocomplete="tel" />
        </label>
        <label class="full">
          Messaggio
          <textarea bind:value={formData.message} name="message" rows="5" required placeholder="Raccontaci quale attività vorresti velocizzare o semplificare"></textarea>
        </label>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Invio in corso...' : 'Richiedi la consulenza gratuita'}
        </button>
        {#if submitMessage}
          <p class:success-message={submitStatus === 'success'} class:error-message={submitStatus === 'error'}>
            {submitMessage}
          </p>
        {/if}
      </form>
      </RevealOnScroll>
    </div>
  </section>

  <section class="disclaimer-section">
    <div class="section-container">
      <p>
        Righello S.r.l. non è l’ente erogatore del contributo. Le informazioni riportate hanno finalità divulgativa e saranno aggiornate in base alla documentazione ufficiale pubblicata dalla Regione Friuli Venezia Giulia.
      </p>
    </div>
  </section>
</div>

<style>
  :global(html) {
    scroll-padding-top: 6rem;
  }

  .ai-grant-page {
    color: var(--text-primary);
    background:
      radial-gradient(circle at top left, rgba(214, 72, 126, 0.18), transparent 32rem),
      radial-gradient(circle at 82% 18%, rgba(6, 182, 212, 0.16), transparent 30rem),
      var(--bg-primary);
  }

  .hero-section {
    position: relative;
    min-height: min(740px, 100svh);
    padding: 6.4rem 0 3rem;
    display: flex;
    align-items: center;
    overflow: hidden;
  }

  .ripple-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    opacity: 0.9;
  }

  .hero-grid {
    position: relative;
    z-index: 1;
    display: grid;
    gap: 2rem;
  }

  .hero-copy {
    max-width: 56rem;
  }

  .source-pill,
  .eyebrow {
    display: inline-flex;
    width: fit-content;
    align-items: center;
    gap: 0.5rem;
    min-height: 2.5rem;
    padding: 0.55rem 0.85rem;
    border: 1px solid rgba(214, 72, 126, 0.3);
    border-radius: 999px;
    background: rgba(214, 72, 126, 0.08);
    color: #f0a4c1;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .hero-copy h1,
  .final-copy h2,
  .urgency-section h2,
  .landing-section-header h2 {
    color: var(--text-primary);
    letter-spacing: 0;
  }

  .hero-copy h1 {
    margin-top: 1.25rem;
    font-size: clamp(2.25rem, 5.1vw, 4rem);
    line-height: 1.02;
    font-weight: 800;
    max-width: 18ch;
  }

  .hero-subtitle {
    max-width: 48rem;
    margin-top: 1.5rem;
    color: var(--text-secondary);
    font-size: clamp(1.05rem, 2vw, 1.25rem);
    line-height: 1.45;
  }

  .status-line {
    max-width: 42rem;
    margin-top: 0.9rem;
    color: var(--text-secondary);
    font-size: 0.95rem;
    font-weight: 650;
    line-height: 1.45;
  }

  .search-intent-line {
    max-width: 44rem;
    margin-top: 0.85rem;
    color: var(--text-secondary);
    font-size: 0.92rem;
    font-weight: 520;
    line-height: 1.5;
  }

  .hero-actions,
  .badge-row,
  .final-points {
    display: flex;
    flex-wrap: wrap;
    gap: 0.85rem;
    margin-top: 1.6rem;
  }

  :global(.landing-magnetic),
  :global(.panel-magnetic),
  .lead-form button {
    min-height: 3.1rem;
    font-weight: 800;
    padding: 0.9rem 1.25rem;
    border-radius: 9999px;
  }

  .lead-form button {
    position: relative;
    overflow: hidden;
    background: linear-gradient(135deg, #d6487e, #06b6d4);
    color: white;
    box-shadow: 0 1.2rem 3rem rgba(214, 72, 126, 0.28);
    transition: transform 0.25s ease, box-shadow 0.25s ease, filter 0.25s ease;
  }

  .lead-form button:hover {
    transform: translateY(-2px);
    filter: saturate(1.08);
    box-shadow: 0 1.5rem 3.5rem rgba(214, 72, 126, 0.34);
  }

  .badge-row span,
  .final-points span {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    min-height: 2.5rem;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    padding: 0.55rem 0.8rem;
    color: var(--text-secondary);
    background: rgba(255, 255, 255, 0.04);
    font-size: 0.92rem;
  }

  .badge-row span span {
    min-height: 0;
    padding: 0;
    border: 0;
    background: transparent;
    color: #70e1c8;
    font-weight: 900;
  }

  .hero-panel,
  .lead-form {
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.035));
    box-shadow: 0 2rem 5rem rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(18px);
  }

  .hero-panel {
    padding: 1.4rem;
    border-radius: 1.75rem;
  }

  .panel-topline {
    color: var(--text-secondary);
    font-size: 0.9rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .grant-number {
    margin-top: 0.75rem;
    font-size: clamp(5rem, 24vw, 8rem);
    line-height: 0.88;
    font-weight: 900;
    background: linear-gradient(135deg, #ffffff, #f0a4c1 55%, #83e6f4);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .hero-panel p {
    color: var(--text-secondary);
    font-size: 1rem;
    line-height: 1.45;
  }

  .panel-divider {
    height: 1px;
    margin: 1.25rem 0;
    background: var(--border-color);
  }

  .panel-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
  }

  .panel-stats div {
    border-radius: 1rem;
    background: rgba(255, 255, 255, 0.06);
    padding: 0.85rem;
  }

  .panel-stats strong {
    display: block;
    font-size: 1.6rem;
    line-height: 1;
  }

  .panel-stats span {
    display: block;
    margin-top: 0.35rem;
    color: var(--text-muted);
    font-size: 0.84rem;
    line-height: 1.2;
  }

  :global(.panel-magnetic) {
    width: 100%;
    margin-top: 1rem;
  }

  .landing-section-header {
    max-width: 48rem;
    margin: 0 auto 2.25rem;
    text-align: center;
  }

  .landing-section-header.left {
    margin-left: 0;
    text-align: left;
  }

  .landing-section-header p {
    margin-bottom: 0.65rem;
    color: #d6487e;
    font-size: 0.86rem;
    font-weight: 800;
    letter-spacing: 0.11em;
    text-transform: uppercase;
  }

  .landing-section-header h2,
  .final-copy h2,
  .urgency-section h2 {
    font-size: clamp(2rem, 5vw, 4rem);
    line-height: 1;
    font-weight: 850;
  }

  .section-copy {
    max-width: 42rem;
    margin-top: 1rem;
    color: var(--text-secondary);
    font-size: clamp(1rem, 2vw, 1.18rem);
    line-height: 1.65;
  }

  .card-grid,
  .use-case-grid,
  .example-grid,
  .service-offer-grid,
  .client-proof-grid {
    display: grid;
    gap: 1rem;
  }

  .feature-card,
  .example-card {
    padding: 1.15rem;
    min-height: 100%;
  }

  .use-case-card {
    border: 1px solid var(--border-color);
    border-radius: 1.35rem;
    background: rgba(255, 255, 255, 0.045);
  }

  .feature-card h3,
  .use-case-card h3,
  .example-card h3 {
    color: var(--text-primary);
    font-size: 1.2rem;
    font-weight: 800;
    line-height: 1.05;
  }

  .feature-card p,
  .use-case-card p,
  .urgency-section p,
  .final-copy p,
  .source-note,
  .disclaimer-section p {
    color: var(--text-secondary);
    font-size: 1rem;
    line-height: 1.55;
  }

  .feature-card p,
  .use-case-card p {
    margin-top: 0.55rem;
  }

  .icon-box {
    width: 3rem;
    height: 3rem;
    display: grid;
    place-items: center;
    margin-bottom: 1rem;
    border-radius: 1rem;
    color: #ffffff;
    background: linear-gradient(135deg, rgba(214, 72, 126, 0.85), rgba(6, 182, 212, 0.78));
  }

  .icon-box.compact {
    width: 2.6rem;
    height: 2.6rem;
    margin: 0;
    flex: 0 0 auto;
  }

  .icon-box svg {
    width: 1.35rem;
    height: 1.35rem;
    fill: none;
    stroke: currentColor;
    stroke-width: 1.8;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .source-note {
    margin-top: 1rem;
    padding: 1rem;
    border-left: 3px solid #d6487e;
    border-radius: 1rem;
    background: rgba(214, 72, 126, 0.08);
  }

  .source-note p {
    margin: 0;
  }

  .official-source-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
    align-items: center;
    margin-top: 0.85rem;
  }

  .official-source-links span,
  .official-source-links a {
    display: inline-flex;
    align-items: center;
    min-height: 2.15rem;
    border-radius: 999px;
    padding: 0.45rem 0.75rem;
    font-size: 0.78rem;
    font-weight: 800;
    line-height: 1.1;
  }

  .official-source-links span {
    color: #ffffff;
    background: linear-gradient(135deg, #d6487e, #06b6d4);
  }

  .official-source-links a {
    color: var(--text-primary);
    border: 1px solid rgba(214, 72, 126, 0.28);
    background: rgba(255, 255, 255, 0.06);
    text-decoration: none;
    transition:
      transform 0.2s ease,
      border-color 0.2s ease,
      background 0.2s ease;
  }

  .official-source-links a:hover {
    transform: translateY(-2px);
    border-color: rgba(214, 72, 126, 0.5);
    background: rgba(214, 72, 126, 0.14);
  }

  .muted-section {
    background: rgba(255, 255, 255, 0.025);
  }

  .centered {
    margin-left: auto;
    margin-right: auto;
  }

  .interactive-guide-section {
    position: relative;
  }

  .guide-tool-grid,
  .guide-two-columns {
    display: grid;
    gap: 1rem;
  }

  .interactive-panel {
    display: grid;
    gap: 1rem;
    min-height: 100%;
    border: 1px solid var(--border-color);
    border-radius: 1.35rem;
    background: linear-gradient(145deg, rgba(255, 255, 255, 0.075), rgba(255, 255, 255, 0.03));
    padding: 1.1rem;
  }

  .panel-heading {
    display: flex;
    gap: 0.8rem;
    align-items: flex-start;
  }

  .panel-heading > span {
    display: inline-grid;
    flex: 0 0 auto;
    width: 2.35rem;
    height: 2.35rem;
    place-items: center;
    border-radius: 999px;
    background: rgba(214, 72, 126, 0.14);
    color: #f0a4c1;
    font-weight: 900;
  }

  .panel-heading h3,
  .interactive-panel h4 {
    margin: 0;
    color: var(--text-primary);
    font-size: 1.2rem;
    line-height: 1.1;
  }

  .panel-heading p,
  .interactive-panel > p,
  .stepper-content p,
  .missing-documents p,
  .category-picker p,
  .tool-result {
    margin: 0;
    color: var(--text-secondary);
    line-height: 1.55;
  }

  .progress-track {
    height: 0.55rem;
    overflow: hidden;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.08);
  }

  .progress-track span {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(135deg, #d6487e, #06b6d4);
    transition: width 0.25s ease;
  }

  .check-list,
  .document-checklist,
  .category-picker,
  .resource-list {
    display: grid;
    gap: 0.65rem;
  }

  .yes-no-row {
    display: grid;
    gap: 0.7rem;
    border-radius: 1rem;
    background: rgba(255, 255, 255, 0.045);
    padding: 0.85rem;
  }

  .yes-no-row p {
    margin: 0;
    color: var(--text-primary);
    font-weight: 700;
    line-height: 1.35;
  }

  .yes-no-row div,
  .stepper-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
  }

  .yes-no-row button,
  .stepper-tabs button,
  .outline-action {
    min-height: 2.55rem;
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.06);
    color: var(--text-primary);
    font-weight: 850;
    cursor: pointer;
    transition:
      transform 0.2s ease,
      border-color 0.2s ease,
      background 0.2s ease;
  }

  .yes-no-row button,
  .stepper-tabs button {
    padding: 0.35rem 0.85rem;
  }

  .yes-no-row button.active,
  .stepper-tabs button.active {
    border-color: rgba(214, 72, 126, 0.75);
    background: rgba(214, 72, 126, 0.2);
    color: #ffffff;
  }

  .yes-no-row button:hover,
  .stepper-tabs button:hover,
  .outline-action:hover,
  .resource-list a:hover {
    transform: translateY(-1px);
    border-color: rgba(214, 72, 126, 0.45);
  }

  .tool-result {
    border-radius: 1rem;
    background: rgba(112, 225, 200, 0.09);
    padding: 0.85rem;
    font-weight: 700;
  }

  .warning-result {
    background: rgba(214, 72, 126, 0.12);
  }

  .calculator-field,
  .switch-row,
  .category-picker label,
  .document-checklist label {
    display: flex;
    gap: 0.65rem;
    align-items: center;
    color: var(--text-primary);
    font-weight: 750;
    line-height: 1.35;
  }

  .calculator-field {
    display: grid;
    align-items: initial;
  }

  .calculator-field input {
    width: 100%;
    min-height: 2.85rem;
    border: 1px solid var(--border-color);
    border-radius: 0.9rem;
    background: rgba(255, 255, 255, 0.07);
    color: var(--text-primary);
    padding: 0.75rem 0.85rem;
    font: inherit;
    box-sizing: border-box;
  }

  .switch-row input,
  .category-picker input,
  .document-checklist input {
    width: 1.1rem;
    height: 1.1rem;
    accent-color: #d6487e;
    flex: 0 0 auto;
  }

  .calculator-results {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.65rem;
  }

  .calculator-results div,
  .missing-documents,
  .stepper-content {
    border-radius: 1rem;
    background: rgba(255, 255, 255, 0.055);
    padding: 0.85rem;
  }

  .calculator-results span,
  .stepper-content span {
    display: block;
    color: var(--text-secondary);
    font-size: 0.82rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .calculator-results strong {
    display: block;
    margin-top: 0.25rem;
    color: var(--text-primary);
    font-size: 1.35rem;
  }

  .expense-table {
    display: block;
    width: 100%;
    overflow: hidden;
    border: 1px solid var(--border-color);
    border-radius: 1.35rem;
    border-spacing: 0;
  }

  .expense-table thead {
    display: none;
  }

  .expense-table tbody,
  .expense-table tr,
  .expense-table th,
  .expense-table td {
    display: grid;
  }

  .expense-table tr {
    gap: 0.4rem;
    padding: 1rem;
    border-bottom: 1px solid var(--border-color);
    background: rgba(255, 255, 255, 0.035);
  }

  .expense-table tr:last-child {
    border-bottom: 0;
  }

  .expense-table th {
    color: var(--text-primary);
    text-align: left;
  }

  .expense-table td {
    color: var(--text-secondary);
    line-height: 1.5;
  }

  .guide-callout {
    display: grid;
    gap: 0.35rem;
    margin-top: 1rem;
    border-left: 3px solid #70e1c8;
    border-radius: 1rem;
    background: rgba(112, 225, 200, 0.08);
    padding: 1rem;
  }

  .guide-callout strong,
  .missing-documents strong {
    color: var(--text-primary);
  }

  .guide-callout p {
    margin: 0;
    color: var(--text-secondary);
    line-height: 1.55;
  }

  .module-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .module-grid span {
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.05);
    color: var(--text-secondary);
    padding: 0.45rem 0.65rem;
    font-size: 0.85rem;
    font-weight: 750;
  }

  .outline-action {
    justify-self: flex-start;
    padding: 0.7rem 1rem;
  }

  .link-action,
  .resource-list a {
    display: inline-flex;
    align-items: center;
    text-decoration: none;
  }

  .compact-steps,
  .avoid-list {
    display: grid;
    gap: 0.65rem;
    margin: 0;
    padding-left: 1.2rem;
    color: var(--text-secondary);
    line-height: 1.5;
  }

  .resource-list a {
    min-height: 2.55rem;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.055);
    color: var(--text-primary);
    padding: 0.5rem 0.8rem;
    font-weight: 800;
    transition:
      transform 0.2s ease,
      border-color 0.2s ease;
  }

  .service-offer-layout,
  .proof-layout {
    display: grid;
    gap: 2rem;
  }

  .service-offer-card,
  .client-proof-card {
    display: grid;
    gap: 0.8rem;
    min-height: 100%;
    border: 1px solid var(--border-color);
    border-radius: 1.35rem;
    background: rgba(255, 255, 255, 0.045);
    padding: 1.1rem;
  }

  .client-proof-card {
    color: inherit;
    text-decoration: none;
    transition: transform 0.25s ease, border-color 0.25s ease, background 0.25s ease;
  }

  a.client-proof-card:hover {
    transform: translateY(-3px);
    border-color: rgba(214, 72, 126, 0.55);
    background: rgba(214, 72, 126, 0.08);
  }

  .service-offer-card span,
  .client-proof-card span {
    color: #D6487E;
    font-size: 0.82rem;
    font-weight: 900;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .service-offer-card h3 {
    color: var(--text-primary);
    font-size: 1.25rem;
    font-weight: 850;
    line-height: 1.12;
  }

  .service-offer-card p,
  .client-proof-card p {
    color: var(--text-secondary);
    line-height: 1.6;
  }

  .use-case-card {
    display: flex;
    gap: 1rem;
    padding: 1rem;
  }

  .example-card ul {
    display: grid;
    gap: 0.7rem;
    margin-top: 1.25rem;
  }

  .example-card li {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    color: var(--text-secondary);
    font-size: 1rem;
  }

  .example-card li span {
    width: 0.55rem;
    height: 0.55rem;
    border-radius: 999px;
    background: #70e1c8;
  }

  .urgency-section {
    scroll-margin-top: 7rem;
    background:
      linear-gradient(135deg, rgba(214, 72, 126, 0.16), rgba(6, 182, 212, 0.12)),
      var(--bg-secondary);
  }

  .righello-scroll-section {
    position: relative;
    overflow: clip;
    background:
      radial-gradient(circle at 12% 20%, rgba(214, 72, 126, 0.14), transparent 30rem),
      radial-gradient(circle at 88% 62%, rgba(6, 182, 212, 0.12), transparent 28rem),
      var(--bg-primary);
  }

  .urgency-grid,
  .cta-grid,
  .faq-layout {
    display: grid;
    gap: 2rem;
  }

  .urgency-section h2,
  .final-copy h2 {
    margin-top: 1rem;
  }

  .urgency-section p,
  .final-copy p {
    max-width: 42rem;
    margin-top: 1rem;
  }

  .faq-list {
    display: grid;
    gap: 0.75rem;
  }

  details {
    border: 1px solid var(--border-color);
    border-radius: 1.25rem;
    background: rgba(255, 255, 255, 0.045);
    overflow: hidden;
  }

  summary {
    min-height: 3.3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem;
    color: var(--text-primary);
    cursor: pointer;
    font-weight: 800;
    list-style: none;
  }

  summary::-webkit-details-marker {
    display: none;
  }

  summary::after {
    content: '+';
    flex: 0 0 auto;
    color: #d6487e;
    font-size: 1.5rem;
    line-height: 1;
  }

  details[open] summary::after {
    content: '-';
  }

  details p {
    padding: 0 1rem 1rem;
    color: var(--text-secondary);
    font-size: 1rem;
    line-height: 1.55;
  }

  .final-cta-section {
    background: var(--bg-secondary);
  }

  .lead-form {
    display: grid;
    gap: 0.9rem;
    border-radius: 1.75rem;
    padding: 1.1rem;
  }

  .lead-form label {
    display: grid;
    gap: 0.45rem;
    color: var(--text-secondary);
    font-size: 0.92rem;
    font-weight: 800;
  }

  .lead-form input,
  .lead-form textarea {
    width: 100%;
    border: 1px solid var(--border-color);
    border-radius: 1rem;
    background: rgba(255, 255, 255, 0.06);
    color: var(--text-primary);
    padding: 0.8rem 0.85rem;
    font: inherit;
    min-height: 2.9rem;
  }

  .lead-form textarea {
    resize: vertical;
  }

  .lead-form input:focus,
  .lead-form textarea:focus {
    outline: 2px solid rgba(214, 72, 126, 0.55);
    outline-offset: 2px;
  }

  .lead-form button {
    width: 100%;
    border: 0;
    cursor: pointer;
  }

  .lead-form button:disabled {
    cursor: wait;
    opacity: 0.72;
  }

  .success-message,
  .error-message {
    border-radius: 1rem;
    padding: 0.8rem;
    font-size: 0.95rem;
  }

  .success-message {
    color: #065f46;
    background: #d1fae5;
  }

  .error-message {
    color: #991b1b;
    background: #fee2e2;
  }

  .disclaimer-section {
    border-top: 1px solid var(--border-color);
    padding: 1.25rem 0;
    background: var(--bg-primary);
  }

  .disclaimer-section p {
    font-size: 0.9rem;
  }

  :global([data-theme='light']) .ai-grant-page {
    background:
      radial-gradient(circle at top left, rgba(214, 72, 126, 0.13), transparent 32rem),
      radial-gradient(circle at 82% 18%, rgba(6, 182, 212, 0.12), transparent 30rem),
      var(--bg-primary);
  }

  :global([data-theme='light']) .source-pill,
  :global([data-theme='light']) .eyebrow {
    color: #b63266;
    background: rgba(214, 72, 126, 0.09);
  }

  :global([data-theme='light']) .use-case-card,
  :global([data-theme='light']) .service-offer-card,
  :global([data-theme='light']) .client-proof-card,
  :global([data-theme='light']) .interactive-panel,
  :global([data-theme='light']) .expense-table tr,
  :global([data-theme='light']) details {
    background: rgba(255, 255, 255, 0.78);
  }

  :global([data-theme='light']) .hero-panel,
  :global([data-theme='light']) .lead-form {
    background: rgba(255, 255, 255, 0.86);
    box-shadow: 0 1.4rem 3rem rgba(17, 24, 39, 0.09);
  }

  :global([data-theme='light']) .grant-number {
    background: linear-gradient(135deg, #111827, #d6487e 55%, #047f95);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  :global([data-theme='light']) .lead-form input,
  :global([data-theme='light']) .lead-form textarea,
  :global([data-theme='light']) .calculator-field input,
  :global([data-theme='light']) .badge-row span,
  :global([data-theme='light']) .final-points span,
  :global([data-theme='light']) .panel-stats div,
  :global([data-theme='light']) .yes-no-row,
  :global([data-theme='light']) .calculator-results div,
  :global([data-theme='light']) .missing-documents,
  :global([data-theme='light']) .stepper-content {
    background: rgba(255, 255, 255, 0.9);
  }

  @media (min-width: 720px) {
    .hero-grid,
    .urgency-grid,
    .cta-grid {
      grid-template-columns: minmax(0, 1.2fr) minmax(20rem, 0.8fr);
      align-items: center;
    }

    .hero-panel {
      padding: 1.6rem;
    }

    .card-grid,
    .use-case-grid,
    .example-grid,
    .service-offer-grid,
    .client-proof-grid,
    .guide-tool-grid,
    .guide-two-columns {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .expense-table {
      display: table;
    }

    .expense-table thead {
      display: table-header-group;
    }

    .expense-table tbody {
      display: table-row-group;
    }

    .expense-table tr {
      display: table-row;
      padding: 0;
    }

    .expense-table th,
    .expense-table td {
      display: table-cell;
      padding: 1rem;
      border-bottom: 1px solid var(--border-color);
      vertical-align: top;
    }

    .expense-table tbody tr:last-child th,
    .expense-table tbody tr:last-child td {
      border-bottom: 0;
    }

    .expense-table thead th {
      background: rgba(214, 72, 126, 0.12) !important;
      color: var(--text-primary);
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      font-size: 0.8rem;
    }

    .lead-form {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      padding: 1.25rem;
    }

    .lead-form .full,
    .lead-form button,
    .lead-form p {
      grid-column: 1 / -1;
    }
  }

  @media (min-width: 1024px) {
    .card-grid,
    .use-case-grid,
    .example-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .service-offer-layout,
    .proof-layout {
      grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
      align-items: start;
    }

    .faq-layout {
      grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
      align-items: start;
    }

    .hero-panel {
      transform: translateY(2rem);
    }
  }

  @media (max-width: 480px) {
    .hero-section {
      padding-top: 6.75rem;
    }

    :global(.landing-magnetic) {
      width: 100%;
    }

  }

  @media (prefers-reduced-motion: reduce) {
    .lead-form button {
      transition: none;
    }
  }
</style>
