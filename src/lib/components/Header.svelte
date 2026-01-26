<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import ThemeToggle from './ThemeToggle.svelte';
  import { theme } from '$lib/stores/theme';
  import { departments } from '$lib/data/projects';
  
  let mobileMenuOpen = false;
  let scrollY = 0;
  let lastScrollY = 0;
  let isHidden = false;
  let isPastTop = false;
  let serviziHovered = false;
  let mobileServiziOpen = false;
  
  const navLinks = [
    { href: '/servizi', label: 'Servizi', hasDropdown: true },
    { href: '/progetti', label: 'Progetti', hasDropdown: false },
    { href: '/chi-siamo', label: 'Chi siamo', hasDropdown: false },
    { href: '/contatti', label: 'Contatti', hasDropdown: false },
  ];
  
  const departmentIcons: Record<string, string> = {
    'content-social': '📱',
    'advertising': '🎯',
    'digital-experience': '💻'
  };
  
  function toggleMenu() {
    mobileMenuOpen = !mobileMenuOpen;
    if (!mobileMenuOpen) {
      mobileServiziOpen = false;
    }
  }
  
  function closeMenu() {
    mobileMenuOpen = false;
    mobileServiziOpen = false;
  }
  
  function toggleMobileServizi() {
    mobileServiziOpen = !mobileServiziOpen;
  }
  
  onMount(() => {
    const handleScroll = () => {
      scrollY = window.scrollY;
      isPastTop = scrollY > 50;
      
      if (scrollY > lastScrollY && scrollY > 100) {
        isHidden = true;
        serviziHovered = false;
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
  class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
  class:-translate-y-full={isHidden && !mobileMenuOpen}
>
  <div class="header-container mx-auto px-4 md:px-6 pt-4">
    <nav class="floating-nav" class:nav-scrolled={isPastTop}>
      <a href="/" class="flex items-center flex-shrink-0" on:click={closeMenu}>
        {#if $theme === 'dark'}
          <img src="/logo-white.png" alt="Righello" class="h-7 md:h-8" />
        {:else}
          <img src="/logo-full.png" alt="Righello" class="h-7 md:h-8" />
        {/if}
      </a>
      
      <div class="hidden lg:flex items-center gap-1">
        {#each navLinks as link}
          {#if link.hasDropdown}
            <div 
              class="relative"
              on:mouseenter={() => serviziHovered = true}
              on:mouseleave={() => serviziHovered = false}
              role="button"
              tabindex="0"
            >
              <a 
                href={link.href}
                class="nav-link"
                class:active={$page.url.pathname === link.href || $page.url.pathname.startsWith('/servizi')}
              >
                {link.label}
                <svg class="w-4 h-4 ml-1 transition-transform duration-200" class:rotate-180={serviziHovered} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </a>
              
              <div 
                class="dropdown-menu"
                class:dropdown-open={serviziHovered}
              >
                <div class="dropdown-content">
                  {#each departments as dept}
                    <a 
                      href="/servizi?tab={dept.id}" 
                      class="dropdown-item"
                      on:click={() => serviziHovered = false}
                    >
                      <div class="dropdown-icon">
                        {departmentIcons[dept.id] || '📊'}
                      </div>
                      <div class="dropdown-text">
                        <span class="dropdown-title">{dept.name}</span>
                        <span class="dropdown-desc">{dept.tagline}</span>
                      </div>
                    </a>
                  {/each}
                </div>
              </div>
            </div>
          {:else}
            <a 
              href={link.href} 
              class="nav-link"
              class:active={$page.url.pathname === link.href}
            >
              {link.label}
            </a>
          {/if}
        {/each}
      </div>
      
      <div class="flex items-center gap-3">
        <ThemeToggle />
        <a href="/contatti" class="hidden sm:flex cta-button">
          Parliamone
        </a>
        
        <button 
          class="burger lg:hidden"
          class:is-open={mobileMenuOpen}
          on:click={toggleMenu}
          aria-label={mobileMenuOpen ? 'Chiudi menu' : 'Apri menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          <svg class="burger__icon" viewBox="0 0 21.2 24.2" width="24" height="24" aria-hidden="true">
            <path class="burger__bar burger__top"
              d="M0,5.1V1C0,.4.5,0,1.2,0h18.8c.7,0,1.2.5,1.2,1v3.1c0,.6-.5,1-1.2,1H6.8S0,5.1.1,5.1h-.1Z" />
            <path class="burger__bar burger__mid"
              d="M1.3,9.4s-1.3,0-1.3,1.2v2.9c0,.6.5,1.1,1.2,1.1h9.2c.7,0,1.2-.5,1.2-1.1v-3c0-.6-.5-1.1-1.2-1.1,0,0-9.1,0-9.1,0Z" />
            <path class="burger__bar burger__bot"
              d="M6.8,18.9h13.1c.7,0,1.3.5,1.3,1.2v2.9c0,.6-.6,1.2-1.3,1.2H1.4c-.7,0-1.3-.5-1.3-1.2v-4.1h6.8,0Z" />
          </svg>
        </button>
      </div>
    </nav>
  </div>
  
  <div 
    id="mobile-menu"
    role="navigation"
    aria-label="Menu principale"
    class="lg:hidden mobile-menu"
    class:mobile-menu-open={mobileMenuOpen}
  >
    <div class="px-6 py-6 flex flex-col gap-2">
      {#each navLinks as link, i}
        {#if link.hasDropdown}
          <div class="mobile-nav-group">
            <button 
              class="mobile-nav-link w-full flex items-center justify-between"
              on:click={toggleMobileServizi}
              style="transition-delay: {i * 50}ms;"
            >
              <span>{link.label}</span>
              <svg class="w-5 h-5 transition-transform duration-200" class:rotate-180={mobileServiziOpen} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <div class="mobile-submenu" class:mobile-submenu-open={mobileServiziOpen}>
              {#each departments as dept}
                <a 
                  href="/servizi?tab={dept.id}" 
                  class="mobile-submenu-item"
                  on:click={closeMenu}
                >
                  <span class="text-lg mr-2">{departmentIcons[dept.id]}</span>
                  <div>
                    <div class="font-medium text-[var(--text-primary)]">{dept.name}</div>
                    <div class="text-sm text-[var(--text-secondary)]">{dept.tagline}</div>
                  </div>
                </a>
              {/each}
            </div>
          </div>
        {:else}
          <a 
            href={link.href} 
            class="mobile-nav-link"
            style="transition-delay: {i * 50}ms;"
            on:click={closeMenu}
          >
            {link.label}
          </a>
        {/if}
      {/each}
      
      <a 
        href="/contatti" 
        class="mt-4 cta-button-mobile"
        on:click={closeMenu}
      >
        Parliamone
      </a>
    </div>
  </div>
</header>

<style>
  .header-container {
    max-width: 1200px;
  }
  
  .floating-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.75rem 1.25rem;
    border-radius: 1.5rem;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }
  
  @media (min-width: 1024px) {
    .floating-nav {
      border-radius: 9999px;
    }
  }
  
  .nav-scrolled {
    background: rgba(5, 5, 5, 0.85);
    border-color: rgba(255, 255, 255, 0.15);
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.3);
  }
  
  :global([data-theme="light"]) .floating-nav {
    background: rgba(255, 255, 255, 0.7);
    border-color: rgba(0, 0, 0, 0.08);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
  }
  
  :global([data-theme="light"]) .nav-scrolled {
    background: rgba(255, 255, 255, 0.9);
    border-color: rgba(0, 0, 0, 0.1);
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.1);
  }
  
  .nav-link {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-primary);
    border-radius: 9999px;
    transition: all 0.2s ease;
  }
  
  .nav-link:hover {
    color: #D6487E;
    background: rgba(214, 72, 126, 0.1);
  }
  
  .nav-link.active {
    color: #D6487E;
  }
  
  .cta-button {
    padding: 0.5rem 1.25rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: white;
    background: linear-gradient(135deg, #D6487E 0%, #c13d6f 100%);
    border-radius: 9999px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(214, 72, 126, 0.3);
  }
  
  .cta-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(214, 72, 126, 0.4);
  }
  
  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    padding-top: 0.75rem;
    opacity: 0;
    visibility: hidden;
    transition: all 0.25s ease;
  }
  
  .dropdown-open {
    opacity: 1;
    visibility: visible;
  }
  
  .dropdown-content {
    min-width: 320px;
    padding: 0.75rem;
    background: var(--bg-secondary);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid var(--border-color);
    border-radius: 1rem;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  
  :global([data-theme="light"]) .dropdown-content {
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
  }
  
  .dropdown-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.875rem 1rem;
    border-radius: 0.75rem;
    transition: all 0.2s ease;
  }
  
  .dropdown-item:hover {
    background: rgba(214, 72, 126, 0.1);
  }
  
  .dropdown-icon {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    background: rgba(214, 72, 126, 0.15);
    border-radius: 0.75rem;
    flex-shrink: 0;
  }
  
  .dropdown-text {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
  }
  
  .dropdown-title {
    font-weight: 600;
    font-size: 0.9375rem;
    color: var(--text-primary);
  }
  
  .dropdown-desc {
    font-size: 0.8125rem;
    color: var(--text-secondary);
  }
  
  .mobile-menu {
    position: absolute;
    top: 100%;
    left: 1rem;
    right: 1rem;
    margin-top: 0.5rem;
    background: var(--bg-secondary);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid var(--border-color);
    border-radius: 1.5rem;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    transition: all 0.3s ease;
  }
  
  .mobile-menu-open {
    max-height: 500px;
    opacity: 1;
  }
  
  :global([data-theme="light"]) .mobile-menu {
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
  }
  
  .mobile-nav-link {
    display: flex;
    align-items: center;
    padding: 0.875rem 1rem;
    font-size: 1rem;
    font-weight: 500;
    color: var(--text-primary);
    border-radius: 0.75rem;
    transition: all 0.2s ease;
  }
  
  .mobile-nav-link:hover {
    background: rgba(214, 72, 126, 0.1);
    color: #D6487E;
  }
  
  .mobile-submenu {
    max-height: 0;
    overflow: hidden;
    transition: all 0.3s ease;
  }
  
  .mobile-submenu-open {
    max-height: 300px;
  }
  
  .mobile-submenu-item {
    display: flex;
    align-items: center;
    padding: 0.75rem 1rem;
    margin-left: 1rem;
    border-radius: 0.75rem;
    transition: all 0.2s ease;
  }
  
  .mobile-submenu-item:hover {
    background: rgba(214, 72, 126, 0.1);
  }
  
  .cta-button-mobile {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.875rem 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    color: white;
    background: linear-gradient(135deg, #D6487E 0%, #c13d6f 100%);
    border-radius: 0.75rem;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(214, 72, 126, 0.3);
  }
  
  .cta-button-mobile:hover {
    box-shadow: 0 6px 20px rgba(214, 72, 126, 0.4);
  }
  
  .burger {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    background: linear-gradient(135deg, #D6487E 0%, #c13d6f 100%);
    border: 0;
    border-radius: 0.75rem;
    padding: 0.5rem;
    cursor: pointer;
    color: white;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(214, 72, 126, 0.3);
  }
  
  @media (min-width: 1024px) {
    .burger {
      display: none;
    }
  }
  
  .burger:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(214, 72, 126, 0.4);
  }
  
  .burger__icon {
    display: block;
  }
  
  .burger__bar {
    fill: currentColor;
    transform-box: fill-box;
    transform-origin: center;
    transition:
      transform 260ms cubic-bezier(.2,.9,.2,1),
      opacity 160ms ease;
    will-change: transform, opacity;
  }
  
  .burger__mid {
    transform-origin: left center;
  }
  
  .burger__top {
    transform-origin: 50% 50%;
  }
  
  .burger__bot {
    transform-origin: 50% 50%;
  }
  
  .burger.is-open .burger__top {
    transform: translateX(3px) translateY(7px) rotate(45deg);
  }
  
  .burger.is-open .burger__mid {
    opacity: 0;
    transform: scaleX(0);
  }
  
  .burger.is-open .burger__bot {
    transform: translateX(-3px) translateY(-7px) rotate(-45deg);
  }
  
  @media (prefers-reduced-motion: reduce) {
    .burger__bar {
      transition: none;
    }
  }
</style>
