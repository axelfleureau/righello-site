<script lang="ts">
  import { onMount } from 'svelte';
  import ScrollReveal from '$lib/components/ScrollReveal.svelte';
  import { theme } from '$lib/stores/theme';
  import LanyardBadge from '$lib/components/LanyardBadge.svelte';
  import ProButton from '$lib/components/progetti/ProButton.svelte';
  import ProjectIcon from '$lib/components/progetti/ProjectIcon.svelte';
  import '$lib/components/progetti/tokens.css';
  import { caseStudies, caseStudyHref, kindLabels, type CaseStudy } from '$lib/data/case-studies';
  import { CONTACT, contactHref } from '$lib/data/contact';

  /** Le persone sono quelle gia' pubbliche sul sito: nome e ruolo, niente altro. `pos` tiene il volto dentro il quadrato. */
  const team = [
    { name: 'Edis Bali', role: 'CEO e cofondatore', image: '/team/edis.webp', pos: '50% 30%' },
    { name: 'Paolo Aileni', role: 'COO e cofondatore', image: '/team/paolo.webp', pos: '50% 22%' },
    { name: 'Axel N. L. Fleureau', role: 'CTO e cofondatore', image: '/team/axel.webp', pos: '50% 18%' },
    { name: 'Omar ElKharroubi', role: 'Agente di commercio', image: '/team/omar.webp', pos: '50% 30%' },
  ];

  /** Il lavoro, raggruppato come lo dichiarano i dati dei progetti: i numeri si contano, non si scrivono. */
  const groups: Array<{ id: string; title: (n: number) => string; items: CaseStudy[] }> = [
    { id: 'prodotti', title: (n) => `${n} prodotti digitali`, items: caseStudies.filter((s) => s.category === 'digital') },
    { id: 'siti', title: (n) => `${n} siti web`, items: caseStudies.filter((s) => s.category === 'web') },
    { id: 'contenuti', title: (n) => `${n} progetti di foto, video e social`, items: caseStudies.filter((s) => s.category === 'content' || s.category === 'marketing') },
  ];

  const steps = [
    { title: 'Una chiamata per capire', text: 'Partiamo da obiettivi, mercato e situazione di oggi. La prima chiamata è gratuita.' },
    { title: 'Una proposta scritta', text: 'Un preventivo su misura, con tempi e consegne chiari prima di partire.' },
    { title: 'Piano e lavoro', text: 'Approvata la proposta, definiamo il piano operativo e iniziamo. Dalla strategia all’esecuzione, senza passaggi esterni.' },
  ];

  const principles = [
    { title: 'Un interlocutore solo', text: 'Parli con chi fa il lavoro, dall’idea alla consegna.' },
    { title: 'Quello che costruiamo è tuo', text: 'Codice, design e materiali sono del cliente.' },
    { title: 'Prima i numeri', text: 'Le scelte importanti partono da dati veri, non da impressioni.' },
  ];

  /** La targhetta appesa e' uno spettacolo da mouse: sul telefono non si carica nemmeno. */
  let showBadge = false;
  onMount(() => {
    showBadge = window.matchMedia('(min-width: 1024px) and (pointer: fine)').matches;
  });

  const TITLE = 'Chi siamo | Righello, studio digitale tra Pordenone e Mestre';
  const DESC = 'Righello costruisce prodotti digitali propri e lavora su misura per aziende: app, software, siti web, contenuti e campagne. Sede legale a Pordenone, base operativa a Mestre.';
</script>

<svelte:head>
  <title>{TITLE}</title>
  <meta name="description" content={DESC} />
  <link rel="canonical" href="https://www.wearerighello.com/chi-siamo" />
  <meta property="og:title" content={TITLE} />
  <meta property="og:description" content={DESC} />
  <meta property="og:image" content="https://www.wearerighello.com/og.png?v=3" />
  <meta property="og:url" content="https://www.wearerighello.com/chi-siamo" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="it_IT" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={TITLE} />
  <meta name="twitter:description" content={DESC} />
  <meta name="twitter:image" content="https://www.wearerighello.com/og.png?v=2" />
</svelte:head>

<section id="chi-siamo-hero" class="cs-hero">
  <div class="section-container cs-hero__grid">
    <div class="cs-hero__copy">
      <p class="section-subtitle">Chi siamo</p>
      <h1 class="cs-title">Costruiamo prodotti nostri e software su misura per i clienti.</h1>
      <p class="cs-lead">
        Righello è uno studio digitale: app, gestionali, siti web, contenuti e campagne. Lavoriamo dal 2023, con sede legale a {CONTACT.legalSeat} e base operativa a {CONTACT.office.split(' - ')[0]}.
      </p>
      <div class="cs-cta">
        <ProButton href={contactHref()} variant="primary" size="lg" arrow="right">Parliamo di un progetto</ProButton>
        <ProButton href="/progetti" variant="ghost" size="lg">Guarda i progetti</ProButton>
      </div>
    </div>
    {#if showBadge}
      <div class="cs-hero__badge">
        <LanyardBadge logoSrc={$theme === 'dark' ? '/logo-white.png' : '/logo-full.png'} title="RIGHELLO" subtitle="Studio digitale" footer="Pordenone · Mestre" />
      </div>
    {/if}
  </div>
</section>

<section id="perche" class="cs-section cs-section--alt">
  <div class="section-container">
    <ScrollReveal>
      <h2 class="cs-h2">Due modi di lavorare, un solo mestiere</h2>
    </ScrollReveal>
    <div class="cs-two">
      <ScrollReveal delay={60}>
        <article class="cs-pillar">
          <h3>Prodotti nostri</h3>
          <p>
            Un prodotto proprio va tenuto in piedi ogni giorno: aggiornamenti, store, pagamenti, assistenza. È il modo più onesto per imparare cosa regge davvero, e quello che impariamo lo portiamo nel lavoro per gli altri.
          </p>
        </article>
      </ScrollReveal>
      <ScrollReveal delay={120}>
        <article class="cs-pillar">
          <h3>Lavoro su misura</h3>
          <p>
            Quando un’azienda ha un problema che nessun prodotto già pronto risolve, lo costruiamo con lei: un sito, un’app o un software fatto sul suo modo di lavorare.
          </p>
        </article>
      </ScrollReveal>
    </div>
  </div>
</section>

<section id="lavoro" class="cs-section">
  <div class="section-container">
    <ScrollReveal>
      <h2 class="cs-h2">Quello che abbiamo costruito</h2>
      <p class="cs-sub">Ogni scheda dice lo stato vero del progetto: online, in prova o in uso interno.</p>
    </ScrollReveal>

    {#each groups as g}
      <div class="cs-group">
        <h3 class="cs-group__title">{g.title(g.items.length)}</h3>
        <ul class="cs-tiles">
          {#each g.items as study}
            <li>
              <a class="cs-tile" href={caseStudyHref(study)}>
                <ProjectIcon {study} size={44} />
                <span class="cs-tile__txt">
                  <span class="cs-tile__name">{study.name}</span>
                  <span class="cs-tile__kind">{kindLabels[study.kind]}</span>
                </span>
              </a>
            </li>
          {/each}
        </ul>
      </div>
    {/each}

    <p class="cs-more"><a href="/progetti">Apri l’elenco completo dei {caseStudies.length} progetti</a></p>
  </div>
</section>

<section id="metodo" class="cs-section cs-section--alt">
  <div class="section-container">
    <ScrollReveal>
      <h2 class="cs-h2">Come lavoriamo</h2>
    </ScrollReveal>
    <ol class="cs-steps">
      {#each steps as s, i}
        <li>
          <ScrollReveal delay={i * 80}>
            <span class="cs-steps__n" aria-hidden="true">0{i + 1}</span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </ScrollReveal>
        </li>
      {/each}
    </ol>
    <ul class="cs-principles">
      {#each principles as p}
        <li><strong>{p.title}.</strong> {p.text}</li>
      {/each}
    </ul>
  </div>
</section>

<section id="persone" class="cs-section">
  <div class="section-container">
    <ScrollReveal>
      <h2 class="cs-h2">Le persone</h2>
      <p class="cs-sub">Quando scrivi dal modulo dei contatti, il messaggio arriva ai tre fondatori.</p>
    </ScrollReveal>
    <ul class="cs-team">
      {#each team as m}
        <li>
          <img src={m.image} alt={m.name} width="480" height="480" loading="lazy" decoding="async" style="object-position: {m.pos}" />
          <p class="cs-team__name">{m.name}</p>
          <p class="cs-team__role">{m.role}</p>
        </li>
      {/each}
    </ul>
  </div>
</section>

<style>
  .cs-hero { padding: clamp(6.5rem, 14vw, 9rem) 0 clamp(3rem, 7vw, 5rem); }
  .cs-hero__grid { display: grid; grid-template-columns: minmax(0, 1fr); gap: 2rem; align-items: center; }
  @media (min-width: 1024px) { .cs-hero__grid { grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); min-height: 34rem; } }
  .cs-hero__badge { display: flex; justify-content: center; }

  .cs-title { font-size: clamp(2.2rem, 5.4vw, 3.9rem); font-weight: 700; line-height: 1.06; letter-spacing: var(--pg-display-tracking, -0.015em); margin-bottom: 1.2rem; max-width: 20ch; }
  .cs-lead { font-size: clamp(1.05rem, 2vw, 1.3rem); line-height: 1.6; color: var(--text-secondary); max-width: 40rem; margin-bottom: 1.8rem; }
  .cs-cta { display: flex; flex-wrap: wrap; gap: 0.7rem; }
  .cs-cta--center { justify-content: center; margin-top: 1.6rem; }

  .cs-section { padding: clamp(3rem, 7vw, 5.5rem) 0; }
  .cs-section--alt { background: var(--bg-secondary); }
  .cs-h2 { font-size: clamp(1.7rem, 3.6vw, 2.6rem); font-weight: 700; line-height: 1.1; letter-spacing: var(--pg-display-tracking, -0.015em); margin-bottom: 0.8rem; }
  .cs-sub { color: var(--text-secondary); font-size: 1.05rem; line-height: 1.6; max-width: 40rem; }

  .cs-two { display: grid; grid-template-columns: minmax(0, 1fr); gap: 1rem; margin-top: 1.8rem; }
  @media (min-width: 768px) { .cs-two { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.4rem; } }
  .cs-pillar { height: 100%; padding: clamp(1.3rem, 3vw, 2rem); border: 1px solid var(--border-color); border-radius: 1.3rem; background: var(--bg-primary); }
  .cs-pillar h3 { font-size: 1.25rem; font-weight: 700; margin-bottom: 0.6rem; }
  .cs-pillar p { color: var(--text-secondary); line-height: 1.65; }

  .cs-group { margin-top: clamp(1.8rem, 4vw, 2.8rem); }
  .cs-group__title { font-size: 0.82rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-muted); padding-bottom: 0.7rem; margin-bottom: 0.9rem; border-bottom: 1px solid var(--border-color); }
  .cs-tiles { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.5rem; }
  @media (min-width: 560px) { .cs-tiles { gap: 0.6rem; } }
  @media (min-width: 760px) { .cs-tiles { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
  @media (min-width: 1024px) { .cs-tiles { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0.8rem; } }
  .cs-tile {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    min-height: 3.9rem;
    height: 100%;
    padding: 0.55rem 0.9rem;
    border: 1px solid var(--border-color);
    border-radius: 1rem;
    background: var(--bg-secondary);
    color: inherit;
    text-decoration: none;
    transition: border-color 0.2s, transform 0.2s;
    -webkit-tap-highlight-color: transparent;
  }
  .cs-tile:hover { border-color: var(--gradient-start); transform: translateY(-2px); }
  .cs-tile:active { transform: none; }
  .cs-tile:focus-visible { outline: 2px solid var(--gradient-start); outline-offset: 3px; }
  .cs-tile__txt { display: grid; gap: 0.1rem; min-width: 0; }
  .cs-tile__name { font-weight: 700; font-size: 0.98rem; line-height: 1.2; overflow-wrap: break-word; }
  /* sul telefono la tessera e' piu' stretta: il tipo si legge nella scheda del progetto */
  @media (max-width: 559px) { .cs-tile__kind { display: none; } .cs-tile { min-height: 3.4rem; gap: 0.6rem; padding: 0.5rem 0.6rem; } .cs-tile__name { font-size: 0.92rem; } }
  .cs-tile__kind { font-size: 0.82rem; color: var(--text-secondary); line-height: 1.25; }
  .cs-more { margin-top: 1.6rem; }
  .cs-more a { display: inline-flex; align-items: center; min-height: 2.75rem; font-weight: 600; color: var(--gradient-start); text-decoration: underline; text-underline-offset: 4px; }

  .cs-steps { display: grid; grid-template-columns: minmax(0, 1fr); gap: 1.6rem; margin-top: 1.8rem; }
  @media (min-width: 768px) { .cs-steps { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 2rem; } }
  .cs-steps li { padding-top: 1rem; border-top: 1px solid var(--border-color); }
  .cs-steps__n { display: block; font-size: 0.9rem; font-weight: 700; letter-spacing: 0.1em; color: var(--gradient-start); margin-bottom: 0.7rem; }
  .cs-steps h3 { font-size: 1.2rem; font-weight: 700; margin-bottom: 0.5rem; }
  .cs-steps p { color: var(--text-secondary); line-height: 1.6; }
  .cs-principles { display: grid; gap: 0.5rem; margin-top: clamp(1.8rem, 4vw, 2.6rem); padding-top: 1.4rem; border-top: 1px solid var(--border-color); color: var(--text-secondary); line-height: 1.6; }
  .cs-principles strong { color: var(--text-primary); }

  .cs-team { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.6rem 1rem; margin-top: 2rem; }
  @media (min-width: 768px) { .cs-team { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1.6rem; } }
  .cs-team img { display: block; width: 100%; aspect-ratio: 1 / 1; object-fit: cover; border-radius: 1.1rem; background: var(--bg-tertiary); margin-bottom: 0.8rem; }
  .cs-team__name { font-weight: 700; font-size: 1.05rem; line-height: 1.25; }
  .cs-team__role { color: var(--text-secondary); font-size: 0.93rem; margin-top: 0.15rem; }

</style>
