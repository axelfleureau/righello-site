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
    'Marketing & Social Media',
    'Advertising & Automazione',
    'Sviluppo Web & Software',
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
      answer: 'Rispondiamo entro 72 ore lavorative. Per progetti urgenti, indicalo nel messaggio.',
    },
    {
      question: 'Lavorate solo con aziende del Veneto?',
      answer: 'No, la nostra base è nel Nord Italia ma lavoriamo con clienti in tutta Europa. Ci spostiamo anche all\'estero quando serve. La sede a Mestre è un vantaggio per chi è in zona.',
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
  
  
  let errorMessage = '';

  async function handleSubmit(e: Event) {
    e.preventDefault();
    isSubmitting = true;
    errorMessage = '';

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        submitted = true;
      } else {
        errorMessage = result.error || 'Si è verificato un errore. Riprova più tardi.';
      }
    } catch {
      errorMessage = 'Errore di connessione. Controlla la tua rete e riprova.';
    } finally {
      isSubmitting = false;
    }
  }
</script>

<svelte:head>
  <title>Contatti | Righello – Agenzia Marketing & Sviluppo Web</title>
  <meta name="description" content="Contattaci per una consulenza gratuita su marketing, sviluppo web o automazione. Risposta in 72 ore. hello@wearerighello.com | Mestre, Venezia." />
  <meta property="og:title" content="Contatti | Righello – Agenzia Marketing & Sviluppo Web" />
  <meta property="og:description" content="Contattaci per una consulenza gratuita su marketing, sviluppo web o automazione. Risposta in 72 ore. hello@wearerighello.com | Mestre, Venezia." />
  <meta property="og:image" content="https://www.wearerighello.com/og.png" />
  <meta property="og:url" content="https://www.wearerighello.com/contatti" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="it_IT" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Contatti | Righello – Agenzia Marketing & Sviluppo Web" />
  <meta name="twitter:description" content="Contattaci per una consulenza gratuita su marketing, sviluppo web o automazione. Risposta in 72 ore. hello@wearerighello.com | Mestre, Venezia." />
  <meta name="twitter:image" content="https://www.wearerighello.com/og.png" />
</svelte:head>

<section id="contatti-hero" class="pt-24 md:pt-32 pb-12 md:pb-20">
  <div class="section-container">
    <RevealOnScroll animation="fly-up">
      <div class="section-header text-center">
        <p class="section-subtitle">Contattaci</p>
        <h1 class="section-title mb-4">
          <span class="block">Parliamo del Tuo</span>
          <span class="block"><Highlight variant="pink">Prossimo Progetto</Highlight></span>
        </h1>
        <p class="text-lg md:text-xl max-w-2xl mx-auto" style="color: var(--text-secondary);">
          Risposta garantita in <TechWord>72 ore</TechWord>. Preventivo gratuito e personalizzato.
        </p>
      </div>
    </RevealOnScroll>
  </div>
</section>

<section id="form" class="pb-16 md:pb-24">
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
                  Ti risponderemo entro 72 ore.
                </p>
                <p class="text-base mb-8" style="color: var(--text-secondary);">
                  Nel frattempo, visita il nostro sito per scoprire i nostri progetti.
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
                
                {#if errorMessage}
                  <div class="error-alert" role="alert">
                    <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{errorMessage}</span>
                  </div>
                {/if}

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

<SectionDivider fromColor="var(--bg-primary)" toColor="var(--direct-section-bg)" />

<section class="section-padding direct-section">
  <div class="section-container text-center">
    <ScrollReveal animation="fade-up">
      <h2 class="section-title mb-4">Preferisci Scriverci Direttamente?</h2>
    </ScrollReveal>
    <ScrollReveal animation="fade-up" delay={100}>
      <p class="text-lg direct-section-text mb-8">
        Nessun problema. Mandaci una mail e ti risponderemo entro 72 ore.
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

  .error-alert {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.875rem 1rem;
    border-radius: 0.75rem;
    background-color: rgba(239, 68, 68, 0.08);
    border: 1px solid rgba(239, 68, 68, 0.2);
    color: #ef4444;
    font-size: 0.9rem;
    line-height: 1.4;
  }

  .direct-section {
    --direct-section-bg: #000000;
    background-color: var(--direct-section-bg);
    color: #ffffff;
  }

  :global([data-theme="light"]) .direct-section {
    --direct-section-bg: #f1f5f9;
    background-color: var(--direct-section-bg);
    color: var(--text-primary);
  }

  .direct-section-text {
    color: #9ca3af;
  }

  :global([data-theme="light"]) .direct-section-text {
    color: #64748b;
  }
</style>
