<script lang="ts">
  import AppleCardsCarousel from './AppleCardsCarousel.svelte';
  import RevealOnScroll from './RevealOnScroll.svelte';
  
  export let title = "Cosa facciamo sui social";
  export let subtitle = "Content & Reel";
  
  const reelItems = [
    {
      title: 'Ricci Group × Scuola Sci Piancavallo',
      subtitle: 'Partnership per la promozione dei corsi di sci',
      videoSrc: 'https://firebasestorage.googleapis.com/v0/b/righello-site.firebasestorage.app/o/ricci_scuolasci.mp4?alt=media&token=1456b789-c161-45e2-9414-23074ce7fd53',
      category: 'Partnership'
    },
    {
      title: '3R Technology',
      subtitle: 'Sostituzione fulminea di uno schermo',
      videoSrc: 'https://firebasestorage.googleapis.com/v0/b/righello-site.firebasestorage.app/o/3r_fast_replace.mp4?alt=media&token=def7dcaa-231d-42ff-bf40-9ffef861a6ba',
      category: 'Product'
    },
    {
      title: 'Reguta',
      subtitle: '#IOVENDEMMIOVOLENTIERI2025',
      videoSrc: 'https://firebasestorage.googleapis.com/v0/b/righello-site.firebasestorage.app/o/vendemmioPOCOvolentieri.mp4?alt=media&token=76867423-5c67-4676-ae0e-a151d3e56325',
      category: 'Social'
    },
    {
      title: 'Neura',
      subtitle: 'Come migliorare le difficoltà di apprendimento',
      videoSrc: 'https://firebasestorage.googleapis.com/v0/b/righello-site.firebasestorage.app/o/neura_final.mp4?alt=media&token=27642e9f-c14b-49eb-b8e3-e802f4abdcb4',
      category: 'Salute'
    },
    {
      title: 'Ricci Group',
      subtitle: 'Basta spendere in carburante, scegli Hyundai i20',
      videoSrc: 'https://firebasestorage.googleapis.com/v0/b/righello-site.firebasestorage.app/o/copy_18236D6E-2553-4BF8-AC9F-112535ECB0E6%201.MOV?alt=media&token=3f1905cf-a165-424e-83d2-dde3b8c7841c',
      category: 'Automotive'
    },
    {
      title: 'MgGrill',
      subtitle: 'Per noi il cibo è una cosa seria',
      videoSrc: 'https://firebasestorage.googleapis.com/v0/b/righello-site.firebasestorage.app/o/MgGrill_1%201.mp4?alt=media&token=25f4eb3e-6b63-46de-916a-6eba1a9802a0',
      category: 'Food'
    },
    {
      title: 'Scuola Sci Piancavallo',
      subtitle: 'Tutto gratis al open day della scuola!',
      videoSrc: 'https://firebasestorage.googleapis.com/v0/b/righello-site.firebasestorage.app/o/promo6dicembre%201.MOV?alt=media&token=96556913-1bc3-4e5d-9305-b62e64628f9a',
      category: 'Sport'
    }
  ];
</script>

<section class="section-padding overflow-hidden">
  <div class="section-container">
    <RevealOnScroll animation="fly-up">
      <div class="section-header">
        <p class="section-subtitle">{subtitle}</p>
        <h2 class="section-title mb-4">{title}</h2>
        <p class="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
          Dai un'occhiata ai nostri contenuti in formato reel
        </p>
      </div>
    </RevealOnScroll>
  </div>
  
  <AppleCardsCarousel items={reelItems} />

  <div class="social-cta-more">
    <p class="social-cta-more__text">...e molto altro in arrivo</p>
    <a href="/contatti" class="social-cta-more__link">Vuoi sapere di più?</a>
  </div>
</section>

<style>
  .social-cta-more {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .social-cta-more__text {
    font-size: 0.9375rem;
    color: var(--text-secondary, #999);
    font-style: italic;
  }

  .social-cta-more__link {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.8125rem;
    font-weight: 600;
    color: #D6487E;
    text-decoration: none;
    padding: 0.375rem 0.875rem;
    border-radius: 2rem;
    border: 1px solid rgba(214, 72, 126, 0.3);
    transition: all 0.3s ease;
    white-space: nowrap;
  }

  .social-cta-more__link:hover {
    background: rgba(214, 72, 126, 0.1);
    border-color: rgba(214, 72, 126, 0.6);
    transform: translateX(2px);
  }
</style>
