<script lang="ts">
  import RevealOnScroll from '$lib/components/RevealOnScroll.svelte';
  import { faqs } from './content';
</script>

<section class="faq" aria-labelledby="faq-titolo">
  <div class="section-container faq__in">
    <RevealOnScroll animation="fly-up" duration={420}>
      <header class="faq__head">
        <p class="faq__kicker">Domande</p>
        <h2 id="faq-titolo" class="faq__title">Quello che ci chiedono di più.</h2>
      </header>
    </RevealOnScroll>

    <RevealOnScroll animation="fly-up" duration={460} delay={60}>
      <div class="faq__list">
        {#each faqs as faq}
          <details>
            <summary>
              <span>{faq.question}</span>
              <i aria-hidden="true"></i>
            </summary>
            <p>{faq.answer}</p>
          </details>
        {/each}
      </div>
    </RevealOnScroll>
  </div>
</section>

<style>
  .faq {
    padding: var(--bf-section-y) 0;
    background: var(--bg-primary);
    color: var(--text-primary);
    border-top: 1px solid var(--border-color);
  }

  .faq__in {
    display: grid;
    gap: clamp(2rem, 5vw, 3.5rem);
  }

  .faq__kicker {
    margin: 0 0 1rem;
    font: 600 0.78rem/1 var(--bf-mono);
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--bf-accent-text);
  }

  .faq__title {
    margin: 0;
    font-weight: 900;
    font-size: clamp(2rem, 4.8vw, 3.4rem);
    line-height: 1.02;
    letter-spacing: -0.03em;
    text-wrap: balance;
  }

  .faq__list {
    border-top: 1px solid var(--border-color);
  }

  details {
    border-bottom: 1px solid var(--border-color);
  }

  summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.2rem;
    min-height: 3.6rem;
    padding: 1.1rem 0;
    cursor: pointer;
    list-style: none;
    font-size: 1.1rem;
    font-weight: 700;
    line-height: 1.3;
  }

  summary::-webkit-details-marker {
    display: none;
  }

  summary:focus-visible {
    outline: 2px solid var(--bf-pink);
    outline-offset: 4px;
    border-radius: 0.4rem;
  }

  summary i {
    position: relative;
    flex: none;
    width: 1.1rem;
    height: 1.1rem;
  }

  summary i::before,
  summary i::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    height: 2px;
    margin-top: -1px;
    border-radius: 2px;
    background: currentColor;
    transition: transform 0.3s var(--bf-ease);
  }

  summary i::after {
    transform: rotate(90deg);
  }

  details[open] summary i::after {
    transform: rotate(0deg);
  }

  details p {
    margin: 0;
    padding: 0 2.4rem 1.4rem 0;
    max-width: 44rem;
    line-height: 1.6;
    color: var(--text-secondary);
  }

  @media (min-width: 960px) {
    .faq__in {
      grid-template-columns: minmax(0, 4fr) minmax(0, 8fr);
      gap: clamp(3rem, 6vw, 6rem);
      align-items: start;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    summary i::before,
    summary i::after {
      transition: none;
    }
  }
</style>
