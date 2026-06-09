<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { browser } from '$app/environment';

  export let targetDate = '2026-06-30T23:59:59+02:00';
  export let title = 'Giugno è già iniziato';
  export let subtitle = 'Tempo utile per arrivare pronti con idea, budget e progetto prima della pubblicazione operativa.';
  export let footnote = 'Il countdown non indica una scadenza ufficiale: visualizza il tempo rimasto alla fine di giugno 2026.';

  type Unit = {
    label: string;
    value: string;
  };

  const targetTime = Date.parse(targetDate);
  let remaining = Math.max(0, targetTime - Date.now());
  let card: HTMLElement;
  let intervalId: ReturnType<typeof setInterval> | null = null;
  let observer: IntersectionObserver | null = null;
  let isVisible = false;

  function pad(value: number) {
    return String(value).padStart(2, '0');
  }

  function updateRemaining() {
    remaining = Math.max(0, targetTime - Date.now());
  }

  function stopTimer() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  function startTimer() {
    if (!browser || intervalId || !isVisible || document.hidden) return;
    updateRemaining();
    intervalId = setInterval(updateRemaining, 1000);
  }

  function handleVisibilityChange() {
    if (!browser) return;
    if (document.hidden) {
      stopTimer();
    } else {
      startTimer();
    }
  }

  $: totalSeconds = Math.floor(remaining / 1000);
  $: days = Math.floor(totalSeconds / 86400);
  $: hours = Math.floor((totalSeconds % 86400) / 3600);
  $: minutes = Math.floor((totalSeconds % 3600) / 60);
  $: seconds = totalSeconds % 60;
  $: units = [
    { label: 'giorni', value: pad(days) },
    { label: 'ore', value: pad(hours) },
    { label: 'min', value: pad(minutes) },
    { label: 'sec', value: pad(seconds) },
  ] satisfies Unit[];

  onMount(() => {
    if (!browser) return;
    updateRemaining();
    observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
        if (isVisible) {
          startTimer();
        } else {
          stopTimer();
        }
      },
      { rootMargin: '120px 0px' }
    );
    observer.observe(card);
    document.addEventListener('visibilitychange', handleVisibilityChange);
  });

  onDestroy(() => {
    stopTimer();
    observer?.disconnect();
    if (browser) {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    }
  });
</script>

<section bind:this={card} class="countdown-card" aria-label="Countdown preparazione bando AI FVG">
  <div class="countdown-glow" aria-hidden="true"></div>
  <div class="countdown-head">
    <span>In previsione</span>
    <p>apertura giugno 2026</p>
  </div>

  <div class="countdown-copy">
    <h3>{title}</h3>
    <p>{subtitle}</p>
  </div>

  <div class="countdown-grid">
    {#each units as unit}
      <div class="countdown-unit">
        <div class="digit-shell">
          {#key unit.value}
            <strong>{unit.value}</strong>
          {/key}
          <span aria-hidden="true"></span>
        </div>
        <p>{unit.label}</p>
      </div>
    {/each}
  </div>

  <div class="countdown-steps">
    <span>Idea AI chiara</span>
    <span>Investimento stimato</span>
    <span>Progetto pronto</span>
  </div>

  <p class="countdown-footnote">{footnote}</p>
</section>

<style>
  .countdown-card {
    position: relative;
    isolation: isolate;
    overflow: hidden;
    border: 1px solid rgba(214, 72, 126, 0.28);
    border-radius: 1.75rem;
    padding: clamp(1rem, 3vw, 1.35rem);
    background:
      radial-gradient(circle at 18% 20%, rgba(214, 72, 126, 0.28), transparent 16rem),
      radial-gradient(circle at 90% 78%, rgba(6, 182, 212, 0.22), transparent 15rem),
      linear-gradient(145deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.025));
    box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.22);
  }

  .countdown-card::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    background:
      linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.11), transparent);
    transform: translateX(-120%);
    animation: scan 5s cubic-bezier(0.16, 1, 0.3, 1) infinite;
  }

  .countdown-glow {
    position: absolute;
    width: 11rem;
    height: 11rem;
    right: -4rem;
    top: -4rem;
    border-radius: 999px;
    background: #d6487e;
    opacity: 0.24;
    filter: blur(52px);
    animation: pulse-glow 4s ease-in-out infinite;
    pointer-events: none;
  }

  .countdown-head {
    display: flex;
    flex-wrap: wrap;
    gap: 0.65rem;
    align-items: center;
    justify-content: space-between;
  }

  .countdown-head span,
  .countdown-head p {
    min-height: 2rem;
    display: inline-flex;
    align-items: center;
    border-radius: 999px;
    padding: 0.42rem 0.72rem;
    font-size: 0.76rem;
    font-weight: 850;
    line-height: 1;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .countdown-head span {
    color: #ffffff;
    background: linear-gradient(135deg, #d6487e, #06b6d4);
  }

  .countdown-head p {
    color: var(--text-secondary);
    background: rgba(255, 255, 255, 0.07);
  }

  .countdown-copy {
    margin-top: 1.25rem;
  }

  .countdown-copy h3 {
    color: var(--text-primary);
    font-size: clamp(1.55rem, 5vw, 2.45rem);
    font-weight: 900;
    line-height: 0.98;
    letter-spacing: 0;
  }

  .countdown-copy p,
  .countdown-footnote {
    color: var(--text-secondary);
    font-size: 0.98rem;
    line-height: 1.55;
  }

  .countdown-copy p {
    margin-top: 0.75rem;
    max-width: 34rem;
  }

  .countdown-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 0.55rem;
    margin-top: 1.25rem;
  }

  .countdown-unit {
    display: grid;
    gap: 0.45rem;
    min-width: 0;
  }

  .digit-shell {
    position: relative;
    display: grid;
    place-items: center;
    min-height: clamp(4rem, 11vw, 5.7rem);
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 1.1rem;
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.025)),
      rgba(0, 0, 0, 0.16);
  }

  .digit-shell::before {
    content: '';
    position: absolute;
    left: 0.65rem;
    right: 0.65rem;
    top: 50%;
    height: 1px;
    background: rgba(255, 255, 255, 0.11);
  }

  .digit-shell strong {
    color: #ffffff;
    font-size: clamp(1.65rem, 8vw, 3rem);
    font-weight: 950;
    line-height: 1;
    letter-spacing: 0;
    text-shadow: 0 1rem 2.2rem rgba(214, 72, 126, 0.36);
    animation: digit-pop 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  .digit-shell span {
    position: absolute;
    inset: auto 0.75rem 0.55rem;
    height: 0.22rem;
    border-radius: 999px;
    background: linear-gradient(90deg, #70e1c8, #d6487e);
    opacity: 0.8;
  }

  .countdown-unit p {
    color: var(--text-secondary);
    font-size: 0.74rem;
    font-weight: 850;
    line-height: 1;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .countdown-steps {
    display: grid;
    gap: 0.55rem;
    margin-top: 1.25rem;
  }

  .countdown-steps span {
    min-height: 2.35rem;
    display: flex;
    align-items: center;
    border-radius: 999px;
    padding: 0.55rem 0.75rem;
    color: var(--text-secondary);
    background: rgba(255, 255, 255, 0.06);
    font-size: 0.9rem;
    font-weight: 750;
  }

  .countdown-footnote {
    margin-top: 1rem;
    font-size: 0.84rem;
  }

  @keyframes digit-pop {
    from {
      opacity: 0;
      transform: translateY(0.7rem) rotateX(-72deg) scale(0.92);
      filter: blur(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0) rotateX(0) scale(1);
      filter: blur(0);
    }
  }

  @keyframes pulse-glow {
    0%,
    100% {
      transform: scale(0.9);
      opacity: 0.2;
    }
    50% {
      transform: scale(1.08);
      opacity: 0.32;
    }
  }

  @keyframes scan {
    0% {
      transform: translateX(-120%);
    }
    52%,
    100% {
      transform: translateX(120%);
    }
  }

  @media (max-width: 420px) {
    .countdown-grid {
      gap: 0.4rem;
    }

    .countdown-head {
      align-items: flex-start;
    }

    .countdown-head span,
    .countdown-head p {
      width: 100%;
      justify-content: center;
      text-align: center;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .countdown-card::before,
    .countdown-glow,
    .digit-shell strong {
      animation: none;
    }
  }
</style>
