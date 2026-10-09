<script lang="ts">
  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  import MagneticButton from './MagneticButton.svelte';
  import {
    COMPANY,
    COOKIE_POLICY_URL,
    PRIVACY_URL,
    footerColumns,
    footerProducts,
    hasOwnClosing,
    socialLinks,
  } from '$lib/data/site';

  const currentYear = new Date().getFullYear();

  const columns = [
    footerColumns[0],
    { title: 'App e progetti', links: [...footerProducts, { href: '/progetti', label: 'Tutti i progetti' }] },
    ...footerColumns.slice(1),
  ];

  // Privacy e cookie: testi e gestione del consenso sono di iubenda (collegamenti semplici,
  // niente finestrella incorporata: meno script e nessun badge bianco sul fondo scuro). "Preferenze cookie"
  // riapre il pannello della scelta; se lo script non e' disponibile (bloccato dal browser)
  // si ripiega sulla pagina della cookie policy.
  const legalLinks = [
    { href: PRIVACY_URL, label: 'Privacy Policy' },
    { href: COOKIE_POLICY_URL, label: 'Cookie Policy' },
  ];

  function openCookiePreferences() {
    const iub = (window as unknown as { _iub?: { cs?: { api?: { openPreferences?: () => void } } } })._iub;
    if (iub?.cs?.api?.openPreferences) iub.cs.api.openPreferences();
    else window.open(COOKIE_POLICY_URL, '_blank', 'noopener');
  }

  function scrollToTop() {
    if (browser) {
      window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    }
  }
</script>

<footer class="footer">
  <div class="footer-top-border"></div>

  {#if !hasOwnClosing($page.url.pathname)}
  <div class="footer-cta section-container">
    <div class="cta-inner">
      <div class="cta-text">
        <h2 class="cta-title">Hai un progetto in mente?</h2>
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
  {/if}

  <div class="footer-main section-container" data-nosnippet>
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="/" class="footer-logo-link" aria-label="Righello, torna alla home">
          <img src="/logo-white.png" alt="" class="footer-logo logo-on-dark" loading="lazy" decoding="async" width="114" height="28" />
          <img src="/logo-full.png" alt="" class="footer-logo logo-on-light" loading="lazy" decoding="async" width="114" height="28" />
        </a>
        <p class="footer-tagline">Marketing, advertising e sviluppo digitale con un approccio data-driven.</p>
        <ul class="social-icons">
          {#each socialLinks as social}
            <li>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                class="social-icon-link"
                aria-label="{social.label} (si apre in una nuova scheda)"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d={social.icon} />
                </svg>
              </a>
            </li>
          {/each}
        </ul>
      </div>

      {#each columns as column}
        <nav class="footer-column" aria-label={column.title}>
          <h3 class="footer-heading">{column.title}</h3>
          <ul class="footer-links">
            {#each column.links as link}
              <li><a href={link.href}>{link.label}</a></li>
            {/each}
          </ul>
        </nav>
      {/each}

      <div class="footer-column">
        <h3 class="footer-heading">Contatti</h3>
        <address class="footer-address">
          <a href="mailto:{COMPANY.email}" class="contact-link">{COMPANY.email}</a>
          <span class="contact-text">Sede legale: {COMPANY.legalSeat}</span>
          <span class="contact-text">Base operativa: {COMPANY.operationsBase}</span>
          <span class="contact-text">P.IVA: {COMPANY.vat}</span>
        </address>
      </div>
    </div>
  </div>

  <div class="footer-bottom section-container" data-nosnippet>
    <div class="footer-bottom-inner">
      <p class="footer-copyright">&copy; {currentYear} {COMPANY.legalName} Tutti i diritti riservati.</p>
      <nav class="footer-legal" aria-label="Informative legali">
        {#each legalLinks as link}
          <a href={link.href} title={link.label} target="_blank" rel="noopener noreferrer">{link.label}</a>
        {/each}
        <button type="button" class="legal-button" on:click={openCookiePreferences}>Preferenze cookie</button>
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
    <img src="/logo-white.png" alt="" class="footer-giant-logo-img logo-on-dark" loading="lazy" decoding="async" width="1200" height="294" />
    <img src="/logo-full.png" alt="" class="footer-giant-logo-img logo-on-light" loading="lazy" decoding="async" width="1200" height="294" />
  </div>
</footer>

<style>
  .footer {
    position: relative;
    z-index: 1;
    background-color: var(--bg-primary);
    color: var(--text-primary);
    overflow-x: hidden;
    overflow-y: visible;
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
    grid-template-columns: 1.5fr 1fr 1fr 1fr 1.2fr;
    gap: 2.5rem;
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
    margin: 0.25rem 0 0;
    padding: 0;
    list-style: none;
  }

  .social-icon-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.75rem;
    height: 2.75rem;
    border-radius: 0.5rem;
    color: var(--text-secondary);
    background: rgba(255, 255, 255, 0.05);
    transition: color 0.2s ease, background 0.2s ease;
  }

  .social-icon-link:hover {
    color: var(--brand-pink-ink);
    background: rgba(214, 72, 126, 0.1);
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

  .footer-links a {
    color: var(--text-secondary);
    text-decoration: none;
    font-size: 0.9375rem;
    line-height: 1.5;
    transition: color 0.2s ease;
    display: inline-block;
    padding: 0.125rem 0;
  }

  .footer-links a:hover {
    color: var(--brand-pink-ink);
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
    color: var(--brand-pink-ink);
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
  }

  .footer-legal {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 0.25rem 1.25rem;
  }

  .footer-legal a,
  .legal-button {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    color: var(--text-secondary);
    text-decoration: none;
    font-size: 0.8125rem;
    transition: color 0.2s ease;
  }

  .legal-button {
    background: none;
    border: 0;
    padding: 0;
    cursor: pointer;
    font-family: inherit;
  }

  .footer-legal a:hover,
  .legal-button:hover {
    color: var(--brand-pink-ink);
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
    color: var(--brand-pink-ink);
    border-color: rgba(214, 72, 126, 0.3);
    background: rgba(214, 72, 126, 0.05);
  }


  .footer-giant-logo {
    user-select: none;
    pointer-events: none;
    position: relative;
    z-index: 0;
    transform: translateY(0%);
    max-width: var(--container-max, 1280px);
    margin-left: auto;
    margin-right: auto;
    padding-left: var(--container-padding, 1rem);
    padding-right: var(--container-padding, 1rem);
    opacity: 0.055;
  }

  .footer-giant-logo-img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }

  @media (min-width: 640px) {
    .footer-giant-logo {
      padding-left: var(--space-lg);
      padding-right: var(--space-lg);
    }
  }

  :global([data-theme="light"]) .footer-giant-logo {
    opacity: 0.075;
  }

  /* ── Tablet: marchio in cima, le colonne sotto ── */
  @media (max-width: 1023px) {
    .footer-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem 1.5rem;
    }

    .footer-brand {
      grid-column: 1 / -1;
    }
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

    .footer-heading {
      margin-bottom: 0.5rem;
      font-size: 0.75rem;
    }

    .footer-links {
      gap: 0.25rem;
    }

    .footer-links a {
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
      font-size: 0.8125rem;
      order: 2;
    }

    .footer-legal {
      order: 1;
    }

    .footer-legal a,
    .legal-button {
      font-size: 0.8125rem;
    }

    .back-to-top {
      display: none;
    }

    .footer-giant-logo {
      transform: translateY(5%);
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
