<script lang="ts">
  /**
   * Il modulo di contatto: uno solo, nel foglio sopra ogni pagina (`layout="sheet"`) e nella pagina
   * /contatti (`layout="page"`). Disegna e basta: stato, convalida, bozza, invio e misura sono in
   * `$lib/contact/flow`. Nome, UN recapito, cosa serve, messaggio facoltativo.
   */
  import { onMount, tick } from 'svelte';
  import ContactBrief from '$lib/components/contact/ContactBrief.svelte';
  import ContactDone from '$lib/components/contact/ContactDone.svelte';
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

  onMount(() => {
    if (parseContact($flow.fields.contact)?.kind === 'phone') mode = 'tel';
    if (autofocus) document.getElementById(ids.name)?.focus({ preventScroll: true });
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

  $: placeholder = layout === 'sheet' ? 'Se vuoi, due righe su cosa ti serve e per quando.' : 'Cosa vuoi costruire o migliorare? Per quando ti servirebbe?';
</script>

{#if s.status === 'sent'}
  <ContactDone {flow} {layout} {onClose} {onBack} />
{:else}
  <form class="cf cf--{layout}" bind:this={form} novalidate on:submit={submit} aria-busy={s.status === 'sending'}>
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

    <div class="cf-field">
      <label for={ids.name} class="cf__label">Come ti chiami</label>
      <input
        id={ids.name}
        class="cf-input"
        class:is-bad={s.errors.name}
        type="text"
        name="name"
        autocomplete="name"
        autocapitalize="words"
        enterkeyhint="next"
        maxlength="120"
        value={s.fields.name}
        on:input={(e) => flow.setField('name', e.currentTarget.value)}
        on:blur={() => flow.blur('name')}
        on:keydown={(e) => onEnter(e, 'name')}
        aria-invalid={s.errors.name ? 'true' : undefined}
        aria-describedby={s.errors.name ? `${ids.name}-err` : undefined}
        placeholder="Nome e cognome"
      />
      {#if s.errors.name}<p class="cf-err" id="{ids.name}-err">{s.errors.name}</p>{/if}
    </div>

    <div class="cf-field">
      <div class="cf__labelrow">
        <label for={ids.contact} class="cf__label">Come ti rispondiamo</label>
        <div class="cf-seg" role="group" aria-label="Tipo di recapito">
          <button type="button" aria-pressed={mode === 'email'} on:click={() => (mode = 'email')}>Email</button>
          <button type="button" aria-pressed={mode === 'tel'} on:click={() => (mode = 'tel')}>Telefono</button>
        </div>
      </div>
      <input
        id={ids.contact}
        class="cf-input"
        class:is-bad={s.errors.contact}
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
        on:blur={() => flow.blur('contact')}
        on:keydown={(e) => onEnter(e, 'contact')}
        aria-invalid={s.errors.contact ? 'true' : undefined}
        aria-describedby={s.errors.contact ? `${ids.contact}-err` : `${ids.contact}-hint`}
        placeholder={mode === 'email' ? 'nome@azienda.it' : '+39 333 123 4567'}
      />
      {#if s.errors.contact}
        <p class="cf-err" id="{ids.contact}-err">{s.errors.contact}</p>
      {:else}
        <p class="cf-hint" class:is-ok={recapito} id="{ids.contact}-hint">
          {#if recapito?.kind === 'email'}Ti rispondiamo a questo indirizzo.
          {:else if recapito?.kind === 'phone'}Ti contattiamo a questo numero.
          {:else}Basta uno dei due.{/if}
        </p>
      {/if}
    </div>

    <fieldset class="cf-topics">
      <legend class="cf__label">Di cosa hai bisogno? <span class="cf__opt">facoltativo</span></legend>
      <div class="cf-chips">
        {#each CONTACT_TOPICS as t}
          <button type="button" class="cf-chip" aria-pressed={s.service === t.value} on:click={() => flow.pickTopic(t.value)}>{t.label}</button>
        {/each}
      </div>
    </fieldset>

    <div class="cf-field">
      <label for={ids.message} class="cf__label">Messaggio <span class="cf__opt">facoltativo</span></label>
      <textarea
        id={ids.message}
        class="cf-input cf-area"
        class:is-bad={s.errors.message}
        rows={layout === 'sheet' ? 3 : 5}
        maxlength="4100"
        value={s.fields.message}
        on:input={(e) => flow.setField('message', e.currentTarget.value)}
        on:blur={() => flow.blur('message')}
        aria-invalid={s.errors.message ? 'true' : undefined}
        aria-describedby={s.errors.message ? `${ids.message}-err` : undefined}
        {placeholder}
      ></textarea>
      {#if s.errors.message}<p class="cf-err" id="{ids.message}-err">{s.errors.message}</p>{/if}
    </div>

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
          <p class="cf-fail__alt">
            Oppure scrivici con il testo già pronto:
            <a href={whatsappFallbackHref(s)} target="_blank" rel="noopener noreferrer">WhatsApp</a> ·
            <a href={mailFallbackHref(s)}>Email</a>
          </p>
        {/if}
      </div>
    {/if}

    <button type="submit" class="cf-submit" disabled={s.status === 'sending'}>
      {#if s.status === 'sending'}
        <span class="cf-spin" aria-hidden="true"></span>
        Invio in corso…
      {:else}
        {s.status === 'failed' ? 'Riprova a inviare' : 'Invia la richiesta'}
      {/if}
    </button>
    <p class="cf-live" aria-live="polite">{s.status === 'sending' ? 'Invio in corso' : ''}</p>

    <p class="cf-fine">
      Inviando accetti l’<a href={CONTACT.privacyUrl} target="_blank" rel="noopener noreferrer">informativa sulla privacy</a>. Preferisci la posta?
      <a href="mailto:{CONTACT.email}">{CONTACT.email}</a>
    </p>
  </form>
{/if}

<style>
  .cf { display: flex; flex-direction: column; gap: 1.05rem; min-width: 0; }
  .cf--sheet { gap: 0.95rem; }
  .cf__head { display: grid; gap: 0.3rem; }
  .cf__title { font-size: clamp(1.4rem, 2.6vw, 1.75rem); font-weight: 700; line-height: 1.15; margin: 0; }
  .cf__lead { color: var(--text-secondary); margin: 0; }

  /* il brief a riga serve dove non c'e' posto per quello a colonna: da 960 px lo mostra il genitore */
  .cf :global(.cf__brief-narrow) { display: block; }
  @media (min-width: 960px) { .cf :global(.cf__brief-narrow) { display: none; } }

  .cf__label { display: block; font-size: 0.95rem; font-weight: 600; margin: 0 0 0.4rem; padding: 0; }
  .cf__labelrow { display: flex; align-items: center; justify-content: space-between; gap: 0.8rem; flex-wrap: wrap; margin-bottom: 0.4rem; }
  .cf__labelrow .cf__label { margin: 0; }
  .cf__opt { font-weight: 500; font-size: 0.8rem; color: var(--text-muted); margin-left: 0.35rem; }

  .cf__row { display: grid; grid-template-columns: minmax(0, 1fr); gap: 1.05rem; }
  @media (min-width: 560px) { .cf__row { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
  .cf-field { min-width: 0; }

  .cf-input {
    width: 100%;
    min-height: 3rem;
    padding: 0.8rem 1rem;
    border-radius: 0.8rem;
    border: 1px solid var(--border-color);
    background: var(--bg-primary);
    color: var(--text-primary);
    font: inherit;
    font-size: 1rem; /* 16px: su iPhone il campo non fa ingrandire la pagina */
    outline: none;
    scroll-margin: 7rem 0 9rem; /* il campo che prende il fuoco non finisce sotto la testata ne' sotto il pulsante fisso */
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .cf-input::placeholder { color: var(--text-muted); }
  .cf-input:focus-visible { border-color: var(--gradient-start); box-shadow: 0 0 0 3px rgba(214, 72, 126, 0.22); }
  .cf-input.is-bad { border-color: #f87171; }
  .cf-input.is-bad:focus-visible { box-shadow: 0 0 0 3px rgba(248, 113, 113, 0.25); }

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

  /* Email o telefono: due tocchi grandi che scelgono la tastiera giusta */
  .cf-seg { display: inline-flex; padding: 0.15rem; border: 1px solid var(--border-color); border-radius: 999px; background: var(--bg-primary); }
  .cf-seg button {
    min-height: 2.75rem;
    padding: 0 1rem;
    border: 0;
    border-radius: 999px;
    background: transparent;
    color: var(--text-secondary);
    font: inherit;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
    transition: background-color 0.2s, color 0.2s;
  }
  .cf-seg button[aria-pressed='true'] { background: var(--brand-pink-soft); color: var(--brand-pink-ink); }
  .cf-seg button:focus-visible { outline: 2px solid var(--focus-ring); outline-offset: 1px; }

  .cf-hint { margin: 0.4rem 0 0; font-size: 0.85rem; color: var(--text-muted); }
  .cf-hint.is-ok { color: #16a34a; }
  :global([data-theme='dark']) .cf-hint.is-ok { color: #4ade80; }
  .cf-err { margin: 0.4rem 0 0; font-size: 0.88rem; line-height: 1.4; color: #f87171; display: flex; gap: 0.4rem; }
  .cf-err::before { content: '!'; flex: none; width: 1.1rem; height: 1.1rem; margin-top: 0.1rem; border-radius: 50%; background: #f87171; color: #1a0505; font-size: 0.75rem; font-weight: 800; line-height: 1.1rem; text-align: center; }
  :global([data-theme='light']) .cf-err { color: #b91c1c; }
  :global([data-theme='light']) .cf-err::before { background: #b91c1c; color: #fff; }
  :global([data-theme='light']) .cf-input.is-bad { border-color: #dc2626; }

  /* Argomento: pastiglie da toccare, una sola scelta, si toglie ritoccandola */
  .cf-topics { border: 0; padding: 0; margin: 0; min-width: 0; }
  .cf-chips { display: flex; flex-wrap: wrap; gap: 0.5rem; }
  .cf-chip {
    min-height: 2.75rem;
    padding: 0 1rem;
    border-radius: 999px;
    border: 1px solid var(--border-color);
    background: transparent;
    color: var(--text-secondary);
    font: inherit;
    font-size: 0.93rem;
    font-weight: 500;
    cursor: pointer;
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
    transition: background-color 0.2s, border-color 0.2s, color 0.2s;
  }
  .cf-chip:hover { border-color: var(--text-muted); color: var(--text-primary); }
  .cf-chip[aria-pressed='true'] { background: var(--gradient-start); border-color: var(--gradient-start); color: #fff; font-weight: 600; }
  .cf-chip:focus-visible { outline: 2px solid var(--gradient-start); outline-offset: 2px; }

  .cf-more summary { min-height: 2.75rem; display: flex; align-items: center; cursor: pointer; font-weight: 600; font-size: 0.95rem; color: var(--text-secondary); list-style: none; }
  .cf-more summary::-webkit-details-marker { display: none; }
  .cf-more summary::before { content: '+'; display: inline-grid; place-items: center; width: 1.4rem; height: 1.4rem; margin-right: 0.55rem; border: 1px solid var(--border-color); border-radius: 50%; font-weight: 500; line-height: 1; }
  .cf-more[open] summary::before { content: '–'; }
  .cf-more summary:focus-visible { outline: 2px solid var(--gradient-start); outline-offset: 2px; border-radius: 0.4rem; }
  .cf-more__body { padding-top: 0.4rem; }

  .cf-trap { position: absolute; left: -10000px; top: auto; width: 1px; height: 1px; overflow: hidden; }

  .cf-summary, .cf-fail {
    padding: 0.9rem 1rem;
    border-radius: 0.8rem;
    border: 1px solid rgba(248, 113, 113, 0.45);
    background: rgba(248, 113, 113, 0.08);
    font-size: 0.93rem;
    line-height: 1.5;
  }
  .cf-summary p, .cf-fail p { margin: 0; font-size: inherit; line-height: inherit; }
  .cf-summary__title { font-weight: 700; margin-bottom: 0.3rem !important; }
  .cf-summary ul { display: flex; flex-wrap: wrap; gap: 0.2rem 1rem; margin: 0; padding: 0; list-style: none; }
  .cf-summary a { display: inline-flex; align-items: center; min-height: 2.75rem; font-weight: 600; text-decoration: underline; text-underline-offset: 3px; }
  .cf-fail__alt { margin-top: 0.4rem !important; color: var(--text-secondary); }
  .cf-fail a { display: inline-flex; align-items: center; min-height: 2.75rem; padding: 0 0.2rem; text-decoration: underline; text-underline-offset: 3px; font-weight: 600; color: var(--text-primary); }

  .cf-submit {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.7rem;
    width: 100%;
    min-height: 3.4rem;
    border: 0;
    border-radius: 999px;
    background: #d6487e;
    color: #fff;
    font: inherit;
    font-weight: 700;
    font-size: 1rem;
    cursor: pointer;
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
    box-shadow: 0 8px 22px -10px rgba(214, 72, 126, 0.7);
    transition: background-color 0.2s, transform 0.15s;
  }
  .cf-submit:hover { background: #e0558a; }
  .cf-submit:active { transform: scale(0.985); }
  .cf-submit:focus-visible { outline: 2px solid var(--gradient-start); outline-offset: 3px; }
  .cf-submit:disabled { opacity: 0.75; cursor: progress; }

  .cf-spin { width: 1.1rem; height: 1.1rem; border-radius: 50%; border: 2px solid rgba(255, 255, 255, 0.4); border-top-color: #fff; animation: cf-rot 0.8s linear infinite; }
  @keyframes cf-rot { to { transform: rotate(360deg); } }
  .cf-live { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); margin: 0; }

  .cf-fine { margin: 0; font-size: 0.85rem; line-height: 1.55; color: var(--text-muted); text-align: center; }
  .cf-fine a { display: inline-flex; align-items: center; min-height: 2.75rem; padding: 0; text-decoration: underline; text-underline-offset: 3px; color: var(--text-secondary); overflow-wrap: anywhere; }

  @media (prefers-reduced-motion: reduce) {
    .cf-spin { animation-duration: 2.4s; }
    .cf-submit, .cf-input, .cf-chip, .cf-seg button { transition: none; }
  }
</style>
