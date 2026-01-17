<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import { gsap, ScrollTrigger } from '$lib/utils/gsap';
  
  export let slides: {
    title: string;
    subtitle?: string;
    description: string;
    image?: string;
    stats?: { value: string; label: string }[];
  }[] = [];
  
  let container: HTMLElement;
  let phone: HTMLElement;
  let contentElements: HTMLElement[] = [];
  let currentSlide = 0;
  let ctx: gsap.Context | null = null;
  
  onMount(() => {
    if (!browser || !container || !phone) return;
    
    ctx = gsap.context(() => {
      const totalSlides = slides.length;
      const duration = `+=${totalSlides * 100}%`;
      
      gsap.set(phone, {
        x: '30%',
        rotateY: -15,
        rotateX: 5,
        scale: 0.9,
      });
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: duration,
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const newSlide = Math.min(
              Math.floor(self.progress * totalSlides),
              totalSlides - 1
            );
            if (newSlide !== currentSlide) {
              currentSlide = newSlide;
            }
          },
        },
      });
      
      tl.to(phone, {
        x: '0%',
        rotateY: 0,
        rotateX: 0,
        scale: 1,
        ease: 'power2.out',
        duration: 0.3,
      });
      
      tl.to(phone, {
        x: '-30%',
        rotateY: 15,
        scale: 0.95,
        ease: 'power2.inOut',
        duration: 0.4,
      });
      
      contentElements.forEach((el, i) => {
        if (!el) return;
        
        gsap.set(el, {
          opacity: i === 0 ? 1 : 0,
          y: i === 0 ? 0 : 50,
        });
        
        ScrollTrigger.create({
          trigger: container,
          start: 'top top',
          end: duration,
          onUpdate: (self) => {
            const slideStart = i / totalSlides;
            const slideEnd = (i + 1) / totalSlides;
            const progress = self.progress;
            
            if (progress >= slideStart && progress < slideEnd) {
              const localProgress = (progress - slideStart) / (slideEnd - slideStart);
              gsap.to(el, {
                opacity: localProgress < 0.2 ? localProgress * 5 : localProgress > 0.8 ? (1 - localProgress) * 5 : 1,
                y: 0,
                duration: 0.3,
              });
            } else {
              gsap.to(el, {
                opacity: 0,
                y: progress < slideStart ? 50 : -50,
                duration: 0.3,
              });
            }
          },
        });
      });
    }, container);
  });
  
  onDestroy(() => {
    ctx?.revert();
  });
</script>

<section bind:this={container} class="scrolly-section">
  <div class="scrolly-wrapper">
    <div class="content-side">
      {#each slides as slide, i}
        <div 
          bind:this={contentElements[i]}
          class="slide-content"
          class:active={currentSlide === i}
        >
          {#if slide.subtitle}
            <p class="text-sm uppercase tracking-[0.2em] text-righello-pink mb-4 font-medium">
              {slide.subtitle}
            </p>
          {/if}
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-white">
            {slide.title}
          </h2>
          <p class="text-lg text-[var(--text-secondary)] mb-8 leading-relaxed">
            {slide.description}
          </p>
          {#if slide.stats}
            <div class="flex gap-8 flex-wrap">
              {#each slide.stats as stat}
                <div class="stat-block">
                  <span class="text-3xl md:text-4xl font-bold gradient-text">{stat.value}</span>
                  <span class="text-sm text-[var(--text-secondary)] mt-1 block">{stat.label}</span>
                </div>
              {/each}
            </div>
          {/if}
        </div>
      {/each}
    </div>
    
    <div class="phone-side">
      <div bind:this={phone} class="phone-3d">
        <div class="phone-frame-scrolly">
          <div class="phone-notch-scrolly"></div>
          <div class="phone-screen-scrolly">
            {#each slides as slide, i}
              <div 
                class="screen-content"
                class:active={currentSlide === i}
              >
                {#if slide.image}
                  <img src={slide.image} alt={slide.title} class="screen-image" />
                {:else}
                  <div class="placeholder-gradient">
                    <div class="gradient-text-overlay">
                      {slide.title}
                    </div>
                  </div>
                {/if}
              </div>
            {/each}
          </div>
          <div class="phone-home-bar-scrolly"></div>
        </div>
        <div class="phone-glow-scrolly"></div>
      </div>
    </div>
  </div>
  
  <div class="slide-indicators">
    {#each slides as _, i}
      <div 
        class="indicator"
        class:active={currentSlide === i}
      ></div>
    {/each}
  </div>
</section>

<style>
  .scrolly-section {
    min-height: 100vh;
    position: relative;
    background: var(--bg-primary);
    overflow: hidden;
  }
  
  .scrolly-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    min-height: 100vh;
    padding: 0 5%;
    gap: 4rem;
  }
  
  @media (max-width: 1024px) {
    .scrolly-wrapper {
      grid-template-columns: 1fr;
      padding: 2rem 5%;
    }
    
    .content-side {
      order: 2;
      text-align: center;
    }
    
    .phone-side {
      order: 1;
    }
  }
  
  .content-side {
    position: relative;
    height: 400px;
  }
  
  .slide-content {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    opacity: 0;
    pointer-events: none;
    max-width: 540px;
  }
  
  .slide-content.active {
    pointer-events: auto;
  }
  
  @media (max-width: 1024px) {
    .slide-content {
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      max-width: 100%;
      padding: 0 1rem;
    }
  }
  
  .stat-block {
    display: flex;
    flex-direction: column;
  }
  
  .phone-side {
    display: flex;
    justify-content: center;
    align-items: center;
    perspective: 1200px;
  }
  
  .phone-3d {
    position: relative;
    transform-style: preserve-3d;
    will-change: transform;
  }
  
  .phone-frame-scrolly {
    width: 280px;
    height: 560px;
    background: linear-gradient(145deg, #1a1a1a, #0d0d0d);
    border-radius: 44px;
    padding: 12px;
    box-shadow: 
      0 0 0 1px rgba(255, 255, 255, 0.1),
      0 50px 100px -20px rgba(0, 0, 0, 0.6),
      inset 0 1px 1px rgba(255, 255, 255, 0.05);
    position: relative;
  }
  
  @media (min-width: 768px) {
    .phone-frame-scrolly {
      width: 320px;
      height: 640px;
    }
  }
  
  @media (min-width: 1280px) {
    .phone-frame-scrolly {
      width: 360px;
      height: 720px;
    }
  }
  
  .phone-notch-scrolly {
    position: absolute;
    top: 16px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 28px;
    background: #000;
    border-radius: 20px;
    z-index: 10;
  }
  
  @media (min-width: 768px) {
    .phone-notch-scrolly {
      width: 120px;
      height: 32px;
    }
  }
  
  .phone-screen-scrolly {
    width: 100%;
    height: 100%;
    background: #000;
    border-radius: 36px;
    overflow: hidden;
    position: relative;
  }
  
  .screen-content {
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 0.5s ease;
  }
  
  .screen-content.active {
    opacity: 1;
  }
  
  .screen-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .placeholder-gradient {
    width: 100%;
    height: 100%;
    background: linear-gradient(
      135deg,
      #D6487E 0%,
      #a855f7 35%,
      #06B6D4 65%,
      #D6487E 100%
    );
    background-size: 300% 300%;
    animation: gradientShift 6s ease infinite;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }
  
  @keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  
  .gradient-text-overlay {
    font-size: 1.5rem;
    font-weight: 700;
    text-align: center;
    color: white;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    line-height: 1.3;
  }
  
  @media (min-width: 768px) {
    .gradient-text-overlay {
      font-size: 2rem;
    }
  }
  
  .phone-home-bar-scrolly {
    position: absolute;
    bottom: 8px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
  }
  
  .phone-glow-scrolly {
    position: absolute;
    inset: -40px;
    background: radial-gradient(
      ellipse at center,
      rgba(214, 72, 126, 0.4) 0%,
      rgba(6, 182, 212, 0.2) 40%,
      transparent 70%
    );
    border-radius: 70px;
    z-index: -1;
    filter: blur(40px);
    opacity: 0.6;
  }
  
  .slide-indicators {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 0.75rem;
  }
  
  .indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transition: all 0.3s ease;
  }
  
  .indicator.active {
    width: 24px;
    border-radius: 4px;
    background: linear-gradient(90deg, #D6487E, #06B6D4);
  }
</style>
