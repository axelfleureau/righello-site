<script lang="ts">
  /**
   * La barra fissa del telefono: "Parliamone" (apre il foglio) e WhatsApp, sempre a portata di pollice.
   * Compare dopo la prima schermata (o subito nelle pagine corte) e si toglie di mezzo quando
   * coprirebbe qualcosa: foglio aperto, pagina /contatti, menu aperto, tastiera o campo in uso,
   * avviso cookie aperto. Lo spazio in fondo alla pagina e' riservato con l'altezza MISURATA della barra.
   */
  import { onMount } from 'svelte';
  import { afterNavigate } from '$app/navigation';
  import { page } from '$app/stores';
  import { cookieUi, watchCookieUi } from '$lib/contact/cookieBanner';
  import { contactSheet } from '$lib/contact/sheet';
  import { contactHref, whatsappHref } from '$lib/data/contact';

  let narrow = false;
  let scrolled = false;
  let short = false;
  let typing = false;
  let keyboard = false;
  let menu = false;
  let barH = 0;

  $: eligible = narrow && $page.url.pathname.replace(/\/$/, '') !== '/contatti';
  $: visible = eligible && (scrolled || short) && !typing && !keyboard && !menu && $cookieUi.bannerH === 0 && !$contactSheet.open;
  // il pulsante delle preferenze cookie sta in basso a sinistra, sopra a tutto: la barra gli lascia il posto
  $: left = $cookieUi.widgetRight ? $cookieUi.widgetRight + 10 : 16;

  const isField = (el: EventTarget | null) => el instanceof HTMLElement && el.matches('input, textarea, select, [contenteditable=""], [contenteditable="true"]');

  function measureShort() {
    short = document.documentElement.scrollHeight < window.innerHeight * 1.5;
  }
  afterNavigate(() => {
    scrolled = window.scrollY > window.innerHeight * 0.8;
    measureShort();
    setTimeout(measureShort, 1500); // le immagini e i caricamenti pigri allungano la pagina dopo
  });

  onMount(() => {
    const mq = matchMedia('(max-width: 639px)');
    const syncMq = () => (narrow = mq.matches);
    syncMq();
    mq.addEventListener('change', syncMq);

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        // un po' di isteresi: compare a 0,8 schermate, sparisce solo tornando sotto 0,6
        scrolled = scrolled ? y > window.innerHeight * 0.6 : y > window.innerHeight * 0.8;
      });
    };
    onScroll();
    measureShort();
    const late = setTimeout(measureShort, 1500);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measureShort, { passive: true });

    const onFocusIn = (e: FocusEvent) => (typing = isField(e.target));
    const onFocusOut = (e: FocusEvent) => (typing = isField(e.relatedTarget));
    document.addEventListener('focusin', onFocusIn);
    document.addEventListener('focusout', onFocusOut);

    const vv = window.visualViewport;
    const onVv = () => (keyboard = !!vv && vv.height < window.innerHeight * 0.75);
    vv?.addEventListener('resize', onVv);

    const stopCookie = watchCookieUi();
    const html = document.documentElement;
    const syncMenu = () => (menu = html.classList.contains('menu-open'));
    syncMenu();
    const menuObserver = new MutationObserver(syncMenu);
    menuObserver.observe(html, { attributes: true, attributeFilter: ['class'] });

    return () => {
      mq.removeEventListener('change', syncMq);
      cancelAnimationFrame(raf);
      clearTimeout(late);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measureShort);
      document.removeEventListener('focusin', onFocusIn);
      document.removeEventListener('focusout', onFocusOut);
      vv?.removeEventListener('resize', onVv);
      menuObserver.disconnect();
      stopCookie();
    };
  });

  // L'altezza vera della barra (con l'area sicura dell'iPhone) diventa lo spazio in fondo alla pagina.
  function measure(node: HTMLElement) {
    const read = () => (barH = Math.ceil(node.getBoundingClientRect().height));
    read();
    const ro = new ResizeObserver(read);
    ro.observe(node);
    return { destroy: () => ro.disconnect() };
  }
</script>

{#if eligible}
  <div class="cb-bar" class:is-on={visible} inert={visible ? undefined : true} use:measure style="--cb-left:{left}px" data-cta="barra">
    <a class="cb-bar__main" href={contactHref()} data-cta="barra">Parliamone</a>
    <a class="cb-bar__wa" href={whatsappHref()} target="_blank" rel="noopener noreferrer" aria-label="Scrivici su WhatsApp (si apre in una nuova scheda)">
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 11.5a8 8 0 0 1-11.9 7L4 20l1.5-4A8 8 0 1 1 20 11.5Z" /><path d="M9 9.2c.2 2.2 2.6 4.6 4.8 4.8l1.2-1.1-1.6-1-.8.6a3.3 3.3 0 0 1-1.6-1.6l.6-.8-1-1.6L9 9.2Z" /></svg>
    </a>
  </div>
  <div class="cb-spacer" style="height:{barH}px" aria-hidden="true"></div>
{/if}

<style>
  .cb-bar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 40;
    display: flex;
    gap: 0.6rem;
    align-items: center;
    padding: 0.65rem 1rem calc(0.65rem + env(safe-area-inset-bottom, 0px)) var(--cb-left, 1rem);
    background: var(--bg-secondary);
    border-top: 1px solid var(--border-color);
    box-shadow: 0 -10px 28px -14px rgba(0, 0, 0, 0.5);
    transform: translateY(105%);
    transition: transform 0.24s cubic-bezier(0.2, 0.8, 0.2, 1);
    will-change: transform;
  }
  .cb-bar.is-on { transform: none; }
  .cb-bar__main {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 3rem;
    padding: 0 1.25rem;
    border-radius: 999px;
    background: linear-gradient(135deg, var(--brand-pink-deep) 0%, #a8325f 100%);
    box-shadow: 0 4px 15px rgba(214, 72, 126, 0.3);
    color: #fff;
    font-size: 1rem;
    font-weight: 600;
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
  }
  .cb-bar__main:active { transform: scale(0.985); }
  .cb-bar__wa {
    flex: none;
    display: grid;
    place-items: center;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    border: 1px solid var(--border-color);
    background: var(--bg-primary);
    color: var(--text-primary);
    -webkit-tap-highlight-color: transparent;
  }
  .cb-bar a:focus-visible { outline: 2px solid var(--focus-ring); outline-offset: 2px; }
  .cb-spacer { width: 100%; pointer-events: none; }
  @media (prefers-reduced-motion: reduce) { .cb-bar { transition: none; } }
</style>
