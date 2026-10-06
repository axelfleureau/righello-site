<script lang="ts">
  import RevealOnScroll from '$lib/components/RevealOnScroll.svelte';
  import ProductDevice from '$lib/components/progetti/ProductDevice.svelte';
  import ProjectIcon from '$lib/components/progetti/ProjectIcon.svelte';
  import StatusBadge from '$lib/components/progetti/StatusBadge.svelte';
  import { caseStudyHref, getNextCaseStudy, kindLabels } from '$lib/data/case-studies';
  import type { PageData } from './$types';

  export let data: PageData;

  $: study = data.study;
  $: related = data.related;
  $: next = getNextCaseStudy(study);
  $: canonical = `https://www.wearerighello.com/progetti/${study.id}`;
  $: seoTitle = `${study.name} | ${kindLabels[study.kind]} | Righello`;
  $: ogImage = study.image.startsWith('http') ? study.image : `https://www.wearerighello.com${study.image}`;
  $: isIconImage = study.image.includes('/icons/');
  $: primary = study.storeUrl
    ? { href: study.storeUrl, label: 'Scarica su App Store' }
    : study.href?.startsWith('http')
      ? { href: study.href, label: 'Visita il sito' }
      : null;
  $: facts = [
    { label: 'Tipo', value: kindLabels[study.kind] },
    { label: 'Dove', value: study.platform.join(' · ') },
    { label: 'Per chi', value: study.audience ?? study.sector },
  ];

  $: breadcrumbSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Progetti', item: 'https://www.wearerighello.com/progetti' },
      { '@type': 'ListItem', position: 2, name: study.name, item: canonical },
    ],
  }).replace(/</g, '\\u003c');

  const pad = (n: number) => String(n).padStart(2, '0');
</script>

<svelte:head>
  <title>{seoTitle}</title>
  <meta name="description" content={`${study.headline} ${study.text}`.slice(0, 300)} />
  <link rel="canonical" href={canonical} />
  <meta property="og:title" content={seoTitle} />
  <meta property="og:description" content={study.headline} />
  <meta property="og:image" content={ogImage} />
  <meta property="og:url" content={canonical} />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="it_IT" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={seoTitle} />
  <meta name="twitter:description" content={study.headline} />
  <meta name="twitter:image" content={ogImage} />
  {@html `<script type="application/ld+json">${breadcrumbSchema}<\/script>`}
</svelte:head>

<section class="dh" style="--a:{study.accent[0]}; --b:{study.accent[1]}">
  <div class="dh__bg" aria-hidden="true"></div>
  <div class="section-container dh__in">
    <nav class="dh__crumb" aria-label="Breadcrumb">
      <a href="/progetti">Progetti</a><span aria-hidden="true">/</span><span>{study.name}</span>
    </nav>

    <div class="dh__grid">
      <div class="dh__copy">
        <p class="dh__kicker">
          <ProjectIcon {study} size={38} />
          <span>{kindLabels[study.kind]}</span>
          <span class="dh__sep" aria-hidden="true">·</span>
          <span>{study.sector}</span>
        </p>
        <h1 class="dh__name">{study.name}</h1>
        <div class="dh__status"><StatusBadge status={study.status} /></div>
        <p class="dh__headline">{study.headline}</p>
        <div class="dh__cta">
          {#if primary}
            <a class="btn btn--solid" href={primary.href} target="_blank" rel="noopener noreferrer">
              {primary.label}<span aria-hidden="true"> ↗</span>
            </a>
          {/if}
          <a class="btn btn--ghost" href="/contatti">Parliamo di un progetto simile<span aria-hidden="true"> →</span></a>
        </div>
      </div>

      <div class="dh__stage">
        {#if study.stage}
          <ProductDevice {study} eager />
        {:else}
          <figure class="dh__fig" class:dh__fig--icon={isIconImage}>
            <img
              src={study.image}
              alt={`${study.name}: ${study.headline}`}
              style:object-position={study.imagePosition ?? 'center center'}
              width="1200"
              height="750"
              loading="eager"
              decoding="async"
            />
          </figure>
        {/if}
      </div>
    </div>
  </div>
</section>

<section class="facts" style="--a:{study.accent[0]}">
  <div class="section-container">
    <dl class="facts__card">
      {#each facts as fact}
        <div class="facts__cell">
          <dt>{fact.label}</dt>
          <dd>{fact.value}</dd>
        </div>
      {/each}
      <div class="facts__cell">
        <dt>Stato</dt>
        <dd><StatusBadge status={study.status} compact /></dd>
      </div>
    </dl>
  </div>
</section>

<section class="story">
  <div class="section-container story__grid">
    <RevealOnScroll animation="fly-up">
      <p class="story__kicker">Il progetto</p>
    </RevealOnScroll>
    <div>
      <RevealOnScroll animation="fly-up" delay={60}>
        <p class="story__text">{study.text}</p>
      </RevealOnScroll>

      <ol class="story__focus" aria-label="Cosa abbiamo seguito">
        {#each study.focus as item, i}
          <li class="story__row">
            <span class="story__n">{pad(i + 1)}</span>
            <span class="story__item">{item}</span>
          </li>
        {/each}
      </ol>
    </div>
  </div>
</section>

<a class="next" href={caseStudyHref(next)} style="--a:{next.accent[0]}; --b:{next.accent[1]}">
  <span class="next__bg" aria-hidden="true"></span>
  <span class="section-container next__in">
    <span class="next__kicker">Prossimo progetto</span>
    <span class="next__row">
      <span class="next__name">{next.name}</span>
      <span class="next__arrow" aria-hidden="true">→</span>
    </span>
    <span class="next__sub">{kindLabels[next.kind]} · {next.status.label}</span>
  </span>
</a>

<section class="rel">
  <div class="section-container">
    <p class="rel__kicker">Altri progetti</p>
    <ul class="rel__grid">
      {#each related as item (item.id)}
        <li>
          <a class="rel__card" href={caseStudyHref(item)} style="--a:{item.accent[0]}; --b:{item.accent[1]}">
            <span class="rel__top">
              <ProjectIcon study={item} size={44} />
              <StatusBadge status={item.status} compact />
            </span>
            <span class="rel__name">{item.name}</span>
            <span class="rel__kind">{kindLabels[item.kind]}</span>
            <span class="rel__arrow" aria-hidden="true">↗</span>
          </a>
        </li>
      {/each}
    </ul>
  </div>
</section>

<style>
  /* ---------- hero ---------- */
  .dh {
    position: relative;
    overflow: hidden;
    isolation: isolate;
    background: #050505;
    color: #fff;
    padding: clamp(6.6rem, 12vh, 8.6rem) 0 clamp(5rem, 9vw, 7.5rem);
  }

  .dh__bg {
    position: absolute;
    inset: 0;
    z-index: -1;
    background:
      radial-gradient(60% 70% at 80% 30%, color-mix(in srgb, var(--a) 38%, transparent), transparent 70%),
      radial-gradient(50% 60% at 5% 100%, color-mix(in srgb, var(--b) 50%, transparent), transparent 72%);
  }

  .dh__crumb {
    display: flex;
    gap: 0.6rem;
    margin-bottom: clamp(1.6rem, 4vw, 2.6rem);
    font: 500 0.74rem/1 ui-monospace, SFMono-Regular, Menlo, monospace;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.6);
  }

  .dh__crumb a { color: inherit; text-decoration: none; border-bottom: 1px solid rgba(255, 255, 255, 0.3); }
  .dh__crumb a:hover { color: #fff; }

  .dh__grid {
    display: grid;
    gap: clamp(2rem, 5vw, 4rem);
    align-items: center;
  }

  @media (min-width: 1024px) {
    .dh__grid { grid-template-columns: minmax(0, 6fr) minmax(0, 6fr); }
  }

  .dh__copy { display: flex; flex-direction: column; align-items: flex-start; gap: 1.1rem; }

  .dh__kicker {
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.7rem;
    font: 600 0.74rem/1.2 ui-monospace, SFMono-Regular, Menlo, monospace;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.72);
  }

  .dh__sep { opacity: 0.45; }

  .dh__name {
    margin: 0;
    font-weight: 900;
    font-size: clamp(3rem, 8.4vw, 8.4rem);
    line-height: 0.9;
    letter-spacing: -0.04em;
    text-wrap: balance;
    overflow-wrap: anywhere;
  }

  .dh__headline {
    margin: 0;
    max-width: 36rem;
    font-size: clamp(1.1rem, 1.7vw, 1.5rem);
    line-height: 1.4;
    color: rgba(255, 255, 255, 0.88);
    text-wrap: pretty;
  }

  .dh__cta { display: flex; flex-wrap: wrap; gap: 0.7rem; margin-top: 0.6rem; }

  .btn {
    display: inline-flex;
    align-items: center;
    min-height: 3rem;
    padding: 0 1.5rem;
    border-radius: 999px;
    font-size: 0.94rem;
    font-weight: 700;
    text-decoration: none;
    transition: transform 0.2s, background 0.2s, border-color 0.2s;
  }

  .btn--solid { background: #fff; color: #0a0a0a; }
  .btn--solid:hover { transform: translateY(-2px); background: color-mix(in srgb, var(--a) 22%, #fff); }
  .btn--ghost { border: 1px solid rgba(255, 255, 255, 0.3); color: #fff; }
  .btn--ghost:hover { border-color: #fff; transform: translateY(-2px); }

  .dh__stage { padding: 0 1.2rem 1.6rem 0; }

  .dh__fig {
    margin: 0;
    aspect-ratio: 16 / 10;
    border-radius: 1.1rem;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.16);
    background: linear-gradient(135deg, var(--a), var(--b));
    box-shadow: 0 70px 120px -40px color-mix(in srgb, var(--a) 60%, transparent), 0 24px 60px rgba(0, 0, 0, 0.6);
  }

  .dh__fig img { display: block; width: 100%; height: 100%; object-fit: cover; }

  .dh__fig--icon { display: grid; place-items: center; }

  .dh__fig--icon img {
    width: 42%;
    height: auto;
    aspect-ratio: 1;
    border-radius: 22.37%;
    box-shadow: 0 30px 70px rgba(0, 0, 0, 0.55);
  }

  /* ---------- facts ---------- */
  .facts { position: relative; z-index: 2; margin-top: -3.4rem; }

  .facts__card {
    margin: 0;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    border-radius: 1.2rem;
    border: 1px solid var(--border-color);
    background: var(--bg-secondary);
    box-shadow: 0 30px 70px -30px rgba(0, 0, 0, 0.5);
    overflow: hidden;
  }

  @media (min-width: 900px) {
    .facts__card { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  }

  .facts__cell {
    padding: 1.3rem 1.4rem;
    border-right: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
  }

  .facts__cell dt {
    margin-bottom: 0.55rem;
    font: 500 0.7rem/1 ui-monospace, SFMono-Regular, Menlo, monospace;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--text-muted);
  }

  .facts__cell dd {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.35;
    color: var(--text-primary);
  }

  /* ---------- story ---------- */
  .story { padding: clamp(4rem, 9vw, 7rem) 0 clamp(3rem, 7vw, 5rem); background: var(--bg-primary); }

  .story__grid { display: grid; gap: 1.6rem; }

  @media (min-width: 1024px) {
    .story__grid { grid-template-columns: minmax(0, 3fr) minmax(0, 9fr); gap: 3rem; }
  }

  .story__kicker {
    margin: 0.5rem 0 0;
    font: 600 0.78rem/1 ui-monospace, SFMono-Regular, Menlo, monospace;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--text-secondary);
  }

  .story__text {
    margin: 0;
    max-width: 40ch;
    font-weight: 700;
    font-size: clamp(1.5rem, 3.2vw, 2.8rem);
    line-height: 1.18;
    letter-spacing: -0.02em;
    color: var(--text-primary);
    text-wrap: pretty;
  }

  .story__focus {
    margin: clamp(2rem, 5vw, 3.4rem) 0 0;
    padding: 0;
    list-style: none;
    border-top: 1px solid var(--border-color);
  }

  
  .story__row {
    display: flex;
    align-items: baseline;
    gap: 1.4rem;
    padding: 1.1rem 0;
    border-bottom: 1px solid var(--border-color);
  }

  .story__n { font: 500 0.78rem/1 ui-monospace, SFMono-Regular, Menlo, monospace; color: var(--text-muted); }
  .story__item { font-weight: 800; font-size: clamp(1.2rem, 2.2vw, 1.8rem); letter-spacing: -0.015em; color: var(--text-primary); }

  /* ---------- next ---------- */
  .next {
    position: relative;
    display: block;
    overflow: hidden;
    isolation: isolate;
    padding: clamp(3.5rem, 8vw, 6rem) 0;
    color: #fff;
    text-decoration: none;
    background: #050505;
  }

  .next__bg {
    position: absolute;
    inset: 0;
    z-index: -1;
    background:
      linear-gradient(120deg, color-mix(in srgb, var(--a) 70%, #050505), color-mix(in srgb, var(--b) 80%, #050505));
    transition: filter 0.4s;
  }

  .next:hover .next__bg { filter: brightness(1.15) saturate(1.1); }

  .next__in { display: flex; flex-direction: column; gap: 0.9rem; }

  .next__kicker {
    font: 600 0.78rem/1 ui-monospace, SFMono-Regular, Menlo, monospace;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.8);
  }

  .next__row { display: flex; align-items: center; justify-content: space-between; gap: 1rem; }

  .next__name {
    font-weight: 900;
    font-size: clamp(2.6rem, 9vw, 9rem);
    line-height: 0.92;
    letter-spacing: -0.04em;
    text-wrap: balance;
    overflow-wrap: anywhere;
  }

  .next__arrow {
    flex: none;
    font-size: clamp(2rem, 6vw, 5.5rem);
    transition: transform 0.35s cubic-bezier(0.2, 0.9, 0.2, 1);
  }

  .next:hover .next__arrow { transform: translateX(14px); }
  .next:focus-visible { outline: 3px solid #fff; outline-offset: -6px; }

  .next__sub {
    font: 500 0.8rem/1 ui-monospace, SFMono-Regular, Menlo, monospace;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.82);
  }

  /* ---------- related ---------- */
  .rel { padding: clamp(3.5rem, 7vw, 5rem) 0 clamp(4rem, 8vw, 6rem); background: var(--bg-primary); }

  .rel__kicker {
    margin: 0 0 1.4rem;
    font: 600 0.78rem/1 ui-monospace, SFMono-Regular, Menlo, monospace;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--text-secondary);
  }

  .rel__grid {
    display: grid;
    gap: 1rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  @media (min-width: 800px) {
    .rel__grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  }

  .rel__card {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    min-height: 13rem;
    padding: 1.3rem;
    border-radius: 1.2rem;
    border: 1px solid var(--border-color);
    background:
      radial-gradient(90% 90% at 100% 0%, color-mix(in srgb, var(--a) 18%, transparent), transparent 65%),
      var(--bg-secondary);
    color: var(--text-primary);
    text-decoration: none;
    transition: transform 0.3s, border-color 0.3s;
  }

  .rel__card:hover { transform: translateY(-4px); border-color: var(--a); }
  .rel__card:focus-visible { outline: 2px solid var(--a); outline-offset: 3px; }

  .rel__top { display: flex; align-items: center; justify-content: space-between; gap: 0.8rem; margin-bottom: auto; }

  .rel__name { font-weight: 900; font-size: 1.7rem; letter-spacing: -0.025em; line-height: 1; }

  .rel__kind {
    font: 500 0.72rem/1 ui-monospace, SFMono-Regular, Menlo, monospace;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-secondary);
  }

  .rel__arrow {
    position: absolute;
    right: 1.2rem;
    bottom: 1.1rem;
    font-size: 1.3rem;
    color: var(--text-muted);
    transition: transform 0.3s, color 0.3s;
  }

  .rel__card:hover .rel__arrow { transform: translate(3px, -3px); color: var(--a); }

  @media (prefers-reduced-motion: reduce) {
    .next__arrow, .rel__card, .rel__arrow, .btn { transition: none; }
  }
</style>
