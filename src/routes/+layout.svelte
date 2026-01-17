<script lang="ts">
  import '$styles/index.css';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { theme } from '$lib/stores/theme';
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  
  onMount(() => {
    theme.init();
  });
  
  $: if (browser) {
    document.documentElement.setAttribute('data-theme', $theme);
  }
</script>

<svelte:head>
  <meta name="theme-color" content="#050505" />
</svelte:head>

<div data-theme={$theme}>
  <Header />
  <main class="min-h-screen" style="background-color: var(--bg-primary);">
    <slot />
  </main>
  <Footer />
</div>
