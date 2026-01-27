<script lang="ts">
  import ScrollReveal from '$lib/components/ScrollReveal.svelte';
  import Highlight from '$lib/components/Highlight.svelte';
  import TechWord from '$lib/components/TechWord.svelte';
  import SectionDivider from '$lib/components/SectionDivider.svelte';
  import RevealOnScroll from '$lib/components/RevealOnScroll.svelte';
  
  let formData = {
    name: '',
    email: '',
    company: '',
    message: '',
  };
  
  let isSubmitting = false;
  let submitted = false;
  
  async function handleSubmit(e: Event) {
    e.preventDefault();
    isSubmitting = true;
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    submitted = true;
    isSubmitting = false;
  }
</script>

<svelte:head>
  <title>Contatti - Righello</title>
  <meta name="description" content="Contatta Righello Creative Lab per il tuo prossimo progetto." />
</svelte:head>

<section class="section-padding">
  <div class="section-container">
    <RevealOnScroll animation="fly-up">
      <div class="section-header">
        <p class="section-subtitle">Contattaci</p>
        <h1 class="section-title"><Highlight variant="pink">PARLIAMONE</Highlight></h1>
        <p class="text-lg md:text-xl text-[var(--text-secondary)]">
          Hai un <TechWord>progetto</TechWord> in mente? Compila il form e ti risponderemo il prima possibile.
        </p>
      </div>
    </RevealOnScroll>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start w-full">
      <div class="overflow-hidden">
        
        <div class="space-y-6">
          <ScrollReveal animation="fade-left" delay={200}>
            <div class="flex items-start gap-4 group cursor-pointer">
              <div class="w-12 h-12 rounded-full bg-righello-pink/10 flex items-center justify-center flex-shrink-0 group-hover:bg-righello-pink group-hover:scale-110 transition-all duration-300">
                <svg class="w-6 h-6 text-righello-pink group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold mb-1">Email</h3>
                <a href="mailto:hello@wearerighello.com" class="text-[var(--text-secondary)] hover:text-righello-pink transition-colors">
                  hello@wearerighello.com
                </a>
              </div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal animation="fade-left" delay={300}>
            <div class="flex items-start gap-4 group cursor-pointer">
              <div class="w-12 h-12 rounded-full bg-righello-pink/10 flex items-center justify-center flex-shrink-0 group-hover:bg-righello-pink group-hover:scale-110 transition-all duration-300">
                <svg class="w-6 h-6 text-righello-pink group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold mb-1">Sede</h3>
                <p class="text-[var(--text-secondary)]">Italia</p>
              </div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal animation="fade-left" delay={400}>
            <div class="flex items-start gap-4 group cursor-pointer">
              <div class="w-12 h-12 rounded-full bg-righello-pink/10 flex items-center justify-center flex-shrink-0 group-hover:bg-righello-pink group-hover:scale-110 transition-all duration-300">
                <svg class="w-6 h-6 text-righello-pink group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold mb-1">Orari</h3>
                <p class="text-[var(--text-secondary)]">Lun - Ven: 9:00 - 18:00</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
      
      <ScrollReveal animation="fade-right" delay={200}>
        <div class="rounded-2xl md:rounded-3xl p-6 md:p-10 hover:shadow-xl transition-shadow duration-500 relative z-10" style="background-color: var(--bg-secondary); border: 1px solid var(--border-color);">
          {#if submitted}
            <div class="text-center py-12">
              <div class="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6 animate-bounce">
                <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 class="text-2xl font-semibold mb-4">Messaggio inviato!</h3>
              <p class="text-[var(--text-secondary)] mb-8">Ti risponderemo il prima possibile.</p>
              <button 
                class="btn-secondary"
                on:click={() => { submitted = false; formData = { name: '', email: '', company: '', message: '' }; }}
              >
                Invia un altro messaggio
              </button>
            </div>
          {:else}
            <form on:submit={handleSubmit} class="space-y-6">
              <div class="group">
                <label for="name" class="block text-sm font-medium mb-2 group-focus-within:text-righello-pink transition-colors">Nome *</label>
                <input 
                  type="text" 
                  id="name" 
                  bind:value={formData.name}
                  required
                  class="w-full px-4 py-3 rounded-xl border outline-none transition-all duration-300 focus:border-righello-pink focus:ring-2 focus:ring-righello-pink/20"
                  style="background-color: var(--bg-primary); border-color: var(--border-color); color: var(--text-primary);"
                  placeholder="Il tuo nome"
                />
              </div>
              
              <div class="group">
                <label for="email" class="block text-sm font-medium mb-2 group-focus-within:text-righello-pink transition-colors">Email *</label>
                <input 
                  type="email" 
                  id="email" 
                  bind:value={formData.email}
                  required
                  class="w-full px-4 py-3 rounded-xl border outline-none transition-all duration-300 focus:border-righello-pink focus:ring-2 focus:ring-righello-pink/20"
                  style="background-color: var(--bg-primary); border-color: var(--border-color); color: var(--text-primary);"
                  placeholder="la.tua@email.com"
                />
              </div>
              
              <div class="group">
                <label for="company" class="block text-sm font-medium mb-2 group-focus-within:text-righello-pink transition-colors">Azienda</label>
                <input 
                  type="text" 
                  id="company" 
                  bind:value={formData.company}
                  class="w-full px-4 py-3 rounded-xl border outline-none transition-all duration-300 focus:border-righello-pink focus:ring-2 focus:ring-righello-pink/20"
                  style="background-color: var(--bg-primary); border-color: var(--border-color); color: var(--text-primary);"
                  placeholder="Nome della tua azienda"
                />
              </div>
              
              <div class="group">
                <label for="message" class="block text-sm font-medium mb-2 group-focus-within:text-righello-pink transition-colors">Messaggio *</label>
                <textarea 
                  id="message" 
                  bind:value={formData.message}
                  required
                  rows="5"
                  class="w-full px-4 py-3 rounded-xl border outline-none transition-all duration-300 resize-none focus:border-righello-pink focus:ring-2 focus:ring-righello-pink/20"
                  style="background-color: var(--bg-primary); border-color: var(--border-color); color: var(--text-primary);"
                  placeholder="Raccontaci del tuo progetto..."
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                class="btn-primary w-full group"
                disabled={isSubmitting}
              >
                {#if isSubmitting}
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Invio in corso...
                {:else}
                  Invia messaggio
                  <svg class="w-5 h-5 ml-2 inline-block transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                {/if}
              </button>
            </form>
          {/if}
        </div>
      </ScrollReveal>
    </div>
  </div>
</section>

<SectionDivider fromColor="var(--bg-primary)" toColor="var(--bg-secondary)" />
