<script lang="ts">
  export let size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  
  const sizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  };
</script>

<span class="font-black {sizes[size]}">
  <slot />
</span>
