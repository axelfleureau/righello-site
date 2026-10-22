<script lang="ts">
  /**
   * Il modulo di contatto: uno solo, nel foglio sopra ogni pagina (`layout="sheet"`) e nella pagina
   * /contatti (`layout="page"`). Disegna e basta: stato, convalida, bozza, invio e misura sono in
   * `$lib/contact/flow`. Nome, UN recapito, cosa serve, messaggio facoltativo.
   *
   * Nel foglio il pulsante di invio sta in una barra in fondo (`cf-dock`) che resta sempre in vista, anche con la
   * tastiera del telefono aperta e con il modulo da scorrere; nella pagina e' in fondo al modulo.
   */
  import { onMount, tick } from 'svelte';
  import ContactBrief from '$lib/components/contact/ContactBrief.svelte';
  import ContactDock from '$lib/components/contact/ContactDock.svelte';
  import ContactDone from '$lib/components/contact/ContactDone.svelte';
  import ContactField from '$lib/components/contact/ContactField.svelte';
  import CxButton from '$lib/components/contact/CxButton.svelte';
  import { mailFallbackHref, whatsappFallbackHref, type ContactFlow } from '$lib/contact/flow';
  import { CONTACT, CONTACT_BUDGETS, CONTACT_TOPICS } from '$lib/data/contact';
  import { FIELD_LABEL, FIELD_ORDER, parseContact, type ContactFields } from '$lib/utils/contact-validation';

  export let flow: ContactFlow;
  export let layout: 'sheet' | 'page' = 'page';
  /** Su un dispositivo con mouse e tastiera il nome prende il fuoco subito; sul telefono no (aprirebbe la tastiera sopra tutto il resto). */
  export let autofocus = false;
  export let onClose: () => void = () => {};
  export let onBack: () => void = () => {};

  const ids: Record<keyof ContactFields, string> = {
    name: `cf-${layout}-name`,
    contact: `cf-${layout}-contact`,
    message: `cf-${layout}-message`,
  };

  /** Quale tastiera offrire per il recapito: il testo scritto resta valido comunque, qui si sceglie solo quella giusta. */
  let mode: 'email' | 'tel' = 'email';
  let form: HTMLFormElement;

  $: s = $flow;
  $: errorList = FIELD_ORDER.filter((f) => s.errors[f]);
  $: recapito = parseContact(s.fields.contact);
  $: nameOk = !!s.fields.name.trim() && !s.errors.name && !!s.touched.name;
  $: contactOk = !!recapito && !s.errors.contact;
  $: sending = s.status === 'sending';

  const reduced = () => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Dopo l'invio riuscito il pulsante diventa «Inviata» per mezzo secondo e solo poi arriva la conferma al posto del modulo:
  // chi tocca vede subito che e' andata, senza un salto di schermata.
  let showDone = $flow.status === 'sent';
  let celebrating = false;
  let doneTimer: ReturnType<typeof setTimeout> | undefined;
  $: syncDone(s.status);
  function syncDone(status: string) {
    if (status === 'sent') {
      if (showDone || celebrating) return;
      if (reduced()) return void (showDone = true);
      celebrating = true;
      doneTimer = setTimeout(() => ((celebrating = false), (showDone = true)), 620);
    } else {
      clearTimeout(doneTimer);
      celebrating = false;
      showDone = false;
    }
  }

  // Se l'invio dura piu' del solito il pulsante lo dice: e' lento, non e' bloccato.
  let slow = false;
  let slowTimer: ReturnType<typeof setTimeout> | undefined;
  $: if (sending) slowTimer ??= setTimeout(() => (slow = true), 4000);
  else {
    clearTimeout(slowTimer);
    slowTimer = undefined;
    slow = false;
  }

  onMount(() => {
    if (parseContact($flow.fields.contact)?.kind === 'phone') mode = 'tel';
    if (autofocus) document.getElementById(ids.name)?.focus({ preventScroll: true });
    return () => {
      clearTimeout(doneTimer);
      clearTimeout(slowTimer);
    };
  });

  const focusField = (field: keyof ContactFields) => document.getElementById(ids[field])?.focus();

  async function submit(event: Event) {
    event.preventDefault();
    const bad = await flow.submit();
    if (bad) {
      await tick();
      focusField(bad);
    }
  }

  /** Tasto "Avanti"/"Invia" della tastiera: dal nome si passa al recapito; dal recapito si invia (foglio) o si va al messaggio (pagina). */
  function onEnter(event: KeyboardEvent, field: 'name' | 'contact') {
    if (event.key !== 'Enter' || event.isComposing) return;
    event.preventDefault();
    if (field === 'name') focusField('contact');
    else if (layout === 'page') focusField('message');
    else form.requestSubmit();
  }

  /** Nessun errore finche' non si e' finito di scrivere: lasciare un campo VUOTO non e' un errore (lo dice l'invio), uno scritto a meta' si'. */
  function leave(field: keyof ContactFields) {
    if (s.fields[field].trim() || s.errors[field]) flow.blur(field);
  }

  function setMode(next: 'email' | 'tel') {
    mode = next;
    // la tastiera giusta compare subito: il tocco su «Telefono» e' una richiesta di scrivere un numero
    void tick().then(() => document.getElementById(ids.contact)?.focus({ preventScroll: true }));
  }

  /** Un tocco leggero sulla pastiglia, solo dove il dispositivo lo sa fare e solo dopo un gesto vero (il clic lo e'). */
  function pick(value: string) {
    const selecting = s.service !== value;
    flow.pickTopic(value);
    if (selecting) {
      try {
        navigator.vibrate?.(8);
      } catch {
        /* nessun aptico: non cambia niente */
      }
    }
  }

  $: placeholder = layout === 'sheet' ? 'Se vuoi, due righe su cosa ti serve e per quando.' : 'Cosa vuoi costruire o migliorare? Per quando ti servirebbe?';
  $: contactHint = recapito?.kind === 'email' ? 'Ti rispondiamo a questo indirizzo.' : recapito?.kind === 'phone' ? 'Ti contattiamo a questo numero.' : 'Basta uno dei due.';
</script>

{#if showDone}
  <ContactDone {flow} {layout} {onClose} {onBack} />
{:else}
  <form class="cf cf--{layout}" bind:this={form} novalidate on:submit={submit} aria-busy={sending}>
    {#if layout === 'page'}
      <div class="cf__head">
        <h2 class="cf__title">Raccontaci il progetto</h2>
        <p class="cf__lead">Due campi bastano: nome e come risponderti. Il resto lo chiediamo noi, a voce.</p>
      </div>
    {/if}

    <ContactBrief {flow} compact class="cf__brief-narrow" />

    {#if s.showSummary && errorList.length > 0}
      <div class="cf-summary" role="alert">
        <p class="cf-summary__title">
          {errorList.length === 1 ? 'Manca una cosa prima di inviare:' : `Mancano ${errorList.length} cose prima di inviare:`}
        </p>
        <ul>
          {#each errorList as f}
            <li><a href={`#${ids[f]}`} on:click|preventDefault={() => focusField(f)}>{FIELD_LABEL[f]}</a></li>
          {/each}
        </ul>
      </div>
    {/if}

    <ContactField id={ids.name} label="Come ti chiami" error={s.errors.name ?? ''} valid={nameOk}>
      <input
        id={ids.name}
        class="cf-input cf-input--tick"
        type="text"
        name="name"
        autocomplete="name"
        autocapitalize="words"
        enterkeyhint="next"
        maxlength="120"
        value={s.fields.name}
        on:input={(e) => flow.setField('name', e.currentTarget.value)}
        on:blur={() => leave('name')}
        on:keydown={(e) => onEnter(e, 'name')}
        aria-invalid={s.errors.name ? 'true' : undefined}
        aria-describedby={s.errors.name ? `${ids.name}-err` : undefined}
        placeholder="Nome e cognome"
      />
    </ContactField>

    <ContactField id={ids.contact} label="Come ti rispondiamo" error={s.errors.contact ?? ''} hint={contactHint} valid={contactOk} reserve>
      <div slot="aside" class="cf-seg" role="group" aria-label="Tipo di recapito" data-mode={mode}>
        <span class="cf-seg__thumb" aria-hidden="true"></span>
        <button type="button" aria-pressed={mode === 'email'} on:mousedown|preventDefault on:click={() => setMode('email')}>Email</button>
        <button type="button" aria-pressed={mode === 'tel'} on:mousedown|preventDefault on:click={() => setMode('tel')}>Telefono</button>
      </div>
      <input
        id={ids.contact}
        class="cf-input cf-input--tick"
        type="text"
        name={mode === 'email' ? 'email' : 'tel'}
        inputmode={mode === 'email' ? 'email' : 'tel'}
        autocomplete={mode === 'email' ? 'email' : 'tel'}
        autocapitalize="none"
        spellcheck="false"
        enterkeyhint={layout === 'sheet' ? 'send' : 'next'}
        maxlength="254"
        value={s.fields.contact}
        on:input={(e) => flow.setField('contact', e.currentTarget.value)}
        on:blur={() => leave('contact')}
        on:keydown={(e) => onEnter(e, 'contact')}
        aria-invalid={s.errors.contact ? 'true' : undefined}
        aria-describedby={s.errors.contact ? `${ids.contact}-err` : `${ids.contact}-hint`}
        placeholder={mode === 'email' ? 'nome@azienda.it' : '+39 333 123 4567'}
      />
    </ContactField>

    <fieldset class="cf-topics">
      <legend class="cf__label">Di cosa hai bisogno? <span class="cf__opt">facoltativo</span></legend>
      <div class="cf-chips">
        {#each CONTACT_TOPICS as t}
          <button type="button" class="cf-chip" aria-pressed={s.service === t.value} on:click={() => pick(t.value)}>
            <span class="cf-chip__fill" aria-hidden="true"></span>
            <svg class="cf-chip__dot" viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><circle class="cf-chip__ring" cx="10" cy="10" r="8.5" /><path class="cf-chip__tick" d="M6 10.4l2.9 2.9L14 7.6" /></svg>
            <span class="cf-chip__t">{t.label}</span>
          </button>
        {/each}
      </div>
    </fieldset>

    <ContactField id={ids.message} label="Messaggio" optional error={s.errors.message ?? ''}>
      <textarea
        id={ids.message}
        class="cf-input cf-area"
        rows={layout === 'sheet' ? 3 : 5}
        maxlength="4100"
        value={s.fields.message}
        on:input={(e) => flow.setField('message', e.currentTarget.value)}
        on:blur={() => leave('message')}
        aria-invalid={s.errors.message ? 'true' : undefined}
        aria-describedby={s.errors.message ? `${ids.message}-err` : undefined}
        {placeholder}
      ></textarea>
    </ContactField>

    {#if layout === 'page'}
      <details class="cf-more">
        <summary>Aggiungi azienda e budget <span class="cf__opt">facoltativo</span></summary>
        <div class="cf__row cf-more__body">
          <div class="cf-field">
            <label for="cf-page-company" class="cf__label">Azienda</label>
            <input id="cf-page-company" class="cf-input" type="text" autocomplete="organization" maxlength="120" value={s.company} on:input={(e) => flow.setExtra('company', e.currentTarget.value)} placeholder="Nome dell’azienda" />
          </div>
          <div class="cf-field">
            <label for="cf-page-budget" class="cf__label">Budget indicativo</label>
            <select id="cf-page-budget" class="cf-input cf-select" value={s.budget} on:change={(e) => flow.setExtra('budget', e.currentTarget.value)}>
              <option value="">Da definire insieme</option>
              {#each CONTACT_BUDGETS.filter((b) => b !== 'Da definire') as b}
                <option value={b}>{b}</option>
              {/each}
            </select>
          </div>
        </div>
      </details>
    {/if}

    <!-- Trappola per i programmi che compilano tutto: una persona non la vede ne' la raggiunge. -->
    <div class="cf-trap" aria-hidden="true">
      <label>Lascia vuoto <input type="text" name="altro_recapito" tabindex="-1" autocomplete="off" value={s.hp} on:input={(e) => flow.setExtra('hp', e.currentTarget.value)} /></label>
    </div>

    {#if s.status === 'failed' && s.failure}
      <div class="cf-fail" role="alert">
        <p>{s.failure.text}</p>
        {#if s.failure.kind !== 'invalid'}
          <p class="cf-fail__alt">Oppure scrivici con il testo già pronto:</p>
          <div class="cf-fail__btns">
            <CxButton variant="soft" href={whatsappFallbackHref(s)} external>WhatsApp</CxButton>
            <CxButton variant="soft" href={mailFallbackHref(s)}>Email</CxButton>
          </div>
        {/if}
      </div>
    {/if}

    <p class="cf-mail">Preferisci la posta? <a href="mailto:{CONTACT.email}">{CONTACT.email}</a></p>

    <ContactDock {layout}>
      <p class="cf-consent">Inviando accetti l’<a href={CONTACT.privacyUrl} target="_blank" rel="noopener noreferrer">informativa sulla privacy</a>.</p>
      <CxButton type="submit" full size={layout === 'page' ? 'lg' : 'md'} busy={sending} busyLabel={slow ? 'Ancora un attimo…' : 'Invio in corso…'} done={celebrating} doneLabel="Inviata">
        {s.status === 'failed' ? 'Riprova a inviare' : 'Invia la richiesta'}
      </CxButton>
    </ContactDock>
    <p class="cf-live" aria-live="polite">{sending ? 'Invio in corso' : celebrating ? 'Richiesta inviata' : ''}</p>
  </form>
{/if}

<style>
  .cf { display: flex; flex-direction: column; gap: var(--cx-5); min-width: 0; }
  .cf--sheet { gap: var(--cx-4); min-height: 100%; }
  .cf__head { display: grid; gap: var(--cx-1); }
  .cf__title { font-size: clamp(1.4rem, 2.6vw, 1.75rem); font-weight: 700; line-height: 1.15; margin: 0; }
  .cf__lead { color: var(--text-secondary); margin: 0; }

  /* il brief a riga serve dove non c'e' posto per quello a colonna: da 960 px lo mostra il genitore */
  .cf :global(.cf__brief-narrow) { display: block; }
  @media (min-width: 960px) { .cf :global(.cf__brief-narrow) { display: none; } }

  .cf__label { display: block; font-size: 0.95rem; font-weight: 600; margin: 0 0 var(--cx-2); padding: 0; }
  .cf__opt { font-weight: 500; font-size: 0.8rem; color: var(--cx-muted); margin-left: var(--cx-2); }

  .cf__row { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--cx-4); }
  @media (min-width: 560px) { .cf__row { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  .cf-field { min-width: 0; }

  .cf-input {
    display: block;
    width: 100%;
    min-height: 3rem;
    padding: var(--cx-3) var(--cx-4);
    border-radius: var(--cx-r-s);
    border: 1px solid var(--border-color);
    background: var(--bg-primary);
    color: var(--text-primary);
    font: inherit;
    font-size: 1rem; /* 16px: su iPhone il campo non fa ingrandire la pagina */
    outline: none;
  }
  .cf-input::placeholder { color: var(--cx-muted); }
  .cf-input--tick { padding-right: 2.9rem; }
  .cf-input:focus-visible { outline: none; }

  .cf-area { resize: vertical; min-height: 6.5rem; line-height: 1.5; }
  .cf--page .cf-area { min-height: 8.5rem; }
  .cf-select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23888'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.9rem center;
    background-size: 1.2rem;
    padding-right: 2.8rem;
  }
  .cf-select:focus-visible, .cf-more :global(.cf-input:focus-visible) { box-shadow: 0 0 0 2px var(--brand-pink); }

  /* Email o telefono: due tocchi grandi alla pari, il segno rosa scivola dall'uno all'altro */
  .cf-seg { position: relative; display: grid; grid-template-columns: 1fr 1fr; padding: 2px; border: 1px solid var(--border-color); border-radius: 999px; background: var(--bg-primary); }
  .cf-seg__thumb {
    position: absolute;
    top: 2px;
    bottom: 2px;
    left: 2px;
    width: calc(50% - 2px);
    border-radius: 999px;
    background: var(--brand-pink-soft);
    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--brand-pink) 45%, transparent);
    transition: transform 0.3s var(--cx-ease);
  }
  .cf-seg[data-mode='tel'] .cf-seg__thumb { transform: translateX(100%); }
  .cf-seg button {
    position: relative;
    min-height: 2.75rem;
    padding: 0 0.7rem;
    border: 0;
    border-radius: 999px;
    background: transparent;
    color: var(--cx-muted);
    font: inherit;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
  }
  .cf-seg button[aria-pressed='true'] { color: var(--brand-pink-ink); }
  .cf-seg button:focus-visible { outline: 2px solid var(--focus-ring); outline-offset: 1px; }

  /* Argomento: pastiglie da toccare, una sola scelta, si toglie ritoccandola */
  .cf-topics { border: 0; padding: 0; margin: 0; min-width: 0; }
  .cf-chips { display: flex; flex-wrap: wrap; gap: var(--cx-2); }
  .cf-chip {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    min-height: 2.75rem;
    padding: 0 0.85rem 0 0.6rem;
    border-radius: 999px;
    border: 0;
    background: transparent;
    box-shadow: inset 0 0 0 1px var(--border-color);
    color: var(--text-secondary);
    font: inherit;
    font-size: 0.88rem;
    font-weight: 500;
    cursor: pointer;
    overflow: hidden;
    isolation: isolate;
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
    transition: transform 0.12s var(--cx-ease);
  }
  /* la scelta fatta e' uno strato rosa che entra (opacita' e scala): sotto il testo, senza animare il colore del bottone */
  .cf-chip__fill { position: absolute; inset: 0; z-index: -1; border-radius: inherit; background: var(--cx-fill); opacity: 0; transform: scale(0.92); transition: opacity 0.18s ease, transform 0.24s var(--cx-ease); }
  .cf-chip__dot { flex: none; overflow: visible; }
  .cf-chip__ring { fill: none; stroke: currentColor; stroke-width: 1.4; opacity: 0.45; }
  .cf-chip__tick { fill: none; stroke: #fff; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 14; stroke-dashoffset: 14; }
  .cf-chip:active { transform: scale(0.96); }
  .cf-chip[aria-pressed='true'] { color: #fff; }
  .cf-chip[aria-pressed='true'] .cf-chip__fill { opacity: 1; transform: none; }
  .cf-chip[aria-pressed='true'] .cf-chip__ring { stroke: #fff; opacity: 0.9; }
  .cf-chip[aria-pressed='true'] .cf-chip__tick { animation: cf-draw 0.24s 0.06s var(--cx-ease) forwards; }
  .cf-chip:focus-visible { outline: 2px solid var(--focus-ring); outline-offset: 2px; }
  @media (min-width: 640px) { .cf-chip { font-size: 0.93rem; padding: 0 var(--cx-4) 0 var(--cx-3); gap: var(--cx-2); } }
  @media (hover: hover) { .cf-chip:not([aria-pressed='true']):hover { color: var(--text-primary); box-shadow: inset 0 0 0 1px var(--cx-muted); } }
  @keyframes cf-draw { to { stroke-dashoffset: 0; } }

  .cf-more summary { min-height: 2.75rem; display: flex; align-items: center; cursor: pointer; font-weight: 600; font-size: 0.95rem; color: var(--text-secondary); list-style: none; }
  .cf-more summary::-webkit-details-marker { display: none; }
  .cf-more summary::before { content: '+'; display: inline-grid; place-items: center; width: 1.4rem; height: 1.4rem; margin-right: var(--cx-3); border: 1px solid var(--border-color); border-radius: 50%; font-weight: 500; line-height: 1; }
  .cf-more[open] summary::before { content: '–'; }
  .cf-more summary:focus-visible { outline: 2px solid var(--focus-ring); outline-offset: 2px; border-radius: 0.4rem; }
  .cf-more__body { padding-top: var(--cx-2); }

  .cf-trap { position: absolute; left: -10000px; top: auto; width: 1px; height: 1px; overflow: hidden; }

  .cf-summary, .cf-fail {
    padding: var(--cx-3) var(--cx-4);
    border-radius: var(--cx-r-s);
    border: 1px solid color-mix(in srgb, var(--cx-bad) 45%, transparent);
    background: color-mix(in srgb, var(--cx-bad) 8%, transparent);
    font-size: 0.93rem;
    line-height: 1.5;
  }
  .cf-summary { animation: cf-in 0.22s var(--cx-ease); }
  .cf-summary p, .cf-fail p { margin: 0; font-size: inherit; line-height: inherit; }
  .cf-summary__title { font-weight: 700; margin-bottom: var(--cx-1) !important; }
  .cf-summary ul { display: flex; flex-wrap: wrap; gap: var(--cx-1) var(--cx-4); margin: 0; padding: 0; list-style: none; }
  .cf-summary a { display: inline-flex; align-items: center; min-width: 2.75rem; min-height: 2.75rem; font-weight: 600; text-decoration: underline; text-underline-offset: 3px; }
  .cf-fail { animation: cf-in 0.22s var(--cx-ease); }
  .cf-fail__alt { margin-top: var(--cx-2) !important; color: var(--text-secondary); }
  .cf-fail__btns { display: flex; flex-wrap: wrap; gap: var(--cx-2); margin-top: var(--cx-2); }
  @keyframes cf-in { from { opacity: 0; transform: translateY(-4px); } }

  .cf-mail { margin: 0; font-size: 0.85rem; line-height: 1.55; color: var(--cx-muted); text-align: center; }
  .cf-mail a { display: inline-flex; align-items: center; min-height: 2.75rem; text-decoration: underline; text-underline-offset: 3px; color: var(--text-secondary); overflow-wrap: anywhere; }

  .cf-consent { margin: 0; font-size: 0.85rem; line-height: 1.45; color: var(--cx-muted); text-align: center; }
  .cf-consent a { text-decoration: underline; text-underline-offset: 3px; color: var(--text-secondary); padding-block: 0.6rem; margin-block: -0.6rem; }

  .cf-live { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); margin: 0; }

  @media (prefers-reduced-motion: reduce) {
    .cf-seg__thumb, .cf-chip, .cf-chip__fill { transition: none; }
    .cf-chip[aria-pressed='true'] .cf-chip__tick { animation: none; stroke-dashoffset: 0; }
    .cf-summary, .cf-fail { animation: none; }
  }
</style>
