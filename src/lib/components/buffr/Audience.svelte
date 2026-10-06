<script lang="ts">
  import Icon from './Icon.svelte';
  import RevealOnScroll from '$lib/components/RevealOnScroll.svelte';
  import { audiences } from './content';
</script>

<section class="aud" aria-labelledby="chi-titolo">
  <div class="section-container">
    <RevealOnScroll animation="fly-up" duration={420}>
      <header class="aud__head">
        <p class="aud__kicker">Per chi è</p>
        <h2 id="chi-titolo" class="aud__title">Per chi non può dire all’azione di aspettare.</h2>
      </header>
    </RevealOnScroll>

    <RevealOnScroll animation="fly-up" duration={460} delay={60}>
      <ul class="aud__grid">
        {#each audiences as item}
          <li class="aud__card">
            <span class="aud__icon"><Icon name={item.icon} size={22} /></span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </li>
        {/each}
      </ul>
    </RevealOnScroll>
  </div>
</section>

<style>
  .aud {
    padding: var(--bf-section-y) 0;
    background: var(--bg-secondary);
    color: var(--text-primary);
    border-top: 1px solid var(--border-color);
  }

  .aud__head {
    max-width: 42rem;
    margin-bottom: clamp(2rem, 5vw, 3.2rem);
  }

  .aud__kicker {
    margin: 0 0 1rem;
    font: 600 0.78rem/1 var(--bf-mono);
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--bf-accent-text);
  }

  .aud__title {
    margin: 0;
    font-weight: 900;
    font-size: clamp(2rem, 4.8vw, 3.4rem);
    line-height: 1.02;
    letter-spacing: -0.03em;
    text-wrap: balance;
  }

  .aud__grid {
    display: grid;
    gap: 1rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .aud__card {
    padding: 1.6rem;
    border-radius: 1.4rem;
    border: 1px solid var(--border-color);
    background: var(--bg-primary);
  }

  .aud__icon {
    display: grid;
    place-items: center;
    width: 2.7rem;
    height: 2.7rem;
    margin-bottom: 1.1rem;
    border-radius: 0.8rem;
    background: color-mix(in srgb, var(--bf-pink) 14%, transparent);
    color: var(--bf-pink);
  }

  .aud__card h3 {
    margin: 0 0 0.5rem;
    font-size: 1.3rem;
    font-weight: 800;
    letter-spacing: -0.01em;
  }

  .aud__card p {
    margin: 0;
    line-height: 1.55;
    color: var(--text-secondary);
  }

  @media (min-width: 860px) {
    .aud__grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
</style>
