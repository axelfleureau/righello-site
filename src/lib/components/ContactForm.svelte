<script lang="ts">
  import { onMount, tick } from 'svelte';
  import ProButton from '$lib/components/progetti/ProButton.svelte';
  import { CONTACT, CONTACT_BUDGETS, CONTACT_TOPICS, mailHref, whatsappHref } from '$lib/data/contact';
  import {
    FIELD_LABEL,
    FIELD_ORDER,
    validateAll,
    validateField,
    type ContactErrors,
    type ContactFields,
  } from '$lib/utils/contact-validation';

  /** Cosa arriva gia' scritto da una scheda prodotto (vedi prefillFromQuery). */
  export let topic = '';
  export let message = '';

  const DRAFT_KEY = 'righello-contatti-bozza';
  const SEND_TIMEOUT_MS = 45000;

  let fields: ContactFields = { name: '', email: '', phone: '', message };
  let company = '';
  let budget = '';
  let service = topic;

  let touched: Partial<Record<keyof ContactFields, boolean>> = {};
  let errors: ContactErrors = {};
  let showSummary = false;
  let status: 'idle' | 'sending' | 'sent' | 'failed' = 'idle';
  let failure = '';
  let sentTo = '';
  let sentName = '';
  let confirmation: HTMLElement;

  const ids: Record<keyof ContactFields, string> = { name: 'cf-name', email: 'cf-email', phone: 'cf-phone', message: 'cf-message' };

  const errorCount = () => Object.keys(errors).length;

  function onBlur(field: keyof ContactFields) {
    touched[field] = true;
    errors = { ...errors, [field]: validateField(field, fields[field]) };
    if (!errors[field]) delete errors[field];
    errors = errors;
  }

  /** Dopo un errore mostrato, il campo si ricontrolla mentre si scrive: sparisce non appena e' giusto. */
  function onInput(field: keyof ContactFields) {
    if (errors[field]) {
      const next = validateField(field, fields[field]);
      if (!next) {
        delete errors[field];
        errors = errors;
      } else errors = { ...errors, [field]: next };
    }
    if (showSummary && errorCount() === 0) showSummary = false;
    saveDraft();
  }

  function focusField(field: keyof ContactFields) {
    document.getElementById(ids[field])?.focus();
  }

  async function submit(event: Event) {
    event.preventDefault();
    if (status === 'sending') return;
    errors = validateAll(fields);
    FIELD_ORDER.forEach((f) => (touched[f] = true));
    if (errorCount() > 0) {
      showSummary = true;
      await tick();
      focusField(FIELD_ORDER.find((f) => errors[f])!);
      return;
    }
    showSummary = false;
    failure = '';
    status = 'sending';

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), SEND_TIMEOUT_MS);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          name: fields.name.trim(),
          email: fields.email.trim(),
          phone: fields.phone.trim(),
          company: company.trim(),
          service,
          budget,
          message: fields.message.trim(),
        }),
      });
      const result = await res.json().catch(() => ({}));
      if (res.ok && result.success) {
        sentTo = fields.email.trim();
        sentName = fields.name.trim().split(/\s+/)[0];
        status = 'sent';
        clearDraft();
        await tick();
        confirmation?.focus();
      } else {
        failure =
          res.status === 400
            ? 'Il messaggio non è partito: controlla i dati e riprova.'
            : 'Il messaggio non è partito per un problema nostro. I tuoi dati sono ancora qui: riprova tra poco.';
        status = 'failed';
      }
    } catch (err) {
      failure =
        err instanceof DOMException && err.name === 'AbortError'
          ? 'Ci sta mettendo più del solito e non sappiamo se il messaggio sia arrivato. Prima di riprovare scrivici a ' + CONTACT.email + ': evitiamo un doppione.'
          : 'Non riusciamo a collegarci. Controlla la rete e riprova: i tuoi dati sono ancora qui.';
      status = 'failed';
    } finally {
      clearTimeout(timer);
    }
  }

  function again() {
    fields = { name: '', email: '', phone: '', message: '' };
    company = '';
    budget = '';
    service = '';
    touched = {};
    errors = {};
    status = 'idle';
  }

  /* Bozza: se si cambia pagina per sbaglio, il messaggio scritto non va perso (solo in questa scheda del browser). */
  function saveDraft() {
    try {
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ ...fields, company, budget }));
    } catch {}
  }
  function clearDraft() {
    try {
      sessionStorage.removeItem(DRAFT_KEY);
    } catch {}
  }
  onMount(() => {
    try {
      const raw = sessionStorage.getItem(DRAFT_KEY);
      if (!raw) return;
      const d = JSON.parse(raw);
      fields = {
        name: d.name || '',
        email: d.email || '',
        phone: d.phone || '',
        message: message ? message : d.message || '',
      };
      company = d.company || '';
      budget = d.budget || '';
    } catch {}
  });

  function pickTopic(value: string) {
    service = service === value ? '' : value;
  }

  $: placeholder = 'Cosa vuoi costruire o migliorare? Per quando ti servirebbe?';
</script>

{#if status === 'sent'}
  <div class="cf-done" role="status">
    <div class="cf-done__mark" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="30" height="30"><path d="M5 12.5l4.2 4.2L19 7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" /></svg>
    </div>
    <h2 class="cf-done__title" tabindex="-1" bind:this={confirmation}>Messaggio inviato{sentName ? `, ${sentName}` : ''}.</h2>
    <p class="cf-done__text">
      Lo leggono {CONTACT.recipients}. Ti rispondiamo {CONTACT.reply}.
    </p>
    <p class="cf-done__text">
      Ti abbiamo scritto una conferma a <strong>{sentTo}</strong>. Se non la trovi, guarda nella posta indesiderata.
    </p>
    <div class="cf-done__cta">
      <ProButton variant="primary" arrow="right" href="/progetti">Guarda i progetti</ProButton>
      <ProButton variant="ghost" on:click={again}>Scrivi un altro messaggio</ProButton>
    </div>
  </div>
{:else}
  <form class="cf" novalidate on:submit={submit} aria-busy={status === 'sending'}>
    <div class="cf__head">
      <h2 class="cf__title">Raccontaci il progetto</h2>
      <p class="cf__lead">Quattro campi. Il resto lo chiediamo noi, a voce.</p>
    </div>

    {#if showSummary && errorCount() > 0}
      <div class="cf-summary" role="alert">
        <p class="cf-summary__title">
          {errorCount() === 1 ? 'Manca una cosa prima di inviare:' : `Mancano ${errorCount()} cose prima di inviare:`}
        </p>
        <ul>
          {#each FIELD_ORDER.filter((f) => errors[f]) as f}
            <li><a href={`#${ids[f]}`} on:click|preventDefault={() => focusField(f)}>{FIELD_LABEL[f]}</a></li>
          {/each}
        </ul>
      </div>
    {/if}

    <fieldset class="cf-topics">
      <legend class="cf__label">Di cosa hai bisogno? <span class="cf__opt">facoltativo</span></legend>
      <div class="cf-chips">
        {#each CONTACT_TOPICS as t}
          <button type="button" class="cf-chip" aria-pressed={service === t.value} on:click={() => pickTopic(t.value)}>{t.label}</button>
        {/each}
      </div>
    </fieldset>

    <div class="cf__row">
      <div class="cf-field">
        <label for={ids.name} class="cf__label">Nome</label>
        <input
          id={ids.name}
          class="cf-input"
          class:is-bad={errors.name}
          type="text"
          autocomplete="name"
          autocapitalize="words"
          bind:value={fields.name}
          on:blur={() => onBlur('name')}
          on:input={() => onInput('name')}
          aria-invalid={errors.name ? 'true' : undefined}
          aria-describedby={errors.name ? 'cf-name-err' : undefined}
          placeholder="Nome e cognome"
        />
        {#if errors.name}<p class="cf-err" id="cf-name-err">{errors.name}</p>{/if}
      </div>

      <div class="cf-field">
        <label for={ids.email} class="cf__label">Email</label>
        <input
          id={ids.email}
          class="cf-input"
          class:is-bad={errors.email}
          type="email"
          inputmode="email"
          autocomplete="email"
          autocapitalize="none"
          spellcheck="false"
          bind:value={fields.email}
          on:blur={() => onBlur('email')}
          on:input={() => onInput('email')}
          aria-invalid={errors.email ? 'true' : undefined}
          aria-describedby={errors.email ? 'cf-email-err' : undefined}
          placeholder="nome@azienda.it"
        />
        {#if errors.email}<p class="cf-err" id="cf-email-err">{errors.email}</p>{/if}
      </div>
    </div>

    <div class="cf-field">
      <label for={ids.phone} class="cf__label">Telefono</label>
      <input
        id={ids.phone}
        class="cf-input"
        class:is-bad={errors.phone}
        type="tel"
        inputmode="tel"
        autocomplete="tel"
        bind:value={fields.phone}
        on:blur={() => onBlur('phone')}
        on:input={() => onInput('phone')}
        aria-invalid={errors.phone ? 'true' : undefined}
        aria-describedby={errors.phone ? 'cf-phone-err' : 'cf-phone-hint'}
        placeholder="+39 333 123 4567"
      />
      {#if errors.phone}
        <p class="cf-err" id="cf-phone-err">{errors.phone}</p>
      {:else}
        <p class="cf-hint" id="cf-phone-hint">Lo usiamo per fissare la chiamata.</p>
      {/if}
    </div>

    <div class="cf-field">
      <label for={ids.message} class="cf__label">Messaggio</label>
      <textarea
        id={ids.message}
        class="cf-input cf-area"
        class:is-bad={errors.message}
        rows="5"
        bind:value={fields.message}
        on:blur={() => onBlur('message')}
        on:input={() => onInput('message')}
        aria-invalid={errors.message ? 'true' : undefined}
        aria-describedby={errors.message ? 'cf-message-err' : undefined}
        {placeholder}
      ></textarea>
      {#if errors.message}<p class="cf-err" id="cf-message-err">{errors.message}</p>{/if}
    </div>

    <details class="cf-more">
      <summary>Aggiungi azienda e budget <span class="cf__opt">facoltativo</span></summary>
      <div class="cf__row cf-more__body">
        <div class="cf-field">
          <label for="cf-company" class="cf__label">Azienda</label>
          <input id="cf-company" class="cf-input" type="text" autocomplete="organization" bind:value={company} on:input={saveDraft} placeholder="Nome dell’azienda" />
        </div>
        <div class="cf-field">
          <label for="cf-budget" class="cf__label">Budget indicativo</label>
          <select id="cf-budget" class="cf-input cf-select" bind:value={budget} on:change={saveDraft}>
            <option value="">Da definire insieme</option>
            {#each CONTACT_BUDGETS.filter((b) => b !== 'Da definire') as b}
              <option value={b}>{b}</option>
            {/each}
          </select>
        </div>
      </div>
    </details>

    {#if status === 'failed'}
      <div class="cf-fail" role="alert">
        <p>{failure}</p>
        <p class="cf-fail__alt">
          Oppure scrivici direttamente: <a href={mailHref()}>{CONTACT.email}</a> · <a href={whatsappHref()} target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </p>
      </div>
    {/if}

    <button type="submit" class="cf-submit" disabled={status === 'sending'}>
      {#if status === 'sending'}
        <span class="cf-spin" aria-hidden="true"></span>
        Invio in corso…
      {:else}
        {status === 'failed' ? 'Riprova a inviare' : 'Invia il messaggio'}
      {/if}
    </button>
    <p class="cf-live" aria-live="polite">{status === 'sending' ? 'Invio in corso' : ''}</p>

    <p class="cf-fine">
      Inviando accetti l’<a href={CONTACT.privacyUrl} target="_blank" rel="noopener noreferrer">informativa sulla privacy</a>. Preferisci scrivere dal tuo programma di posta?
      <a href={mailHref()}>{CONTACT.email}</a>
    </p>
  </form>
{/if}

<style>
  .cf { display: flex; flex-direction: column; gap: 1.15rem; min-width: 0; }
  .cf__head { display: grid; gap: 0.3rem; }
  .cf__title { font-size: clamp(1.4rem, 2.6vw, 1.75rem); font-weight: 700; line-height: 1.15; }
  .cf__lead { color: var(--text-secondary); }

  .cf__label { display: block; font-size: 0.95rem; font-weight: 600; margin-bottom: 0.4rem; padding: 0; }
  .cf__opt { font-weight: 500; font-size: 0.8rem; color: var(--text-muted); margin-left: 0.35rem; }

  .cf__row { display: grid; grid-template-columns: minmax(0, 1fr); gap: 1.15rem; }
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
    scroll-margin-top: 7rem; /* sotto il menu fluttuante */
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .cf-input::placeholder { color: var(--text-muted); }
  .cf-input:focus-visible { border-color: var(--gradient-start); box-shadow: 0 0 0 3px rgba(214, 72, 126, 0.22); }
  .cf-input.is-bad { border-color: #f87171; }
  .cf-input.is-bad:focus-visible { box-shadow: 0 0 0 3px rgba(248, 113, 113, 0.25); }

  .cf-area { resize: vertical; min-height: 8.5rem; line-height: 1.5; }
  .cf-select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23888'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.9rem center;
    background-size: 1.2rem;
    padding-right: 2.8rem;
  }

  .cf-hint { margin-top: 0.4rem; font-size: 0.85rem; color: var(--text-muted); }
  .cf-err { margin-top: 0.4rem; font-size: 0.88rem; line-height: 1.4; color: #f87171; display: flex; gap: 0.4rem; }
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

  .cf-summary, .cf-fail {
    padding: 0.9rem 1rem;
    border-radius: 0.8rem;
    border: 1px solid rgba(248, 113, 113, 0.45);
    background: rgba(248, 113, 113, 0.08);
    font-size: 0.93rem;
    line-height: 1.5;
  }
  .cf-summary__title { font-weight: 700; margin-bottom: 0.3rem; }
  .cf-summary ul { display: flex; flex-wrap: wrap; gap: 0.2rem 1rem; }
  .cf-summary a { display: inline-flex; align-items: center; min-height: 2.75rem; font-weight: 600; text-decoration: underline; text-underline-offset: 3px; }
  .cf-fail__alt { margin-top: 0.4rem; color: var(--text-secondary); }
  .cf-fail a { display: inline-flex; align-items: center; min-height: 2.75rem; text-decoration: underline; text-underline-offset: 3px; }

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
    box-shadow: 0 8px 22px -10px rgba(214, 72, 126, 0.7);
    transition: background-color 0.2s, transform 0.15s;
  }
  .cf-submit:hover { background: #e0558a; }
  .cf-submit:active { transform: scale(0.985); }
  .cf-submit:focus-visible { outline: 2px solid var(--gradient-start); outline-offset: 3px; }
  .cf-submit:disabled { opacity: 0.75; cursor: progress; }

  .cf-spin { width: 1.1rem; height: 1.1rem; border-radius: 50%; border: 2px solid rgba(255, 255, 255, 0.4); border-top-color: #fff; animation: cf-rot 0.8s linear infinite; }
  @keyframes cf-rot { to { transform: rotate(360deg); } }
  .cf-live { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }

  .cf-fine { font-size: 0.85rem; line-height: 1.55; color: var(--text-muted); text-align: center; }
  .cf-fine a { display: inline-flex; align-items: center; min-height: 2.75rem; padding: 0; text-decoration: underline; text-underline-offset: 3px; color: var(--text-secondary); overflow-wrap: anywhere; }

  .cf-done { display: grid; justify-items: center; gap: 0.9rem; text-align: center; padding: clamp(1.5rem, 5vw, 3rem) 0; }
  .cf-done__mark { display: grid; place-items: center; width: 4.2rem; height: 4.2rem; border-radius: 50%; color: #16a34a; background: rgba(34, 197, 94, 0.14); border: 1px solid rgba(34, 197, 94, 0.4); }
  .cf-done__title { font-size: clamp(1.5rem, 3vw, 1.9rem); font-weight: 700; line-height: 1.15; outline: none; }
  .cf-done__text { color: var(--text-secondary); max-width: 34rem; line-height: 1.6; }
  .cf-done__text strong { color: var(--text-primary); overflow-wrap: anywhere; }
  .cf-done__cta { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.7rem; margin-top: 0.6rem; }

  @media (prefers-reduced-motion: reduce) {
    .cf-spin { animation-duration: 2.4s; }
    .cf-submit, .cf-input, .cf-chip { transition: none; }
  }
</style>
