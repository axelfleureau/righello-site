<script lang="ts">
  import type { Chapter } from '$lib/data/landing/types';
  import SectionHead from './SectionHead.svelte';
  import MediaFrame from './MediaFrame.svelte';
  import { reveal } from './actions';

  export let chapters: Chapter[];

  /** Senza `layout` il media si alterna: destra, sinistra, destra... */
  const layoutOf = (c: Chapter, i: number) => c.layout ?? (i % 2 === 0 ? 'media-right' : 'media-left');
</script>

<div id="panoramica" class="chs">
  {#each chapters as c, i (c.id)}
    {@const layout = layoutOf(c, i)}
    <article class="ch ch--{layout} lp-section" id={c.id}>
      <div class="section-container ch__grid">
        <div class="ch__copy">
          <SectionHead kicker={c.kicker} title={c.title} highlight={c.highlight} />
          <p class="ch__text lp-reveal" use:reveal={80}>{c.text}</p>
          {#if c.bullets?.length}
            <ul class="ch__bullets">
              {#each c.bullets as b, k}
                <li class="lp-reveal" use:reveal={140 + k * 70}>{b}</li>
              {/each}
            </ul>
          {/if}
        </div>
        {#if c.media?.length}
          <div class="ch__media lp-reveal" class:ch__media--multi={c.media.length > 1} use:reveal={120}>
            {#each c.media as m}
              <MediaFrame media={m} />
            {/each}
          </div>
        {/if}
      </div>
    </article>
  {/each}
</div>

<style>
  .chs { position: relative; scroll-margin-top: calc(var(--lp-nav-top) + 3.4rem); }

  /* fra un capitolo e il successivo, una sola linea sottile */
  .ch + .ch { border-top: 1px solid var(--lp-line); }

  .ch__grid { display: grid; gap: clamp(2rem, 5vw, 4rem); align-items: center; }

  @media (min-width: 960px) {
    .ch--media-right .ch__grid { grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); }
    .ch--media-left .ch__grid { grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); }
    .ch--media-left .ch__copy { order: 2; }
    .ch--media-left .ch__media { order: 1; }
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

  .ch__media { display: grid; gap: var(--lp-gap); min-width: 0; align-content: center; }
  .ch__media--multi { grid-template-columns: repeat(auto-fit, minmax(min(100%, 13rem), 1fr)); align-items: start; }

  /* capitolo a tutta larghezza: il testo sopra, il media sotto, entrambi su tutta la colonna */
  .ch--full .ch__grid { grid-template-columns: minmax(0, 1fr); }
  .ch--full .ch__copy { max-width: 46rem; }
</style>
