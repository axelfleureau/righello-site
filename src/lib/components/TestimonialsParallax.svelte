<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import { gsap } from '$lib/utils/gsap';
  import RevealOnScroll from './RevealOnScroll.svelte';
  
  export let title = "I clienti parlano di noi";
  export let subtitle = "Testimonianze";
  
  export let testimonials: {
    id: string;
    clientName: string;
    clientRole: string;
    company: string;
    quote: string;
    imageSrc?: string;
  }[] = [];
  
  let container: HTMLElement;
  let row1: HTMLElement;
  let row2: HTMLElement;
  let row3: HTMLElement;
  let ctx: any;
  
  function splitIntoRows(items: typeof testimonials) {
    const third = Math.ceil(items.length / 3);
    return [
      items.slice(0, third),
      items.slice(third, third * 2),
      items.slice(third * 2)
    ];
  }
  
  $: rows = splitIntoRows(testimonials);
  
  onMount(() => {
    if (!browser || typeof window === 'undefined') return;
    
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger);
      
      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          }
        });
        
        tl.to(row1, { x: -150, ease: 'none' }, 0)
          .to(row2, { x: 150, ease: 'none' }, 0)
          .to(row3, { x: -100, ease: 'none' }, 0);
      }, container);
    });
  });
  
  onDestroy(() => {
    if (ctx) ctx.revert();
  });
</script>

<section bind:this={container} class="testimonials-parallax">
  <div class="section-container mb-12">
    <RevealOnScroll animation="fly-up">
      <div class="text-center">
        <p class="text-sm uppercase tracking-[0.2em] text-righello-pink mb-4">{subtitle}</p>
        <h2 class="heading-lg mb-4">{title}</h2>
        <p class="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
          Storie di crescita reale, numeri che parlano
        </p>
      </div>
    </RevealOnScroll>
  </div>
  
  <div class="parallax-container">
    <div bind:this={row1} class="parallax-row">
      {#each rows[0] as testimonial}
        <div class="testimonial-card">
          <div class="card-inner">
            <div class="quote-icon">
              <svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-righello-pink opacity-50">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>
            </div>
            <p class="testimonial-quote">{testimonial.quote}</p>
            <div class="testimonial-author">
              <div class="author-avatar">
                {#if testimonial.imageSrc}
                  <img src={testimonial.imageSrc} alt={testimonial.clientName} />
                {:else}
                  <div class="avatar-placeholder">
                    {testimonial.clientName.charAt(0)}
                  </div>
                {/if}
              </div>
              <div class="author-info">
                <span class="author-name">{testimonial.clientName}</span>
                <span class="author-role">{testimonial.clientRole}, {testimonial.company}</span>
              </div>
            </div>
          </div>
        </div>
      {/each}
      {#each rows[0] as testimonial}
        <div class="testimonial-card">
          <div class="card-inner">
            <div class="quote-icon">
              <svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-righello-pink opacity-50">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>
            </div>
            <p class="testimonial-quote">{testimonial.quote}</p>
            <div class="testimonial-author">
              <div class="author-avatar">
                {#if testimonial.imageSrc}
                  <img src={testimonial.imageSrc} alt={testimonial.clientName} />
                {:else}
                  <div class="avatar-placeholder">
                    {testimonial.clientName.charAt(0)}
                  </div>
                {/if}
              </div>
              <div class="author-info">
                <span class="author-name">{testimonial.clientName}</span>
                <span class="author-role">{testimonial.clientRole}, {testimonial.company}</span>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
    
    <div bind:this={row2} class="parallax-row row-reverse">
      {#each rows[1] as testimonial}
        <div class="testimonial-card">
          <div class="card-inner">
            <div class="quote-icon">
              <svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-righello-pink opacity-50">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>
            </div>
            <p class="testimonial-quote">{testimonial.quote}</p>
            <div class="testimonial-author">
              <div class="author-avatar">
                {#if testimonial.imageSrc}
                  <img src={testimonial.imageSrc} alt={testimonial.clientName} />
                {:else}
                  <div class="avatar-placeholder">
                    {testimonial.clientName.charAt(0)}
                  </div>
                {/if}
              </div>
              <div class="author-info">
                <span class="author-name">{testimonial.clientName}</span>
                <span class="author-role">{testimonial.clientRole}, {testimonial.company}</span>
              </div>
            </div>
          </div>
        </div>
      {/each}
      {#each rows[1] as testimonial}
        <div class="testimonial-card">
          <div class="card-inner">
            <div class="quote-icon">
              <svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-righello-pink opacity-50">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>
            </div>
            <p class="testimonial-quote">{testimonial.quote}</p>
            <div class="testimonial-author">
              <div class="author-avatar">
                {#if testimonial.imageSrc}
                  <img src={testimonial.imageSrc} alt={testimonial.clientName} />
                {:else}
                  <div class="avatar-placeholder">
                    {testimonial.clientName.charAt(0)}
                  </div>
                {/if}
              </div>
              <div class="author-info">
                <span class="author-name">{testimonial.clientName}</span>
                <span class="author-role">{testimonial.clientRole}, {testimonial.company}</span>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
    
    <div bind:this={row3} class="parallax-row">
      {#each rows[2] as testimonial}
        <div class="testimonial-card">
          <div class="card-inner">
            <div class="quote-icon">
              <svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-righello-pink opacity-50">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>
            </div>
            <p class="testimonial-quote">{testimonial.quote}</p>
            <div class="testimonial-author">
              <div class="author-avatar">
                {#if testimonial.imageSrc}
                  <img src={testimonial.imageSrc} alt={testimonial.clientName} />
                {:else}
                  <div class="avatar-placeholder">
                    {testimonial.clientName.charAt(0)}
                  </div>
                {/if}
              </div>
              <div class="author-info">
                <span class="author-name">{testimonial.clientName}</span>
                <span class="author-role">{testimonial.clientRole}, {testimonial.company}</span>
              </div>
            </div>
          </div>
        </div>
      {/each}
      {#each rows[2] as testimonial}
        <div class="testimonial-card">
          <div class="card-inner">
            <div class="quote-icon">
              <svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-righello-pink opacity-50">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>
            </div>
            <p class="testimonial-quote">{testimonial.quote}</p>
            <div class="testimonial-author">
              <div class="author-avatar">
                {#if testimonial.imageSrc}
                  <img src={testimonial.imageSrc} alt={testimonial.clientName} />
                {:else}
                  <div class="avatar-placeholder">
                    {testimonial.clientName.charAt(0)}
                  </div>
                {/if}
              </div>
              <div class="author-info">
                <span class="author-name">{testimonial.clientName}</span>
                <span class="author-role">{testimonial.clientRole}, {testimonial.company}</span>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .testimonials-parallax {
    padding: var(--section-padding-sm) 0;
    overflow: hidden;
  }
  
  @media (min-width: 768px) {
    .testimonials-parallax {
      padding: var(--section-padding-md) 0;
    }
  }
  
  @media (min-width: 1024px) {
    .testimonials-parallax {
      padding: var(--section-padding-lg) 0;
    }
  }
  
  .parallax-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    max-width: 100vw;
    overflow: hidden;
  }
  
  .parallax-row {
    display: flex;
    gap: 1.5rem;
    width: max-content;
    will-change: transform;
  }
  
  .row-reverse {
    transform: translateX(-100px);
  }
  
  .testimonial-card {
    flex-shrink: 0;
    width: 350px;
  }
  
  @media (max-width: 640px) {
    .testimonial-card {
      width: 280px;
    }
  }
  
  .card-inner {
    padding: 1.5rem;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 1.25rem;
    height: 100%;
    transition: all 0.3s ease;
  }
  
  .card-inner:hover {
    border-color: rgba(214, 72, 126, 0.3);
    box-shadow: 0 10px 40px rgba(214, 72, 126, 0.1);
    transform: translateY(-4px);
  }
  
  :global([data-theme="light"]) .card-inner {
    background: white;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  }
  
  .quote-icon {
    margin-bottom: 1rem;
  }
  
  .testimonial-quote {
    font-size: 0.9375rem;
    line-height: 1.6;
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
  }
  
  .testimonial-author {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  
  .author-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;
  }
  
  .author-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .avatar-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #D6487E, #06B6D4);
    color: white;
    font-weight: 600;
    font-size: 1rem;
  }
  
  .author-info {
    display: flex;
    flex-direction: column;
  }
  
  .author-name {
    font-weight: 600;
    font-size: 0.875rem;
    color: var(--text-primary);
  }
  
  .author-role {
    font-size: 0.75rem;
    color: var(--text-secondary);
  }
  
  @media (prefers-reduced-motion: reduce) {
    .parallax-row {
      animation: none !important;
      transform: none !important;
    }
  }
</style>
