<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import ThemeToggle from './ThemeToggle.svelte';
  import { theme } from '$lib/stores/theme';
  import { departments } from '$lib/data/projects';
  
  let mobileMenuOpen = false;
  let scrollY = 0;
  let lastScrollY = 0;
  let isAtTop = true;
  let isCompact = false;
  let serviziHovered = false;
  let mobileServiziOpen = false;
  
  const navLinks = [
    { href: '/', label: 'Home', hasDropdown: false },
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
      const scrollDelta = scrollY - lastScrollY;
      
      // At top: transparent, classic navbar, reset compact
      isAtTop = scrollY <= 30;
      if (isAtTop) {
        isCompact = false;
      }
      
      // Scrolling down: compact mode (navbar stays visible, just smaller)
      if (scrollDelta > 5 && scrollY > 80) {
        isCompact = true;
        serviziHovered = false;
      }
      // Scrolling up: expand
      else if (scrollDelta < -5) {
        isCompact = false;
      }
      
      lastScrollY = scrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

<header 
  class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
  class:header-at-top={isAtTop}
>
  <div class="header-container mx-auto px-4 md:px-6" class:pt-4={!isAtTop} class:pt-0={isAtTop}>
    <nav 
      class="floating-nav" 
      class:nav-at-top={isAtTop}
      class:nav-compact={isCompact && !isAtTop}
      class:nav-scrolled={!isAtTop}
    >
      <a href="/" class="flex items-center flex-shrink-0" on:click={closeMenu}>
        {#if $theme === 'dark'}
          <img src="/logo-white.png" alt="Righello" class="h-7 md:h-8" fetchpriority="high" decoding="async" />
        {:else}
          <img src="/logo-full.png" alt="Righello" class="h-7 md:h-8" fetchpriority="high" decoding="async" />
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
                      href="/servizi#{dept.id}" 
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
          <svg class="burger__icon" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <rect class="burger__bar burger__top" x="2" y="5" width="20" height="2.5" rx="1.25" />
            <rect class="burger__bar burger__mid" x="2" y="10.75" width="12" height="2.5" rx="1.25" />
            <rect class="burger__bar burger__bot" x="2" y="16.5" width="20" height="2.5" rx="1.25" />
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
                  href="/servizi#{dept.id}" 
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
    transition: padding 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .header-at-top .header-container {
    padding-top: 0;
  }
  
  .floating-nav {
    --nav-radius: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.75rem 1.25rem;
    border-radius: var(--nav-radius);
    position: relative;
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    background: rgba(20, 20, 25, 0.55);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 
      0 4px 30px rgba(0, 0, 0, 0.15),
      0 1px 1px rgba(255, 255, 255, 0.05) inset;
  }
  
  @media (min-width: 1024px) {
    .floating-nav {
      --nav-radius: 9999px;
      border-radius: var(--nav-radius);
    }
  }
  
  /* At top of page: transparent, classic navbar */
  .nav-at-top {
    --nav-radius: 0;
    background: transparent;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    box-shadow: none;
    border-radius: 0;
    border-color: transparent;
    padding: 1rem 1.25rem;
  }
  
  .nav-at-top::before,
  .nav-at-top::after {
    display: none;
  }
  
  /* Compact mode when scrolling down */
  .nav-compact {
    padding: 0.5rem 1rem;
  }
  
  .nav-compact .nav-link {
    padding: 0.375rem 0.75rem;
    font-size: 0.8125rem;
  }
  
  .nav-compact .cta-button {
    padding: 0.375rem 1rem;
    font-size: 0.8125rem;
  }
  
  /* Logo transition for smooth breathing effect */
  .floating-nav img {
    transition: height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .nav-compact img {
    height: 1.5rem;
  }
  
  @media (min-width: 768px) {
    .nav-compact img {
      height: 1.625rem;
    }
  }
  
  .nav-scrolled {
    background: rgba(15, 15, 20, 0.7);
    border-color: rgba(255, 255, 255, 0.08);
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, 0.3),
      0 1px 1px rgba(255, 255, 255, 0.05) inset;
  }
  
  :global([data-theme="light"]) .floating-nav {
    background: rgba(255, 255, 255, 0.6);
    border-color: rgba(0, 0, 0, 0.08);
    box-shadow: 
      0 4px 30px rgba(0, 0, 0, 0.08),
      0 1px 1px rgba(255, 255, 255, 0.9) inset;
  }
  
  :global([data-theme="light"]) .nav-at-top {
    background: transparent;
    box-shadow: none;
    border-color: transparent;
  }
  
  :global([data-theme="light"]) .nav-scrolled {
    background: rgba(255, 255, 255, 0.75);
    border-color: rgba(0, 0, 0, 0.1);
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, 0.1),
      0 1px 1px rgba(255, 255, 255, 1) inset;
  }
  
  .nav-link {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-primary);
    border-radius: 9999px;
    transition: 
      padding 0.4s cubic-bezier(0.4, 0, 0.2, 1),
      font-size 0.4s cubic-bezier(0.4, 0, 0.2, 1),
      color 0.2s ease,
      background 0.2s ease;
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
    transition: 
      padding 0.4s cubic-bezier(0.4, 0, 0.2, 1),
      font-size 0.4s cubic-bezier(0.4, 0, 0.2, 1),
      transform 0.3s ease,
      box-shadow 0.3s ease;
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
    position: relative;
    background: 
      linear-gradient(135deg, rgba(30, 30, 35, 0.95) 0%, rgba(20, 20, 25, 0.9) 50%, rgba(30, 30, 35, 0.95) 100%);
    backdrop-filter: blur(24px) saturate(180%);
    -webkit-backdrop-filter: blur(24px) saturate(180%);
    border: 1px solid transparent;
    border-radius: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    box-shadow: 
      0 0 0 1px rgba(255, 255, 255, 0.08),
      0 20px 50px rgba(0, 0, 0, 0.4),
      0 40px 80px rgba(0, 0, 0, 0.2),
      inset 0 1px 1px rgba(255, 255, 255, 0.1);
  }
  
  .dropdown-content::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(
      135deg, 
      rgba(255, 255, 255, 0.15) 0%, 
      rgba(255, 255, 255, 0.05) 40%,
      rgba(214, 72, 126, 0.1) 100%
    );
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
    -webkit-mask-composite: xor;
    pointer-events: none;
  }
  
  :global([data-theme="light"]) .dropdown-content {
    background: 
      linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(250, 250, 252, 0.95) 50%, rgba(255, 255, 255, 0.98) 100%);
    box-shadow: 
      0 0 0 1px rgba(0, 0, 0, 0.04),
      0 20px 50px rgba(0, 0, 0, 0.1),
      0 40px 80px rgba(0, 0, 0, 0.05),
      inset 0 1px 2px rgba(255, 255, 255, 1);
  }
  
  :global([data-theme="light"]) .dropdown-content::before {
    background: linear-gradient(
      135deg, 
      rgba(255, 255, 255, 0.9) 0%, 
      rgba(255, 255, 255, 0.5) 40%,
      rgba(214, 72, 126, 0.05) 100%
    );
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
    background: 
      linear-gradient(135deg, rgba(30, 30, 35, 0.95) 0%, rgba(20, 20, 25, 0.92) 50%, rgba(30, 30, 35, 0.95) 100%);
    backdrop-filter: blur(24px) saturate(180%);
    -webkit-backdrop-filter: blur(24px) saturate(180%);
    border: 1px solid transparent;
    border-radius: 1.5rem;
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 
      0 0 0 1px rgba(255, 255, 255, 0.08),
      0 20px 50px rgba(0, 0, 0, 0.4),
      0 40px 80px rgba(0, 0, 0, 0.2),
      inset 0 1px 1px rgba(255, 255, 255, 0.1);
  }
  
  .mobile-menu::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(
      135deg, 
      rgba(255, 255, 255, 0.15) 0%, 
      rgba(255, 255, 255, 0.05) 40%,
      rgba(214, 72, 126, 0.12) 60%,
      rgba(6, 182, 212, 0.08) 100%
    );
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
    -webkit-mask-composite: xor;
    pointer-events: none;
  }
  
  .mobile-menu-open {
    max-height: 500px;
    opacity: 1;
  }
  
  :global([data-theme="light"]) .mobile-menu {
    background: 
      linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(250, 250, 252, 0.95) 50%, rgba(255, 255, 255, 0.98) 100%);
    box-shadow: 
      0 0 0 1px rgba(0, 0, 0, 0.04),
      0 20px 50px rgba(0, 0, 0, 0.1),
      0 40px 80px rgba(0, 0, 0, 0.05),
      inset 0 1px 2px rgba(255, 255, 255, 1);
  }
  
  :global([data-theme="light"]) .mobile-menu::before {
    background: linear-gradient(
      135deg, 
      rgba(255, 255, 255, 0.9) 0%, 
      rgba(255, 255, 255, 0.5) 40%,
      rgba(214, 72, 126, 0.05) 100%
    );
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
    border-radius: calc(var(--nav-radius, 1.5rem) * 0.5);
    padding: 0.5rem;
    cursor: pointer;
    color: white;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 15px rgba(214, 72, 126, 0.3);
  }
  
  .nav-at-top .burger {
    border-radius: 0.5rem;
  }
  
  .nav-compact .burger {
    border-radius: 0.625rem;
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
    /* Fix SVG rotation: transform-box ensures transform-origin works correctly */
    transform-box: fill-box;
    transform-origin: center;
    transition:
      transform 280ms cubic-bezier(.2,.9,.2,1),
      opacity 180ms ease;
    will-change: transform, opacity;
  }
  
  /* Middle bar collapses toward left */
  .burger__mid {
    transform-box: fill-box;
    transform-origin: left center;
  }
  
  .burger.is-open .burger__top {
    transform: translateY(5.75px) rotate(45deg);
  }
  
  .burger.is-open .burger__mid {
    opacity: 0;
    transform: scaleX(0);
  }
  
  .burger.is-open .burger__bot {
    transform: translateY(-5.75px) rotate(-45deg);
  }
  
  @media (prefers-reduced-motion: reduce) {
    .burger__bar {
      transition: none;
    }
  }
</style>
