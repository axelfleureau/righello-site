<script lang="ts">
  export let highlight: boolean = false;
  export let highlightVariant: 'pink' | 'black' | 'white' = 'pink';
  
  const bgColors = {
    pink: 'bg-righello-pink',
    black: 'bg-black',
    white: 'bg-white'
  };
  
  const textColorsHighlight = {
    pink: 'text-white',
    black: 'text-white',
    white: 'text-black'
  };
</script>

{#if highlight}
  <span 
    class="italic font-medium {bgColors[highlightVariant]} {textColorsHighlight[highlightVariant]} px-1.5 py-0.5"
    style="box-decoration-break: clone; -webkit-box-decoration-break: clone;"
  >
    <slot />
  </span>
{:else}
  <span class="italic font-medium text-righello-pink">
    <slot />
  </span>
{/if}
