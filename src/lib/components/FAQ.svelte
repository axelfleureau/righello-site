<script lang="ts">
  import { slide } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { homeFaqs } from '$lib/data/faqs/home';
  
  export let title = "Domande frequenti";
  export let subtitle = "FAQ";
  
  const faqs = homeFaqs;

  
  let openIndex: number | null = null;
  
  function toggle(index: number) {
    openIndex = openIndex === index ? null : index;
  }
</script>

<section class="faq-section">
  <div class="section-container">
    <div class="text-center mb-16">
      <p class="text-sm uppercase tracking-[0.2em] text-righello-pink mb-4 font-medium">
        {subtitle}
      </p>
      <h2 class="heading-lg">
        {title.split(' ').slice(0, -1).join(' ')} <span class="gradient-text">{title.split(' ').slice(-1)}</span>
      </h2>
    </div>
    
    <div class="faq-list">
      {#each faqs as faq, i}
        <div class="faq-item" class:open={openIndex === i}>
          <button 
            class="faq-question"
            on:click={() => toggle(i)}
            aria-expanded={openIndex === i}
            aria-controls="faq-answer-{i}"
          >
            <span class="question-text">{faq.question}</span>
            <span class="question-icon">
              <svg 
                class="w-5 h-5 transition-transform duration-300" 
                class:rotate-180={openIndex === i}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </button>
          
          {#if openIndex === i}
            <div 
              id="faq-answer-{i}"
              class="faq-answer"
              transition:slide={{ duration: 300, easing: cubicOut }}
            >
              <p>{faq.answer}</p>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .faq-section {
    padding: var(--section-padding-sm) 0;
    position: relative;
  }
  
  @media (min-width: 768px) {
    .faq-section {
      padding: var(--section-padding-md) 0;
    }
  }
  
  @media (min-width: 1024px) {
    .faq-section {
      padding: var(--section-padding-lg) 0;
    }
  }
  
  .faq-list {
    max-width: var(--container-max, 1280px);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .faq-item {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 1rem;
    overflow: hidden;
    transition: all 0.3s ease;
  }
  
  :global([data-theme="light"]) .faq-item {
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid var(--border-color);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  }
  
  .faq-item:hover {
    border-color: rgba(214, 72, 126, 0.3);
  }
  
  .faq-item.open {
    border-color: rgba(214, 72, 126, 0.5);
    background: rgba(214, 72, 126, 0.05);
  }
  
  .faq-question {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1.5rem;
    text-align: left;
    cursor: pointer;
    background: transparent;
    border: none;
    color: var(--text-primary);
    font-size: 1.0625rem;
    font-weight: 500;
    transition: all 0.3s ease;
  }
  
  .faq-question:hover {
    color: #D6487E;
  }
  
  .question-text {
    flex: 1;
  }
  
  .question-icon {
    flex-shrink: 0;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #D6487E;
    transition: all 0.3s ease;
  }
  
  :global([data-theme="light"]) .question-icon {
    background: rgba(214, 72, 126, 0.1);
  }
  
  .faq-item.open .question-icon {
    background: linear-gradient(135deg, #D6487E, #06B6D4);
    color: white;
  }
  
  .faq-answer {
    padding: 0 1.5rem 1.5rem;
  }
  
  .faq-answer p {
    color: var(--text-secondary);
    line-height: 1.7;
    font-size: 0.9375rem;
  }
</style>
