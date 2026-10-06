<script lang="ts">
  import Icon from './Icon.svelte';
  import RevealOnScroll from '$lib/components/RevealOnScroll.svelte';
  import { teamPoints } from './content';

  /* Esempio illustrativo: tre telefoni sulla stessa partita e la cronologia che ne nasce. */
  const timeline = [
    { moment: 'Inizio', phone: 1, color: 'var(--bf-start)' },
    { moment: 'Gol', phone: 2, color: 'var(--bf-goal)' },
    { moment: 'Azione', phone: 1, color: 'var(--bf-action)' },
    { moment: 'Gol', phone: 3, color: 'var(--bf-goal)' },
    { moment: 'Fischio', phone: 1, color: 'var(--bf-whistle)' },
  ];
</script>

<section class="team" aria-labelledby="team-titolo">
  <div class="section-container team__in">
    <RevealOnScroll animation="fly-up" duration={420}>
      <div class="team__copy">
        <p class="team__kicker"><Icon name="users" size={15} /> Squadre</p>
        <h2 id="team-titolo" class="team__title">Più telefoni.<br />Una partita sola.</h2>
        <p class="team__text">
          Una partita si riprende da più punti: la tribuna, la porta, il bordo campo. Con i team ogni telefono
          registra la sua parte e tutte le clip finiscono nella stessa cronologia, già divise per momento.
        </p>
        <ul class="team__points">
          {#each teamPoints as point}
            <li><Icon name="check" size={16} />{point}</li>
          {/each}
        </ul>
      </div>
    </RevealOnScroll>

    <RevealOnScroll animation="scale" delay={80} duration={480}>
      <div class="team__visual" role="img" aria-label="Esempio: tre telefoni in tre punti del campo mandano le clip alla stessa partita">
        <svg class="pitch" viewBox="0 0 360 250" aria-hidden="true">
          <rect x="20" y="20" width="320" height="210" rx="10" class="pitch__field" />
          <line x1="180" y1="20" x2="180" y2="230" class="pitch__line" />
          <circle cx="180" cy="125" r="28" class="pitch__line" fill="none" />
          <rect x="20" y="75" width="46" height="100" class="pitch__line" fill="none" />
          <rect x="294" y="75" width="46" height="100" class="pitch__line" fill="none" />
          <polygon points="180,236 112,60 248,60" class="pitch__cone" />
          <polygon points="12,125 190,64 190,186" class="pitch__cone" />
          <polygon points="348,34 150,92 214,196" class="pitch__cone" />
          <g class="pitch__phone"><circle cx="180" cy="236" r="11" /><text x="180" y="240" text-anchor="middle">1</text></g>
          <g class="pitch__phone"><circle cx="12" cy="125" r="11" /><text x="12" y="129" text-anchor="middle">2</text></g>
          <g class="pitch__phone"><circle cx="348" cy="34" r="11" /><text x="348" y="38" text-anchor="middle">3</text></g>
        </svg>

        <div class="match" aria-hidden="true">
          <header class="match__head">
            <b>Casa 1 – 1 Ospiti</b>
            <span class="match__seg"><i>Solo gol</i><i class="is-on">Partita</i></span>
          </header>
          <ul>
            {#each timeline as row}
              <li style="--c: {row.color}">
                <i></i>
                <span>{row.moment}</span>
                <small>telefono {row.phone}</small>
              </li>
            {/each}
          </ul>
          <footer><Icon name="film" size={15} /> Montaggio di tutta la partita</footer>
        </div>
        <p class="team__caption">Esempio illustrativo</p>
      </div>
    </RevealOnScroll>
  </div>
</section>

<style>
  .team {
    background: var(--bf-ink);
    color: var(--bf-text);
    padding: var(--bf-section-y) 0;
    border-top: 1px solid var(--bf-line);
  }

  .team__in {
    display: grid;
    gap: clamp(2.5rem, 6vw, 4rem);
    align-items: center;
  }

  .team__kicker {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0 0 1.2rem;
    font: 600 0.78rem/1 var(--bf-mono);
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--bf-pink-text);
  }

  .team__title {
    margin: 0;
    font-weight: 900;
    font-size: clamp(2.3rem, 5.6vw, 4.4rem);
    line-height: 0.98;
    letter-spacing: -0.03em;
  }

  .team__text {
    margin: 1.4rem 0 0;
    max-width: 34rem;
    font-size: 1.08rem;
    line-height: 1.55;
    color: var(--bf-text-2);
  }

  .team__points {
    display: grid;
    gap: 0.6rem;
    margin: 1.6rem 0 0;
    padding: 0;
    list-style: none;
  }

  .team__points li {
    display: flex;
    gap: 0.6rem;
    align-items: flex-start;
    line-height: 1.4;
  }

  .team__points :global(svg) {
    flex: none;
    margin-top: 0.12rem;
    color: var(--bf-pink-text);
  }

  .team__visual {
    display: grid;
    gap: 1rem;
    padding: clamp(1rem, 3vw, 1.6rem);
    border-radius: 1.6rem;
    border: 1px solid var(--bf-line);
    background:
      radial-gradient(70% 60% at 50% 0%, rgba(214, 72, 126, 0.16), transparent 70%),
      var(--bf-ink-2);
  }

  .pitch {
    display: block;
    width: 100%;
    height: auto;
  }

  .pitch__field {
    fill: rgba(60, 150, 90, 0.14);
    stroke: rgba(255, 255, 255, 0.28);
    stroke-width: 1.5;
  }

  .pitch__line {
    stroke: rgba(255, 255, 255, 0.28);
    stroke-width: 1.2;
  }

  .pitch__cone {
    fill: rgba(214, 72, 126, 0.13);
    stroke: rgba(214, 72, 126, 0.55);
    stroke-width: 1;
  }

  .pitch__phone circle {
    fill: #fff;
  }

  .pitch__phone text {
    font: 800 12px/1 'Degular Display', system-ui, sans-serif;
    fill: #0b0b0b;
  }

  .match {
    border-radius: 1.1rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--bf-line);
    overflow: hidden;
  }

  .match__head {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem 1rem;
    align-items: center;
    justify-content: space-between;
    padding: 0.9rem 1rem;
    border-bottom: 1px solid var(--bf-line);
    font-size: 1.02rem;
  }

  .match__seg {
    display: inline-flex;
    padding: 0.2rem;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.08);
  }

  .match__seg i {
    font-style: normal;
    padding: 0.3rem 0.8rem;
    border-radius: 999px;
    font-size: 0.8rem;
    color: var(--bf-text-2);
  }

  .match__seg i.is-on {
    background: #fff;
    color: #0a0a0a;
    font-weight: 700;
  }

  .match ul {
    margin: 0;
    padding: 0.3rem 0;
    list-style: none;
  }

  .match li {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 0.8rem;
    align-items: center;
    padding: 0.62rem 1rem;
  }

  .match li i {
    width: 0.3rem;
    height: 1.5rem;
    border-radius: 0.2rem;
    background: var(--c);
  }

  .match li span {
    font-weight: 700;
  }

  .match li small {
    font: 500 0.76rem/1 var(--bf-mono);
    color: var(--bf-text-2);
  }

  .match footer {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.85rem 1rem;
    border-top: 1px solid var(--bf-line);
    font-size: 0.88rem;
    color: var(--bf-pink-text);
    font-weight: 600;
  }

  .team__caption {
    margin: 0;
    text-align: center;
    font-size: 0.78rem;
    color: var(--bf-text-3);
  }

  @media (min-width: 900px) {
    .team__in {
      grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
      gap: clamp(3rem, 6vw, 6rem);
    }
  }
</style>
