<script lang="ts">
  /**
   * Titolo, descrizione, indirizzo canonico e anteprime (Open Graph e X) di una pagina, in un punto solo.
   * Ogni pagina pubblica lo usa invece di riscrivere le stesse quindici righe: cambiare cosa si dichiara
   * si fa qui. I dati strutturati non vanno qui: li aggiunge il server (`$lib/seo/schema`).
   */
  import { OG_SIZE, SITE_URL } from '$lib/data/site';
  import { ogImageUrl } from '$lib/seo/og';

  /** Da 30 a 60 caratteri, con cio' che si cerca e il luogo dove e' vero. */
  export let title: string;
  /** Da 70 a 160 caratteri: una promessa concreta, senza esagerare. */
  export let description: string;
  /** Percorso della pagina (`/servizi/web`): da qui l'indirizzo canonico e l'immagine di condivisione. */
  export let path: string;
  /** Cosa mostra l'immagine, per chi non la vede. Se manca, il titolo senza il nome del sito. */
  export let imageAlt: string | undefined = undefined;

  $: url = `${SITE_URL}${path}`;
  $: image = ogImageUrl(path);
  $: alt = imageAlt ?? title.replace(/ \| Righello$/, '');
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={url} />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="it_IT" />
  <meta property="og:url" content={url} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={image} />
  <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:image:width" content={String(OG_SIZE.width)} />
  <meta property="og:image:height" content={String(OG_SIZE.height)} />
  <meta property="og:image:alt" content={alt} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={image} />
  <meta name="twitter:image:alt" content={alt} />
</svelte:head>
