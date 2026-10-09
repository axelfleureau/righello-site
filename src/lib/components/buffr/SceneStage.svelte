<script lang="ts">
  import { onMount, onDestroy, tick } from 'svelte';
  import Icon from './Icon.svelte';
  import type { SceneCopy } from './content';

  export let scenes: SceneCopy[];

  /* Scene sticky senza pin GSAP: sopra i 1024px il track è alto n schermate e la scena attiva
     dipende dallo scroll. Su mobile, senza JS o con movimento ridotto le scene si impilano. */
  let mode: 'stack' | 'scene' = 'stack';
  let track: HTMLElement;
  let active = 0;
  let local = 0;
  let ticking = false;
  let mq: MediaQueryList | null = null;
  let reduced = false;
  let ready = false; // le transizioni partono solo dopo il primo passaggio, per non vedere il cambio di modalità

  /* in modalità impilata ogni scena si anima una volta quando entra in vista;
     di partenza (senza JS) mostra lo stato finale */
  let locals = scenes.map(() => 1);
  let posters: HTMLElement[] = [];
  let io: IntersectionObserver | null = null;
  let destroyed = false;

  const clamp = (v: number) => Math.min(1, Math.max(0, v));

  /** Scorrimento che attraversa tutte le scene: si misura al ridimensionamento, non a ogni fotogramma. */
  let total = 0;
  let listening = false;

  function measureTotal() {
    if (track) total = track.offsetHeight - window.innerHeight;
  }

  function measure() {
    ticking = false;
    if (mode !== 'scene' || !track || total <= 0) return;
    const rect = track.getBoundingClientRect();
    const p = Math.min(0.9999, clamp(-rect.top / total));
    const n = scenes.length;
    active = Math.min(n - 1, Math.floor(p * n));
    local = clamp((p * n - active) / 0.85);
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(measure);
  }

  function onResize() {
    measureTotal();
    onScroll();
  }

  /** I listener ci sono solo con le scene fisse: sul telefono lo scorrimento non costa niente. */
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

  export function goTo(i: number) {
    if (mode === 'scene') {
      const top = track.getBoundingClientRect().top + window.scrollY;
      measureTotal();
      window.scrollTo({ top: top + total * ((i + 0.35) / scenes.length), behavior: 'smooth' });
    } else {
      document.getElementById(`scena-${scenes[i].id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function play(i: number) {
    const start = performance.now();
    const duration = 4200;
    const step = (now: number) => {
      locals[i] = clamp((now - start) / duration);
      locals = locals;
      if (locals[i] < 1 && !destroyed) requestAnimationFrame(step);
    };
    locals[i] = 0;
    locals = locals;
    requestAnimationFrame(step);
  }

  /* Impilato: ogni scena resta nello stato finale finché non entra in vista, poi si anima una volta.
     Così, se l'osservatore non scatta (o senza JS), la pagina è comunque leggibile. */
  function watchPosters() {
    io?.disconnect();
    locals = scenes.map(() => 1);
    if (reduced || mode !== 'stack') return;
    io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const i = posters.indexOf(entry.target as HTMLElement);
          io?.unobserve(entry.target);
          if (i >= 0) play(i);
        });
      },
      { threshold: 0.45 }
    );
    posters.forEach((el) => el && io!.observe(el));
  }

  async function apply() {
    mode = mq?.matches ? 'scene' : 'stack';
    await tick();
    setTimeout(() => (ready = true), 60);
    if (mode === 'scene') {
      io?.disconnect();
      measureTotal();
      measure();
      listen(true);
    } else {
      listen(false);
      watchPosters();
    }
  }

  onMount(() => {
    reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    mq = window.matchMedia('(min-width: 1024px) and (min-height: 620px) and (prefers-reduced-motion: no-preference)');
    apply();
    mq.addEventListener('change', apply);
  });

  onDestroy(() => {
    if (typeof window === 'undefined') return;
    mq?.removeEventListener('change', apply);
    listen(false);
    io?.disconnect();
    destroyed = true;
  });
</script>

<section id="funziona" class="st" class:st--scene={mode === 'scene'} class:st--ready={ready} aria-label="Come funziona BUFFR">
  <div class="st__track" bind:this={track} style="--n:{scenes.length}">
    <div class="st__sticky">
      <div class="st__bg" aria-hidden="true"></div>

      <div class="st__in">
      <div class="st__copy-col">
        {#each scenes as scene, i (scene.id)}
          <article
            class="copy"
            class:is-active={mode === 'scene' && i === active}
            id={`scena-${scene.id}`}
            aria-hidden={mode === 'scene' && i !== active ? 'true' : undefined}
          >
            <p class="copy__kicker"><b>{String(i + 1).padStart(2, '0')}</b> / {String(scenes.length).padStart(2, '0')} · {scene.kicker}</p>
            <h2 class="copy__title">{scene.title}</h2>
            <p class="copy__text">{scene.text}</p>
            <ul class="copy__points">
              {#each scene.points as point}
                <li><Icon name="check" size={16} />{point}</li>
              {/each}
            </ul>

            {#if mode === 'stack'}
              <div class="copy__poster" bind:this={posters[i]}>
                <slot name="poster" index={i} local={locals[i]} />
              </div>
            {/if}
          </article>
        {/each}
      </div>

      {#if mode === 'scene'}
        <div class="st__stage">
          <slot name="stage" index={active} {local} />
        </div>
      {/if}
      </div>

      {#if mode === 'scene'}
        <nav class="rail" aria-label="Scegli la scena">
          {#each scenes as scene, i (scene.id)}
            <button
              type="button"
              class="rail__btn"
              class:is-active={i === active}
              aria-current={i === active ? 'true' : undefined}
              on:click={() => goTo(i)}
            >
              <span>{String(i + 1).padStart(2, '0')}</span>{scene.short}
            </button>
          {/each}
        </nav>
      {/if}
    </div>
  </div>
</section>

<style>
  .st {
    position: relative;
    background: var(--bf-ink);
    color: var(--bf-text);
  }

  .st__bg {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(60% 50% at 82% 30%, rgba(214, 72, 126, 0.16), transparent 70%),
      radial-gradient(50% 45% at 8% 100%, rgba(122, 43, 143, 0.2), transparent 72%);
    pointer-events: none;
  }

  /* ---------- impilato: mobile, senza JS, movimento ridotto ---------- */
  .st__sticky {
    position: relative;
  }

  .st__in {
    position: relative;
    display: grid;
    gap: clamp(3.5rem, 9vw, 5rem);
    padding: clamp(4rem, 9vw, 6rem) var(--container-padding);
    max-width: 44rem;
    margin: 0 auto;
    box-sizing: border-box;
  }

  .st__copy-col {
    display: grid;
    gap: clamp(4rem, 10vw, 6rem);
  }

  .copy {
    display: grid;
    gap: 1rem;
    scroll-margin-top: 6rem;
  }

  .copy__kicker {
    margin: 0;
    font: 600 0.74rem/1.3 var(--bf-mono);
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--bf-text-2);
  }

  .copy__kicker b {
    color: var(--bf-pink-text);
  }

  .copy__title {
    margin: 0;
    font-weight: 900;
    font-size: clamp(2rem, 8.5vw, 3rem);
    line-height: 1;
    letter-spacing: -0.03em;
    text-wrap: balance;
  }

  .copy__text {
    margin: 0;
    font-size: 1.06rem;
    line-height: 1.55;
    color: var(--bf-text-2);
    max-width: 34rem;
    text-wrap: pretty;
  }

  .copy__points {
    display: grid;
    gap: 0.5rem;
    margin: 0.3rem 0 0;
    padding: 0;
    list-style: none;
  }

  .copy__points li {
    display: flex;
    align-items: flex-start;
    gap: 0.6rem;
    font-size: 0.98rem;
    line-height: 1.4;
    color: var(--bf-text);
  }

  .copy__points :global(svg) {
    flex: none;
    margin-top: 0.12rem;
    color: var(--bf-pink-text);
  }

  .copy__poster {
    margin-top: 1.6rem;
    padding: 1.6rem 0.5rem 0.4rem;
    border-radius: 1.6rem;
    border: 1px solid var(--bf-line);
    background:
      radial-gradient(70% 55% at 50% 0%, rgba(214, 72, 126, 0.2), transparent 70%),
      var(--bf-ink-2);
  }

  .st__stage,
  .rail {
    display: none;
  }

  /* ---------- scene sticky (desktop) ---------- */
  /* L'altezza delle scene fisse è data dal CSS fin dal primo disegno: la pagina sotto non si sposta
     quando il JavaScript le accende. */
  @media (min-width: 1024px) and (min-height: 620px) and (prefers-reduced-motion: no-preference) {
    .st__track {
      height: calc(var(--n) * 95vh + 100vh);
      height: calc(var(--n) * 95svh + 100svh);
      overflow: clip;
    }
  }

  .st--scene .st__sticky {
    position: sticky;
    top: 0;
    height: 100vh;
    height: 100svh;
    overflow: hidden;
  }

  .st--scene .st__in {
    height: 100%;
    max-width: var(--container-max);
    padding: 6.2rem var(--space-lg) 6.4rem;
    grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
    align-items: center;
    gap: clamp(2rem, 4vw, 4rem);
  }

  .st--scene .st__copy-col {
    position: relative;
    display: block;
    height: 100%;
  }

  .st--scene .copy {
    position: absolute;
    inset: 0;
    align-content: center;
    opacity: 0;
    visibility: hidden;
    translate: 0 1.6rem;
  }

  .st--ready .copy {
    transition:
      opacity 0.5s,
      translate 0.7s var(--bf-ease),
      visibility 0s linear 0.5s;
  }

  .st--scene .copy.is-active {
    opacity: 1;
    visibility: visible;
    translate: 0 0;
  }

  .st--ready .copy.is-active {
    transition-delay: 0.12s, 0.12s, 0s;
  }

  .st--scene .copy__title {
    font-size: clamp(2.4rem, 4.4vw, 4.2rem);
  }

  .st--scene .copy__text {
    font-size: clamp(1.02rem, 1.25vw, 1.2rem);
  }

  .st--scene .st__stage {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .st--scene .rail {
    position: absolute;
    left: 50%;
    bottom: 1.4rem;
    translate: -50% 0;
    z-index: 5;
    display: flex;
    gap: 0.4rem;
    padding: 0.4rem;
    border-radius: 999px;
    border: 1px solid var(--bf-line);
    background: rgba(12, 12, 14, 0.9);
  }

  .rail__btn {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    min-height: 2.75rem;
    padding: 0 1.1rem 0 0.8rem;
    border: 0;
    border-radius: 999px;
    background: transparent;
    color: var(--bf-text-2);
    font: 600 0.84rem/1 inherit;
    white-space: nowrap;
    cursor: pointer;
    transition:
      background 0.25s,
      color 0.25s;
  }

  .rail__btn span {
    font: 700 0.7rem/1 var(--bf-mono);
    color: var(--bf-pink-text);
  }

  .rail__btn:hover {
    color: #fff;
  }

  .rail__btn.is-active {
    background: #fff;
    color: #0a0a0a;
  }

  .rail__btn.is-active span {
    color: var(--bf-pink);
  }

  .rail__btn:focus-visible {
    outline: 2px solid var(--bf-pink-text);
    outline-offset: 2px;
  }
</style>
