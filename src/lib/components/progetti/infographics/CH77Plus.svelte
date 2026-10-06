<script lang="ts">
  import { activationSteps, activationDemo } from '$lib/data/infographics';
  import PhoneFrame from '../PhoneFrame.svelte';
  import InfoFrame from './InfoFrame.svelte';
  import StepBar from './StepBar.svelte';

  /** Vero quando il palco non è quello in primo piano (vetrina a scene). */
  export let idle = false;

  const total = activationSteps.length;
  const code = activationDemo.code;

  /** QR solo disegnato: moduli a caso su una griglia 21x21, con i tre quadrati d'angolo. Non si può leggere. */
  const QR = 21;
  const qrPath = (() => {
    let seed = 7;
    const rnd = () => (seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296;
    const corner = (x: number, y: number) => {
      const ox = x < 7 ? 0 : x >= QR - 7 ? QR - 7 : -1;
      const oy = y < 7 ? 0 : y >= QR - 7 ? QR - 7 : -1;
      if (ox < 0 || oy < 0 || (x < 7 && y >= 7) || (y < 7 && x >= 7 && x < QR - 7)) return null;
      const lx = x - ox;
      const ly = y - oy;
      return lx === 0 || lx === 6 || ly === 0 || ly === 6 || (lx >= 2 && lx <= 4 && ly >= 2 && ly <= 4);
    };
    let d = '';
    for (let y = 0; y < QR; y++) {
      for (let x = 0; x < QR; x++) {
        const inCorner = corner(x, y);
        const nearCorner = (x < 8 && y < 8) || (x >= QR - 8 && y < 8) || (x < 8 && y >= QR - 8);
        const on = inCorner ?? (nearCorner ? false : rnd() > 0.52);
        if (on) d += `M${x} ${y}h1v1h-1z`;
      }
    }
    return d;
  })();

  let step = 0;
  let stopped = false;
  let running = false;
  let reduced = false;

  $: auto = !stopped && !reduced;

  /** Un tocco dell'utente ferma la riproduzione automatica per sempre. */
  function select(event: CustomEvent<number>) {
    stopped = true;
    step = event.detail;
  }

  function advance() {
    if (auto) step = (step + 1) % total;
  }
</script>

<InfoFrame label="Come si attiva CH77+ sul televisore" {idle} bind:running bind:reduced>
<div class="cp" data-s={step}>
  <div class="cp__stage" aria-hidden="true">
    <svg class="beam" viewBox="0 0 1000 620" preserveAspectRatio="none" focusable="false">
      <path class="beam__base" d="M735 340 C690 340 680 232 628 232" />
      <path class="beam__pk" d="M735 340 C690 340 680 232 628 232" pathLength="100" />
    </svg>

    <div class="tv">
      <div class="tv__frame">
        <div class="tv__screen">
          <div class="pair">
            <div class="pair__txt">
              <p class="pair__kicker">Abbina questa TV</p>
              <p class="pair__code">
                {#each code as part}<span>{part}</span>{/each}
              </p>
              <p class="pair__hint">Sul telefono apri {activationDemo.path}</p>
              <div class="st">
                <i class="st__dot"></i>
                <span class="st__t st__t--idle">In attesa del telefono</span>
                <span class="st__t st__t--wait">Controllo ogni 3 secondi</span>
                <span class="st__t st__t--ok">Premium attivo</span>
                <i class="st__ring"></i>
              </div>
            </div>
            <div class="pair__qr">
              <svg viewBox="-1.5 -1.5 {QR + 3} {QR + 3}" focusable="false">
                <rect x="-1.5" y="-1.5" width={QR + 3} height={QR + 3} rx="1.2" fill="#fff" />
                <path d={qrPath} fill="#0a0a0e" />
              </svg>
            </div>
            <div class="pair__ok"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg></div>
          </div>

          <div class="home">
            <div class="home__bar">
              <b class="home__logo">CH77<span>+</span></b>
              <span class="home__tab">Home</span>
              <span class="home__tab home__tab--on">Calcio</span>
              <span class="home__tab">Rubriche</span>
            </div>
            <p class="home__row">{activationDemo.row}</p>
            <ul class="home__cards">
              {#each activationDemo.cards as title, i}
                <li class="card" class:card--focus={i === 0} style="--k:{i}">
                  <span class="card__thumb"><span class="card__live"><i></i>LIVE</span></span>
                  <span class="card__t">{title}</span>
                </li>
              {/each}
            </ul>
            <div class="home__ghost"><i></i><i></i><i></i></div>
          </div>
        </div>
      </div>
      <div class="tv__neck"></div>
      <div class="tv__foot"></div>
    </div>

    <div class="ph">
      <PhoneFrame island>
        <div class="pv">
          <div class="pv__l pv__l--wait">
            <p class="pv__time">9:41</p>
            <p class="pv__wait">Inquadra il QR<br />o scrivi il codice</p>
          </div>

          <div class="pv__l pv__l--page">
            <p class="pv__url">{activationDemo.path}</p>
            <p class="pv__h">Abbina la TV</p>
            <p class="pv__lbl">Codice sulla TV</p>
            <p class="pv__field">
              {#each [...code.join(' ')] as ch, k}<span style="--k:{k}">{ch}</span>{/each}<i></i>
            </p>
            <span class="pv__btn">Continua</span>
          </div>

          <div class="pv__l pv__l--login">
            <p class="pv__h">Accedi</p>
            <span class="pv__input"><i></i></span>
            <span class="pv__input"><i class="dots"></i></span>
            <span class="pv__btn pv__btn--press1">Accedi</span>
          </div>

          <div class="pv__l pv__l--buy">
            <p class="pv__h">Attiva Premium</p>
            <span class="pv__plan"><i></i><i></i></span>
            <span class="pv__btn pv__btn--gold pv__btn--press2">Attiva</span>
          </div>

          <div class="pv__l pv__l--done">
            <span class="pv__tick"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg></span>
            <p class="pv__h">Premium attivo</p>
            <p class="pv__wait">Puoi tornare<br />alla TV</p>
          </div>
        </div>
      </PhoneFrame>
    </div>
  </div>

  <StepBar steps={activationSteps} {step} {auto} label="Passi dell'attivazione" on:select={select} on:advance={advance} />
</div>
</InfoFrame>

<style>
  .cp {
    padding: 1rem 0.9rem;
  }

  /* ---------- palco: televisore e telefono ---------- */
  .cp__stage {
    position: relative;
    aspect-ratio: 1000 / 640;
  }

  .beam {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    overflow: visible;
    opacity: 0;
    transition: opacity 0.4s;
  }

  .cp:is([data-s='2'], [data-s='3']) .beam {
    opacity: 1;
  }

  .beam path {
    fill: none;
    stroke-linecap: round;
  }

  .beam__base {
    stroke: rgba(255, 255, 255, 0.2);
    stroke-width: 3;
    stroke-dasharray: 2 9;
  }

  .beam__pk {
    stroke: var(--hi);
    stroke-width: 7;
    stroke-dasharray: 3 47;
    animation: beam 1.6s linear infinite;
  }

  @keyframes beam {
    from { stroke-dashoffset: -50; }
    to { stroke-dashoffset: 0; }
  }

  /* televisore */
  .tv {
    container-type: inline-size;
    position: absolute;
    left: 0;
    top: 14%;
    width: 62%;
  }

  .tv__frame {
    padding: 1.7cqw;
    border-radius: 2.6cqw;
    background: linear-gradient(155deg, #3a3a42, #101014 60%, #26262c);
    box-shadow: inset 0 0 0 0.4cqw rgba(255, 255, 255, 0.18), 0 6cqw 10cqw -4cqw rgba(0, 0, 0, 0.8);
  }

  .tv__screen {
    position: relative;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    border-radius: 1.2cqw;
    background: #0b0b12;
    background-image: radial-gradient(90% 90% at 20% 0%, color-mix(in srgb, var(--a) 40%, #0b0b12), #0b0b12 70%);
  }

  .tv__neck {
    width: 9%;
    height: 2.4cqw;
    margin: 0 auto;
    background: linear-gradient(90deg, #1b1b20, #3a3a42, #1b1b20);
  }

  .tv__foot {
    width: 36%;
    height: 1.4cqw;
    margin: 0 auto;
    border-radius: 1cqw;
    background: linear-gradient(#3a3a42, #17171b);
  }

  /* schermata dell'abbinamento */
  .pair,
  .home {
    position: absolute;
    inset: 0;
    transition: opacity 0.5s;
  }

  .pair {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 3cqw;
    padding: 0 6cqw;
  }

  .pair__txt {
    flex: 1;
    min-width: 0;
  }

  .pair__kicker {
    margin: 0 0 1.4cqw;
    font-size: max(7px, 2.5cqw);
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--hi);
  }

  .pair__code {
    display: flex;
    gap: 2.4cqw;
    margin: 0;
    font: 800 10.5cqw/1 ui-monospace, SFMono-Regular, Menlo, monospace;
    letter-spacing: 0.04em;
    transition: opacity 0.4s;
  }

  .pair__hint {
    margin: 1.8cqw 0 0;
    font-size: max(7px, 2.5cqw);
    color: var(--ink2);
  }

  .pair__qr {
    flex: none;
    width: 26cqw;
    transition: opacity 0.4s;
  }

  .pair__qr svg {
    display: block;
    width: 100%;
    height: auto;
  }

  /* indicatore: in attesa, controllo, sbloccata */
  .st {
    position: relative;
    display: grid;
    align-items: center;
    justify-items: start;
    margin-top: 2.4cqw;
    padding-left: 4.2cqw;
    font-size: max(7px, 2.3cqw);
    font-weight: 600;
  }

  .st__t {
    grid-area: 1 / 1;
    opacity: 0;
    white-space: nowrap;
  }

  .st__dot {
    position: absolute;
    left: 0.5cqw;
    top: 50%;
    width: 1.8cqw;
    height: 1.8cqw;
    margin-top: -0.9cqw;
    border-radius: 50%;
    background: var(--hi);
    animation: blink 1.6s ease-in-out infinite;
  }

  .st__ring {
    position: absolute;
    left: 0.5cqw;
    top: 50%;
    width: 1.8cqw;
    height: 1.8cqw;
    margin-top: -0.9cqw;
    border-radius: 50%;
    border: 0.35cqw solid var(--hi);
    opacity: 0;
  }

  @keyframes blink {
    50% { opacity: 0.25; }
  }

  .st__t--idle { opacity: 1; color: var(--ink2); }

  .pair__ok {
    position: absolute;
    left: 6cqw;
    top: 50%;
    width: 13cqw;
    height: 13cqw;
    margin-top: -6.5cqw;
    display: grid;
    place-items: center;
    padding: 3cqw;
    border-radius: 50%;
    background: #16a34a;
    color: #fff;
    opacity: 0;
    transform: scale(0.6);
  }

  .pair__ok svg {
    width: 100%;
    height: 100%;
  }

  .cp:is([data-s='3'], [data-s='4']) .st__t--idle,
  .cp[data-s='4'] .st__t--wait {
    opacity: 0;
  }

  /* passo 4: la TV controlla ogni 3 secondi, poi si sblocca */
  .cp[data-s='3'] .st__t--wait {
    opacity: 0;
    animation: until 3.3s linear both;
  }

  .cp[data-s='3'] .st__t--ok {
    opacity: 1;
    color: #4ade80;
    animation: appear 0.4s 3.3s ease-out backwards;
  }

  .cp[data-s='3'] .st__dot {
    animation: none;
    opacity: 0;
  }

  .cp[data-s='3'] .st__ring {
    opacity: 1;
    animation: check 3s ease-out 2 both;
  }

  .cp[data-s='3'] .pair__code,
  .cp[data-s='3'] .pair__qr {
    opacity: 0.18;
    animation: dim 0.4s 3.3s ease-out backwards;
  }

  .cp[data-s='3'] .pair__ok {
    opacity: 1;
    transform: none;
    animation: pop 0.5s 3.3s cubic-bezier(0.2, 1.4, 0.4, 1) backwards;
  }

  @keyframes until {
    0%, 92% { opacity: 1; }
    100% { opacity: 0; }
  }

  @keyframes appear {
    from { opacity: 0; transform: translateY(0.6cqw); }
  }

  @keyframes check {
    0% { transform: scale(1); opacity: 1; }
    75%, 100% { transform: scale(4.2); opacity: 0; }
  }

  @keyframes dim {
    from { opacity: 1; }
  }

  @keyframes pop {
    from { opacity: 0; transform: scale(0.6); }
  }

  /* schermata del calcio con le dirette */
  .home {
    padding: 3.4cqw 4.4cqw 0;
    opacity: 0;
    pointer-events: none;
  }

  .cp[data-s='4'] .pair {
    opacity: 0;
  }

  .cp[data-s='4'] .home {
    opacity: 1;
  }

  .home__bar {
    display: flex;
    align-items: center;
    gap: 3.4cqw;
    font-size: max(7px, 2.3cqw);
    font-weight: 600;
    color: var(--ink2);
  }

  .home__logo {
    margin-right: 1.4cqw;
    font-size: max(8px, 2.9cqw);
    font-weight: 800;
    color: var(--ink);
  }

  .home__logo span {
    color: var(--hi);
  }

  .home__tab--on {
    padding-bottom: 0.7cqw;
    border-bottom: 0.45cqw solid var(--hi);
    color: var(--ink);
  }

  .home__row {
    margin: 4.6cqw 0 2cqw;
    font-size: max(8px, 3cqw);
    font-weight: 800;
    letter-spacing: -0.01em;
  }

  .home__cards {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 2.2cqw;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .cp[data-s='4'] .card {
    animation: rise 0.6s calc(0.25s + var(--k) * 0.13s) cubic-bezier(0.2, 0.9, 0.2, 1) backwards;
  }

  @keyframes rise {
    from { opacity: 0; transform: translateY(4cqw); }
  }

  .card {
    display: block;
  }

  .card__thumb {
    position: relative;
    display: block;
    aspect-ratio: 16 / 9;
    border-radius: 1.2cqw;
    background:
      linear-gradient(135deg, color-mix(in srgb, var(--a) 70%, #111), color-mix(in srgb, var(--hi) 40%, #1a1408));
  }

  .card:nth-child(2) .card__thumb {
    background: linear-gradient(135deg, color-mix(in srgb, var(--hi) 45%, #1a1408), color-mix(in srgb, var(--a) 55%, #0b0b12));
  }

  .card:nth-child(3) .card__thumb {
    background: linear-gradient(135deg, #2a2f4a, color-mix(in srgb, var(--a) 50%, #0b0b12));
  }

  .card--focus .card__thumb {
    box-shadow: 0 0 0 0.5cqw var(--hi);
  }

  .card__live {
    position: absolute;
    left: 1.2cqw;
    top: 1.2cqw;
    display: inline-flex;
    align-items: center;
    gap: 0.8cqw;
    padding: 0.5cqw 1.2cqw;
    border-radius: 99px;
    background: #e11d2e;
    font-size: max(6px, 1.9cqw);
    font-weight: 800;
    letter-spacing: 0.06em;
    color: #fff;
  }

  .card__live i {
    width: 1cqw;
    height: 1cqw;
    border-radius: 50%;
    background: #fff;
    animation: blink 1.2s ease-in-out infinite;
  }

  .card__t {
    display: block;
    margin-top: 1.2cqw;
    font-size: max(6.5px, 2cqw);
    font-weight: 600;
    color: var(--ink2);
  }

  .home__ghost {
    display: flex;
    gap: 2.2cqw;
    margin-top: 3.4cqw;
    opacity: 0.35;
  }

  .home__ghost i {
    flex: 1;
    height: 6cqw;
    border-radius: 1.2cqw 1.2cqw 0 0;
    background: rgba(255, 255, 255, 0.12);
  }

  /* telefono */
  .ph {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 27%;
  }

  .pv {
    position: absolute;
    inset: 0;
    background: linear-gradient(170deg, #15151d, #08080c);
    font-size: 8cqw;
    line-height: 1.2;
  }

  .pv p {
    margin: 0;
  }

  .pv__l {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    gap: 4cqw;
    padding: 20cqw 9cqw 0;
    opacity: 0;
    transition: opacity 0.4s;
  }

  .pv__time {
    margin-top: 6cqw;
    text-align: center;
    font-size: 24cqw;
    font-weight: 700;
    letter-spacing: -0.02em;
  }

  .pv__wait {
    text-align: center;
    font-size: 8cqw;
    color: var(--ink2);
  }

  .pv__url {
    align-self: center;
    padding: 2cqw 6cqw;
    border-radius: 99px;
    background: rgba(255, 255, 255, 0.1);
    font: 600 7.5cqw/1 ui-monospace, SFMono-Regular, Menlo, monospace;
    color: var(--hi);
  }

  .pv__h {
    font-size: 11cqw;
    font-weight: 800;
    letter-spacing: -0.01em;
  }

  .pv__lbl {
    font-size: 7cqw;
    color: var(--ink2);
  }

  .pv__field {
    display: flex;
    align-items: center;
    min-height: 17cqw;
    padding: 0 6cqw;
    border-radius: 4cqw;
    border: 0.8cqw solid var(--a);
    background: rgba(255, 255, 255, 0.06);
    font: 800 9.5cqw/1 ui-monospace, SFMono-Regular, Menlo, monospace;
    white-space: pre;
  }

  .pv__field i {
    width: 0.9cqw;
    height: 10cqw;
    margin-left: 1cqw;
    background: var(--hi);
    animation: blink 1s steps(2) infinite;
  }

  .pv__btn {
    display: grid;
    place-items: center;
    min-height: 17cqw;
    border-radius: 4cqw;
    background: var(--a);
    font-size: 8.5cqw;
    font-weight: 800;
    color: #fff;
  }

  .pv__btn--gold {
    background: var(--hi);
    color: #14110a;
  }

  .pv__input {
    display: flex;
    align-items: center;
    min-height: 15cqw;
    padding: 0 6cqw;
    border-radius: 4cqw;
    background: rgba(255, 255, 255, 0.08);
  }

  .pv__input i {
    width: 48%;
    height: 2.4cqw;
    border-radius: 2px;
    background: rgba(255, 255, 255, 0.4);
  }

  .pv__input i.dots {
    width: 32%;
    background: repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.55) 0 3cqw, transparent 3cqw 6cqw);
  }

  .pv__plan {
    display: flex;
    flex-direction: column;
    gap: 3cqw;
    padding: 6cqw;
    border-radius: 4cqw;
    border: 0.8cqw solid color-mix(in srgb, var(--hi) 70%, transparent);
    background: color-mix(in srgb, var(--hi) 10%, transparent);
  }

  .pv__plan i {
    height: 2.6cqw;
    border-radius: 2px;
    background: rgba(255, 255, 255, 0.45);
  }

  .pv__plan i:last-child {
    width: 60%;
  }

  .pv__l--done {
    align-items: center;
    text-align: center;
  }

  .pv__tick {
    display: grid;
    place-items: center;
    width: 30cqw;
    height: 30cqw;
    margin-top: 8cqw;
    padding: 7cqw;
    border-radius: 50%;
    background: #16a34a;
    color: #fff;
  }

  .pv__tick svg {
    width: 100%;
    height: 100%;
  }

  /* quale schermata del telefono si vede, passo per passo */
  .cp[data-s='0'] .pv__l--wait,
  .cp[data-s='1'] .pv__l--page,
  .cp[data-s='3'] .pv__l--done,
  .cp[data-s='4'] .pv__l--done {
    opacity: 1;
  }

  .cp[data-s='1'] .pv__field span {
    animation: typed 0.01s calc(0.6s + var(--k) * 0.26s) steps(1) backwards;
  }

  @keyframes typed {
    from { opacity: 0; }
  }

  .cp[data-s='1'] .pv__l--page .pv__btn {
    animation: ready 0.4s 2.6s ease-out backwards;
  }

  @keyframes ready {
    from { opacity: 0.35; }
  }

  .cp[data-s='2'] .pv__l--login {
    opacity: 1;
    animation: until 1.9s linear both;
  }

  .cp[data-s='2'] .pv__l--buy {
    opacity: 0;
    animation: window 3.5s linear both;
  }

  .cp[data-s='2'] .pv__l--done {
    opacity: 1;
    animation: appear 0.45s 3.5s ease-out backwards;
  }

  .cp[data-s='2'] .pv__btn--press1 {
    animation: press 0.3s 1.3s ease-in-out;
  }

  .cp[data-s='2'] .pv__btn--press2 {
    animation: press 0.3s 3s ease-in-out;
  }

  @keyframes window {
    0%, 52% { opacity: 0; }
    58%, 90% { opacity: 1; }
    100% { opacity: 0; }
  }

  @keyframes press {
    50% { transform: scale(0.94); }
  }

  @media (prefers-reduced-motion: reduce) {
    .beam__pk,
    .st__ring {
      display: none;
    }

    .cp[data-s='2'] .pv__l--login {
      opacity: 0;
    }
  }
</style>
