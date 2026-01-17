<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  
  export let testimonials: {
    id: string;
    clientName: string;
    clientRole: string;
    company: string;
    videoSrc?: string;
    thumbnailSrc?: string;
    quote: string;
  }[];
  
  let activeVideo: string | null = null;
  let videoElements: HTMLVideoElement[] = [];
  
  function getVideoRef(id: string): HTMLVideoElement | undefined {
    const index = testimonials.findIndex(t => t.id === id);
    return videoElements[index];
  }
  
  function playVideo(id: string) {
    if (!browser) return;
    const activeRef = activeVideo ? getVideoRef(activeVideo) : null;
    if (activeRef && activeVideo !== id) {
      activeRef.pause();
    }
    activeVideo = id;
    const ref = getVideoRef(id);
    if (ref) {
      ref.play();
    }
  }
  
  function pauseVideo(id: string) {
    if (!browser) return;
    const ref = getVideoRef(id);
    if (ref) {
      ref.pause();
    }
    if (activeVideo === id) {
      activeVideo = null;
    }
  }
  
  function toggleVideo(id: string) {
    if (activeVideo === id) {
      pauseVideo(id);
    } else {
      playVideo(id);
    }
  }
</script>

<div class="video-testimonials">
  <div class="flex gap-4 md:gap-6 px-4 md:px-8 pb-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
    {#each testimonials as testimonial, i}
      <div 
        class="testimonial-reel snap-center flex-shrink-0"
        style="--index: {i}"
      >
        <div class="reel-card relative rounded-3xl overflow-hidden bg-[#0a0a0a] border border-white/10 shadow-2xl group">
          <div class="aspect-[9/16] w-[240px] md:w-[280px] relative overflow-hidden">
            {#if testimonial.videoSrc}
              <video
                bind:this={videoElements[i]}
                src={testimonial.videoSrc}
                poster={testimonial.thumbnailSrc}
                loop
                muted
                playsinline
                class="absolute inset-0 w-full h-full object-cover"
                on:click={() => toggleVideo(testimonial.id)}
              ></video>
            {:else}
              <div class="absolute inset-0 bg-gradient-to-br from-righello-pink/30 via-[#0a0a0a] to-cyan-500/30">
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="text-center px-6">
                    <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-righello-pink to-cyan-500 flex items-center justify-center text-white font-bold text-3xl shadow-lg">
                      {testimonial.clientName.charAt(0)}
                    </div>
                    <p class="text-white/90 text-sm leading-relaxed italic mb-4">"{testimonial.quote}"</p>
                  </div>
                </div>
              </div>
            {/if}
            
            <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30 pointer-events-none"></div>
            
            {#if testimonial.videoSrc}
              <button 
                class="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                on:click={() => toggleVideo(testimonial.id)}
                aria-label={activeVideo === testimonial.id ? 'Pause video' : 'Play video'}
              >
                {#if activeVideo !== testimonial.id}
                  <div class="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                    <svg class="w-8 h-8 text-white ml-1" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                {/if}
              </button>
            {/if}
            
            <div class="absolute bottom-0 left-0 right-0 p-5 z-10">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-righello-pink to-cyan-500 flex items-center justify-center text-white font-bold text-sm ring-2 ring-white/20">
                  {testimonial.clientName.charAt(0)}
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-semibold text-white text-sm truncate">{testimonial.clientName}</p>
                  <p class="text-xs text-white/60 truncate">{testimonial.clientRole}</p>
                </div>
              </div>
              <p class="text-xs text-white/80 font-medium">{testimonial.company}</p>
            </div>
            
            <div class="absolute top-4 right-4 z-10">
              <div class="flex gap-1">
                {#each Array(5) as _}
                  <svg class="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                {/each}
              </div>
            </div>
            
            <div class="absolute top-4 left-4 z-10">
              <div class="px-2 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white/80 flex items-center gap-1">
                <svg class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
                </svg>
                Reel
              </div>
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .testimonial-reel {
    animation: fadeInUp 0.6s ease-out forwards;
    animation-delay: calc(var(--index) * 100ms);
    opacity: 0;
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .reel-card {
    transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s ease;
  }
  
  .reel-card:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 
      0 20px 40px rgba(0, 0, 0, 0.4),
      0 0 60px rgba(214, 72, 126, 0.15);
  }
  
  @media (prefers-reduced-motion: reduce) {
    .testimonial-reel {
      animation: none;
      opacity: 1;
    }
    
    .reel-card:hover {
      transform: none;
    }
  }
</style>
