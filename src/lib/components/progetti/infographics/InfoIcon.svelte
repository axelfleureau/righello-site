<script lang="ts">
  import type { InfoIconName } from '$lib/data/infographics';

  export let name: InfoIconName;
</script>

<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
  {#if name === 'camera'}
    <rect x="3" y="7" width="12" height="10" rx="2" /><path d="M15 11l6-3v8l-6-3z" />
  {:else if name === 'users'}
    <circle cx="9" cy="8" r="3" /><path d="M3 19c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" /><circle cx="17" cy="9" r="2.2" /><path d="M17 14c2.4 0 4 1.6 4 4" />
  {:else if name === 'flag'}
    <path d="M6 21V4" /><path d="M6 4h11l-2.5 4L17 12H6" />
  {:else if name === 'megaphone'}
    <path d="M4 10v4h3l8 4V6L7 10H4z" /><path d="M18.5 9a4 4 0 010 6" />
  {:else if name === 'engine'}
    <circle cx="12" cy="12" r="3.2" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
  {:else if name === 'scoreboard'}
    <rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 15h18M7 17.2h4" />
  {:else if name === 'replay'}
    <path d="M4 12a8 8 0 108-8H8" /><path d="M10 1.5L7.5 4 10 6.5" /><path d="M10.5 9.5v5l4-2.5z" />
  {:else if name === 'tv'}
    <rect x="3" y="5" width="18" height="12" rx="2" /><path d="M8 21h8M12 17v4" />
  {:else if name === 'shield'}
    <path d="M12 3l7 2.5V11c0 4.5-3 8-7 10-4-2-7-5.5-7-10V5.5z" />
  {:else if name === 'doc'}
    <path d="M7 3h7l4 4v14H7z" /><path d="M14 3v4h4M10 12h5M10 16h5" />
  {:else if name === 'chat'}
    <path d="M4 5h16v11H9l-5 4z" />
  {:else if name === 'pin'}
    <path d="M12 21s-6-5.5-6-11a6 6 0 0112 0c0 5.5-6 11-6 11z" /><circle cx="12" cy="10" r="2.2" />
  {:else if name === 'check'}
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  {:else if name === 'pen'}
    <path d="M4 20l1-4L16 5l3 3L8 19z" /><path d="M14 7l3 3" />
  {:else if name === 'globe'}
    <circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
  {:else if name === 'alert'}
    <path d="M12 3l10 18H2z" /><path d="M12 10v5M12 18v.5" />
  {:else if name === 'lock'}
    <rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 018 0v3" />
  {:else if name === 'search'}
    <circle cx="11" cy="11" r="6.5" /><path d="M16 16l5 5" />
  {/if}
</svg>

<style>
  .ic {
    display: block;
    width: 100%;
    height: 100%;
  }
</style>
