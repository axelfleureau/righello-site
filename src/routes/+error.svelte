<script lang="ts">
  import { page } from '$app/stores';
</script>

<svelte:head>
  <title>Errore {$page.status} - Righello</title>
</svelte:head>

<section class="min-h-[60vh] flex items-center justify-center py-20">
  <div class="section-container text-center">
    <h1 class="text-8xl font-bold text-righello-pink mb-6">{$page.status}</h1>
    {#if $page.status === 404}
      <p class="text-2xl text-gray-600 mb-8">Pagina non trovata</p>
      <p class="text-gray-500 mb-8">La pagina che stai cercando non esiste o è stata spostata.</p>
    {:else}
      <p class="text-2xl text-gray-600 mb-8">Si è verificato un errore</p>
      <p class="text-gray-500 mb-8">Ci scusiamo per l'inconveniente.</p>
    {/if}
    <a href="/" class="btn-primary">Torna alla home</a>
  </div>
</section>
