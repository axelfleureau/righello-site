<script lang="ts">
  import { slide } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  
  export let title = "Domande frequenti";
  export let subtitle = "FAQ";
  
  const faqs = [
    {
      question: "Quanto costa lavorare con Righello?",
      answer: "Ogni progetto è personalizzato sulle tue esigenze. Offriamo pacchetti a partire da €2.000/mese per la gestione social, mentre per progetti di advertising e sviluppo web prepariamo preventivi su misura. Prenota una call gratuita per discutere del tuo budget e obiettivi."
    },
    {
      question: "Quali risultati posso aspettarmi?",
      answer: "I risultati variano in base al settore e agli obiettivi, ma i nostri clienti vedono in media un aumento del 340% dell'engagement e un ROAS di 8.5x sulle campagne advertising. Forniamo report mensili dettagliati con KPI trasparenti."
    },
    {
      question: "Quanto tempo ci vuole per vedere i primi risultati?",
      answer: "Per i social media, i primi miglioramenti sono visibili entro 2-4 settimane. Per le campagne advertising, ottimizziamo continuamente e i risultati significativi arrivano in 4-8 settimane. I progetti web richiedono 4-12 settimane a seconda della complessità."
    },
    {
      question: "Lavorate con aziende di ogni dimensione?",
      answer: "Sì, lavoriamo con startup, PMI e grandi aziende. Adattiamo strategie e budget alle esigenze specifiche di ogni cliente. La cosa importante per noi è la volontà di crescere e investire nel digitale."
    },
    {
      question: "Come funziona il processo di onboarding?",
      answer: "Iniziamo con una call conoscitiva gratuita, poi analizziamo la tua situazione attuale. Prepariamo una strategia personalizzata e, una volta approvata, partiamo con l'implementazione. Avrai un account manager dedicato come punto di riferimento."
    },
    {
      question: "Posso disdire in qualsiasi momento?",
      answer: "Sì, non abbiamo vincoli contrattuali a lungo termine. Chiediamo solo un preavviso di 30 giorni. La nostra filosofia è che i clienti restano perché sono soddisfatti, non perché sono vincolati."
    }
  ];
  
  let openIndex: number | null = null;
  
  function toggle(index: number) {
    openIndex = openIndex === index ? null : index;
  }
</script>

<section class="faq-section">
  <div class="section-container">
    <div class="text-center mb-16">
      <p class="text-sm uppercase tracking-[0.2em] text-righello-pink mb-4 font-medium">
        {subtitle}
      </p>
      <h2 class="heading-lg">
        {title.split(' ').slice(0, -1).join(' ')} <span class="gradient-text">{title.split(' ').slice(-1)}</span>
      </h2>
    </div>
    
    <div class="faq-list">
      {#each faqs as faq, i}
        <div class="faq-item" class:open={openIndex === i}>
          <button 
            class="faq-question"
            on:click={() => toggle(i)}
            aria-expanded={openIndex === i}
            aria-controls="faq-answer-{i}"
          >
            <span class="question-text">{faq.question}</span>
            <span class="question-icon">
              <svg 
                class="w-5 h-5 transition-transform duration-300" 
                class:rotate-180={openIndex === i}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </button>
          
          {#if openIndex === i}
            <div 
              id="faq-answer-{i}"
              class="faq-answer"
              transition:slide={{ duration: 300, easing: cubicOut }}
            >
              <p>{faq.answer}</p>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .faq-section {
    padding: 6rem 0;
    position: relative;
  }
  
  .faq-list {
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .faq-item {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 1rem;
    overflow: hidden;
    transition: all 0.3s ease;
  }
  
  :global([data-theme="light"]) .faq-item {
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid var(--border-color);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  }
  
  .faq-item:hover {
    border-color: rgba(214, 72, 126, 0.3);
  }
  
  .faq-item.open {
    border-color: rgba(214, 72, 126, 0.5);
    background: rgba(214, 72, 126, 0.05);
  }
  
  .faq-question {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1.5rem;
    text-align: left;
    cursor: pointer;
    background: transparent;
    border: none;
    color: var(--text-primary);
    font-size: 1.0625rem;
    font-weight: 500;
    transition: all 0.3s ease;
  }
  
  .faq-question:hover {
    color: #D6487E;
  }
  
  .question-text {
    flex: 1;
  }
  
  .question-icon {
    flex-shrink: 0;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #D6487E;
    transition: all 0.3s ease;
  }
  
  :global([data-theme="light"]) .question-icon {
    background: rgba(214, 72, 126, 0.1);
  }
  
  .faq-item.open .question-icon {
    background: linear-gradient(135deg, #D6487E, #06B6D4);
    color: white;
  }
  
  .faq-answer {
    padding: 0 1.5rem 1.5rem;
  }
  
  .faq-answer p {
    color: var(--text-secondary);
    line-height: 1.7;
    font-size: 0.9375rem;
  }
</style>
