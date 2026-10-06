<script lang="ts">
  import { paSteps, paDocs, paQuestions, paMasked } from '$lib/data/infographics';
  import InfoFrame from './InfoFrame.svelte';
  import InfoIcon from './InfoIcon.svelte';
  import Chips from './Chips.svelte';
  import StepBar from './StepBar.svelte';
  import WaScreen from './WaScreen.svelte';
  import Bubble from './Bubble.svelte';
  import ExampleTag from './ExampleTag.svelte';

  /** Vero quando il palco non è quello in primo piano. */
  export let idle = false;

  const last = paSteps.length - 1;

  let running = false;
  let reduced = false;
  let step = 0;
  let epoch = 0;
  let stopped = false;
  let q = 0;

  $: auto = !stopped && !reduced;
  $: question = paQuestions[q];
  $: docIndex = question.doc;

  /** Un tocco sui passi ferma la riproduzione automatica. */
  function select(event: CustomEvent<number>) {
    stopped = true;
    step = event.detail;
  }

  /** Il flusso gira una volta sola: all'ultimo passo resta fermo, così si legge la risposta. */
  function advance() {
    if (auto && step < last) step += 1;
  }

  /** Una nuova domanda fa ripartire tutto da capo. Con meno movimento si salta alla risposta. */
  function ask(event: CustomEvent<number>) {
    q = event.detail;
    stopped = false;
    epoch += 1;
    step = reduced ? last : 0;
  }
</script>

<InfoFrame label="Come risponde un assistente del Comune" {idle} bind:running bind:reduced>
  <div class="pa">
    <div class="pa__head">
      <p class="pa__lbl">Prova una domanda</p>
      <ExampleTag />
    </div>
    <Chips items={paQuestions} active={q} label="Scegli una domanda d'esempio" on:pick={ask} />

    <div class="pa__scene">
      <div class="pa__chat">
        <WaScreen title="Assistente del Comune" sub="risponde con le fonti">
          {#key `${q}:${epoch}`}
            <Bubble from="me">{question.ask}</Bubble>
          {/key}
          {#if step === 1 || step === 2}
            <Bubble from="them"><span class="dots" role="img" aria-label="Sta scrivendo"><i></i><i></i><i></i></span></Bubble>
          {:else if step === 3}
            <Bubble from="them">
              <span class="rep">{question.reply}</span>
              {#if docIndex !== undefined}
                <span class="src"><InfoIcon name="doc" />Fonte: {paDocs[docIndex]}</span>
              {:else}
                <span class="src src--office"><InfoIcon name="pin" />Ufficio competente</span>
              {/if}
            </Bubble>
          {/if}
        </WaScreen>
      </div>

      <div class="pa__eng">
        <p class="pa__kick">Dietro le quinte</p>
        {#key step}
          <div class="eng">
            {#if step === 0}
              <span class="eng__ic"><InfoIcon name="chat" /></span>
              <p class="eng__t">Messaggio ricevuto</p>
              <p class="eng__x">Arriva da WhatsApp, come tutti gli altri.</p>
            {:else if step === 1}
              <ul class="mask">
                {#each paMasked as m, i}
                  <li style="--i:{i}"><span>{m}</span><span class="mask__v"><i></i></span></li>
                {/each}
              </ul>
              <p class="eng__x"><InfoIcon name="shield" />Coperti prima di arrivare al modello.</p>
            {:else if step === 2}
              <ul class="docs">
                {#each paDocs as d, i}
                  <li class:is-hit={i === docIndex} style="--i:{i}"><InfoIcon name="doc" /><span>{d}</span></li>
                {/each}
              </ul>
              <p class="eng__x">Solo le pagine del Comune.</p>
            {:else}
              <span class="eng__ic eng__ic--{docIndex !== undefined ? 'ok' : 'no'}"><InfoIcon name={docIndex !== undefined ? 'check' : 'pin'} /></span>
              <p class="eng__t">{docIndex !== undefined ? 'Informazione trovata' : 'Informazione non trovata'}</p>
              <p class="eng__x">{docIndex !== undefined ? 'La risposta cita la pagina da cui arriva.' : 'La risposta lo dice e indica l\'ufficio.'}</p>
            {/if}
          </div>
        {/key}
      </div>
    </div>

    <StepBar steps={paSteps} {step} {auto} {epoch} label="Passi della risposta" on:select={select} on:advance={advance} />
  </div>
</InfoFrame>

<style>
  .pa {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    padding: 1rem 0.9rem;
  }

  .pa__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.6rem;
  }

  .pa__lbl,
  .pa__kick {
    margin: 0;
    font: 600 0.7rem/1 ui-monospace, SFMono-Regular, Menlo, monospace;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--ink2);
  }

  .pa__scene {
    display: grid;
    gap: 0.6rem;
  }

  .pa__chat {
    height: 14.5rem;
  }

  .pa__eng {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    height: 11rem;
    padding: 0.8rem 0.9rem;
    border-radius: 0.9rem;
    border: 1px solid var(--line);
    background: rgba(255, 255, 255, 0.04);
  }

  .eng {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.45rem;
    text-align: center;
    animation: fade 0.4s ease-out backwards;
  }

  @keyframes fade {
    from { opacity: 0; transform: translateY(0.4rem); }
  }

  .eng__ic {
    width: 2.4rem;
    height: 2.4rem;
    padding: 0.5rem;
    border-radius: 50%;
    background: color-mix(in srgb, var(--a) 28%, transparent);
    color: var(--hi);
  }

  .eng__ic--ok {
    background: rgba(22, 163, 74, 0.3);
    color: #4ade80;
  }

  .eng__t {
    margin: 0;
    font-weight: var(--pg-display-weight);
    font-size: 0.98rem;
    letter-spacing: var(--pg-display-tracking);
  }

  .eng__x {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    margin: 0;
    font-size: 0.8rem;
    line-height: 1.35;
    color: var(--ink2);
  }

  .eng__x :global(.ic) {
    flex: none;
    width: 1rem;
    height: 1rem;
    color: var(--hi);
  }

  /* fumetti */
  .rep {
    display: block;
  }

  .src {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    margin-top: 0.45rem;
    padding: 0.22rem 0.6rem 0.22rem 0.45rem;
    border-radius: 999px;
    background: rgba(242, 184, 59, 0.18);
    border: 1px solid rgba(242, 184, 59, 0.5);
    font-size: 0.72rem;
    font-weight: 700;
    color: #f7d58a;
  }

  .src :global(.ic) {
    width: 0.9rem;
    height: 0.9rem;
  }

  .src--office {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.35);
    color: #fff;
  }

  .dots {
    display: inline-flex;
    gap: 0.25rem;
    padding: 0.2rem 0.1rem;
  }

  .dots i {
    width: 0.4rem;
    height: 0.4rem;
    border-radius: 50%;
    background: #8696a0;
    animation: bounce 1.1s ease-in-out infinite;
    animation-delay: calc(var(--d, 0) * 0.16s);
  }

  .dots i:nth-child(2) { --d: 1; }
  .dots i:nth-child(3) { --d: 2; }

  @keyframes bounce {
    0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
    30% { transform: translateY(-0.28rem); opacity: 1; }
  }

  /* dati coperti */
  .mask {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    width: 100%;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .mask li {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 0.78rem;
    color: var(--ink2);
  }

  .mask li > span:first-child {
    width: 4.2rem;
    text-align: left;
  }

  .mask__v {
    position: relative;
    flex: 1;
    height: 1.2rem;
    overflow: hidden;
    border-radius: 0.3rem;
    background: rgba(255, 255, 255, 0.28);
  }

  .mask__v i {
    position: absolute;
    inset: 0;
    background: #0b0b10;
    border: 1px solid rgba(255, 255, 255, 0.25);
    border-radius: 0.3rem;
    transform-origin: left;
    animation: cover 0.7s calc(0.3s + var(--i) * 0.45s) ease-in-out backwards;
  }

  @keyframes cover {
    from { transform: scaleX(0); }
  }

  /* fonti che si accendono */
  .docs {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.4rem;
    width: 100%;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .docs li {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.4rem 0.4rem;
    border-radius: 0.55rem;
    border: 1px solid var(--line);
    font-size: 0.78rem;
    font-weight: 600;
    opacity: 0.5;
    animation: scan 0.9s calc(0.2s + var(--i) * 0.5s) ease-in-out backwards;
  }

  .docs li :global(.ic) {
    flex: none;
    width: 1rem;
    height: 1rem;
  }

  .docs li.is-hit {
    opacity: 1;
    border-color: var(--hi);
    background: color-mix(in srgb, var(--hi) 14%, transparent);
    color: var(--hi);
  }

  @keyframes scan {
    from { opacity: 0.5; transform: scale(1); }
    40% { opacity: 1; transform: scale(1.05); border-color: var(--hi); }
  }

  @container info (min-width: 400px) {
    .pa {
      padding: 3cqw;
    }

    .pa__scene {
      grid-template-columns: 1.3fr 1fr;
      gap: 0.8rem;
    }

    .pa__chat,
    .pa__eng {
      height: 16.5rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .dots i,
    .mask__v i {
      animation: none;
    }
  }
</style>
