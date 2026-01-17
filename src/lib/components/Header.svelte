<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import ThemeToggle from './ThemeToggle.svelte';
  import { theme } from '$lib/stores/theme';
  
  let mobileMenuOpen = false;
  let scrollY = 0;
  let lastScrollY = 0;
  let isHidden = false;
  let isPastTop = false;
  
  const navLinks = [
    { href: '/servizi', label: 'Servizi' },
    { href: '/progetti', label: 'Progetti' },
    { href: '/chi-siamo', label: 'Chi siamo' },
    { href: '/contatti', label: 'Contatti' },
  ];
  
  function toggleMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }
  
  function closeMenu() {
    mobileMenuOpen = false;
  }
  
  onMount(() => {
    const handleScroll = () => {
      scrollY = window.scrollY;
      isPastTop = scrollY > 50;
      
      if (scrollY > lastScrollY && scrollY > 100) {
        isHidden = true;
      } else {
        isHidden = false;
      }
      
      lastScrollY = scrollY;
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

<header 
  class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 header-blur"
  class:-translate-y-full={isHidden && !mobileMenuOpen}
  class:header-scrolled={isPastTop}
>
  <div class="section-container">
    <nav class="flex items-center justify-between h-20">
      <a href="/" class="flex items-center" on:click={closeMenu}>
        {#if $theme === 'dark'}
          <img src="/logo-white.png" alt="Righello" class="h-8 md:h-10" />
        {:else}
          <img src="/logo-full.png" alt="Righello" class="h-8 md:h-10" />
        {/if}
      </a>
      
      <div class="hidden md:flex items-center gap-8">
        {#each navLinks as link}
          <a 
            href={link.href} 
            class="text-sm font-medium transition-all duration-300 hover:text-righello-pink relative group"
            style="color: {$page.url.pathname === link.href ? '#D6487E' : 'var(--text-primary)'};"
          >
            {link.label}
            <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-righello-pink transition-all duration-300 group-hover:w-full"></span>
          </a>
        {/each}
        <ThemeToggle />
      </div>
      
      <button 
        class="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-righello-pink text-white transition-transform duration-300 hover:scale-110"
        on:click={toggleMenu}
        aria-label={mobileMenuOpen ? 'Chiudi menu' : 'Apri menu'}
        aria-expanded={mobileMenuOpen}
        aria-controls="mobile-menu"
      >
        <div class="relative w-5 h-5">
          <span 
            class="absolute left-0 w-5 h-0.5 bg-white transition-all duration-300"
            class:rotate-45={mobileMenuOpen}
            class:top-2={mobileMenuOpen}
            class:top-1={!mobileMenuOpen}
          ></span>
          <span 
            class="absolute left-0 top-2 w-5 h-0.5 bg-white transition-all duration-300"
            class:opacity-0={mobileMenuOpen}
          ></span>
          <span 
            class="absolute left-0 w-5 h-0.5 bg-white transition-all duration-300"
            class:-rotate-45={mobileMenuOpen}
            class:top-2={mobileMenuOpen}
            class:top-3={!mobileMenuOpen}
          ></span>
        </div>
      </button>
    </nav>
  </div>
  
  <div 
    id="mobile-menu"
    role="navigation"
    aria-label="Menu principale"
    class="md:hidden absolute top-full left-0 right-0 shadow-lg transition-all duration-300 overflow-hidden"
    class:max-h-0={!mobileMenuOpen}
    class:max-h-96={mobileMenuOpen}
    class:opacity-0={!mobileMenuOpen}
    class:opacity-100={mobileMenuOpen}
    style="background-color: var(--bg-primary); border-bottom: 1px solid var(--border-color);"
  >
    <div class="section-container py-6 flex flex-col gap-4">
      {#each navLinks as link, i}
        <a 
          href={link.href} 
          class="text-lg font-medium py-2 transition-all duration-300 hover:text-righello-pink hover:translate-x-2"
          style="color: {$page.url.pathname === link.href ? '#D6487E' : 'var(--text-primary)'}; transition-delay: {i * 50}ms;"
          on:click={closeMenu}
        >
          {link.label}
        </a>
      {/each}
    </div>
  </div>
</header>

<style>
  .header-blur {
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    background-color: rgba(5, 5, 5, 0.7);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }
  
  .header-scrolled {
    background-color: rgba(5, 5, 5, 0.85);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  :global([data-theme="light"]) .header-blur {
    background-color: rgba(255, 255, 255, 0.7);
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }
  
  :global([data-theme="light"]) .header-scrolled {
    background-color: rgba(255, 255, 255, 0.85);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
</style>
