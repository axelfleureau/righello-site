<script lang="ts">
  import { onMount, onDestroy, tick } from 'svelte';
  import { caseStudyHref, kindLabels } from '$lib/data/case-studies';
  import type { CaseStudy } from '$lib/data/case-studies';
  import ProductDevice from './ProductDevice.svelte';
  import ProButton from './ProButton.svelte';
  import StatusBadge from './StatusBadge.svelte';
  import ProjectIcon from './ProjectIcon.svelte';

  export let items: CaseStudy[];

  type Gsap = typeof import('gsap').default;

  let track: HTMLElement;
  let sticky: HTMLElement;
  let mode: 'stack' | 'scene' = 'stack';
  let active = 0;
  let progress = 0;
  let gsap: Gsap | null = null;
  let scenes: HTMLElement[] = [];
  let ticking = false;
  let listening = false;
  let near = false;
  let io: IntersectionObserver | null = null;
  /** Quanto scorrimento serve per attraversare tutte le scene: si misura al ridimensionamento, non a ogni fotogramma. */
  let total = 0;
  let mq: MediaQueryList | null = null;

  const pad = (n: number) => String(n).padStart(2, '0');

  function primaryLink(study: CaseStudy) {
    if (study.storeUrl) return { href: study.storeUrl, label: 'Scarica su App Store', external: true };
    if (study.href?.startsWith('http')) return { href: study.href, label: 'Visita il sito', external: true };
    return null;
  }

  export function goTo(id: string) {
    const i = items.findIndex((s) => s.id === id);
    if (i < 0) return;
    const top = track.getBoundingClientRect().top + window.scrollY;
    if (mode === 'scene') {
      measureTotal();
      window.scrollTo({ top: top + total * ((i + 0.5) / items.length), behavior: 'smooth' });
      return;
    }
    const card = document.getElementById(`vetrina-${id}`);
    if (!card) return;
    if (getComputedStyle(sticky).overflowX === 'auto') {
      // telefono: le schede scorrono di lato, la pagina si ferma sulla fila
      window.scrollTo({ top: top - 96, behavior: 'smooth' });
      sticky.scrollTo({ left: card.offsetLeft - parseFloat(getComputedStyle(sticky).paddingLeft), behavior: 'smooth' });
    } else {
      card.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function transition(prev: number, next: number) {
    if (!gsap) return;
    const dir = next > prev ? 1 : -1;
    const out = scenes[prev];
    const inn = scenes[next];
    scenes.forEach((s, i) => {
      if (i !== prev && i !== next) gsap!.set(s, { autoAlpha: 0 });
    });
    gsap.killTweensOf([out, inn]);
    gsap.killTweensOf([...out.querySelectorAll('[data-fx]'), ...inn.querySelectorAll('[data-fx]')]);

    gsap.to(out, { autoAlpha: 0, duration: 0.5, ease: 'power2.inOut' });
    gsap.to(out.querySelectorAll('[data-fx="copy"]'), { y: -34 * dir, autoAlpha: 0, duration: 0.4, ease: 'power2.in' });
    gsap.to(out.querySelector('[data-fx="stage"]'), { y: -44 * dir, scale: 0.94, autoAlpha: 0, duration: 0.5, ease: 'power2.in' });

    gsap.set(inn, { autoAlpha: 1 });
    gsap.fromTo(
      inn.querySelectorAll('[data-fx="copy"]'),
      { y: 46 * dir, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.85, stagger: 0.07, ease: 'power3.out', delay: 0.16 }
    );
    gsap.fromTo(
      inn.querySelector('[data-fx="stage"]'),
      { y: 80 * dir, scale: 0.92, autoAlpha: 0 },
      { y: 0, scale: 1, autoAlpha: 1, duration: 1.05, ease: 'power3.out', delay: 0.1 }
    );
  }

  function setActive(next: number) {
    if (next === active) return;
    const prev = active;
    active = next;
    transition(prev, next);
  }

  function measureTotal() {
    if (track) total = track.offsetHeight - window.innerHeight;
  }

  // Niente letture di layout dentro lo scorrimento: solo la posizione della vetrina e un numero già misurato.
  function measure() {
    ticking = false;
    if (mode !== 'scene' || !track || total <= 0) return;
    const p = Math.min(0.9999, Math.max(0, -track.getBoundingClientRect().top / total));
    progress = p;
    setActive(Math.min(items.length - 1, Math.floor(p * items.length)));
  }

  function onScroll() {
    // fuori dalla vetrina lo scorrimento non deve costare nulla
    if (!near) return;
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(measure);
    }
  }

  function onResize() {
    measureTotal();
    onScroll();
  }

  /** I listener esistono solo mentre la vetrina è a scene: sul telefono lo scorrimento non costa niente. */
  function listen(on: boolean) {
    if (on === listening) return;
    listening = on;
    if (on) {
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onResize, { passive: true });
    } else {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    }
  }

  function prepareScene() {
    scenes = Array.from(sticky.querySelectorAll<HTMLElement>('.scene'));
    gsap!.set(scenes, { autoAlpha: 0 });
    gsap!.set(scenes[active], { autoAlpha: 1 });
    measureTotal();
    measure();
  }

  function teardownScene() {
    if (gsap && scenes.length) {
      scenes.forEach((s) => {
        gsap!.killTweensOf([s, ...s.querySelectorAll('[data-fx]')]);
        gsap!.set([s, ...s.querySelectorAll('[data-fx]')], { clearProps: 'all' });
      });
    }
    scenes = [];
  }

  async function apply() {
    if (mq?.matches) {
      if (!gsap) gsap = (await import('gsap')).default;
      if (!mq.matches) return;
      mode = 'scene';
      await tick();
      prepareScene();
      listen(true);
    } else {
      listen(false);
      teardownScene();
      mode = 'stack';
    }
  }

  onMount(() => {
    mq = window.matchMedia(
      '(min-width: 1024px) and (min-height: 620px) and (prefers-reduced-motion: no-preference)'
    );
    apply();
    mq.addEventListener('change', apply);
    io = new IntersectionObserver(
      ([entry]) => {
        near = entry.isIntersecting;
        if (near) onResize();
      },
      { rootMargin: '300px 0px' }
    );
    if (track) io.observe(track);
  });

  onDestroy(() => {
    if (typeof window === 'undefined') return;
    mq?.removeEventListener('change', apply);
    listen(false);
    io?.disconnect();
    teardownScene();
  });
</script>

<section id="vetrina" class="vt" class:vt--scene={mode === 'scene'}>
  <div class="vt__intro section-container">
    <p class="vt__kicker">01 · I prodotti di punta</p>
    <h2 class="vt__title">Schermate vere,<br /><span class="gradient-text">stato reale.</span></h2>
    <p class="vt__sub">
      Per ogni prodotto: cosa fa, per chi è e dove lo trovi oggi. Sullo store, in prova prima dell'uscita o già in
      uso sul web.
    </p>
    <p class="vt__swipe" aria-hidden="true">Scorri di lato · {items.length} prodotti <span>→</span></p>
  </div>

  <div
    class="vt__track"
    bind:this={track}
    style="--n:{items.length}"
  >
    <div class="vt__sticky" bind:this={sticky}>
      {#each items as study, i (study.id)}
        {@const link = primaryLink(study)}
        <article
          class="scene"
          id={`vetrina-${study.id}`}
          style="--a:{study.accent[0]}; --b:{study.accent[1]}"
          aria-hidden={mode === 'scene' && i !== active ? 'true' : undefined}
        >
          <div class="scene__bg" aria-hidden="true"></div>
          <div class="scene__in section-container">
            <div class="scene__copy">
              <p class="scene__kicker" data-fx="copy">
                <ProjectIcon {study} size={34} />
                <span><b>{pad(i + 1)}</b> / {pad(items.length)}</span>
                <span class="scene__dot" aria-hidden="true">·</span>
                <span>{kindLabels[study.kind]}</span>
              </p>
              <h3 class="scene__name" data-fx="copy">{study.name}</h3>
              <div class="scene__status" data-fx="copy"><StatusBadge status={study.status} /></div>
              <p class="scene__line" data-fx="copy">{study.headline}</p>
              <dl class="scene__facts" data-fx="copy">
                {#if study.audience}
                  <div><dt>Per chi</dt><dd>{study.audience}</dd></div>
                {/if}
                <div><dt>Dove</dt><dd>{study.platform.join(' · ')}</dd></div>
              </dl>
              <div class="scene__cta" data-fx="copy">
                {#if link}
                  <ProButton variant="solid" arrow="up-right" external href={link.href}>{link.label}</ProButton>
                {/if}
                <ProButton variant="ghost" arrow="right" href={caseStudyHref(study)}>Scheda completa</ProButton>
              </div>
            </div>

            <div class="scene__stage" data-fx="stage">
              <ProductDevice {study} eager={i === 0} idle={mode === 'scene' && i !== active} />
            </div>
          </div>
        </article>
      {/each}

      {#if mode === 'scene'}
        <nav class="rail" aria-label="Scegli il prodotto">
          <ul>
            {#each items as study, i (study.id)}
              <li>
                <button
                  type="button"
                  class="rail__btn"
                  class:is-active={i === active}
                  aria-label={study.name}
                  aria-current={i === active ? 'true' : undefined}
                  on:click={() => goTo(study.id)}
                >
                  <ProjectIcon {study} size={38} />
                </button>
              </li>
            {/each}
          </ul>
          <span class="rail__bar" aria-hidden="true"><i style="transform: scaleX({progress})"></i></span>
        </nav>
      {/if}
    </div>
  </div>
</section>

<style>
  .vt {
    position: relative;
    background: #050505;
    color: #fff;
    /* quanto scorrimento dura ogni scena nella vetrina fissa */
    --per: 64;
    --t2: rgba(255, 255, 255, 0.68);
    --line: rgba(255, 255, 255, 0.12);
  }

  .vt__intro {
    padding-top: var(--pg-section-pad);
    padding-bottom: clamp(2rem, 5vw, 3.5rem);
  }

  .vt__kicker {
    margin: 0 0 1.2rem;
    font: 600 0.78rem/1 ui-monospace, SFMono-Regular, Menlo, monospace;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--t2);
  }

  .vt__title {
    margin: 0;
    font-weight: var(--pg-display-weight);
    font-size: var(--pg-title-size);
    line-height: 0.95;
    letter-spacing: var(--pg-display-tracking);
  }

  .vt__swipe {
    display: none;
    margin: 1.1rem 0 0;
    font: 600 0.72rem/1.3 ui-monospace, SFMono-Regular, Menlo, monospace;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--t2);
  }

  .vt__sub {
    margin: 1.4rem 0 0;
    max-width: 38rem;
    font-size: clamp(1rem, 1.4vw, 1.2rem);
    line-height: 1.55;
    color: var(--t2);
  }

  /* ---------- stack (default, mobile, no-JS) ---------- */
  .vt__track {
    display: block;
  }

  .vt__sticky {
    display: flex;
    flex-direction: column;
    gap: 1.4rem;
    padding: 0 var(--container-padding) clamp(3rem, 8vw, 5rem);
    max-width: 44rem;
    margin: 0 auto;
  }

  .scene {
    position: relative;
    overflow: hidden;
    border-radius: 1.6rem;
    border: 1px solid var(--line);
    scroll-margin-top: 6rem;
  }

  .scene__bg {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(70% 55% at 80% 18%, color-mix(in srgb, var(--a) 36%, transparent), transparent 70%),
      radial-gradient(60% 50% at 10% 100%, color-mix(in srgb, var(--b) 48%, transparent), transparent 72%),
      #08080a;
  }

  .scene__in {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1.8rem;
    padding: 1.4rem 1.2rem 1.8rem;
  }

  .scene__stage {
    order: -1;
    padding: 0.4rem 0.2rem 0.9rem;
  }

  .scene__copy {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.9rem;
  }

  .scene__kicker {
    margin: 0;
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font: 600 0.72rem/1 ui-monospace, SFMono-Regular, Menlo, monospace;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--t2);
    white-space: nowrap;
  }

  .scene__kicker b { color: #fff; font-weight: 700; }
  .scene__dot { opacity: 0.5; }

  .scene__name {
    margin: 0;
    font-weight: var(--pg-display-weight);
    font-size: clamp(2.6rem, 9vw, 4rem);
    line-height: 0.95;
    letter-spacing: var(--pg-display-tracking);
    text-wrap: balance;
  }

  .scene__line {
    margin: 0;
    font-size: 1.12rem;
    line-height: 1.45;
    color: rgba(255, 255, 255, 0.9);
    max-width: 34rem;
    text-wrap: pretty;
  }

  .scene__facts {
    display: grid;
    gap: 0.55rem;
    margin: 0.3rem 0 0;
    padding: 0.9rem 0 0;
    border-top: 1px solid var(--line);
    width: 100%;
    max-width: 34rem;
  }

  .scene__facts div {
    display: grid;
    grid-template-columns: 5.5rem 1fr;
    gap: 1rem;
    align-items: baseline;
  }

  .scene__facts dt {
    font: 500 0.7rem/1.3 ui-monospace, SFMono-Regular, Menlo, monospace;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.5);
  }

  .scene__facts dd {
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.4;
    color: rgba(255, 255, 255, 0.88);
  }

  .scene__cta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.7rem;
    margin-top: 0.4rem;
  }

  /* ---------- telefono: le schede scorrono di lato, la pagina resta corta ---------- */
  @media (max-width: 899px) {
    .vt__swipe { display: block; }

    .vt__sticky {
      position: relative;
      flex-direction: row;
      align-items: stretch;
      gap: 0.9rem;
      max-width: none;
      margin: 0;
      padding: 0 var(--container-padding) clamp(2rem, 6vw, 3rem);
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      scroll-padding-inline: var(--container-padding);
      overscroll-behavior-x: contain;
      scrollbar-width: none;
    }

    .vt__sticky::-webkit-scrollbar { display: none; }

    .scene {
      display: flex;
      flex: 0 0 min(86vw, 25rem);
      scroll-snap-align: start;
    }

    .scene__in { flex: 1; gap: 1.1rem; padding: 1rem 1rem 1.3rem; }
    .scene__copy { flex: 1; gap: 0.7rem; }
    .scene__name { font-size: clamp(2.2rem, 9vw, 2.8rem); }
    .scene__line { font-size: 1.02rem; }
    .scene__facts { gap: 0.4rem; padding-top: 0.7rem; }
    .scene__facts div { grid-template-columns: 4.4rem 1fr; gap: 0.6rem; }
    .scene__facts dd { font-size: 0.9rem; }
    .scene__cta { margin-top: auto; padding-top: 0.5rem; }
  }

  /* ---------- scene (desktop) ---------- */
  /* L'altezza della vetrina fissa è data dal CSS fin dal primo disegno (non dal JavaScript): la pagina sotto
     non si sposta quando le scene si accendono. */
  @media (min-width: 1024px) and (min-height: 620px) and (prefers-reduced-motion: no-preference) {
    .vt__track {
      height: calc(var(--n) * var(--per) * 1vh + 100vh);
      height: calc(var(--n) * var(--per) * 1svh + 100svh);
      overflow: clip;
    }
  }

  .vt--scene .vt__sticky {
    position: sticky;
    top: 0;
    display: block;
    height: 100vh;
    height: 100svh;
    max-width: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  .vt--scene .scene {
    position: absolute;
    inset: 0;
    border: 0;
    border-radius: 0;
    visibility: hidden;
  }

  .vt--scene .scene:first-child { visibility: visible; }

  .vt--scene .scene__in {
    height: 100%;
    display: grid;
    grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
    align-items: center;
    gap: clamp(2rem, 4vw, 4.5rem);
    padding-top: 6.4rem;
    padding-bottom: 6.4rem;
  }

  .vt--scene .scene__stage {
    order: 0;
    padding: 0 1.4rem 1.6rem 0;
  }

  .vt--scene .scene__name {
    font-size: clamp(3rem, 6.2vw, 6.4rem);
  }

  .vt--scene .scene__line {
    font-size: clamp(1.05rem, 1.35vw, 1.3rem);
  }

  /* rail */
  .rail {
    position: absolute;
    left: 50%;
    bottom: 1.5rem;
    transform: translateX(-50%);
    z-index: 5;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.6rem;
    padding: 0.6rem 0.8rem 0.7rem;
    border-radius: 1.5rem;
    border: 1px solid var(--line);
    background: rgba(12, 12, 14, 0.82);
  }

  .rail ul {
    display: flex;
    gap: 0.45rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .rail__btn {
    display: block;
    padding: 0;
    border: 0;
    background: none;
    border-radius: 22.37%;
    cursor: pointer;
    opacity: 0.5;
    transform: scale(0.88);
    transition: opacity 0.3s, transform 0.3s;
  }

  .rail__btn:hover { opacity: 0.85; }

  .rail__btn.is-active {
    opacity: 1;
    transform: scale(1.08);
    box-shadow: 0 0 0 2px #fff;
  }

  .rail__btn:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }

  .rail__bar {
    display: block;
    width: 100%;
    height: 2px;
    background: rgba(255, 255, 255, 0.14);
    border-radius: 2px;
    overflow: hidden;
  }

  .rail__bar i {
    display: block;
    height: 100%;
    background: #fff;
    transform-origin: left;
  }
</style>
