<script lang="ts">
  import { theme } from '$lib/stores/theme';
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  import MagneticButton from './MagneticButton.svelte';

  const currentYear = new Date().getFullYear();

  onMount(() => {
    if (browser && !document.querySelector('script[src*="iubenda.js"]')) {
      const s = document.createElement('script');
      s.src = 'https://cdn.iubenda.com/iubenda.js';
      document.body.appendChild(s);
    }
  });

  const pageLinks = [
    { href: '/', label: 'Home' },
    { href: '/servizi', label: 'Servizi' },
    { href: '/chi-siamo', label: 'Chi siamo' },
    { href: '/contatti', label: 'Contatti' },
  ];

  const socialLinks = [
    { href: 'https://www.instagram.com/wearerighello', label: 'Instagram', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
    { href: 'https://www.linkedin.com/company/righello', label: 'LinkedIn', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
    { href: 'https://www.tiktok.com/@wearerighello', label: 'TikTok', icon: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z' },
  ];

  const legalLinks = [
    { href: 'https://www.iubenda.com/privacy-policy/47301653', label: 'Privacy Policy', external: true },
  ];

  function scrollToTop() {
    if (browser) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
</script>

<footer class="footer" role="contentinfo">
  <div class="footer-top-border"></div>

  <div class="footer-cta section-container">
    <div class="cta-inner">
      <div class="cta-text">
        <h3 class="cta-title">Hai un progetto in mente?</h3>
        <p class="cta-subtitle">Rispondiamo entro 72 ore. Preventivo gratuito e personalizzato.</p>
      </div>
      <MagneticButton href="/contatti" variant="primary">
        Parliamone
        <svg class="w-5 h-5 ml-2 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </MagneticButton>
    </div>
  </div>

  <div class="footer-main section-container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="/" class="footer-logo-link" aria-label="Righello - Torna alla home">
          {#if $theme === 'dark'}
            <img src="/logo-white.png" alt="Righello" class="footer-logo" loading="lazy" decoding="async" width="140" height="28" />
          {:else}
            <img src="/logo-full.png" alt="Righello" class="footer-logo" loading="lazy" decoding="async" width="140" height="28" />
          {/if}
        </a>
        <p class="footer-tagline">Marketing, advertising e sviluppo digitale con un approccio data-driven.</p>
        <div class="social-icons">
          {#each socialLinks as social}
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              class="social-icon-link"
              aria-label={social.label}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d={social.icon} />
              </svg>
            </a>
          {/each}
        </div>
      </div>

      <nav class="footer-column" aria-label="Navigazione principale">
        <h4 class="footer-heading">Pagine</h4>
        <ul class="footer-links">
          {#each pageLinks as link}
            <li><a href={link.href}>{link.label}</a></li>
          {/each}
        </ul>
      </nav>

      <nav class="footer-column footer-social-col" aria-label="Social media">
        <h4 class="footer-heading">Social</h4>
        <ul class="footer-links">
          {#each socialLinks as link}
            <li>
              <a href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>
            </li>
          {/each}
        </ul>
      </nav>

      <div class="footer-column">
        <h4 class="footer-heading">Contatti</h4>
        <address class="footer-address">
          <a href="mailto:hello@wearerighello.com" class="contact-link">hello@wearerighello.com</a>
          <span class="contact-text">Via Pio X 21, Mestre - Venezia</span>
          <span class="contact-text">P.IVA: 01979970934</span>
        </address>
      </div>
    </div>
  </div>

  <div class="footer-bottom section-container">
    <div class="footer-bottom-inner">
      <p class="footer-copyright">&copy; {currentYear} Righello S.r.l. Tutti i diritti riservati.</p>
      <nav class="footer-legal" aria-label="Link legali">
        {#each legalLinks as link, i}
          {#if i > 0}<span class="legal-separator" aria-hidden="true">&middot;</span>{/if}
          {#if link.external}
            <a href={link.href} class="iubenda-white iubenda-noiframe iubenda-embed" title={link.label} target="_blank" rel="noopener noreferrer">{link.label}</a>
          {:else}
            <a href={link.href}>{link.label}</a>
          {/if}
        {/each}
      </nav>
      <button
        class="back-to-top"
        on:click={scrollToTop}
        aria-label="Torna in cima alla pagina"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M18 15l-6-6-6 6"/>
        </svg>
      </button>
    </div>
  </div>

  <div class="footer-giant-logo" aria-hidden="true">
    {#if $theme === 'dark'}
      <img src="/logo-white.png" alt="" class="footer-giant-logo-img" loading="lazy" decoding="async" />
    {:else}
      <img src="/logo-full.png" alt="" class="footer-giant-logo-img" loading="lazy" decoding="async" />
    {/if}
  </div>
</footer>

<style>
  .footer {
    position: relative;
    background-color: var(--bg-primary);
    color: var(--text-primary);
    overflow: hidden;
  }

  .footer-top-border {
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--border-color) 20%, var(--border-color) 80%, transparent);
  }

  .footer-cta {
    padding-top: 4rem;
    padding-bottom: 3rem;
    position: relative;
    z-index: 1;
  }

  .cta-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    padding: 2rem 2.5rem;
    border-radius: 1.25rem;
    background: linear-gradient(135deg, rgba(214, 72, 126, 0.08) 0%, rgba(6, 182, 212, 0.06) 100%);
    border: 1px solid rgba(214, 72, 126, 0.15);
  }

  .cta-title {
    font-size: 1.375rem;
    font-weight: 700;
    margin-bottom: 0.25rem;
    color: var(--text-primary);
  }

  .cta-subtitle {
    font-size: 0.9375rem;
    color: var(--text-secondary);
  }

  .footer-main {
    padding-top: 0;
    padding-bottom: 3rem;
    position: relative;
    z-index: 1;
  }

  .footer-grid {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr 1fr;
    gap: 3rem;
  }

  .footer-brand {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .footer-logo-link {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
  }

  .footer-logo-link:focus-visible {
    outline: 2px solid #D6487E;
    outline-offset: 4px;
    border-radius: 4px;
  }

  .footer-logo {
    height: 1.75rem;
    width: auto;
    object-fit: contain;
  }

  .footer-tagline {
    color: var(--text-secondary);
    font-size: 0.9375rem;
    line-height: 1.6;
    max-width: 280px;
  }

  .social-icons {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.25rem;
  }

  .social-icon-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 0.5rem;
    color: var(--text-secondary);
    background: rgba(255, 255, 255, 0.05);
    transition: color 0.2s ease, background 0.2s ease;
  }

  .social-icon-link:hover {
    color: #D6487E;
    background: rgba(214, 72, 126, 0.1);
  }

  .social-icon-link:focus-visible {
    outline: 2px solid #D6487E;
    outline-offset: 2px;
  }

  :global([data-theme="light"]) .social-icon-link {
    background: rgba(0, 0, 0, 0.04);
  }

  :global([data-theme="light"]) .social-icon-link:hover {
    background: rgba(214, 72, 126, 0.08);
  }

  .footer-heading {
    font-weight: 600;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: var(--text-primary);
    margin-bottom: 1.25rem;
  }

  .footer-links {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
  }

  .footer-links li a {
    color: var(--text-secondary);
    text-decoration: none;
    font-size: 0.9375rem;
    line-height: 1.5;
    transition: color 0.2s ease;
    display: inline-block;
    padding: 0.125rem 0;
  }

  .footer-links li a:hover {
    color: #D6487E;
  }

  .footer-links li a:focus-visible {
    outline: 2px solid #D6487E;
    outline-offset: 2px;
    border-radius: 2px;
  }

  .footer-address {
    font-style: normal;
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
  }

  .contact-link {
    color: var(--text-secondary);
    text-decoration: none;
    font-size: 0.9375rem;
    line-height: 1.5;
    transition: color 0.2s ease;
    display: inline-block;
    padding: 0.125rem 0;
  }

  .contact-link:hover {
    color: #D6487E;
  }

  .contact-link:focus-visible {
    outline: 2px solid #D6487E;
    outline-offset: 2px;
    border-radius: 2px;
  }

  .contact-text {
    color: var(--text-secondary);
    font-size: 0.9375rem;
    line-height: 1.5;
  }

  .footer-bottom {
    position: relative;
    z-index: 1;
    padding-bottom: 2rem;
  }

  .footer-bottom-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--border-color);
  }

  .footer-copyright {
    color: var(--text-secondary);
    font-size: 0.8125rem;
    opacity: 0.7;
  }

  .footer-legal {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .footer-legal a {
    color: var(--text-secondary);
    text-decoration: none;
    font-size: 0.8125rem;
    transition: color 0.2s ease;
  }

  .footer-legal a:hover {
    color: #D6487E;
  }

  .footer-legal a:focus-visible {
    outline: 2px solid #D6487E;
    outline-offset: 2px;
    border-radius: 2px;
  }

  .legal-separator {
    color: var(--text-secondary);
    opacity: 0.4;
    font-size: 0.8125rem;
  }

  .back-to-top {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.25rem;
    height: 2.25rem;
    min-width: 44px;
    min-height: 44px;
    border-radius: 0.5rem;
    border: 1px solid var(--border-color);
    background: transparent;
    color: var(--text-secondary);
    cursor: pointer;
    transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
    flex-shrink: 0;
  }

  .back-to-top:hover {
    color: #D6487E;
    border-color: rgba(214, 72, 126, 0.3);
    background: rgba(214, 72, 126, 0.05);
  }

  .back-to-top:focus-visible {
    outline: 2px solid #D6487E;
    outline-offset: 2px;
  }

  .footer-giant-logo {
    user-select: none;
    pointer-events: none;
    position: relative;
    z-index: 0;
    transform: translateY(25%);
    max-width: var(--container-max, 1280px);
    margin-left: auto;
    margin-right: auto;
    padding-left: var(--container-padding, 1rem);
    padding-right: var(--container-padding, 1rem);
    opacity: 0.04;
  }

  .footer-giant-logo-img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: contain;
  }

  @media (min-width: 640px) {
    .footer-giant-logo {
      padding-left: var(--space-lg);
      padding-right: var(--space-lg);
    }
  }

  :global([data-theme="light"]) .footer-giant-logo {
    opacity: 0.06;
  }

  /* ── Mobile: compact, premium layout ── */
  @media (max-width: 768px) {
    .footer-cta {
      padding-top: 2.5rem;
      padding-bottom: 2rem;
    }

    .cta-inner {
      flex-direction: column;
      text-align: center;
      padding: 1.5rem 1.25rem;
      gap: 1.25rem;
    }

    .cta-title {
      font-size: 1.25rem;
    }

    .cta-subtitle {
      font-size: 0.875rem;
    }

    .footer-main {
      padding-bottom: 2rem;
    }

    .footer-grid {
      grid-template-columns: 1fr 1fr;
      gap: 1.75rem 1.5rem;
    }

    .footer-brand {
      grid-column: 1 / -1;
      gap: 0.75rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid var(--border-color);
    }

    .footer-tagline {
      font-size: 0.875rem;
      max-width: none;
    }

    .footer-social-col {
      display: none;
    }

    .footer-heading {
      margin-bottom: 0.75rem;
      font-size: 0.6875rem;
    }

    .footer-links {
      gap: 0.25rem;
    }

    .footer-links li a {
      font-size: 0.875rem;
      min-height: 44px;
      display: inline-flex;
      align-items: center;
    }

    .contact-link {
      font-size: 0.875rem;
      min-height: 44px;
      display: inline-flex;
      align-items: center;
      word-break: break-all;
    }

    .contact-text {
      font-size: 0.8125rem;
    }

    .footer-address {
      gap: 0.25rem;
    }

    .footer-bottom {
      padding-bottom: 1.5rem;
    }

    .footer-bottom-inner {
      flex-direction: column;
      gap: 0.75rem;
      text-align: center;
      padding-top: 1.25rem;
    }

    .footer-copyright {
      font-size: 0.75rem;
      order: 2;
    }

    .footer-legal {
      order: 1;
    }

    .footer-legal a {
      font-size: 0.75rem;
    }

    .back-to-top {
      display: none;
    }

    .footer-giant-logo {
      transform: translateY(20%);
    }
  }

  /* ── Very small screens ── */
  @media (max-width: 380px) {
    .footer-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
  }
</style>
