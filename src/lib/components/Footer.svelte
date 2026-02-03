<script lang="ts">
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { href: 'https://www.instagram.com/wearerighello', label: 'Instagram', icon: 'instagram' },
    { href: 'https://www.linkedin.com/company/righello', label: 'LinkedIn', icon: 'linkedin' },
  ];
</script>

<footer class="bg-black text-white py-16">
  <div class="section-container">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
      <div class="md:col-span-2">
        <img src="/logo-full.png" alt="Righello" class="h-10 brightness-0 invert mb-6" />
        <p class="text-gray-400 max-w-md">
          Siamo un team dedicato e dinamico, uniti dalla passione per l'innovazione e l'eccellenza nel settore digitale.
        </p>
      </div>
      
      <div>
        <h4 class="font-semibold text-lg mb-4">Link</h4>
        <ul class="space-y-3">
          <li><a href="/" class="text-gray-400 hover:text-righello-pink transition-colors">Home</a></li>
          <li><a href="/progetti" class="text-gray-400 hover:text-righello-pink transition-colors">Progetti</a></li>
          <li><a href="/chi-siamo" class="text-gray-400 hover:text-righello-pink transition-colors">Chi siamo</a></li>
          <li><a href="/contatti" class="text-gray-400 hover:text-righello-pink transition-colors">Contatti</a></li>
        </ul>
      </div>
      
      <div>
        <h4 class="font-semibold text-lg mb-4">Contatti</h4>
        <ul class="space-y-3 text-gray-400">
          <li>
            <a href="mailto:hello@wearerighello.com" class="hover:text-righello-pink transition-colors">
              hello@wearerighello.com
            </a>
          </li>
          <li>
            <div class="flex gap-4 mt-4">
              {#each socialLinks as social}
                <a 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-righello-pink transition-colors"
                  aria-label={social.label}
                >
                  {#if social.icon === 'instagram'}
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  {:else if social.icon === 'linkedin'}
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  {/if}
                </a>
              {/each}
            </div>
          </li>
        </ul>
      </div>
    </div>
    
    <div class="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
      <p class="text-gray-500 text-sm">
        &copy; {currentYear} Righello. Tutti i diritti riservati.
      </p>
      <p class="text-gray-500 text-sm">
        P.IVA: 01979970934 | Via Pio X 21, Mestre - Venezia
      </p>
    </div>
  </div>
</footer>
