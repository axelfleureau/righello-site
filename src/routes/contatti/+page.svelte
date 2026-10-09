<script lang="ts">
  import { page } from '$app/stores';
  import ContactForm from '$lib/components/ContactForm.svelte';
  import FaqList from '$lib/components/FaqList.svelte';
  import ProjectIcon from '$lib/components/progetti/ProjectIcon.svelte';
  import '$lib/components/progetti/tokens.css';
  import { CONTACT, formatPhone, mailHref, prefillFromQuery, whatsappHref } from '$lib/data/contact';

  /** Un prodotto di partenza (`?da=tetha`) o un servizio (`?servizio=web`) precompilano il modulo. */
  $: pre = prefillFromQuery($page.url.searchParams);

  /** I canali, in ordine di velocita'. La chiamata compare solo se esiste davvero: prenotazione online, oppure "ti chiamiamo noi" dal modulo. */
  $: channels = [
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      value: formatPhone(CONTACT.whatsapp),
      note: 'Per una domanda veloce',
      href: whatsappHref(),
      external: true,
    },
    {
      id: 'email',
      label: 'Email',
      value: CONTACT.email,
      note: 'Per allegati e richieste lunghe',
      href: mailHref(),
      external: false,
    },
    ...(CONTACT.phone
      ? [{ id: 'phone', label: 'Telefono', value: CONTACT.phone, note: CONTACT.hours, href: `tel:${CONTACT.phone.replace(/\s/g, '')}`, external: false }]
      : []),
    CONTACT.schedulingUrl
      ? { id: 'call', label: 'Prenota una chiamata', value: 'Scegli giorno e ora', note: 'La prima chiamata è gratuita', href: CONTACT.schedulingUrl, external: true }
      : { id: 'call', label: 'Ti chiamiamo noi', value: 'Lascia il numero nel modulo', note: 'La prima chiamata è gratuita', href: '#modulo', external: false },
  ];

  const steps = [
    { title: 'Leggiamo il messaggio', text: `Arriva a ${CONTACT.recipients}.` },
    { title: 'Ti rispondiamo', text: `${CONTACT.reply[0].toUpperCase()}${CONTACT.reply.slice(1)}, con alcune date per una chiamata conoscitiva gratuita.` },
    { title: 'Ricevi una proposta', text: 'Dopo la chiamata, un preventivo gratuito con tempi e consegne chiari.' },
  ];

  const faqs = [
    { question: 'Quanto ci mettete a rispondere?', answer: `Rispondiamo ${CONTACT.reply}. Se è urgente, scrivilo nel messaggio o mandaci un messaggio su WhatsApp.` },
    { question: 'Posso prenotare una chiamata?', answer: 'Sì. La prima chiamata è gratuita: scrivici dal modulo o su WhatsApp e ti proponiamo alcune date.' },
    { question: 'Il preventivo è gratuito?', answer: 'Sì, è gratuito e fatto su misura, con tempi e consegne scritti chiari.' },
    {
      question: 'Quanto costa lavorare con voi?',
      answer: 'Dipende dal progetto. Un sito aziendale parte da qualche migliaio di euro; per social e pubblicità il costo dipende dai servizi e dal budget da gestire. Lo definiamo insieme nella prima chiamata.',
    },
    {
      question: 'Lavorate solo in Veneto?',
      answer: `No. Lavoriamo soprattutto in Friuli-Venezia Giulia, Veneto e Nord Italia, e da remoto con clienti in tutta Italia. La base operativa è a ${CONTACT.office.split(' - ')[0]}.`,
    },
  ];

  const TITLE = 'Contatti | Parla con Righello';
  const DESC = 'Scrivici su WhatsApp, via email o dal modulo: rispondiamo entro 72 ore lavorative. Siti, app, software, social e pubblicità. Sede a Pordenone, base operativa a Mestre.';
</script>

<svelte:head>
  <title>{TITLE}</title>
  <meta name="description" content={DESC} />
  <meta property="og:title" content={TITLE} />
  <meta property="og:description" content={DESC} />
  <meta property="og:image" content="https://www.wearerighello.com/og.png?v=3" />
  <link rel="canonical" href="https://www.wearerighello.com/contatti" />
  <meta property="og:url" content="https://www.wearerighello.com/contatti" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="it_IT" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={TITLE} />
  <meta name="twitter:description" content={DESC} />
  <meta name="twitter:image" content="https://www.wearerighello.com/og.png?v=2" />
</svelte:head>

<section class="ct-hero">
  <div class="section-container">
    <p class="section-subtitle">Contatti</p>
    <h1 class="ct-title">Parliamo del tuo progetto</h1>
    <p class="ct-lead">Scrivici come preferisci. Ti rispondiamo {CONTACT.reply}.</p>

    {#if pre.study}
      <p class="ct-from">
        <ProjectIcon study={pre.study} size={28} />
        <span>Stai chiedendo di un progetto simile a <strong>{pre.study.name}</strong>.</span>
        <a href="/contatti" data-sveltekit-noscroll>Togli</a>
      </p>
    {/if}
  </div>
</section>

<section class="ct-channels" aria-label="Come contattarci">
  <div class="section-container">
    <ul class="ct-grid">
      {#each channels as c}
        <li>
          <a
            class="ct-card"
            href={c.href}
            target={c.external ? '_blank' : undefined}
            rel={c.external ? 'noopener noreferrer' : undefined}
          >
            <span class="ct-card__top">
            <span class="ct-card__icon" aria-hidden="true">
              {#if c.id === 'whatsapp'}
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 11.5a8 8 0 0 1-11.9 7L4 20l1.5-4A8 8 0 1 1 20 11.5Z" /><path d="M9 9.2c.2 2.2 2.6 4.6 4.8 4.8l1.2-1.1-1.6-1-.8.6a3.3 3.3 0 0 1-1.6-1.6l.6-.8-1-1.6L9 9.2Z" /></svg>
              {:else if c.id === 'email'}
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m4 7.5 8 6 8-6" /></svg>
              {:else}
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h3.2l1.5 4-2 1.3a11 11 0 0 0 5 5l1.3-2 4 1.5V17a2 2 0 0 1-2 2A13 13 0 0 1 3 6a2 2 0 0 1 2-2Z" /></svg>
              {/if}
            </span>
            <span class="ct-card__label">{c.label}</span>
            </span>
            <span class="ct-card__value">{c.value}</span>
            <span class="ct-card__note">{c.note}</span>
          </a>
        </li>
      {/each}
    </ul>
  </div>
</section>

<section class="ct-main">
  <div class="section-container ct-split">
    <aside class="ct-aside">
      <h2 class="ct-h2">Cosa succede dopo</h2>
      <ol class="ct-steps">
        {#each steps as s, i}
          <li>
            <span class="ct-steps__n" aria-hidden="true">{i + 1}</span>
            <div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          </li>
        {/each}
      </ol>

      <address class="ct-where">
        <p><strong>Sede legale</strong> {CONTACT.legalSeat}</p>
        <p><strong>Base operativa</strong> {CONTACT.street}</p>
        <p><strong>Orari</strong> {CONTACT.hours}</p>
      </address>
    </aside>

    <div class="ct-form" id="modulo">
      {#key `${pre.study?.id ?? ''}|${pre.topic}`}
        <ContactForm topic={pre.topic} message={pre.message} />
      {/key}
    </div>
  </div>
</section>

<section class="ct-faq">
  <div class="section-container ct-faq__grid">
    <div>
      <p class="section-subtitle">Domande frequenti</p>
      <h2 class="ct-h2">Prima di scriverci</h2>
    </div>
    <FaqList items={faqs} name="contatti" schema />
  </div>
</section>

<style>
  .ct-hero { padding: clamp(6.5rem, 14vw, 9rem) 0 clamp(1.5rem, 3vw, 2.2rem); }
  .ct-title { font-size: clamp(2.3rem, 6vw, 4rem); font-weight: 700; line-height: 1.04; letter-spacing: var(--pg-display-tracking, -0.015em); margin-bottom: 0.9rem; }
  .ct-lead { font-size: clamp(1.05rem, 2vw, 1.3rem); color: var(--text-secondary); max-width: 38rem; }

  .ct-from {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.6rem;
    margin-top: 1.4rem;
    padding: 0.6rem 0.9rem;
    width: fit-content;
    max-width: 100%;
    border: 1px solid var(--border-color);
    border-radius: 0.9rem;
    background: var(--bg-secondary);
    font-size: 0.95rem;
  }
  .ct-from a { display: inline-flex; align-items: center; min-height: 2.75rem; padding: 0 0.5rem; text-decoration: underline; text-underline-offset: 3px; color: var(--text-secondary); }

  /* I canali: una scheda per azione, il dato vero scritto sopra */
  .ct-channels { padding: 0 0 clamp(1.8rem, 4vw, 3rem); }
  .ct-grid { display: grid; grid-template-columns: minmax(0, 1fr); gap: 0.8rem; }
  @media (min-width: 720px) { .ct-grid { grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr)); } }

  .ct-card {
    display: grid;
    grid-template-columns: 2.75rem minmax(0, 1fr);
    column-gap: 0.9rem;
    align-content: start;
    height: 100%;
    padding: 0.9rem 1rem;
    border: 1px solid var(--border-color);
    border-radius: 1.1rem;
    background: var(--bg-secondary);
    color: inherit;
    text-decoration: none;
    transition: border-color 0.2s, transform 0.2s;
    -webkit-tap-highlight-color: transparent;
  }
  .ct-card:hover { border-color: var(--gradient-start); transform: translateY(-2px); }
  .ct-card:active { transform: none; }
  .ct-card:focus-visible { outline: 2px solid var(--gradient-start); outline-offset: 3px; }
  /* sul telefono la scheda e' una riga bassa (icona a sinistra); da 720 px e' una colonna con l'icona in testa */
  .ct-card__top { display: contents; }
  .ct-card__icon { grid-row: 1 / span 3; align-self: center; display: grid; place-items: center; width: 2.75rem; height: 2.75rem; border-radius: 50%; background: rgba(214, 72, 126, 0.12); color: var(--gradient-start); }
  .ct-card__label { font-size: 0.8rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-secondary); }
  .ct-card__value { font-size: 1.15rem; font-weight: 700; line-height: 1.25; overflow-wrap: anywhere; }
  .ct-card__note { font-size: 0.92rem; color: var(--text-secondary); }
  @media (min-width: 720px) {
    .ct-card { grid-template-columns: minmax(0, 1fr); padding: 1.1rem 1.2rem 1.2rem; }
    .ct-card__top { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.6rem; }
    .ct-card__icon { grid-row: auto; align-self: auto; }
  }

  .ct-main { padding: 0 0 clamp(3rem, 7vw, 5.5rem); }
  .ct-split { display: grid; grid-template-columns: minmax(0, 1fr); gap: clamp(2rem, 5vw, 3.5rem); align-items: start; }
  @media (min-width: 960px) { .ct-split { grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); } }
  /* sul telefono il modulo viene prima delle spiegazioni: chi e' qui vuole scrivere */
  .ct-form { order: -1; scroll-margin-top: 6rem; padding: clamp(1.3rem, 4vw, 2.4rem); border: 1px solid var(--border-color); border-radius: clamp(1.2rem, 3vw, 1.8rem); background: var(--bg-secondary); min-width: 0; }
  @media (min-width: 960px) { .ct-form { order: 0; } .ct-aside { position: sticky; top: 6.5rem; } }

  .ct-h2 { font-size: clamp(1.5rem, 3vw, 2.1rem); font-weight: 700; line-height: 1.12; margin-bottom: 1.2rem; }
  .ct-steps { display: grid; gap: 1.3rem; margin-bottom: 2rem; }
  .ct-steps li { display: grid; grid-template-columns: 2rem minmax(0, 1fr); gap: 0.9rem; }
  .ct-steps__n { display: grid; place-items: center; width: 2rem; height: 2rem; border-radius: 50%; border: 1px solid var(--gradient-start); color: var(--gradient-start); font-weight: 700; font-size: 0.9rem; }
  .ct-steps h3 { font-size: 1.05rem; font-weight: 700; margin-bottom: 0.2rem; }
  .ct-steps p { color: var(--text-secondary); line-height: 1.55; font-size: 1rem; }

  .ct-where { display: grid; gap: 0.4rem; padding-top: 1.3rem; border-top: 1px solid var(--border-color); font-style: normal; color: var(--text-secondary); font-size: 0.95rem; }
  .ct-where p { display: grid; grid-template-columns: 8.2rem minmax(0, 1fr); gap: 0.6rem; }
  .ct-where strong { color: var(--text-primary); font-weight: 600; }

  .ct-faq { padding: clamp(2.5rem, 6vw, 4.5rem) 0 clamp(4rem, 8vw, 6.5rem); border-top: 1px solid var(--border-color); background: var(--bg-secondary); }
  .ct-faq__grid { display: grid; grid-template-columns: minmax(0, 1fr); gap: 1.5rem; }
  @media (min-width: 960px) { .ct-faq__grid { grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: clamp(2rem, 5vw, 3.5rem); } }
  .ct-faq__grid :global(.section-subtitle) { text-align: left; }
</style>
