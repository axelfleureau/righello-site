<script lang="ts">
  import AppleCardsCarousel from './AppleCardsCarousel.svelte';
  import RevealOnScroll from './RevealOnScroll.svelte';
  
  export let title = "I nostri lavori";
  export let subtitle = "Reel & Social";
  
  const reelItems = [
    {
      title: 'Scuola Sci Piancavallo',
      subtitle: 'Content video per promozione corsi',
      videoSrc: 'https://firebasestorage.googleapis.com/v0/b/righello-site.firebasestorage.app/o/ricci_scuolasci.mp4?alt=media&token=1456b789-c161-45e2-9414-23074ce7fd53',
      category: 'Reel'
    },
    {
      title: '3R Technology',
      subtitle: 'Video fast replace prodotto',
      videoSrc: 'https://firebasestorage.googleapis.com/v0/b/righello-site.firebasestorage.app/o/3r_fast_replace.mp4?alt=media&token=def7dcaa-231d-42ff-bf40-9ffef861a6ba',
      category: 'Product'
    },
    {
      title: 'Reguta Wines',
      subtitle: 'Vendemmio - campagna social',
      videoSrc: 'https://firebasestorage.googleapis.com/v0/b/righello-site.firebasestorage.app/o/vendemmioPOCOvolentieri.mp4?alt=media&token=76867423-5c67-4676-ae0e-a151d3e56325',
      category: 'Social'
    },
    {
      title: 'Neura',
      subtitle: 'Brand video finale',
      videoSrc: 'https://firebasestorage.googleapis.com/v0/b/righello-site.firebasestorage.app/o/neura_final.mp4?alt=media&token=27642e9f-c14b-49eb-b8e3-e802f4abdcb4',
      category: 'Branding'
    }
  ];
</script>

<section class="py-10 md:py-16 lg:py-24 overflow-hidden">
  <div class="section-container mb-8 md:mb-12">
    <RevealOnScroll animation="fly-up">
      <div class="text-center">
        <p class="text-sm uppercase tracking-[0.2em] text-righello-pink mb-4">{subtitle}</p>
        <h2 class="heading-lg mb-4">{title}</h2>
        <p class="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
          Scorri per esplorare alcuni dei nostri migliori lavori
        </p>
      </div>
    </RevealOnScroll>
  </div>
  
  <AppleCardsCarousel items={reelItems} />
</section>
