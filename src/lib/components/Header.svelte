<script lang="ts">
  import { page } from '$app/stores';
  import { afterNavigate } from '$app/navigation';
  import { onMount, tick } from 'svelte';
  import ThemeToggle from './ThemeToggle.svelte';
  import Icon from './progetti/landing/Icon.svelte';
  import { departments } from '$lib/data/projects';
  import { mainNav, NAV_CTA, isCurrent, serviceMenu } from '$lib/data/site';

  const SERVICES_HREF = '/servizi';

  // Le quattro pagine di servizio: indirizzo e icona da `site.ts`, nome e frase dal reparto.
  const services = serviceMenu.flatMap((item) => {
    const dept = departments.find((d) => d.id === item.department);
    return dept ? [{ href: `/servizi/${item.slug}`, name: dept.name, tagline: dept.tagline, icon: item.icon }] : [];
  });

  let headerEl: HTMLElement;
  let burgerEl: HTMLButtonElement;
  let servicesLinkEl: HTMLAnchorElement;
  let mobileMenuOpen = false;
  let mobileServicesOpen = false;
  let servicesOpen = false;
  let lastScrollY = 0;
  let isAtTop = true;
  let isCompact = false;

  $: pathname = $page.url.pathname;

  // ── Menu del telefono ────────────────────────────────────────────────────────────
  function openMenu() {
    mobileMenuOpen = true;
    // il fuoco entra nel menu: chi usa tastiera o lettore di schermo parte dalla prima voce
    tick().then(() => headerEl?.querySelector<HTMLElement>('#mobile-menu a[href]')?.focus({ preventScroll: true }));
  }

  function closeMenu({ returnFocus = false } = {}) {
    if (!mobileMenuOpen) return;
    mobileMenuOpen = false;
    mobileServicesOpen = false;
    if (returnFocus) burgerEl?.focus();
  }

  const toggleMenu = () => (mobileMenuOpen ? closeMenu() : openMenu());

  // La pagina sotto non scorre mentre il menu e' aperto; si compensa la barra di scorrimento
  // dove esiste, cosi' il contenuto non salta di lato.
  function setScrollLock(locked: boolean) {
    const root = document.documentElement;
    if (locked) root.style.setProperty('--scrollbar-w', `${window.innerWidth - root.clientWidth}px`);
    root.classList.toggle('menu-open', locked);
  }
  $: if (typeof document !== 'undefined') setScrollLock(mobileMenuOpen);

  /** Elementi raggiungibili con Tab dentro la testata (esclude quelli nascosti). */
  function focusables(): HTMLElement[] {
    return [...headerEl.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')].filter(
      (el) => el.getClientRects().length > 0 && getComputedStyle(el).visibility !== 'hidden'
    );
  }

  function onKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      if (mobileMenuOpen) {
        closeMenu({ returnFocus: true });
      } else if (servicesOpen) {
        if (headerEl.querySelector('.nav-services')?.contains(document.activeElement)) servicesLinkEl?.focus();
        servicesOpen = false;
      }
      return;
    }
    // Con il menu aperto il fuoco resta fra logo, comandi e voci del menu: il resto della
    // pagina e' oscurato e non deve ricevere Tab.
    if (event.key === 'Tab' && mobileMenuOpen) {
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (!headerEl.contains(document.activeElement)) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  }

  // ── Menu a tendina dei servizi (schermi larghi) ──────────────────────────────────
  // Mouse: si apre al passaggio. Tastiera: si apre quando il fuoco entra nella voce. Tocco
  // (anche iPad in orizzontale): il tasto freccia accanto alla voce lo apre e lo chiude,
  // mentre la voce stessa porta alla pagina Servizi.
  const pointerEnter = (e: PointerEvent) => { if (e.pointerType === 'mouse') servicesOpen = true; };
  const pointerLeave = (e: PointerEvent) => { if (e.pointerType === 'mouse') servicesOpen = false; };
  function focusIn(e: FocusEvent) {
    if ((e.target as HTMLElement).matches(':focus-visible')) servicesOpen = true;
  }
  function focusOut(e: FocusEvent) {
    const next = e.relatedTarget as Node | null;
    if (!next || !(e.currentTarget as HTMLElement).contains(next)) servicesOpen = false;
  }
  function onWindowClick(e: MouseEvent) {
    if (servicesOpen && !(e.target as HTMLElement).closest('.nav-services')) servicesOpen = false;
  }

  afterNavigate(() => {
    servicesOpen = false;
    closeMenu();
  });

  onMount(() => {
    let rafId: number | null = null;

    const updateHeaderState = () => {
      rafId = null;
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;
      const nextIsAtTop = currentScrollY <= 30;
      let nextIsCompact = isCompact;

      if (nextIsAtTop) {
        nextIsCompact = false;
      } else if (scrollDelta > 5 && currentScrollY > 80) {
        nextIsCompact = true;
        if (servicesOpen) servicesOpen = false;
      } else if (scrollDelta < -5) {
        nextIsCompact = false;
      }

      if (isAtTop !== nextIsAtTop) isAtTop = nextIsAtTop;
      if (isCompact !== nextIsCompact) isCompact = nextIsCompact;
      lastScrollY = currentScrollY;
    };

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(updateHeaderState);
    };

    // Se la finestra diventa abbastanza larga da mostrare la barra completa, il menu del
    // telefono non ha piu' senso: si chiude e sblocca la pagina.
    const wide = window.matchMedia('(min-width: 1024px)');
    const onWide = () => { if (wide.matches) closeMenu(); };
    wide.addEventListener('change', onWide);

    updateHeaderState();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      wide.removeEventListener('change', onWide);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      setScrollLock(false);
    };
  });
</script>

<svelte:window on:keydown={onKeydown} on:click={onWindowClick} />

<header
  bind:this={headerEl}
  class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
  class:header-at-top={isAtTop}
>
  <!-- Velo dietro il menu del telefono: un tocco fuori lo chiude. Pieno, senza sfocatura. -->
  <div class="menu-scrim" class:menu-scrim-open={mobileMenuOpen} role="presentation" aria-hidden="true" on:click={() => closeMenu()}></div>

  <div class="header-container mx-auto px-4 md:px-6" class:pt-4={!isAtTop} class:pt-0={isAtTop}>
    <div
      class="floating-nav"
      class:nav-at-top={isAtTop}
      class:nav-compact={isCompact && !isAtTop}
      class:nav-scrolled={!isAtTop}
      class:nav-menu-open={mobileMenuOpen}
    >
      <a href="/" class="logo-link flex items-center flex-shrink-0" aria-label="Righello, torna alla home">
        <img src="/logo-white.png" alt="" class="logo-on-dark h-7 md:h-8" width="131" height="32" fetchpriority="high" decoding="async" />
        <img src="/logo-full.png" alt="" class="logo-on-light h-7 md:h-8" width="131" height="32" loading="lazy" decoding="async" />
      </a>

      <nav class="hidden lg:flex items-center gap-1" aria-label="Principale">
        {#each mainNav as link}
          {#if link.href === SERVICES_HREF}
            <div
              class="nav-services relative flex items-center"
              on:pointerenter={pointerEnter}
              on:pointerleave={pointerLeave}
              on:focusin={focusIn}
              on:focusout={focusOut}
            >
              <a
                bind:this={servicesLinkEl}
                href={link.href}
                class="nav-link nav-link--split"
                aria-current={isCurrent(link, pathname) ? 'page' : undefined}
              >
                {link.label}
              </a>
              <button
                type="button"
                class="nav-chevron"
                aria-expanded={servicesOpen}
                aria-controls="menu-servizi"
                aria-label="Mostra i servizi"
                on:click={() => (servicesOpen = !servicesOpen)}
              >
                <svg class="w-4 h-4 transition-transform duration-200" class:rotate-180={servicesOpen} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div id="menu-servizi" class="dropdown-menu" class:dropdown-open={servicesOpen}>
                <div class="dropdown-content">
                  {#each services as item}
                    <a href={item.href} class="dropdown-item" aria-current={pathname === item.href ? 'page' : undefined}>
                      <span class="dropdown-icon"><Icon name={item.icon} size={20} /></span>
                      <span class="dropdown-text">
                        <span class="dropdown-title">{item.name}</span>
                        <span class="dropdown-desc">{item.tagline}</span>
                      </span>
                    </a>
                  {/each}
                </div>
              </div>
            </div>
          {:else}
            <a href={link.href} class="nav-link" aria-current={isCurrent(link, pathname) ? 'page' : undefined}>
              {link.label}
            </a>
          {/if}
        {/each}
      </nav>

      <div class="flex items-center gap-3">
        <ThemeToggle />
        <a href={NAV_CTA.href} class="hidden sm:flex items-center cta-button">{NAV_CTA.label}</a>

        <button
          bind:this={burgerEl}
          type="button"
          class="burger lg:hidden"
          class:is-open={mobileMenuOpen}
          on:click={toggleMenu}
          aria-label={mobileMenuOpen ? 'Chiudi il menu' : 'Apri il menu'}
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
    </div>
  </div>

  <nav id="mobile-menu" aria-label="Menu" class="lg:hidden mobile-menu" class:mobile-menu-open={mobileMenuOpen}>
    <ul class="mobile-menu-content px-5 py-5 flex flex-col gap-1">
      {#each mainNav as link, i}
        {#if link.href === SERVICES_HREF}
          <li>
            <div class="mobile-row">
              <a href={link.href} class="mobile-nav-link" aria-current={isCurrent(link, pathname) ? 'page' : undefined}>{link.label}</a>
              <button
                type="button"
                class="mobile-expand"
                aria-expanded={mobileServicesOpen}
                aria-controls="mobile-servizi"
                aria-label="Mostra i servizi"
                on:click={() => (mobileServicesOpen = !mobileServicesOpen)}
              >
                <svg class="w-5 h-5 transition-transform duration-200" class:rotate-180={mobileServicesOpen} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            <ul id="mobile-servizi" class="mobile-submenu" class:mobile-submenu-open={mobileServicesOpen}>
              {#each services as item}
                <li>
                  <a href={item.href} class="mobile-submenu-item" aria-current={pathname === item.href ? 'page' : undefined}>
                    <span class="mobile-submenu-icon"><Icon name={item.icon} size={20} /></span>
                    <span class="mobile-submenu-text">
                      <span class="mobile-submenu-title">{item.name}</span>
                      <span class="mobile-submenu-desc">{item.tagline}</span>
                    </span>
                  </a>
                </li>
              {/each}
            </ul>
          </li>
        {:else}
          <li>
            <a href={link.href} class="mobile-nav-link" aria-current={isCurrent(link, pathname) ? 'page' : undefined}>
              {link.label}
            </a>
          </li>
        {/if}
      {/each}
      <li class="mt-3">
        <a href={NAV_CTA.href} class="cta-button-mobile">{NAV_CTA.label}</a>
      </li>
    </ul>
  </nav>
</header>

<style>
  .header-container {
    max-width: var(--container-max, 1280px);
    transition: padding 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .header-at-top .header-container {
    padding-top: 0;
  }

  .logo-link {
    min-height: 44px;
  }

  .logo-link img {
    width: auto;
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
    transition:
      max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1),
      opacity 0.3s ease,
      border-color 0.3s ease,
      transform 0.3s ease;
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

  /* Menu del telefono aperto: la barra diventa il bordo alto dello stesso pannello pieno */
  .floating-nav.nav-menu-open {
    background: var(--surface-menu);
    border-color: var(--surface-menu-border);
    border-radius: 1.5rem;
    box-shadow: none;
  }

  .nav-link {
    position: relative;
    display: flex;
    align-items: center;
    min-height: 2.5rem;
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

  /* La pagina corrente si riconosce dal segno sotto la voce, non solo dal colore */
  .nav-link[aria-current='page'] {
    color: var(--brand-pink-ink);
  }

  .nav-link[aria-current='page']::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: 0.2rem;
    width: 1rem;
    height: 2px;
    margin-left: -0.5rem;
    border-radius: 2px;
    background: currentColor;
  }

  /* "Servizi" e il tasto freccia sono due bersagli distinti ma si leggono come una voce sola */
  .nav-link--split {
    padding-right: 0.25rem;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .nav-chevron {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 2rem;
    min-height: 2.5rem;
    padding: 0 0.5rem 0 0.125rem;
    color: var(--text-primary);
    border-radius: 0 9999px 9999px 0;
    transition: color 0.2s ease, background 0.2s ease;
  }

  @media (hover: hover) {
    .nav-link:hover,
    .nav-chevron:hover,
    .nav-services:hover .nav-link--split,
    .nav-services:hover .nav-chevron {
      color: var(--brand-pink-ink);
      background: var(--brand-pink-soft);
    }
  }

  @media (pointer: coarse) {
    .nav-link,
    .nav-chevron {
      min-height: 44px;
    }
  }

  .cta-button {
    padding: 0.5rem 1.25rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: white;
    /* il bianco su rosa deve restare leggibile anche a 14 px: partenza piu' scura del marchio pieno */
    background: linear-gradient(135deg, var(--brand-pink-deep) 0%, #a8325f 100%);
    border-radius: 9999px;
    transition:
      padding 0.4s cubic-bezier(0.4, 0, 0.2, 1),
      font-size 0.4s cubic-bezier(0.4, 0, 0.2, 1),
      transform 0.3s ease,
      box-shadow 0.3s ease;
    box-shadow: 0 4px 15px rgba(214, 72, 126, 0.3);
    min-height: 2.5rem;
  }

  @media (hover: hover) {
    .cta-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(214, 72, 126, 0.4);
    }
  }

  /* ── Tendina dei servizi ── */
  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    padding-top: 0.75rem;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s ease, visibility 0s linear 0.2s;
  }

  .dropdown-open {
    opacity: 1;
    visibility: visible;
    transition-delay: 0s;
  }

  .dropdown-content {
    min-width: 340px;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
    background: var(--surface-menu);
    border: 1px solid var(--surface-menu-border);
    border-radius: 1.25rem;
    box-shadow: var(--surface-menu-shadow);
  }

  .dropdown-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 0.875rem;
    border-radius: 0.75rem;
    transition: background 0.2s ease;
  }

  .dropdown-item:hover,
  .dropdown-item:focus-visible {
    background: var(--brand-pink-soft);
  }

  .dropdown-item[aria-current='page'] .dropdown-title {
    color: var(--brand-pink-ink);
  }

  .dropdown-icon {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--brand-pink-ink);
    background: var(--brand-pink-soft);
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
    line-height: 1.35;
    color: var(--text-secondary);
  }

  /* ── Menu del telefono ── */
  .menu-scrim {
    position: fixed;
    inset: 0;
    z-index: -1;
    background: var(--scrim);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.25s ease;
  }

  .menu-scrim-open {
    opacity: 1;
    pointer-events: auto;
  }

  .mobile-menu {
    position: absolute;
    top: 100%;
    left: 1rem;
    right: 1rem;
    margin-top: 0.5rem;
    display: flex;
    flex-direction: column;
    background: var(--surface-menu);
    border: 1px solid var(--surface-menu-border);
    border-radius: 1.5rem;
    max-height: 0;
    overflow-x: hidden;
    overflow-y: hidden;
    opacity: 0;
    /* chiuso = fuori da Tab e dai lettori di schermo, ma solo a fine dissolvenza */
    visibility: hidden;
    pointer-events: none;
    overscroll-behavior: contain;
    transition: max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease, visibility 0s linear 0.35s;
    box-shadow: var(--surface-menu-shadow);
  }

  .mobile-menu-open {
    max-height: calc(100dvh - 7rem - env(safe-area-inset-bottom));
    overflow-y: auto;
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transition-delay: 0s;
  }

  .mobile-menu-content {
    list-style: none;
    margin: 0;
    padding-bottom: calc(1.25rem + env(safe-area-inset-bottom));
  }

  .mobile-row {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .mobile-row .mobile-nav-link {
    flex: 1;
  }

  .mobile-nav-link {
    display: flex;
    align-items: center;
    min-height: 3rem;
    padding: 0.75rem 1rem;
    font-size: 1.0625rem;
    font-weight: 500;
    color: var(--text-primary);
    border-radius: 0.75rem;
    transition: background 0.2s ease, color 0.2s ease;
  }

  .mobile-nav-link[aria-current='page'] {
    color: var(--brand-pink-ink);
    background: var(--brand-pink-soft);
  }

  .mobile-expand {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    flex-shrink: 0;
    color: var(--text-secondary);
    border-radius: 0.75rem;
  }

  .mobile-submenu {
    list-style: none;
    margin: 0;
    padding: 0;
    max-height: 0;
    overflow: hidden;
    visibility: hidden;
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
    transition: max-height 0.3s ease, visibility 0s linear 0.3s;
  }

  .mobile-submenu-open {
    max-height: 30rem;
    visibility: visible;
    margin-bottom: 0.5rem;
    transition-delay: 0s;
  }

  .mobile-submenu-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    min-height: 3.5rem;
    padding: 0.625rem 1rem;
    margin-left: 0.75rem;
    border-radius: 0.75rem;
  }

  .mobile-submenu-item[aria-current='page'] .mobile-submenu-title {
    color: var(--brand-pink-ink);
  }

  .mobile-submenu-icon {
    flex: 0 0 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--brand-pink-ink);
  }

  .mobile-submenu-text {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .mobile-submenu-title {
    font-weight: 500;
    line-height: 1.25;
    color: var(--text-primary);
  }

  .mobile-submenu-desc {
    margin-top: 0.125rem;
    font-size: 0.875rem;
    line-height: 1.35;
    color: var(--text-secondary);
  }

  @media (hover: hover) {
    .mobile-nav-link:hover,
    .mobile-submenu-item:hover {
      background: var(--brand-pink-soft);
    }
  }

  .cta-button-mobile {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 3rem;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    color: white;
    background: linear-gradient(135deg, var(--brand-pink-deep) 0%, #a8325f 100%);
    border-radius: 0.75rem;
    box-shadow: 0 4px 15px rgba(214, 72, 126, 0.3);
  }

  .burger {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.75rem;
    height: 2.75rem;
    background: linear-gradient(135deg, var(--brand-pink-deep) 0%, #a8325f 100%);
    border: 0;
    border-radius: calc(var(--nav-radius, 1.5rem) * 0.5);
    padding: 0.5rem;
    cursor: pointer;
    color: white;
    transition: border-radius 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s ease, box-shadow 0.3s ease;
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

  @media (hover: hover) {
    .burger:hover {
      transform: scale(1.05);
      box-shadow: 0 6px 20px rgba(214, 72, 126, 0.4);
    }
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
</style>
