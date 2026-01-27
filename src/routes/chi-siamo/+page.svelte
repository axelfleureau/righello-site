<script lang="ts">
  import ScrollReveal from '$lib/components/ScrollReveal.svelte';
  import AnimatedCounter from '$lib/components/AnimatedCounter.svelte';
  import ProfileCard from '$lib/components/ProfileCard.svelte';
  import Highlight from '$lib/components/Highlight.svelte';
  import TechWord from '$lib/components/TechWord.svelte';
  import MagneticButton from '$lib/components/MagneticButton.svelte';
  import LanyardBadge from '$lib/components/LanyardBadge.svelte';
  import SectionDivider from '$lib/components/SectionDivider.svelte';
  
  const team = [
    {
      name: 'Marco',
      role: 'Creative Director',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    },
    {
      name: 'Laura',
      role: 'Project Manager',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    },
    {
      name: 'Alessandro',
      role: 'Developer',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
    },
    {
      name: 'Sara',
      role: 'Content Creator',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
    },
  ];
  
  const stats = [
    { value: 50, suffix: '+', label: 'Progetti completati' },
    { value: 30, suffix: '+', label: 'Clienti soddisfatti' },
    { value: 5, suffix: '+', label: 'Anni di esperienza' },
  ];
</script>

<svelte:head>
  <title>Chi siamo - Righello</title>
  <meta name="description" content="Siamo un team dedicato e dinamico di professionisti, uniti dalla passione per l'innovazione e l'eccellenza nel settore digitale." />
</svelte:head>

<section class="pt-32 pb-16 md:pt-40 md:pb-24">
  <div class="section-container">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
      <div class="order-2 lg:order-1">
        <ScrollReveal animation="fade-up">
          <div class="section-header">
            <p class="section-subtitle">Chi siamo</p>
            <h1 class="section-title mb-8">Il nostro team</h1>
          </div>
        </ScrollReveal>
        <ScrollReveal animation="fade-up" delay={100}>
          <p class="text-xl mb-8" style="color: var(--text-secondary);">
            Siamo un team dedicato e dinamico di quattro professionisti, uniti dalla passione per l'<TechWord>innovazione</TechWord> e l'eccellenza nel settore digitale.
          </p>
        </ScrollReveal>
        <ScrollReveal animation="fade-up" delay={200}>
          <p class="text-xl mb-8" style="color: var(--text-secondary);">
            Il nostro percorso è caratterizzato da un impegno costante verso la crescita e l'apprendimento. La nostra missione è quella di offrire soluzioni <TechWord highlight>creative</TechWord> e tecnologicamente avanzate, guidati da un approccio olistico che fonde competenza e inventiva.
          </p>
        </ScrollReveal>
        <ScrollReveal animation="fade-up" delay={300}>
          <p class="text-xl" style="color: var(--text-secondary);">
            La nostra ambizione è quella di trasformare ogni sfida in un'opportunità, spingendo i confini del possibile per creare <TechWord>esperienze digitali</TechWord> indimenticabili.
          </p>
        </ScrollReveal>
      </div>
      
      <div class="order-1 lg:order-2 flex justify-center">
        <ScrollReveal animation="scale" delay={200}>
          <LanyardBadge 
            logoSrc="/logo-white.png"
            title="ID BADGE"
            subtitle="Growth Agency"
          />
        </ScrollReveal>
      </div>
    </div>
  </div>
</section>

<SectionDivider fromColor="var(--bg-primary)" toColor="var(--bg-secondary)" />

<section class="section-padding" style="background-color: var(--bg-secondary);">
  <div class="section-container">
    <ScrollReveal>
      <div class="section-header">
        <p class="section-subtitle">Il nostro team</p>
        <h2 class="section-title text-center mb-12">I volti dietro Righello</h2>
      </div>
    </ScrollReveal>
    
    <div class="flex flex-wrap justify-center gap-6 md:gap-8">
      {#each team as member, i}
        <ScrollReveal animation="fade-up" delay={i * 100}>
          <ProfileCard 
            avatarUrl={member.image}
            name={member.name}
            title={member.role}
            handle={member.name.toLowerCase()}
            status="Online"
            behindGlowColor="rgba(214, 72, 126, 0.5)"
          />
        </ScrollReveal>
      {/each}
    </div>
  </div>
</section>

<SectionDivider fromColor="var(--bg-secondary)" toColor="var(--bg-primary)" />

<section class="section-padding">
  <div class="section-container">
    <ScrollReveal>
      <div class="section-header">
        <p class="section-subtitle">I numeri</p>
        <h2 class="section-title text-center mb-12">Il nostro impatto</h2>
      </div>
    </ScrollReveal>
    
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 text-center">
      {#each stats as stat, i}
        <ScrollReveal animation="scale" delay={i * 100}>
          <div class="p-8 group rounded-2xl transition-colors duration-300" style="background-color: var(--bg-primary);">
            <div class="text-5xl md:text-6xl font-bold text-righello-pink mb-4">
              <AnimatedCounter target={stat.value} suffix={stat.suffix} duration={2000} />
            </div>
            <p style="color: var(--text-secondary);">{stat.label}</p>
          </div>
        </ScrollReveal>
      {/each}
    </div>
  </div>
</section>

<SectionDivider fromColor="var(--bg-primary)" toColor="black" />

<section class="section-padding bg-black text-white">
  <div class="section-container text-center">
    <ScrollReveal animation="fade-up">
      <div class="section-header">
        <h2 class="section-title mb-6"><Highlight variant="white">Vuoi lavorare con noi?</Highlight></h2>
      </div>
    </ScrollReveal>
    <ScrollReveal animation="fade-up" delay={100}>
      <p class="text-xl md:text-2xl text-gray-400 mb-8">
        Siamo sempre alla ricerca di nuove sfide e <TechWord>collaborazioni</TechWord> interessanti.
      </p>
    </ScrollReveal>
    <ScrollReveal animation="fade-up" delay={200}>
      <MagneticButton href="/contatti" variant="primary">
        Contattaci
        <svg class="w-5 h-5 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </MagneticButton>
    </ScrollReveal>
  </div>
</section>
