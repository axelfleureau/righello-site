<script lang="ts">
  import { dicoSteps, dicoDemo, dicoTopics, dicoAddress } from '$lib/data/infographics';
  import InfoFrame from './InfoFrame.svelte';
  import InfoIcon from './InfoIcon.svelte';
  import Chips from './Chips.svelte';
  import StepBar from './StepBar.svelte';
  import WaScreen from './WaScreen.svelte';
  import Bubble from './Bubble.svelte';
  import ExampleTag from './ExampleTag.svelte';

  /** Vero quando il palco non è quello in primo piano. */
  export let idle = false;

  const total = dicoSteps.length;
  const pageStep = total - 1;
  const chips = dicoTopics.map((t) => ({ id: t.id, label: `${t.emoji} ${t.label}` }));
  const perSection = dicoTopics[0].items.length;
  const count = dicoTopics.length * perSection;

  let running = false;
  let reduced = false;
  let step = 0;
  let stopped = false;
  let topic = 0;
  /** Parte dell'indirizzo toccata (0 Comune, 1 settimana, 2 tematica). */
  let seg: number | null = null;
  /** Sezioni della pagina aperte a mano, oltre a quella della tematica scelta. */
  let opened: Record<string, boolean> = {};

  $: auto = !stopped && !reduced;
  $: current = dicoTopics[topic];
  $: addressText = seg === null ? 'Tocca un pezzo dell\'indirizzo per capire cosa significa.' : dicoAddress[seg].text;

  /** Un tocco sui passi ferma la riproduzione automatica. */
  function select(event: CustomEvent<number>) {
    stopped = true;
    step = event.detail;
  }

  function advance() {
    if (auto) step = (step + 1) % total;
  }

  /** Scegliere una tematica, dalla chip o dal messaggio, porta alla sua pagina. */
  function pickTopic(index: number) {
    stopped = true;
    topic = index;
    step = pageStep;
    seg = null;
    opened = {};
  }

  function toggle(id: string) {
    opened = { ...opened, [id]: !opened[id] };
  }
</script>

<InfoFrame label="Dal messaggio della settimana alle pagine per tematica" {idle} bind:running bind:reduced>
  <div class="df">
    <div class="df__head">
      <p class="df__lbl">Tematica</p>
      <ExampleTag />
    </div>
    <Chips items={chips} active={topic} label="Scegli una tematica" on:pick={(e) => pickTopic(e.detail)} />

    <div class="df__scene">
      {#key step}
        <div class="sc" aria-hidden={step < 2 ? 'true' : undefined}>
          {#if step === 0}
            <ul class="src">
              <li style="--i:0"><InfoIcon name="doc" />{dicoDemo.sources[0]}</li>
              <li style="--i:1"><InfoIcon name="globe" />{dicoDemo.sources[1]}</li>
            </ul>
            <span class="btn"><InfoIcon name="pen" />{dicoDemo.prepare}</span>
            <p class="note">{dicoDemo.merge}</p>
            <ul class="fields">
              {#each dicoDemo.fields as f, i}
                <li style="--i:{i}"><span>{f}</span><span class="fields__v"><i></i></span></li>
              {/each}
            </ul>
            <span class="btn btn--ghost"><InfoIcon name="search" />{dicoDemo.check}</span>
            <ul class="warn">
              {#each dicoDemo.warnings as w, i}
                <li style="--i:{i}">{w}</li>
              {/each}
            </ul>
          {:else if step === 1}
            <div class="doc">
              <div class="doc__top">
                <b>Messaggio della settimana</b>
                <span class="pill">
                  {#each dicoDemo.states as st, i}
                    <span class="pill__{i}">{st}</span>
                  {/each}
                </span>
              </div>
              <i class="ln"></i><i class="ln ln--s"></i><i class="ln"></i>
            </div>
            <div class="stt">
              <i class="stt__bar"></i>
              <ol>
                {#each dicoDemo.states as st, i}
                  <li style="--i:{i}"><i></i><span>{st}</span></li>
                {/each}
              </ol>
            </div>
            <div class="wk">
              <ul class="wk__days">
                {#each dicoDemo.days as d}<li>{d}</li>{/each}
              </ul>
              <span class="wk__copy">{dicoDemo.copy}</span>
              <span class="wk__lock"><InfoIcon name="lock" /></span>
            </div>
            <p class="note">{dicoDemo.copyNote}</p>
          {:else if step === 2}
            <div class="fill">
              <WaScreen light title={dicoDemo.entity} sub="messaggio della settimana">
                <Bubble light wide>
                  <span class="em"><InfoIcon name="alert" />{dicoDemo.emergency}</span>
                  <span class="std"><b>{dicoDemo.saveDate.toUpperCase()}</b><span>🗓️ {dicoDemo.saveDateItem}</span></span>
                  {#each dicoTopics as t, i (t.id)}
                    <button type="button" class="tp" class:is-on={i === topic} on:click={() => pickTopic(i)}>
                      <span class="tp__l"><b>{t.emoji} {t.label}</b><span class="tp__u">{dicoDemo.host}/w{dicoDemo.week}-{t.slug}</span></span>
                      <span class="tp__t">{t.items.slice(0, 2).join(' · ')}</span>
                    </button>
                  {/each}
                  <span class="end">{dicoDemo.closing}</span>
                </Bubble>
              </WaScreen>
            </div>
          {:else}
            <div class="web">
              <div class="web__bar">
                <i></i><i></i><i></i>
                <span class="addr" role="group" aria-label="L'indirizzo della pagina">
                  <button type="button" class="addr__s" class:is-on={seg === 0} on:click={() => (seg = seg === 0 ? null : 0)}>nomecomune</button><span>.dico.online/</span><button type="button" class="addr__s" class:is-on={seg === 1} on:click={() => (seg = seg === 1 ? null : 1)}>w{dicoDemo.week}</button><span>-</span><button type="button" class="addr__s" class:is-on={seg === 2} on:click={() => (seg = seg === 2 ? null : 2)}>{current.slug}</button>
                </span>
              </div>
              <p class="web__why" aria-live="polite">{addressText}</p>
              <div class="fill">
                <WaScreen light title={dicoDemo.entity} sub={dicoDemo.pageSub} tint={current.color}>
                  <span slot="action" class="share">{dicoDemo.share}</span>
                  <div class="pills">
                    <span>{dicoDemo.period}</span>
                    <span>{count} comunicazioni in {dicoTopics.length} sezioni</span>
                  </div>
                  {#each dicoTopics as t, i (t.id)}
                    {@const open = i === topic || opened[t.id]}
                    <Bubble light wide tight>
                      <button type="button" class="sec" class:is-lit={i === topic} aria-expanded={open} on:click={() => toggle(t.id)} style="--c:{t.color}">
                        <b>{t.emoji} {t.label}</b>
                        <span class="sec__n">{perSection}</span>
                        <span class="sec__a" aria-hidden="true">{open ? '▾' : '▸'}</span>
                      </button>
                      {#if open}
                        <ul class="rows">
                          {#each t.items as it, k}
                            <li style="--k:{k}">{t.emoji} {it}</li>
                          {/each}
                        </ul>
                      {/if}
                    </Bubble>
                  {/each}
                </WaScreen>
              </div>
            </div>
          {/if}
        </div>
      {/key}
    </div>

    <StepBar steps={dicoSteps} {step} {auto} label="Passi del messaggio settimanale" on:select={select} on:advance={advance} />
  </div>
</InfoFrame>

<style>
  .df {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    padding: 1rem 0.9rem;
  }

  .df__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.6rem;
  }

  .df__lbl {
    margin: 0;
    font: 600 0.7rem/1 ui-monospace, SFMono-Regular, Menlo, monospace;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--ink2);
  }

  .df__scene {
    height: 29rem;
    padding: 0.8rem;
    border-radius: 0.9rem;
    border: 1px solid var(--line);
    background: rgba(255, 255, 255, 0.03);
    overflow: hidden;
  }

  .sc {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.55rem;
    height: 100%;
    font-size: 0.82rem;
    animation: fade 0.45s ease-out backwards;
  }

  @keyframes fade {
    from { opacity: 0; transform: translateY(0.5rem); }
  }

  .sc :global(.ic) {
    flex: none;
    width: 1.05rem;
    height: 1.05rem;
  }

  .fill {
    flex: 1;
    min-height: 0;
  }

  .note {
    margin: 0;
    font-size: 0.74rem;
    line-height: 1.35;
    text-align: center;
    color: var(--ink2);
  }

  /* 01: la redazione prepara */
  .src {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.4rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .src li {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.38rem 0.7rem;
    border-radius: 999px;
    border: 1px solid #4a7fb5;
    background: rgba(74, 127, 181, 0.16);
    font-weight: 600;
    animation: fade 0.5s calc(0.1s + var(--i) * 0.25s) ease-out backwards;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    align-self: center;
    min-height: 2.5rem;
    padding: 0 1.2rem;
    border-radius: 999px;
    background: #fff;
    color: #111;
    font-weight: 800;
    animation: press 0.5s 0.9s ease-in-out;
  }

  .btn--ghost {
    border: 1px solid rgba(255, 255, 255, 0.5);
    background: none;
    color: #fff;
    animation-delay: 3.3s;
  }

  @keyframes press {
    50% { transform: scale(0.93); }
  }

  .fields {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .fields li {
    display: flex;
    align-items: center;
    gap: 0.7rem;
  }

  .fields li > span:first-child {
    width: 4.6rem;
    color: var(--ink2);
  }

  .fields__v {
    position: relative;
    flex: 1;
    height: 1.2rem;
    overflow: hidden;
    border-radius: 0.35rem;
    background: rgba(255, 255, 255, 0.08);
  }

  .fields__v i {
    position: absolute;
    inset: 0;
    width: 78%;
    border-radius: 0.35rem;
    background: linear-gradient(95deg, #4a7fb5 0%, #8b6fd6 42%, #d9884f 72%, #e9b544 100%);
    transform-origin: left;
    animation: write 0.6s calc(1.5s + var(--i) * 0.35s) ease-out backwards;
  }

  .fields li:nth-child(2) .fields__v i { width: 92%; }
  .fields li:nth-child(3) .fields__v i { width: 40%; }
  .fields li:nth-child(4) .fields__v i { width: 24%; }

  @keyframes write {
    from { transform: scaleX(0); }
  }

  .warn {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.35rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .warn li {
    padding: 0.22rem 0.6rem;
    border-radius: 999px;
    background: rgba(233, 181, 68, 0.18);
    border: 1px solid rgba(233, 181, 68, 0.55);
    font-size: 0.72rem;
    font-weight: 700;
    color: #f5d68a;
    animation: fade 0.4s calc(3.8s + var(--i) * 0.2s) ease-out backwards;
  }

  /* 02: la redazione approva */
  .doc {
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
    padding: 0.8rem;
    border-radius: 0.7rem;
    border: 1px solid var(--line);
    background: rgba(255, 255, 255, 0.05);
  }

  .doc__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    margin-bottom: 0.25rem;
  }

  .pill {
    display: grid;
    flex: none;
  }

  .pill > span {
    grid-area: 1 / 1;
    justify-self: end;
    padding: 0.22rem 0.7rem;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.4);
    background: rgba(255, 255, 255, 0.1);
    font-size: 0.72rem;
    font-weight: 800;
    opacity: 0;
    animation: window 1.05s linear both;
  }

  .pill__1 { animation-delay: 1s; }
  .pill__2 { animation-delay: 2s; background: rgba(74, 127, 181, 0.35); }

  /* l'ultima etichetta, «Uscita», resta */
  .pill > .pill__3 {
    opacity: 1;
    border-color: rgba(74, 222, 128, 0.7);
    background: rgba(22, 163, 74, 0.3);
    color: #86efac;
    animation: in 0.4s 3s ease-out backwards;
  }

  @keyframes window {
    0% { opacity: 0; }
    10%, 85% { opacity: 1; }
    100% { opacity: 0; }
  }

  @keyframes in {
    from { opacity: 0; transform: scale(0.85); }
  }

  .ln {
    display: block;
    height: 0.5rem;
    border-radius: 0.25rem;
    background: rgba(255, 255, 255, 0.2);
  }

  .ln--s {
    width: 62%;
  }

  .stt {
    position: relative;
    padding-top: 0.2rem;
  }

  .stt__bar {
    position: absolute;
    left: 12.5%;
    right: 12.5%;
    top: 0.62rem;
    height: 3px;
    border-radius: 3px;
    background: linear-gradient(95deg, #4a7fb5 0%, #8b6fd6 42%, #d9884f 72%, #e9b544 100%);
    transform-origin: left;
    animation: write 3s 0.2s linear backwards;
  }

  .stt ol {
    position: relative;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .stt li {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.72rem;
    font-weight: 700;
    text-align: center;
  }

  .stt li i {
    width: 0.9rem;
    height: 0.9rem;
    border-radius: 50%;
    border: 2px solid #fff;
    background: #fff;
    animation: dot 0.4s calc(0.2s + var(--i) * 1s) ease-out backwards;
  }

  @keyframes dot {
    from { background: #06060a; border-color: rgba(255, 255, 255, 0.3); transform: scale(0.8); }
  }

  .wk {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .wk__days {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    gap: 0.2rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .wk__days li {
    padding: 0.3rem 0;
    border-radius: 0.35rem;
    background: rgba(233, 181, 68, 0.3);
    border: 1px solid rgba(233, 181, 68, 0.7);
    font-size: 0.66rem;
    font-weight: 700;
    text-align: center;
    animation: unlock 0.5s 3.8s ease-out backwards;
  }

  @keyframes unlock {
    from { background: rgba(255, 255, 255, 0.06); border-color: var(--line); }
  }

  .wk__copy {
    flex: none;
    padding: 0.4rem 0.8rem;
    border-radius: 999px;
    background: #fff;
    color: #111;
    font-size: 0.76rem;
    font-weight: 800;
    animation: press 0.4s 3.4s ease-in-out;
  }

  .wk__lock {
    position: absolute;
    left: -0.4rem;
    top: -0.5rem;
    width: 1.5rem;
    height: 1.5rem;
    padding: 0.32rem;
    border-radius: 50%;
    background: #e9b544;
    color: #13263d;
    animation: lock 0.5s 3.9s cubic-bezier(0.2, 1.4, 0.4, 1) backwards;
  }

  .wk__lock :global(.ic) {
    width: 100%;
    height: 100%;
  }

  @keyframes lock {
    from { opacity: 0; transform: scale(0.4); }
  }

  /* 03: il messaggio, con le righe da toccare */
  .em {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    margin-bottom: 0.35rem;
    padding: 0.25rem 0.5rem;
    border-radius: 0.4rem;
    background: rgba(178, 59, 43, 0.12);
    font-size: 0.72rem;
    font-weight: 700;
    color: #b23b2b;
  }

  .std {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    margin-bottom: 0.2rem;
    padding: 0.25rem 0.5rem;
    border-left: 3px solid #e9b544;
    font-size: 0.72rem;
  }

  .std b {
    letter-spacing: 0.06em;
    color: #13263d;
  }

  .tp {
    appearance: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.1rem;
    width: 100%;
    min-height: 2.75rem;
    padding: 0.2rem 0.5rem;
    border: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.08);
    background: none;
    color: inherit;
    font: inherit;
    font-size: 0.74rem;
    text-align: left;
    cursor: pointer;
  }

  .tp__l {
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
    min-width: 0;
  }

  .tp__l b {
    flex: none;
    font-style: italic;
  }

  .tp__u {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font: 500 0.66rem/1.2 ui-monospace, SFMono-Regular, Menlo, monospace;
    color: #027eb5;
    text-decoration: underline;
  }

  .tp__t {
    font-size: 0.68rem;
    color: #667781;
  }

  .tp:hover,
  .tp.is-on {
    background: rgba(33, 58, 89, 0.07);
  }

  .tp:focus-visible,
  .sec:focus-visible,
  .addr__s:focus-visible {
    outline: 2px solid #1d6fd6;
    outline-offset: -2px;
  }

  .end {
    display: block;
    margin-top: 0.2rem;
    padding-top: 0.3rem;
    border-top: 1px solid rgba(0, 0, 0, 0.08);
    font-size: 0.7rem;
    font-weight: 700;
    color: #13263d;
  }

  /* 04: la pagina della settimana */
  .web {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    height: 100%;
  }

  .web__bar {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.3rem 0.5rem;
    border-radius: 0.6rem;
    background: #dcd8cf;
    color: #1a1a1f;
  }

  .web__bar > i {
    flex: none;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.25);
  }

  .addr {
    flex: 1;
    min-width: 0;
    margin-left: 0.3rem;
    padding: 0 0.5rem;
    overflow: hidden;
    border-radius: 999px;
    background: #fff;
    white-space: nowrap;
    font: 500 0.7rem/1 ui-monospace, SFMono-Regular, Menlo, monospace;
  }

  .addr__s {
    appearance: none;
    position: relative;
    height: 1.7rem;
    margin: 0.15rem 0;
    padding: 0 0.1rem;
    border: 0;
    border-radius: 0.3rem;
    background: none;
    color: #13263d;
    font: inherit;
    font-weight: 800;
    text-decoration: underline;
    text-decoration-color: #e9b544;
    text-decoration-thickness: 2px;
    text-underline-offset: 3px;
    cursor: pointer;
  }

  .addr__s::after {
    content: '';
    position: absolute;
    inset: -0.5rem -0.2rem;
  }

  .addr__s.is-on,
  .addr__s:hover {
    background: #e9b544;
  }

  .web__why {
    min-height: 2.1rem;
    margin: 0;
    font-size: 0.74rem;
    line-height: 1.35;
    color: var(--ink2);
  }

  .share,
  .pills span {
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
    background: rgba(33, 58, 89, 0.1);
    font-size: 0.66rem;
    font-weight: 700;
    color: #213a59;
  }

  .share {
    flex: none;
  }

  .pills {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.3rem;
  }

  .pills span {
    background: rgba(255, 255, 255, 0.85);
    color: #667781;
  }

  .sec {
    appearance: none;
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    min-height: 2.6rem;
    padding: 0 0.1rem 0 0.5rem;
    border: 0;
    border-left: 3px solid var(--c);
    border-radius: 2px;
    background: none;
    color: #232b36;
    font: inherit;
    font-size: 0.78rem;
    font-style: italic;
    text-align: left;
    cursor: pointer;
  }

  .sec b {
    flex: 1;
    min-width: 0;
  }

  .sec__n {
    padding: 0.05rem 0.5rem;
    border-radius: 999px;
    background: rgba(0, 0, 0, 0.07);
    font-size: 0.68rem;
    font-style: normal;
    font-weight: 700;
    color: #667781;
  }

  .sec__a {
    color: #667781;
    font-style: normal;
  }

  /* la sezione della tematica scelta si illumina, poi resta evidenziata */
  .sec.is-lit::before {
    content: '';
    position: absolute;
    inset: 0.1rem -0.4rem;
    border-radius: 0.5rem;
    background: color-mix(in srgb, var(--c) 18%, transparent);
    animation: glow 2.4s ease-in-out 1 backwards;
    pointer-events: none;
  }

  @keyframes glow {
    0%, 100% { opacity: 0.45; }
    35%, 65% { opacity: 1; }
  }

  .rows {
    margin: 0;
    padding: 0 0 0.3rem;
    list-style: none;
    font-size: 0.74rem;
    color: #111b21;
  }

  .rows li {
    padding: 0.1rem 0.1rem;
    animation: fade 0.4s calc(0.15s + var(--k) * 0.12s) ease-out backwards;
  }

  @container info (min-width: 560px) {
    .df {
      padding: 3cqw;
    }

    .df__scene {
      height: 27rem;
      padding: 1rem 1.4rem;
    }

    .sc {
      font-size: 0.9rem;
    }
  }
</style>
