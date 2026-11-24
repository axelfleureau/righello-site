<script lang="ts">
  import SeoHead from '$lib/components/SeoHead.svelte';
  import MagneticButton from '$lib/components/MagneticButton.svelte';
  import RevealOnScroll from '$lib/components/RevealOnScroll.svelte';
  import { contactHref } from '$lib/data/contact';
  import { incentiviHospitalityFaqs } from '$lib/data/faqs/incentivi-hospitality';
  import {
    INCENTIVES_PATH,
    MAX_PEOPLE_PER_HOUSEHOLD,
    adhesion,
    coverageCurve,
    householdCap,
    informationDate,
    measures,
    officialInconsistencies,
    officialSources,
    voucherFor,
    zoneRules,
    type MeasureStatus,
    type VoucherZone
  } from '$lib/data/incentivi-hospitality';

  const eur = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
  const pct = new Intl.NumberFormat('it-IT', { style: 'percent', maximumFractionDigits: 0 });

  const zones = Object.entries(zoneRules) as [VoucherZone, (typeof zoneRules)[VoucherZone]][];
  const statusLabel: Record<MeasureStatus, string> = {
    attivo: 'Attivo',
    chiuso: 'Chiuso',
    'in-graduatoria': 'In graduatoria'
  };

  // Calcolatore: i numeri escono tutti da voucherFor(), la stessa funzione provata dai test sugli esempi ufficiali.
  let zone: VoucherZone = 'citta-unesco';
  let people = 4;
  let nights = 3;
  let costText = '400';
  $: stayCost = Number(costText.replace(/[^0-9]/g, '')) || 0;
  $: result = voucherFor({ zone, people, nights, stayCost });
  $: perPerson = zoneRules[zone].perPerson;

  const step = (value: number, delta: number, min: number, max: number) => Math.min(max, Math.max(min, value + delta));
  const closeKeyboard = (e: KeyboardEvent) => {
    if (e.key === 'Enter') (e.currentTarget as HTMLInputElement).blur();
  };

  // La forma della funzione: famiglia di 4, tre notti, importo da 80 €.
  const curve = coverageCurve('citta-unesco', 4, 3, [300, 400, 600, 1200]);
  const perNight2 = zoneRules['citta-unesco'].perPerson / 2;
  const perNight3 = Math.round(zoneRules['citta-unesco'].perPerson / 3);
</script>

<SeoHead
  path={INCENTIVES_PATH}
  title="Incentivi per hotel in FVG: voucher TUReSTA | Righello"
  description="Voucher TUReSTA, Fondo turismo e bandi digitali per strutture ricettive in Friuli-Venezia Giulia: stato, calcolo dell'incentivo e fonti ufficiali."
/>

<div class="inc-page">
  <section class="inc-hero">
    <div class="section-container">
      <RevealOnScroll animation="fly-up">
        <p class="inc-pill">Situazione al {informationDate}, dalle pagine ufficiali della Regione</p>
        <h1 id="titolo-pagina">Incentivi per hotel e strutture ricettive in Friuli-Venezia Giulia</h1>
        <p class="inc-lead sh__lead">
          Cosa c’è oggi, come funziona il voucher TUReSTA e quali spese digitali un bando può coprire. Con le fonti ufficiali, il calcolo
          dell’incentivo e quello che non sappiamo ancora.
        </p>
        <div class="inc-actions">
          <MagneticButton href="#calcolatore" variant="primary">Calcola il voucher</MagneticButton>
          <MagneticButton href={contactHref()} variant="secondary">Parlane con noi</MagneticButton>
        </div>
      </RevealOnScroll>
    </div>
  </section>

  <section id="misure" class="section-padding">
    <div class="section-container">
      <div class="section-header">
        <p class="section-subtitle">Tre misure, tre stati</p>
        <h2 class="section-title">Cosa c’è e cosa è chiuso</h2>
      </div>
      <div class="inc-measures">
        {#each measures as m}
          <article class="inc-card" data-status={m.status}>
            <header>
              <span class="inc-status inc-status--{m.status}">{statusLabel[m.status]}</span>
              <h3>{m.name}</h3>
              <p class="inc-statusline">{m.statusLine}</p>
            </header>
            <p>{m.what}</p>
            <p class="inc-digital"><strong>E il digitale?</strong> {m.digital}</p>
            <a class="inc-link" href={m.officialUrl} target="_blank" rel="noopener noreferrer">Pagina ufficiale della Regione <span aria-hidden="true">↗</span></a>
          </article>
        {/each}
      </div>
    </div>
  </section>

  <section id="calcolatore" class="section-padding inc-alt">
    <div class="section-container">
      <div class="section-header">
        <p class="section-subtitle">Lo studio</p>
        <h2 class="section-title">Quanto vale il voucher TUReSTA</h2>
        <p class="inc-note">
          Il voucher è {zoneRules['citta-unesco'].perPerson} € a persona ({zoneRules['montano-a'].perPerson} € nei Comuni montani di zona A), fino a
          {MAX_PEOPLE_PER_HOUSEHOLD} persone per nucleo ({householdCap('citta-unesco')} € o {householdCap('montano-a')} €), e lo sconto non supera mai
          il costo del soggiorno.
        </p>
      </div>

      <div class="inc-calc">
        <form class="inc-form" on:submit|preventDefault aria-label="Calcolatore del voucher">
          <fieldset>
            <legend>Dove si trova la struttura</legend>
            {#each zones as [key, rule]}
              <label class="inc-radio">
                <input type="radio" name="zona" value={key} bind:group={zone} />
                <span>
                  <strong>{rule.label}</strong>
                  <small>{rule.perPerson} € a persona, minimo {rule.minNights} notti</small>
                </span>
              </label>
            {/each}
            <p class="inc-hint">
              Non sai in che fascia è un Comune? Controlla l’<a href={officialSources.find((s) => /Comuni/.test(s.label))?.url} target="_blank" rel="noopener noreferrer">elenco ufficiale (PDF)</a>.
            </p>
          </fieldset>

          <div class="inc-steppers">
            <div class="inc-field">
              <span id="lbl-persone">Persone dello stesso nucleo (residenti in FVG)</span>
              <div class="inc-stepper" role="group" aria-labelledby="lbl-persone">
                <button type="button" aria-label="Una persona in meno" on:click={() => (people = step(people, -1, 1, MAX_PEOPLE_PER_HOUSEHOLD))} disabled={people <= 1}>−</button>
                <output aria-live="polite">{people}</output>
                <button type="button" aria-label="Una persona in più" on:click={() => (people = step(people, 1, 1, MAX_PEOPLE_PER_HOUSEHOLD))} disabled={people >= MAX_PEOPLE_PER_HOUSEHOLD}>+</button>
              </div>
            </div>
            <div class="inc-field">
              <span id="lbl-notti">Notti consecutive nella stessa struttura</span>
              <div class="inc-stepper" role="group" aria-labelledby="lbl-notti">
                <button type="button" aria-label="Una notte in meno" on:click={() => (nights = step(nights, -1, 1, 14))} disabled={nights <= 1}>−</button>
                <output aria-live="polite">{nights}</output>
                <button type="button" aria-label="Una notte in più" on:click={() => (nights = step(nights, 1, 1, 14))} disabled={nights >= 14}>+</button>
              </div>
            </div>
          </div>

          <label class="inc-field inc-cost">
            <span>Costo totale del soggiorno</span>
            <div class="inc-input">
              <input
                type="text"
                inputmode="numeric"
                pattern="[0-9]*"
                enterkeyhint="done"
                autocomplete="off"
                placeholder="400"
                bind:value={costText}
                on:keydown={closeKeyboard}
                aria-describedby="costo-aiuto"
              />
              <span aria-hidden="true">€</span>
            </div>
            <small id="costo-aiuto">Camere e servizi del soggiorno, IVA compresa, per tutto il nucleo.</small>
          </label>
        </form>

        <div class="inc-result" aria-live="polite" data-eligible={result.eligible}>
          {#if !result.eligible}
            <p class="inc-warn">{result.reason}</p>
            <p class="inc-small">Senza le notti minime il voucher non spetta: a questo soggiorno si applicherebbero {eur.format(result.voucher)} di voucher teorico.</p>
          {:else}
            <dl>
              <div><dt>Voucher</dt><dd>{eur.format(result.voucher)}</dd></div>
              <div><dt>Sconto applicato</dt><dd>{eur.format(result.discount)}</dd></div>
              <div class="inc-topay"><dt>Da pagare alla struttura</dt><dd>{eur.format(result.toPay)}</dd></div>
              <div><dt>Quota del soggiorno coperta</dt><dd>{pct.format(result.coverage)}</dd></div>
            </dl>
            <p class="inc-small">
              {perPerson} € × {Math.min(people, MAX_PEOPLE_PER_HOUSEHOLD)} {people === 1 ? 'persona' : 'persone'} = {eur.format(result.voucher)}.
              {#if result.unused > 0}
                Il voucher supera il costo del soggiorno: {eur.format(result.unused)} non si riutilizzano, come scrive la Regione.
              {/if}
            </p>
          {/if}
          <p class="inc-small inc-fineprint">Un residente lo usa una volta per anno solare. Il calcolo segue le regole pubblicate dalla Regione; l’importo vero lo conferma il portale TUReSTA.</p>
        </div>
      </div>

      <div class="inc-reading">
        <h3>Cosa dice la formula</h3>
        <p class="inc-badge">Lettura nostra, ricavata dalla formula e dalle regole: non sono dati della Regione sull’uso del voucher.</p>
        <ul>
          <li>
            <strong>Il valore è fisso a persona, non cresce con il prezzo.</strong> Per una famiglia di 4 nella fascia da 80 €, un soggiorno da
            {eur.format(curve[0].cost)} è coperto al {pct.format(curve[0].coverage)}, da {eur.format(curve[1].cost)} all’{pct.format(curve[1].coverage)}, da
            {eur.format(curve[2].cost)} al {pct.format(curve[2].coverage)}, da {eur.format(curve[3].cost)} al {pct.format(curve[3].coverage)}.
            Pesa di più su soggiorni economici e famiglie.
          </li>
          <li>
            <strong>Oltre sei persone non cambia nulla.</strong> Il massimale di nucleo ({householdCap('citta-unesco')} € o {householdCap('montano-a')} €) è
            raggiunto con sei persone.
          </li>
          <li>
            <strong>Più notti, meno sconto per notte.</strong> Con due notti (città e Comuni UNESCO) il voucher vale fino a {perNight2} € a persona per
            notte; con tre notti circa {perNight3} €.
          </li>
          <li>
            <strong>Per la struttura è un incentivo alla domanda.</strong> La Regione scrive che rimborsa le somme non incassate: il lavoro in più è
            amministrativo (adesione, prenotazione del voucher sul portale, sconto in fattura, rendicontazione).
          </li>
        </ul>
      </div>
    </div>
  </section>

  <section id="aderire" class="section-padding">
    <div class="section-container">
      <div class="section-header">
        <p class="section-subtitle">Per la struttura</p>
        <h2 class="section-title">Come si aderisce al voucher</h2>
      </div>
      <div class="inc-two">
        <div>
          <h3>Chi può aderire</h3>
          <ul class="inc-list">
            {#each adhesion.requirements as r}<li>{r}</li>{/each}
          </ul>
          <h3>I passaggi</h3>
          <ol class="inc-list inc-steps">
            {#each adhesion.steps as s}<li>{s}</li>{/each}
          </ol>
        </div>
        <aside class="inc-aside">
          <h3>Assistenza ufficiale</h3>
          <p>Informazioni generali: <a href="mailto:{adhesion.assistance.info}">{adhesion.assistance.info}</a></p>
          <p>Assistenza tecnica: <a href="tel:+39{adhesion.assistance.technicalPhone.replace(/\s/g, '')}">{adhesion.assistance.technicalPhone}</a><br /><small>{adhesion.assistance.technicalHours}</small></p>
          <p><a class="inc-link" href="https://turesta.regione.fvg.it/" target="_blank" rel="noopener noreferrer">Portale delle adesioni <span aria-hidden="true">↗</span></a></p>
          {#each officialInconsistencies as note}
            <p class="inc-caution"><strong>Attenzione.</strong> {note}</p>
          {/each}
        </aside>
      </div>
    </div>
  </section>

  <section id="cosa-facciamo" class="section-padding inc-alt">
    <div class="section-container inc-narrow">
      <div class="section-header">
        <p class="section-subtitle">Cosa facciamo, e cosa no</p>
        <h2 class="section-title">Il digitale che serve a una struttura ricettiva</h2>
      </div>
      <ul class="inc-list">
        <li>Una pagina del vostro sito che spiega il voucher e lo calcola, con il prezzo al netto dello sconto.</li>
        <li>Prenotazione diretta sul sito, collegata al gestionale della struttura.</li>
        <li>Comunicazione e campagne rivolte ai residenti in Friuli-Venezia Giulia, che sono il pubblico del voucher.</li>
        <li>Quando un bando ammette software, siti e consulenze digitali, la descrizione tecnica e i preventivi della parte digitale.</li>
      </ul>
      <p>
        Non siamo l’ente che eroga, non presentiamo la domanda al posto vostro e non possiamo garantire un contributo. Se avete un consulente
        per la pratica, lavoriamo al suo fianco.
      </p>
      <div class="inc-actions">
        <MagneticButton href={contactHref()} variant="primary">Raccontaci la struttura</MagneticButton>
      </div>
    </div>
  </section>

  <section id="domande" class="section-padding">
    <div class="section-container inc-narrow">
      <div class="section-header">
        <p class="section-subtitle">Domande frequenti</p>
        <h2 class="section-title">Quello che si chiede di più</h2>
      </div>
      <div class="inc-faq">
        {#each incentiviHospitalityFaqs as faq}
          <details>
            <summary>{faq.question}</summary>
            <p>{faq.answer}</p>
          </details>
        {/each}
      </div>
    </div>
  </section>

  <section id="fonti" class="section-padding inc-alt">
    <div class="section-container inc-narrow">
      <div class="section-header">
        <p class="section-subtitle">Fonti</p>
        <h2 class="section-title">Documenti ufficiali della Regione</h2>
        <p class="inc-note">Pagine verificate il {informationDate}. Per le procedure fa fede il testo ufficiale: le linee guida sono PDF della Regione.</p>
      </div>
      <ul class="inc-sources">
        {#each officialSources as s}
          <li><a href={s.url} target="_blank" rel="noopener noreferrer">{s.label} <span aria-hidden="true">↗</span></a></li>
        {/each}
      </ul>
    </div>
  </section>
</div>

<style>
  .inc-page { color: var(--text-primary); }
  .inc-hero { padding: 9rem 0 3.5rem; background: radial-gradient(60rem 22rem at 80% -10%, var(--brand-pink-soft), transparent 70%); }
  .inc-pill { display: inline-block; margin: 0 0 1rem; padding: 0.4rem 0.9rem; border: 1px solid var(--border-color); border-radius: 999px; font-size: var(--text-sm); color: var(--text-secondary); }
  .inc-hero h1 { max-width: 22ch; margin: 0 0 1.25rem; font-size: clamp(2rem, 5.2vw, 3.6rem); line-height: 1.08; font-weight: 700; }
  .inc-lead { max-width: 62ch; margin: 0 0 2rem; font-size: var(--text-lg); color: var(--text-secondary); line-height: 1.6; }
  .inc-actions { display: flex; flex-wrap: wrap; gap: 0.75rem; }
  .inc-alt { background: var(--bg-secondary); }
  .inc-narrow { max-width: 56rem; }
  .inc-note { max-width: 62ch; margin: 1rem auto 0; color: var(--text-secondary); line-height: 1.6; }

  .inc-measures { display: grid; gap: 1.25rem; grid-template-columns: 1fr; }
  @media (min-width: 960px) { .inc-measures { grid-template-columns: repeat(3, 1fr); } }
  .inc-card { display: flex; flex-direction: column; gap: 0.9rem; padding: 1.5rem; border: 1px solid var(--border-color); border-radius: 1.25rem; background: var(--bg-tertiary); }
  .inc-card h3 { margin: 0.6rem 0 0.35rem; font-size: var(--text-xl); line-height: 1.25; }
  .inc-card p { margin: 0; color: var(--text-secondary); line-height: 1.55; }
  .inc-statusline { font-size: var(--text-sm); color: var(--text-primary) !important; }
  .inc-digital { padding: 0.8rem 0.9rem; border-radius: 0.75rem; background: var(--brand-pink-soft); }
  .inc-digital strong { color: var(--text-primary); }
  .inc-status { display: inline-block; padding: 0.2rem 0.65rem; border-radius: 999px; font-size: var(--text-xs); font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; }
  .inc-status--attivo { background: rgba(34, 197, 94, 0.16); color: #16a34a; }
  .inc-status--chiuso { background: rgba(113, 113, 122, 0.2); color: var(--text-secondary); }
  .inc-status--in-graduatoria { background: rgba(234, 179, 8, 0.18); color: #a16207; }
  .inc-link { margin-top: auto; color: var(--brand-pink-ink); font-weight: 600; text-decoration: none; }
  .inc-link:hover { text-decoration: underline; }

  .inc-calc { display: grid; gap: 1.5rem; grid-template-columns: 1fr; margin-top: 2rem; }
  @media (min-width: 960px) { .inc-calc { grid-template-columns: 1.15fr 1fr; align-items: start; } }
  .inc-form, .inc-result { padding: 1.5rem; border: 1px solid var(--border-color); border-radius: 1.25rem; background: var(--bg-primary); }
  fieldset { margin: 0 0 1.25rem; padding: 0; border: 0; }
  legend { margin-bottom: 0.6rem; font-weight: 600; }
  .inc-radio { display: flex; gap: 0.75rem; align-items: flex-start; min-height: 3.25rem; padding: 0.75rem 0.9rem; margin-bottom: 0.5rem; border: 1px solid var(--border-color); border-radius: 0.85rem; cursor: pointer; }
  .inc-radio:has(input:checked) { border-color: var(--brand-pink); background: var(--brand-pink-soft); }
  .inc-radio input { margin-top: 0.3rem; accent-color: var(--brand-pink); }
  .inc-radio span { display: flex; flex-direction: column; gap: 0.15rem; }
  .inc-radio small, .inc-hint, .inc-small, .inc-field small { color: var(--text-secondary); font-size: var(--text-sm); line-height: 1.45; }
  .inc-hint { margin: 0.4rem 0 0; }
  .inc-hint a, .inc-aside a, .inc-sources a { color: var(--brand-pink-ink); }
  .inc-steppers { display: grid; gap: 1rem; grid-template-columns: 1fr; margin-bottom: 1.25rem; }
  @media (min-width: 560px) { .inc-steppers { grid-template-columns: 1fr 1fr; } }
  .inc-field { display: flex; flex-direction: column; gap: 0.45rem; font-weight: 600; font-size: var(--text-sm); }
  .inc-stepper { display: flex; align-items: center; justify-content: space-between; border: 1px solid var(--border-color); border-radius: 0.85rem; overflow: hidden; }
  .inc-stepper button { width: 3.25rem; min-height: 3rem; border: 0; background: transparent; color: var(--text-primary); font-size: 1.5rem; cursor: pointer; }
  .inc-stepper button:disabled { opacity: 0.35; cursor: default; }
  .inc-stepper output { font-size: var(--text-xl); font-weight: 700; }
  .inc-input { display: flex; align-items: center; gap: 0.5rem; padding: 0 1rem; min-height: 3rem; border: 1px solid var(--border-color); border-radius: 0.85rem; }
  .inc-input:focus-within { border-color: var(--brand-pink); }
  .inc-input input { flex: 1; min-width: 0; border: 0; outline: 0; background: transparent; color: var(--text-primary); font-size: 1.1rem; }

  .inc-result dl { display: grid; gap: 0.5rem; margin: 0 0 1rem; }
  .inc-result dl div { display: flex; justify-content: space-between; gap: 1rem; padding: 0.55rem 0; border-bottom: 1px solid var(--border-color); }
  .inc-result dt { color: var(--text-secondary); }
  .inc-result dd { margin: 0; font-weight: 700; font-variant-numeric: tabular-nums; }
  .inc-topay dd { color: var(--brand-pink-ink); font-size: var(--text-2xl); }
  .inc-warn { margin: 0 0 0.6rem; font-weight: 700; color: var(--brand-pink-ink); }
  .inc-fineprint { margin: 0.9rem 0 0; }

  .inc-reading { margin-top: 2rem; padding: 1.5rem; border-radius: 1.25rem; border: 1px solid var(--border-color); background: var(--bg-primary); }
  .inc-reading h3 { margin: 0 0 0.5rem; font-size: var(--text-xl); }
  .inc-badge { display: inline-block; margin: 0 0 1rem; padding: 0.35rem 0.7rem; border-radius: 0.6rem; background: var(--brand-pink-soft); font-size: var(--text-sm); color: var(--text-secondary); }
  .inc-reading ul { margin: 0; padding-left: 1.2rem; display: grid; gap: 0.8rem; color: var(--text-secondary); line-height: 1.6; }
  .inc-reading li strong { color: var(--text-primary); }

  .inc-two { display: grid; gap: 2rem; grid-template-columns: 1fr; }
  @media (min-width: 960px) { .inc-two { grid-template-columns: 1.4fr 1fr; align-items: start; } }
  .inc-two h3 { margin: 0 0 0.6rem; font-size: var(--text-xl); }
  .inc-list { margin: 0 0 1.5rem; padding-left: 1.2rem; display: grid; gap: 0.6rem; color: var(--text-secondary); line-height: 1.6; }
  .inc-aside { padding: 1.5rem; border: 1px solid var(--border-color); border-radius: 1.25rem; background: var(--bg-tertiary); }
  .inc-aside p { margin: 0 0 0.9rem; color: var(--text-secondary); line-height: 1.55; }
  .inc-caution { padding: 0.8rem 0.9rem; border-radius: 0.75rem; background: rgba(234, 179, 8, 0.14); }
  .inc-caution strong { color: var(--text-primary); }

  .inc-faq { display: grid; gap: 0.75rem; }
  .inc-faq details { border: 1px solid var(--border-color); border-radius: 1rem; background: var(--bg-tertiary); }
  .inc-faq summary { padding: 1rem 1.25rem; min-height: 3rem; cursor: pointer; font-weight: 600; }
  .inc-faq details p { margin: 0; padding: 0 1.25rem 1.1rem; color: var(--text-secondary); line-height: 1.6; }
  .inc-sources { display: grid; gap: 0.6rem; margin: 0; padding-left: 1.2rem; }
  .inc-narrow p { color: var(--text-secondary); line-height: 1.6; }
</style>
