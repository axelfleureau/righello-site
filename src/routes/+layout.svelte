<script lang="ts">
  import '$styles/index.css';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { theme } from '$lib/stores/theme';
  import { onMount } from 'svelte';
  
  onMount(() => {
    theme.init();
  });
</script>

<Header />
<main>
  <slot />
</main>
<Footer />
