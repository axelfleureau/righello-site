<script lang="ts">
  export let title: string;
  export let client: string;
  export let image: string = '';
  export let pesoTags: Array<{type: 'P' | 'E' | 'S' | 'O', label: string}> = [];
  export let result: string = '';
  export let href: string = '#';
  export let span: string = '2';
  
  const tagColors = {
    P: '#D6487E',
    E: '#06B6D4',
    S: '#A855F7',
    O: '#22C55E'
  };
  
  const tagLabels = {
    P: 'Paid',
    E: 'Earned',
    S: 'Shared',
    O: 'Owned'
  };
</script>

<a 
  class="case-study-card"
  style="--span: {span};"
  {href}
>
  <div class="card-image">
    {#if image}
      <img src={image} alt={title} loading="lazy" />
    {:else}
      <div class="placeholder-image">
        <span>{client.charAt(0)}</span>
      </div>
    {/if}
    <div class="image-overlay"></div>
  </div>
  
  <div class="card-content">
    <div class="peso-tags">
      {#each pesoTags as tag}
        <span 
          class="peso-chip"
          style="--chip-color: {tagColors[tag.type]};"
        >
          {tagLabels[tag.type]}
        </span>
      {/each}
    </div>
    
    <h3 class="card-title">{title}</h3>
    <p class="card-client">{client}</p>
    
    {#if result}
      <div class="card-result">
        <span class="result-value">{result}</span>
      </div>
    {/if}
  </div>
  
  <div class="card-arrow">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  </div>
</a>

<style>
  .case-study-card {
    position: relative;
    grid-column: span var(--span);
    border-radius: 20px;
    overflow: hidden;
    background: rgba(10, 10, 10, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    flex-direction: column;
    text-decoration: none;
    transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
  }
  
  @media (max-width: 639px) {
    .case-study-card {
      grid-column: span 1;
    }
  }
  
  .case-study-card:hover {
    border-color: rgba(214, 72, 126, 0.5);
    transform: translateY(-4px);
    box-shadow: 0 20px 40px -10px rgba(214, 72, 126, 0.2);
  }
  
  .card-image {
    position: relative;
    height: 160px;
    overflow: hidden;
  }
  
  .card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s;
  }
  
  .case-study-card:hover .card-image img {
    transform: scale(1.05);
  }
  
  .placeholder-image {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #D6487E, #06B6D4);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .placeholder-image span {
    font-size: 3rem;
    font-weight: 800;
    color: white;
    opacity: 0.5;
  }
  
  .image-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(5, 5, 5, 1) 0%, transparent 60%);
  }
  
  .card-content {
    padding: 1.25rem;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  .peso-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
  }
  
  .peso-chip {
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    background: color-mix(in srgb, var(--chip-color) 20%, transparent);
    color: var(--chip-color);
    border: 1px solid color-mix(in srgb, var(--chip-color) 40%, transparent);
  }
  
  .card-title {
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--text-primary, #fff);
    margin: 0 0 0.25rem 0;
    line-height: 1.3;
  }
  
  .card-client {
    font-size: 0.875rem;
    color: var(--text-secondary, #a1a1aa);
    margin: 0;
  }
  
  .card-result {
    margin-top: auto;
    padding-top: 1rem;
  }
  
  .result-value {
    font-size: 1.5rem;
    font-weight: 800;
    background: linear-gradient(135deg, #D6487E, #06B6D4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .card-arrow {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 32px;
    height: 32px;
    padding: 6px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    opacity: 0;
    transform: translate(-4px, 4px);
    transition: opacity 0.3s, transform 0.3s;
  }
  
  .case-study-card:hover .card-arrow {
    opacity: 1;
    transform: translate(0, 0);
  }
  
  :global([data-theme="light"]) .case-study-card {
    background: rgba(248, 250, 252, 0.9);
    border-color: rgba(0, 0, 0, 0.1);
  }
  
  :global([data-theme="light"]) .image-overlay {
    background: linear-gradient(to top, rgba(248, 250, 252, 1) 0%, transparent 60%);
  }
  
  :global([data-theme="light"]) .card-title {
    color: #0f172a;
  }
  
  :global([data-theme="light"]) .card-client {
    color: #475569;
  }
  
  :global([data-theme="light"]) .card-arrow {
    background: rgba(0, 0, 0, 0.1);
    color: #0f172a;
  }
</style>
