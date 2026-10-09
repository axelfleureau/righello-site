<script lang="ts">
  import { reveal } from '../progetti/landing/actions';
  import type { PageModel } from './types';

  export let note: NonNullable<PageModel['note']>;
</script>

<aside class="sn-note" aria-label={note.title}>
  <div class="section-container">
    <div class="sn-note__row lp-reveal" use:reveal>
      <div class="sn-note__copy">
        <p class="lp-kicker">{note.kicker}</p>
        <p class="sn-note__title">{note.title}</p>
        <p class="sn-note__text">{note.text}</p>
      </div>
      <a class="sn-note__link" href={note.link.href}>{note.link.label} <span aria-hidden="true">→</span></a>
    </div>
  </div>
</aside>

<style>
  .sn-note { padding: clamp(2rem, 4vw, 3rem) 0; }
  .sn-note__row { display: flex; flex-direction: column; gap: 1.2rem; padding: clamp(1.4rem, 3vw, 2rem) 0; border-block: 1px solid var(--lp-line-strong); }
  @media (min-width: 800px) { .sn-note__row { flex-direction: row; align-items: center; justify-content: space-between; gap: 3rem; } }
  .sn-note__copy { display: flex; flex-direction: column; gap: 0.7rem; align-items: flex-start; max-width: 44rem; }
  .sn-note__title { margin: 0; font-weight: var(--pg-display-weight); font-size: clamp(1.35rem, 2.4vw, 1.8rem); line-height: 1.15; letter-spacing: var(--pg-display-tracking); }
  .sn-note__text { margin: 0; font-size: 0.98rem; line-height: 1.55; color: var(--lp-ink-2); text-wrap: pretty; }
  .sn-note__link { flex: none; display: inline-flex; align-items: center; gap: 0.5rem; min-height: 2.75rem; font-weight: 600; color: var(--lp-ink); text-decoration: none; border-bottom: 1px solid var(--lp-line-strong); align-self: flex-start; }
  .sn-note__link:hover { border-color: #fff; }
</style>
