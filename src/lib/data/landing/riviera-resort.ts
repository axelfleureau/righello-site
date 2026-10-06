import type { Landing } from './types';

// Fatti dal video pubblico (36 s, 1920x1080, 24 fps) e dalla scheda del lavoro. Il video non mostra persone.
// Cosa NON e' verificato: chi lo ha commissionato e dove e' stato pubblicato oltre al nostro sito e a YouTube.
const base = '/progetti/landing/riviera-resort';

export default {
  tagline: 'Il resort di Lignano Sabbiadoro visto dall’alto, tra mare e pineta, in 36 secondi.',
  metrics: [
    { text: '36 s', label: 'di riprese in un solo video', note: 'durata del file originale' },
    { text: '1080p', label: 'Full HD, 16:9', note: 'originale 1920×1080 a 24 fotogrammi al secondo' },
    { text: '1', label: 'luogo, tanti punti di vista', note: 'scene dall’alto, in volo radente e dalla terrazza' }
  ],
  chapters: [
    {
      id: 'volo',
      kicker: 'Il lavoro',
      title: 'Un posto sul mare si capisce dall’alto',
      highlight: 'dall’alto',
      text:
        'Da terra non si vede come una struttura sta tra la spiaggia, la pineta e la strada. Il video lo mostra: parte dal mare, passa sopra gli edifici e scende fino alla terrazza. Poche scene lunghe, nessun effetto di troppo.',
      bullets: [
        'Riprese aeree della struttura e dell’area intorno',
        'Passaggio dalla vista ampia ai dettagli a livello della terrazza',
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
        'Nelle prime scene la spiaggia e la struttura sono ripresi insieme, con il lungomare sullo sfondo. Poi la camera sale e mostra la pineta che circonda l’area. In una scena una grafica evidenzia la zona; verso la fine si scende alle facciate e alle palme.',
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
    { icon: 'camera', title: 'Riprese dall’alto', text: 'Scene aeree della struttura e di ciò che la circonda.' },
    { icon: 'map', title: 'Il luogo si capisce', text: 'Mare, spiaggia, edifici e pineta nello stesso sguardo.' },
    { icon: 'play', title: 'Scene lunghe', text: 'Pochi tagli: ogni inquadratura ha il tempo di far vedere qualcosa.' },
    { icon: 'sparkle', title: 'Grafica sulle immagini', text: 'In una scena un’area è evidenziata per guidare l’occhio.' },
    { icon: 'device', title: 'Full HD', text: 'Originale 1920×1080, adatto a schermo grande e a telefono.' },
    { icon: 'globe', title: 'Online', text: 'Il video è sul sito di Righello e su YouTube.' }
  ],
  demo: {
    kicker: 'Dal video',
    title: 'Alcuni momenti',
    highlight: 'momenti',
    lead: 'Dal video vero: un estratto di dieci secondi e due fermi immagine.',
    items: [
      {
        id: 'estratto',
        label: 'Estratto',
        media: {
          type: 'video',
          src: `${base}/volo.mp4`,
          poster: `${base}/volo-poster.webp`,
          alt: 'Estratto di dieci secondi della ripresa aerea',
          ratio: '16/9',
          frame: 'none'
        },
        note: 'Dal mare verso gli edifici, con la pineta a destra.'
      },
      {
        id: 'struttura',
        label: 'Spiaggia e struttura',
        media: {
          type: 'image',
          src: `${base}/spiaggia-e-struttura.webp`,
          alt: 'Spiaggia e struttura viste dall’alto',
          ratio: '16/9',
          frame: 'none'
        },
        note: 'Gli edifici e la spiaggia nella stessa inquadratura.'
      },
      {
        id: 'lungomare',
        label: 'Verso il lungomare',
        media: {
          type: 'image',
          src: `${base}/dall-alto.webp`,
          alt: 'Vista sul lungomare e sul mare',
          ratio: '16/9',
          frame: 'none'
        },
        note: 'Pineta, strada e mare dietro la struttura.'
      }
    ]
  },
  tech: [
    {
      title: 'Formato',
      text: 'File H.264 in 1920×1080 a 24 fotogrammi al secondo, 16:9, 36 secondi.',
      tags: ['H.264', '1080p', '24 fps']
    },
    {
      title: 'Copia leggera per il sito',
      text: 'Per questa pagina l’estratto di dieci secondi è ridotto a 960 pixel, senza audio, con anteprima: parte solo quando lo si guarda.',
      tags: ['MP4', 'Anteprima', 'Senza audio']
    },
    {
      title: 'Pubblicazione',
      text: 'Il video è incorporato da YouTube nella sezione lavori del sito e disponibile in alta definizione.',
      tags: ['YouTube']
    }
  ],
  cta: {
    title: 'Un video per il vostro posto?',
    highlight: 'vostro posto',
    text: 'Raccontateci la struttura e i momenti dell’anno in cui deve farsi vedere.'
  }
} satisfies Landing;
