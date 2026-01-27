<script lang="ts">
  import { onMount } from 'svelte';
  
  export let position: 'top' | 'bottom' | 'left' | 'right' = 'left';
  export let strength: number = 2;
  export let size: string = '6rem';
  export let divCount: number = 5;
  export let exponential: boolean = false;
  export let zIndex: number = 10;
  export let opacity: number = 1;
  export let curve: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out' = 'linear';
  
  const curveFunctions: Record<string, (p: number) => number> = {
    'linear': (p) => p,
    'ease-in': (p) => p * p,
    'ease-out': (p) => 1 - Math.pow(1 - p, 2),
    'ease-in-out': (p) => p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2
  };
  
  function getGradientDirection(pos: string): string {
    const directions: Record<string, string> = {
      'top': 'to top',
      'bottom': 'to bottom',
      'left': 'to left',
      'right': 'to right'
    };
    return directions[pos] || 'to bottom';
  }
  
  $: isVertical = position === 'top' || position === 'bottom';
  $: isHorizontal = position === 'left' || position === 'right';
  
  $: blurDivs = Array.from({ length: divCount }, (_, i) => {
    const idx = i + 1;
    const increment = 100 / divCount;
    const curveFunc = curveFunctions[curve] || curveFunctions.linear;
    
    let progress = idx / divCount;
    progress = curveFunc(progress);
    
    let blurValue: number;
    if (exponential) {
      blurValue = Math.pow(2, progress * 4) * 0.0625 * strength;
    } else {
      blurValue = 0.0625 * (progress * divCount + 1) * strength;
    }
    
    const p1 = Math.round((increment * idx - increment) * 10) / 10;
    const p2 = Math.round(increment * idx * 10) / 10;
    const p3 = Math.round((increment * idx + increment) * 10) / 10;
    const p4 = Math.round((increment * idx + increment * 2) * 10) / 10;
    
    let gradient = `transparent ${p1}%, black ${p2}%`;
    if (p3 <= 100) gradient += `, black ${p3}%`;
    if (p4 <= 100) gradient += `, transparent ${p4}%`;
    
    const direction = getGradientDirection(position);
    
    return {
      maskImage: `linear-gradient(${direction}, ${gradient})`,
      backdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
      opacity: opacity
    };
  });
  
  $: containerStyle = (() => {
    const style: Record<string, string> = {
      position: 'absolute',
      pointerEvents: 'none',
      zIndex: String(zIndex)
    };
    
    if (isVertical) {
      style.height = size;
      style.width = '100%';
      style[position] = '0';
      style.left = '0';
      style.right = '0';
    } else if (isHorizontal) {
      style.width = size;
      style.height = '100%';
      style[position] = '0';
      style.top = '0';
      style.bottom = '0';
    }
    
    return Object.entries(style).map(([k, v]) => `${k.replace(/([A-Z])/g, '-$1').toLowerCase()}:${v}`).join(';');
  })();
</script>

<div class="gradual-blur" style={containerStyle}>
  {#each blurDivs as div, i (i)}
    <div 
      class="absolute inset-0"
      style="mask-image:{div.maskImage};-webkit-mask-image:{div.maskImage};backdrop-filter:{div.backdropFilter};-webkit-backdrop-filter:{div.backdropFilter};opacity:{div.opacity}"
    ></div>
  {/each}
</div>

<style>
  .gradual-blur {
    isolation: isolate;
  }
</style>
