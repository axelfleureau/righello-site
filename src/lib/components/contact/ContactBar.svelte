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
  import CxButton from '$lib/components/contact/CxButton.svelte';
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
    <div class="cb-bar__main"><CxButton href={contactHref()} full>Parliamone</CxButton></div>
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
    gap: var(--cx-3);
    align-items: center;
    padding: var(--cx-3) max(var(--cx-4), env(safe-area-inset-right, 0px)) calc(var(--cx-3) + env(safe-area-inset-bottom, 0px)) max(var(--cb-left, 1rem), calc(env(safe-area-inset-left, 0px) + var(--cx-4)));
    background: var(--bg-secondary);
    border-top: 1px solid var(--border-color);
    box-shadow: 0 -10px 28px -14px rgba(0, 0, 0, 0.5);
    /* compare e sparisce salendo/scendendo e dissolvendosi: solo transform e opacity */
    transform: translateY(105%);
    opacity: 0;
    pointer-events: none;
    transition: transform 0.34s var(--cx-ease), opacity 0.22s ease;
    will-change: transform;
  }
  .cb-bar.is-on { transform: none; opacity: 1; pointer-events: auto; }
  .cb-bar__main { flex: 1 1 auto; min-width: 0; }
  .cb-bar__wa {
    flex: none;
    display: grid;
    place-items: center;
    position: relative;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background: var(--bg-primary);
    box-shadow: inset 0 0 0 1px var(--border-color);
    color: var(--text-primary);
    -webkit-tap-highlight-color: transparent;
    transition: transform 0.14s var(--cx-ease);
  }
  .cb-bar__wa:active { transform: scale(0.94); }
  .cb-bar a:focus-visible { outline: 2px solid var(--focus-ring); outline-offset: 2px; }
  .cb-spacer { width: 100%; pointer-events: none; }
  @media (prefers-reduced-motion: reduce) { .cb-bar, .cb-bar__wa { transition: none; } .cb-bar__wa:active { transform: none; } }
</style>
