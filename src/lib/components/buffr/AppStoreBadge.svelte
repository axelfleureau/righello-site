<script lang="ts">
  import { storeUrl } from './content';

  export let large = false;
</script>

<a class="badge" class:badge--large={large} href={storeUrl} target="_blank" rel="noopener noreferrer">
  <svg class="badge__logo" viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M17.6 12.7c0-2.1 1.7-3.1 1.8-3.2-1-1.5-2.5-1.7-3-1.7-1.3-.1-2.5.8-3.1.8-.6 0-1.6-.8-2.7-.7-1.4 0-2.7.8-3.4 2.1-1.5 2.6-.4 6.4 1 8.5.7 1 1.6 2.2 2.7 2.1 1.1 0 1.5-.7 2.8-.7s1.7.7 2.8.7c1.2 0 1.9-1 2.6-2.1.8-1.2 1.2-2.4 1.2-2.5 0-.1-2.7-1.1-2.7-3.3zM15.6 6.5c.6-.8 1-1.8.9-2.9-.9 0-2 .6-2.6 1.4-.6.7-1 1.8-.9 2.8 1 .1 2-.5 2.6-1.3z"
    />
  </svg>
  <span class="badge__copy">
    <span>Scarica su</span>
    <strong>App Store</strong>
  </span>
</a>

<style>
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 0.7rem;
    min-height: 3.5rem;
    padding: 0 1.5rem 0 1.25rem;
    border-radius: 0.9rem;
    background: #000;
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.55);
    text-decoration: none;
    transition: transform 0.25s var(--bf-ease), border-color 0.25s, box-shadow 0.25s;
  }

  .badge:hover {
    transform: translateY(-2px);
    border-color: #fff;
    box-shadow: 0 14px 34px -14px rgba(214, 72, 126, 0.7);
  }

  .badge:focus-visible {
    outline: 2px solid var(--bf-pink-text);
    outline-offset: 3px;
  }

  .badge__logo {
    width: 1.7rem;
    height: 1.7rem;
    fill: currentColor;
    flex: none;
  }

  .badge__copy {
    display: grid;
    line-height: 1.05;
    text-align: left;
  }

  .badge__copy span {
    font-size: 0.68rem;
    letter-spacing: 0.02em;
    opacity: 0.85;
  }

  .badge__copy strong {
    font-size: 1.32rem;
    font-weight: 600;
    letter-spacing: -0.01em;
  }

  .badge--large {
    min-height: 4rem;
    padding: 0 1.9rem 0 1.5rem;
  }

  .badge--large .badge__logo {
    width: 2rem;
    height: 2rem;
  }

  .badge--large .badge__copy strong {
    font-size: 1.55rem;
  }
</style>
