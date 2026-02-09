<script lang="ts">
  import { theme } from '$lib/stores/theme';
  
  const currentYear = new Date().getFullYear();

  const pageLinks = [
    { href: '/', label: 'Home' },
    { href: '/servizi', label: 'Servizi' },
    { href: '/progetti', label: 'Progetti' },
    { href: '/chi-siamo', label: 'Chi siamo' },
    { href: '/contatti', label: 'Contatti' },
  ];

  const socialLinks = [
    { href: 'https://www.instagram.com/wearerighello', label: 'Instagram' },
    { href: 'https://www.linkedin.com/company/righello', label: 'LinkedIn' },
    { href: 'https://www.tiktok.com/@wearerighello', label: 'TikTok' },
  ];
</script>

<footer class="footer">
  <div class="footer-top-border"></div>
  
  <div class="footer-content section-container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="/" class="footer-logo-link">
          {#if $theme === 'dark'}
            <img src="/logo-white.png" alt="Righello" class="footer-logo" />
          {:else}
            <img src="/logo-full.png" alt="Righello" class="footer-logo" />
          {/if}
        </a>
        <p class="footer-tagline">Marketing, advertising e sviluppo digitale con un approccio data-driven.</p>
        <p class="footer-copyright">© {currentYear} Righello. Tutti i diritti riservati.</p>
      </div>

      <div class="footer-column">
        <h4 class="footer-heading">Pagine</h4>
        <ul class="footer-links">
          {#each pageLinks as link}
            <li><a href={link.href}>{link.label}</a></li>
          {/each}
        </ul>
      </div>

      <div class="footer-column">
        <h4 class="footer-heading">Social</h4>
        <ul class="footer-links">
          {#each socialLinks as link}
            <li>
              <a href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>
            </li>
          {/each}
        </ul>
      </div>

      <div class="footer-column">
        <h4 class="footer-heading">Contatti</h4>
        <ul class="footer-links">
          <li><a href="mailto:hello@wearerighello.com">hello@wearerighello.com</a></li>
          <li><span>Via Pio X 21, Mestre - Venezia</span></li>
          <li><span>P.IVA: 01979970934</span></li>
        </ul>
      </div>
    </div>
  </div>

  <div class="footer-giant-text" aria-hidden="true">Righello</div>
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

  .footer-content {
    padding-top: 4rem;
    padding-bottom: 4rem;
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

  .footer-copyright {
    color: var(--text-secondary);
    font-size: 0.8125rem;
    opacity: 0.6;
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

  .footer-links li a,
  .footer-links li span {
    color: var(--text-secondary);
    text-decoration: none;
    font-size: 0.9375rem;
    line-height: 1.5;
    transition: color 0.2s ease;
  }

  .footer-links li a {
    display: inline-block;
    min-height: 28px;
  }

  .footer-links li a:hover {
    color: #D6487E;
  }

  .footer-giant-text {
    text-align: center;
    font-size: clamp(7rem, 12vw, 14rem);
    font-weight: 900;
    line-height: 1;
    color: rgba(255, 255, 255, 0.03);
    user-select: none;
    pointer-events: none;
    position: relative;
    transform: translateY(30%);
    z-index: 0;
    letter-spacing: -0.02em;
  }

  :global([data-theme="light"]) .footer-giant-text {
    color: rgba(0, 0, 0, 0.04);
  }

  @media (max-width: 768px) {
    .footer-grid {
      grid-template-columns: 1fr 1fr;
      gap: 2.5rem;
    }

    .footer-brand {
      grid-column: 1 / -1;
    }

    .footer-content {
      padding-top: 3rem;
      padding-bottom: 3rem;
    }

    .footer-links li a {
      min-height: 44px;
      display: inline-flex;
      align-items: center;
    }

    .footer-giant-text {
      font-size: clamp(4rem, 18vw, 8rem);
    }
  }

  @media (max-width: 480px) {
    .footer-grid {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
  }
</style>
