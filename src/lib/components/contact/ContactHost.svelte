<script lang="ts">
  /**
   * L'aggancio del percorso di contatto nel layout, montato una volta sola: l'ascoltatore che
   * trasforma ogni link verso /contatti in "apri il foglio", la provenienza (UTM)
   * e, sul telefono, la barra fissa. Il guscio del foglio e' qui; il resto si scarica quando serve.
   */
  import { onMount, type ComponentType } from 'svelte';
  import ContactSheet from './ContactSheet.svelte';
  import { captureAttribution } from '$lib/contact/attribution';
  import { installContactInterception } from '$lib/contact/intercept';
  import { loadSheetBody, warmWhenIdle } from '$lib/contact/preload';
  import { openContactSheet } from '$lib/contact/sheet';

  let Bar: ComponentType | null = null;

  onMount(() => {
    captureAttribution();
    const stopIntercept = installContactInterception({
      open: (ctx, trigger) => openContactSheet(ctx, trigger),
      warm: () => void loadSheetBody(),
    });
    const stopWarm = warmWhenIdle();

    // La barra serve solo sotto i 640 px (da li' in su il pulsante e' nella testata) e compare dopo la prima schermata:
    // non si scarica per gli altri, e per chi la usa si scarica quando il browser ha tempo, non insieme alla pagina.
    const mq = matchMedia('(max-width: 639px)');
    let idle = 0;
    const loadBar = () => {
      if (!mq.matches || Bar || idle) return;
      const go = () => import('./ContactBar.svelte').then((m) => (Bar = m.default));
      idle = typeof window.requestIdleCallback === 'function' ? window.requestIdleCallback(go, { timeout: 2500 }) : window.setTimeout(go, 1500);
    };
    if (document.readyState === 'complete') loadBar();
    else window.addEventListener('load', loadBar, { once: true });
    mq.addEventListener('change', loadBar);

    return () => {
      stopIntercept();
      stopWarm();
      mq.removeEventListener('change', loadBar);
      window.removeEventListener('load', loadBar);
    };
  });
</script>

<ContactSheet />
{#if Bar}<svelte:component this={Bar} />{/if}
