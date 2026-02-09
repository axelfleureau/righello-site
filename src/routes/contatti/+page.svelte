<script lang="ts">
  import ScrollReveal from '$lib/components/ScrollReveal.svelte';
  import Highlight from '$lib/components/Highlight.svelte';
  import TechWord from '$lib/components/TechWord.svelte';
  import SectionDivider from '$lib/components/SectionDivider.svelte';
  import RevealOnScroll from '$lib/components/RevealOnScroll.svelte';
  import MagneticButton from '$lib/components/MagneticButton.svelte';
  
  let formData = {
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    message: '',
  };
  
  let isSubmitting = false;
  let submitted = false;
  
  const services = [
    'Content & Social Media',
    'Advertising & Performance',
    'Digital Experience',
    'Progetto Completo',
    'Altro',
  ];
  
  const budgets = [
    'Meno di 5.000€',
    '5.000€ - 10.000€',
    '10.000€ - 25.000€',
    'Oltre 25.000€',
    'Da definire',
  ];
  
  const faqs = [
    {
      question: 'Quanto tempo ci vuole per una risposta?',
      answer: 'Rispondiamo entro 24 ore lavorative. Per progetti urgenti, indicalo nel messaggio.',
    },
    {
      question: 'Lavorate solo con aziende del Veneto?',
      answer: 'No, lavoriamo con clienti in tutta Italia e all\'estero. La sede a Mestre e un vantaggio per chi e in zona.',
    },
    {
      question: 'Posso prenotare una call conoscitiva?',
      answer: 'Certamente. Compila il form e proporremo alcune date disponibili nella risposta.',
    },
    {
      question: 'Offrite preventivi gratuiti?',
      answer: 'Si, ogni preventivo e gratuito e personalizzato. Includiamo sempre timeline e deliverable chiari.',
    },
  ];
  
  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://instagram.com/wearerighello',
      icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/company/righello',
      icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
    },
    {
      name: 'TikTok',
      url: 'https://tiktok.com/@wearerighello',
      icon: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z',
    },
  ];
  
  async function handleSubmit(e: Event) {
    e.preventDefault();
    isSubmitting = true;
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    submitted = true;
    isSubmitting = false;
  }
</script>

<svelte:head>
  <title>Contatti - Righello | Growth Agency Venezia</title>
  <meta name="description" content="Contatta Righello per il tuo prossimo progetto. Risposta garantita in 24 ore. Sede: Via Pio X 21, Mestre - Venezia." />
  <meta property="og:title" content="Contatti - Righello Growth Agency" />
  <meta property="og:description" content="Contatta Righello per il tuo prossimo progetto. Risposta garantita in 24 ore." />
  <meta property="og:image" content="https://www.wearerighello.com/og.png" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<section class="pt-24 md:pt-32 pb-12 md:pb-20">
  <div class="section-container">
    <RevealOnScroll animation="fly-up">
      <div class="section-header text-center">
        <p class="section-subtitle">Contattaci</p>
        <h1 class="section-title mb-4">
          <span class="block">Parliamo del Tuo</span>
          <span class="block"><Highlight variant="pink">Prossimo Progetto</Highlight></span>
        </h1>
        <p class="text-lg md:text-xl max-w-2xl mx-auto" style="color: var(--text-secondary);">
          Risposta garantita in <TechWord>24 ore</TechWord>. Preventivo gratuito e personalizzato in 48 ore.
        </p>
      </div>
    </RevealOnScroll>
  </div>
</section>

<section class="pb-16 md:pb-24">
  <div class="section-container">
    <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-stretch">
      <div class="lg:col-span-2 space-y-8">
        <ScrollReveal animation="fade-up">
          <div class="contact-info-card p-6 rounded-2xl" style="background-color: var(--bg-secondary); border: 1px solid var(--border-color);">
            <h3 class="text-xl font-bold mb-6">Informazioni di Contatto</h3>
            
            <div class="space-y-6">
              <div class="flex items-start gap-4 group">
                <div class="contact-icon">
                  <svg class="w-6 h-6 text-righello-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 class="font-semibold mb-1">Email</h4>
                  <a href="mailto:hello@wearerighello.com" class="text-lg hover:text-righello-pink transition-colors" style="color: var(--text-secondary);">
                    hello@wearerighello.com
                  </a>
                </div>
              </div>
              
              <div class="flex items-start gap-4 group">
                <div class="contact-icon">
                  <svg class="w-6 h-6 text-righello-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 class="font-semibold mb-1">Sede Operativa</h4>
                  <p class="text-lg" style="color: var(--text-secondary);">
                    Via Pio X 21<br />
                    Mestre - Venezia (VE)
                  </p>
                </div>
              </div>
              
              <div class="flex items-start gap-4 group">
                <div class="contact-icon">
                  <svg class="w-6 h-6 text-righello-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 class="font-semibold mb-1">Orari</h4>
                  <p class="text-lg" style="color: var(--text-secondary);">
                    Lun - Ven: 9:00 - 18:00
                  </p>
                </div>
              </div>
            </div>
            
            <div class="mt-8 pt-6 border-t" style="border-color: var(--border-color);">
              <h4 class="font-semibold mb-4">Seguici</h4>
              <div class="flex gap-4">
                {#each socialLinks as social}
                  <a 
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="social-link"
                    aria-label={social.name}
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.icon} />
                    </svg>
                  </a>
                {/each}
              </div>
            </div>
          </div>
        </ScrollReveal>
        
        <ScrollReveal animation="fade-up" delay={100}>
          <div class="faq-card p-6 rounded-2xl" style="background-color: var(--bg-secondary); border: 1px solid var(--border-color);">
            <h3 class="text-xl font-bold mb-6">Domande Frequenti</h3>
            
            <div class="space-y-4">
              {#each faqs as faq, i}
                <div class="faq-item pb-4 {i < faqs.length - 1 ? 'border-b' : ''}" style="border-color: var(--border-color);">
                  <h4 class="font-semibold mb-2 text-base">{faq.question}</h4>
                  <p class="text-base" style="color: var(--text-secondary);">{faq.answer}</p>
                </div>
              {/each}
            </div>
          </div>
        </ScrollReveal>
      </div>
      
      <div class="lg:col-span-3 form-column">
        <ScrollReveal animation="fade-up" delay={100}>
          <div class="form-card rounded-2xl md:rounded-3xl p-6 md:p-10" style="background-color: var(--bg-secondary); border: 1px solid var(--border-color);">
            {#if submitted}
              <div class="text-center py-12">
                <div class="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                  <svg class="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 class="text-2xl font-bold mb-4">Messaggio Inviato!</h3>
                <p class="text-lg mb-2" style="color: var(--text-secondary);">
                  Ti risponderemo entro 24 ore.
                </p>
                <p class="text-base mb-8" style="color: var(--text-secondary);">
                  Nel frattempo, seguici sui social per restare aggiornato.
                </p>
                <button 
                  class="btn-secondary"
                  on:click={() => { submitted = false; formData = { name: '', email: '', company: '', service: '', budget: '', message: '' }; }}
                >
                  Invia un altro messaggio
                </button>
              </div>
            {:else}
              <div class="mb-8">
                <h3 class="text-2xl font-bold mb-2">Raccontaci il Tuo Progetto</h3>
                <p class="text-base" style="color: var(--text-secondary);">
                  Compila il form e ti contatteremo per una prima call conoscitiva.
                </p>
              </div>
              
              <form on:submit={handleSubmit} class="space-y-6">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div class="form-group">
                    <label for="name" class="form-label">Nome *</label>
                    <input 
                      type="text" 
                      id="name" 
                      bind:value={formData.name}
                      required
                      class="form-input"
                      placeholder="Il tuo nome"
                    />
                  </div>
                  
                  <div class="form-group">
                    <label for="email" class="form-label">Email *</label>
                    <input 
                      type="email" 
                      id="email" 
                      bind:value={formData.email}
                      required
                      class="form-input"
                      placeholder="la.tua@email.com"
                    />
                  </div>
                </div>
                
                <div class="form-group">
                  <label for="company" class="form-label">Azienda</label>
                  <input 
                    type="text" 
                    id="company" 
                    bind:value={formData.company}
                    class="form-input"
                    placeholder="Nome della tua azienda"
                  />
                </div>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div class="form-group">
                    <label for="service" class="form-label">Servizio di interesse</label>
                    <select 
                      id="service" 
                      bind:value={formData.service}
                      class="form-input form-select"
                    >
                      <option value="">Seleziona un servizio</option>
                      {#each services as service}
                        <option value={service}>{service}</option>
                      {/each}
                    </select>
                  </div>
                  
                  <div class="form-group">
                    <label for="budget" class="form-label">Budget indicativo</label>
                    <select 
                      id="budget" 
                      bind:value={formData.budget}
                      class="form-input form-select"
                    >
                      <option value="">Seleziona un range</option>
                      {#each budgets as budget}
                        <option value={budget}>{budget}</option>
                      {/each}
                    </select>
                  </div>
                </div>
                
                <div class="form-group">
                  <label for="message" class="form-label">Messaggio *</label>
                  <textarea 
                    id="message" 
                    bind:value={formData.message}
                    required
                    rows="5"
                    class="form-input form-textarea"
                    placeholder="Raccontaci del tuo progetto: obiettivi, timeline, sfide..."
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  class="btn-primary w-full group submit-btn"
                  disabled={isSubmitting}
                >
                  {#if isSubmitting}
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Invio in corso...
                  {:else}
                    Invia Messaggio
                    <svg class="w-5 h-5 ml-2 inline-block transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  {/if}
                </button>
                
                <p class="text-sm text-center" style="color: var(--text-secondary);">
                  Inviando questo form accetti la nostra privacy policy.
                </p>
              </form>
            {/if}
          </div>
        </ScrollReveal>
      </div>
    </div>
  </div>
</section>

<SectionDivider fromColor="var(--bg-primary)" toColor="black" />

<section class="section-padding bg-black text-white">
  <div class="section-container text-center">
    <ScrollReveal animation="fade-up">
      <h2 class="text-2xl md:text-3xl font-bold mb-4">Preferisci Scriverci Direttamente?</h2>
    </ScrollReveal>
    <ScrollReveal animation="fade-up" delay={100}>
      <p class="text-lg text-gray-400 mb-8">
        Nessun problema. Mandaci una mail e ti risponderemo entro 24 ore.
      </p>
    </ScrollReveal>
    <ScrollReveal animation="fade-up" delay={200}>
      <MagneticButton href="mailto:hello@wearerighello.com" variant="primary">
        hello@wearerighello.com
        <svg class="w-5 h-5 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </MagneticButton>
    </ScrollReveal>
  </div>
</section>

<style>
  .contact-icon {
    width: 48px;
    height: 48px;
    min-width: 48px;
    border-radius: 50%;
    background-color: rgba(214, 72, 126, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
  }
  
  .group:hover .contact-icon {
    background-color: var(--righello-pink);
    transform: scale(1.1);
  }
  
  .group:hover .contact-icon svg {
    color: white;
  }
  
  .social-link {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background-color: rgba(214, 72, 126, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--righello-pink);
    transition: all 0.3s ease;
  }
  
  .social-link:hover {
    background-color: var(--righello-pink);
    color: white;
    transform: scale(1.1);
  }
  
  .form-label {
    display: block;
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
    transition: color 0.3s ease;
  }
  
  .form-group:focus-within .form-label {
    color: var(--righello-pink);
  }
  
  .form-input {
    width: 100%;
    padding: 0.875rem 1rem;
    border-radius: 0.75rem;
    border: 1px solid var(--border-color);
    background-color: var(--bg-primary);
    color: var(--text-primary);
    font-size: 1rem;
    outline: none;
    transition: all 0.3s ease;
  }
  
  .form-input:focus {
    border-color: var(--righello-pink);
    box-shadow: 0 0 0 3px rgba(214, 72, 126, 0.1);
  }
  
  .form-input::placeholder {
    color: var(--text-secondary);
    opacity: 0.6;
  }
  
  .form-select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23888'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    background-size: 1.25rem;
    padding-right: 3rem;
  }
  
  .form-textarea {
    resize: none;
    min-height: 120px;
  }
  
  .submit-btn {
    min-height: 52px;
    font-size: 1rem;
    padding: 0.875rem 1.5rem;
  }
  
  .submit-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .form-column {
    display: flex;
    flex-direction: column;
  }

  .form-column :global(> div) {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .form-column :global(.form-card) {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .form-column :global(.form-card form) {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .form-column :global(.form-card .form-textarea) {
    flex: 1;
    min-height: 120px;
  }
</style>
