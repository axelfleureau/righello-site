import type { Landing } from './types';

// Fatti dal video pubblico (36 s, 1920x1080, 24 fps) e dalla scheda del lavoro. Il video non mostra persone.
// Cosa NON e' verificato: chi lo ha commissionato e dove e' stato pubblicato oltre al nostro sito e a YouTube.
// Pagina breve di proposito: i tre media (video e due fermi immagine) compaiono una volta sola, nei capitoli;
// una galleria li ripeterebbe soltanto.
const base = '/progetti/landing/riviera-resort';

export default {
  tagline: 'Il resort di Lignano Sabbiadoro visto dall’alto, tra mare e pineta, in 36 secondi.',
  metrics: [
    { text: '36 s', label: 'di riprese in un solo video', note: 'durata del file originale' },
    { text: '1080p', label: 'Full HD, 16:9', note: 'originale 1920×1080' },
    { text: '24 fps', label: 'fotogrammi al secondo', note: 'frequenza del file originale' }
  ],
  chapters: [
    {
      id: 'volo',
      kicker: 'Il lavoro',
      title: 'Un posto sul mare si capisce dall’alto',
      highlight: 'dall’alto',
      text:
        'Da terra non si vede come una struttura sta tra la spiaggia, la pineta e la strada. Il video lo mostra: parte dal mare, passa sopra gli edifici e scende fino alla terrazza.',
      bullets: [
        'Riprese aeree della struttura e dell’area intorno',
        'Dalla vista ampia ai dettagli a livello della terrazza',
        'Le immagini documentano il luogo in una fase di lavori'
      ],
      media: [
        {
          type: 'video',
          src: `${base}/volo.mp4`,
          poster: `${base}/volo-poster.webp`,
          alt: 'Ripresa aerea del resort di Lignano Sabbiadoro: spiaggia, edifici e pineta',
          caption: 'I primi dieci secondi del video.',
          ratio: '16/9',
          frame: 'none'
        }
      ],
      layout: 'full'
    },
    {
      id: 'scene',
      kicker: 'Cosa si vede',
      title: 'Spiaggia, edifici e verde nella stessa inquadratura',
      highlight: 'nella stessa inquadratura',
      text:
        'Nelle prime scene la spiaggia e la struttura sono riprese insieme, con il lungomare sullo sfondo. Poi la camera sale e mostra la pineta che circonda l’area, fino a scendere alle facciate e alle palme.',
      bullets: [
        'Spiaggia ed edifici riuniti nello stesso sguardo',
        'In alto, la pineta che circonda l’area',
        'Verso la fine, le facciate e le palme'
      ],
      media: [
        {
          type: 'image',
          src: `${base}/spiaggia-e-struttura.webp`,
          alt: 'Vista aerea della spiaggia e degli edifici del resort con il parcheggio a destra',
          ratio: '16/9',
          frame: 'none'
        },
        {
          type: 'image',
          src: `${base}/dall-alto.webp`,
          alt: 'Vista aerea del resort con il mare, la pineta e il lungomare sullo sfondo',
          ratio: '16/9',
          frame: 'none'
        }
      ],
      layout: 'media-left'
    }
  ],
  features: [
    { icon: 'sparkle', title: 'Grafica sulle immagini', text: 'In una scena un’area è evidenziata per guidare l’occhio.' },
    { icon: 'play', title: 'Pochi tagli', text: 'Poche scene lunghe, nessun effetto di troppo: ogni inquadratura ha il tempo di far vedere qualcosa.' },
    { icon: 'globe', title: 'Online', text: 'Il video è sul sito di Righello e su YouTube.' }
  ],
  tech: [
    {
      title: 'Formato',
      text: 'File H.264 in 1920×1080 a 24 fotogrammi al secondo, 16:9, 36 secondi: adatto a schermo grande e a telefono.',
      tags: ['H.264', '1080p', '24 fps']
    },
    {
      title: 'Copia leggera per il sito',
      text: 'Per questa pagina l’estratto di dieci secondi è ridotto a 960 pixel, senza audio, con anteprima: parte solo quando lo si guarda.',
      tags: ['MP4', 'Anteprima', 'Senza audio']
    },
    {
      title: 'Pubblicazione',
      text: 'Il video è incorporato nella sezione lavori del sito e disponibile in alta definizione su YouTube.',
      tags: ['Alta definizione']
    }
  ],
  cta: {
    title: 'Un video per il vostro posto?',
    highlight: 'vostro posto',
    text: 'Raccontateci la struttura e i momenti dell’anno in cui deve farsi vedere.'
  }
} satisfies Landing;
