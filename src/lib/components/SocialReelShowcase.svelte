<script lang="ts">
  import AppleCardsCarousel from './AppleCardsCarousel.svelte';
  import RevealOnScroll from './RevealOnScroll.svelte';
  
  export let title = "Cosa facciamo sui social";
  export let subtitle = "Content & Reel";
  
  const reelItems = [
    {
      title: 'Ricci Group × Scuola Sci Piancavallo',
      subtitle: 'Partnership per la promozione dei corsi di sci',
      youtubeId: '2EAJzZjnGUo',
      category: 'Partnership'
    },
    {
      title: '3R Technology',
      subtitle: 'Sostituzione fulminea di uno schermo',
      youtubeId: 'q0hHmap4xkM',
      category: 'Product'
    },
    {
      title: 'Reguta',
      subtitle: '#IOVENDEMMIOVOLENTIERI2025',
      youtubeId: 'Yrq9lMebfUQ',
      category: 'Social'
    },
    {
      title: 'Neura',
      subtitle: 'Come migliorare le difficoltà di apprendimento',
      youtubeId: 'SzTxXsg27OM',
      category: 'Salute'
    },
    {
      title: 'Ricci Group',
      subtitle: 'Basta spendere in carburante, scegli Hyundai i20',
      youtubeId: '6oCjVbhG7Es',
      category: 'Automotive'
    },
    {
      title: 'MgGrill',
      subtitle: 'Per noi il cibo è una cosa seria',
      youtubeId: 'R4IzWaHu8z8',
      category: 'Food'
    },
    {
      title: 'Scuola Sci Piancavallo',
      subtitle: 'Tutto gratis al open day della scuola!',
      youtubeId: 'VZ-BqtFqx6w',
      category: 'Sport'
    },
    {
      title: '...e molto altro in arrivo',
      subtitle: 'Nuovi contenuti ogni mese',
      isCta: true,
      ctaHref: '/contatti',
      ctaLabel: 'Vuoi sapere di più?'
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
  
  <AppleCardsCarousel items={reelItems} useReelViewer={true} />
</section>
