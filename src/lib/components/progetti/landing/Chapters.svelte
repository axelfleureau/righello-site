<script lang="ts">
  import type { Chapter, LandingVariant } from '$lib/data/landing/types';
  import SectionHead from './SectionHead.svelte';
  import MediaFrame from './MediaFrame.svelte';
  import { mediaArrangement, ratioOf, resolveChapterLayouts } from './layout';
  import { reveal } from './actions';

  export let chapters: Chapter[];
  export let variant: LandingVariant | undefined = undefined;
  /** Posizione nella pagina: i capitoli alternano il tono dello sfondo a partire da qui. */
  export let tone = 0;

  /** Senza `layout` il media si alterna; senza media il capitolo e' una colonna stretta centrata. */
  $: layouts = resolveChapterLayouts(chapters);

  const hasPhone = (c: Chapter) => !!c.media?.some((m) => m.frame === 'phone');
  /** Un telefono vale la sua altezza massima; monitor e browser prendono la colonna intera fino al loro tetto. */
  const maxHOf = (m: { frame?: string }) => (m.frame === 'phone' ? 'var(--lp-vis-phone)' : 'var(--lp-vis-chapter)');
  /** Punti in riga: tre in fila, quattro 2x2, due affiancati. */
  const bulletCols = (n: number) => (n === 4 ? 2 : Math.min(n, 3));
</script>

<div id="panoramica" class="chs">
  {#each chapters as c, i (c.id)}
    {@const layout = layouts[i]}
    {@const media = c.media ?? []}
    {@const arr = media.length ? mediaArrangement(media) : 'single'}
    <article class="ch ch--{layout} lp-section" class:lp-tone-alt={(tone + i) % 2 === 1} class:ch--bc={variant === 'broadcast'} id={c.id}>
      <div class="section-container ch__grid">
        <div class="ch__copy">
          <SectionHead kicker={c.kicker} title={c.title} highlight={c.highlight} align={layout === 'text' || layout === 'full' ? 'center' : 'left'} />
          <p class="ch__text lp-reveal" use:reveal={80}>{c.text}</p>
          {#if c.bullets?.length}
            <ul class="ch__bullets" style="--nb:{bulletCols(c.bullets.length)}">
              {#each c.bullets as b, k}
                <li class="lp-reveal" use:reveal={140 + k * 70}>{b}</li>
              {/each}
            </ul>
          {/if}
        </div>
        {#if media.length}
          <div
            class="ch__media ch__media--{arr} lp-reveal"
            class:ch__media--plate={hasPhone(c)}
            class:ch__media--phones={media.every((m) => m.frame === 'phone')}
            use:reveal={120}>
            {#each media as m}
              <div class="ch__item" class:ch__item--phone={m.frame === 'phone'} style="--r:{(ratioOf(m) * 100).toFixed(1)}">
                <MediaFrame media={m} maxH={maxHOf(m)} />
              </div>
            {/each}
          </div>
        {/if}
      </div>
    </article>
  {/each}
</div>

<style>
  .chs { position: relative; scroll-margin-top: calc(var(--lp-nav-top) + 3.4rem); }

  .ch__grid { display: grid; gap: clamp(2rem, 5vw, 4rem); align-items: center; }

  @media (min-width: 960px) {
    .ch--media-right .ch__grid { grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); }
    .ch--media-left .ch__grid { grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); }
    .ch--media-left .ch__copy { order: 2; }
    .ch--media-left .ch__media { order: 1; }
    /* piattaforme di trasmissione: il monitor ha piu' spazio del testo */
    .ch--bc.ch--media-right .ch__grid { grid-template-columns: minmax(0, 4fr) minmax(0, 8fr); }
    .ch--bc.ch--media-left .ch__grid { grid-template-columns: minmax(0, 8fr) minmax(0, 4fr); }
  }

  .ch__copy { display: flex; flex-direction: column; gap: 1.3rem; min-width: 0; }

  .ch__text { margin: 0; max-width: 36rem; font-size: clamp(1.02rem, 1.3vw, 1.15rem); line-height: 1.6; color: var(--lp-ink-2); text-wrap: pretty; }

  .ch__bullets { margin: 0.2rem 0 0; padding: 0; list-style: none; display: grid; gap: 0.7rem; max-width: 36rem; }

  .ch__bullets li {
    position: relative;
    padding-left: 1.7rem;
    font-size: 0.98rem;
    line-height: 1.45;
    font-weight: 600;
    color: var(--lp-ink);
  }
  .ch__bullets li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.5em;
    width: 0.7rem;
    height: 0.7rem;
    border-radius: 50%;
    border: 2px solid var(--b);
    background: color-mix(in srgb, var(--a) 70%, transparent);
  }

  /* ---------- media ---------- */
  .ch__media { display: grid; gap: var(--lp-gap); min-width: 0; align-content: center; justify-items: center; }
  .ch__item { width: 100%; min-width: 0; }

  /* piu' media in riga: la larghezza segue il rapporto, cosi' hanno tutti la stessa altezza */
  .ch__media--row { display: flex; align-items: center; justify-content: center; flex-wrap: nowrap; }
  .ch__media--row .ch__item { flex: calc(var(--r)) 1 0%; }
  /* un telefono con un monitor: sotto i 640 px uno sotto l'altro, ognuno con il suo tetto */
  @media (max-width: 639px) {
    .ch__media--row:not(.ch__media--phones) { flex-direction: column; }
    .ch__media--row:not(.ch__media--phones) .ch__item { flex: none; }
  }

  /* palco del telefono: un riquadro con la luce del prodotto, cosi' un telefono solo non resta perso nella colonna */
  .ch__media--plate {
    padding: clamp(1.4rem, 3.4vw, 2.6rem) clamp(1rem, 3vw, 2.2rem);
    border: 1px solid var(--lp-line);
    border-radius: var(--lp-radius);
    background:
      radial-gradient(70% 60% at 25% 20%, color-mix(in srgb, var(--a) 30%, transparent), transparent 70%),
      radial-gradient(70% 60% at 80% 90%, color-mix(in srgb, var(--b) 28%, transparent), transparent 72%),
      var(--lp-surface);
  }

  /* il telefono accanto a un monitor e' piu' alto di lui; nei prodotti per il pubblico domina */
  .ch__media--row .ch__item--phone { flex-grow: calc(var(--r) * 1.35); }
  :global(.lp--app) .ch__media--row .ch__item--phone { flex-grow: calc(var(--r) * 1.8); }
  :global(.lp--app) .ch__media--row:not(.ch__media--phones) .ch__item--phone { order: -1; }
  :global(.lp--app) .ch__media--row:not(.ch__media--phones) .ch__item:not(.ch__item--phone) { transform: scale(0.88); }

  /* ---------- a tutta larghezza: il testo al centro, il media sotto ---------- */
  .ch--full .ch__grid, .ch--text .ch__grid { grid-template-columns: minmax(0, 1fr); justify-items: center; }
  .ch--full .ch__copy, .ch--text .ch__copy { align-items: center; text-align: center; width: 100%; max-width: 44rem; }
  .ch--full .ch__text, .ch--text .ch__text { max-width: 38rem; }
  .ch--full .ch__media { width: 100%; max-width: 64rem; }
  /* due o tre schermate piatte a tutta larghezza: affiancate, non una sotto l'altra (la sezione resterebbe altissima) */
  @media (min-width: 720px) {
    .ch--full .ch__media--stack { grid-template-columns: repeat(auto-fit, minmax(min(100%, 24rem), 1fr)); align-items: start; }
  }

  /* capitolo solo testo: i punti non sono un muro, stanno in riga come tre tacche sotto il testo */
  .ch--text .ch__copy { max-width: 62rem; gap: 1.4rem; }
  .ch--text .ch__bullets, .ch--full .ch__bullets {
    width: 100%;
    max-width: 62rem;
    margin-top: 0.6rem;
    gap: 1.6rem var(--lp-gap);
    text-align: left;
  }
  @media (min-width: 720px) {
    .ch--text .ch__bullets, .ch--full .ch__bullets { grid-template-columns: repeat(var(--nb), minmax(0, 1fr)); }
  }
  .ch--text .ch__bullets li, .ch--full .ch__bullets li {
    padding: 1.1rem 0 0;
    border-top: 1px solid var(--lp-line-strong);
  }
  .ch--text .ch__bullets li::before, .ch--full .ch__bullets li::before { left: 0; top: -0.38rem; }
</style>
