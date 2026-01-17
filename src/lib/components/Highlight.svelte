<script lang="ts">
  export let variant: 'pink' | 'black' | 'white' = 'pink';
  export let inline: boolean = true;
  
  const bgColors = {
    pink: 'bg-righello-pink',
    black: 'bg-black',
    white: 'bg-white'
  };
  
  const textColors = {
    pink: 'text-white',
    black: 'text-white',
    white: 'text-black'
  };
</script>

<span 
  class="highlight-box {bgColors[variant]} {textColors[variant]} px-2 py-0.5 font-black {inline ? 'inline' : 'inline-block'}"
>
  <slot />
</span>

<style>
  .highlight-box {
    display: inline;
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
  }
</style>
