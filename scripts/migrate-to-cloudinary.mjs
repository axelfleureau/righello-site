/**
 * Migrazione completa dei video attuali su Cloudinary.
 *
 * - Video Firebase (MP4/MOV) sotto 100MB: uploadati come resource_type=video
 * - Video YouTube + Firebase >100MB: thumbnail YouTube come resource_type=image, youtubeId nel contesto
 *
 * Esecuzione: node scripts/migrate-to-cloudinary.mjs
 */

import { v2 as cloudinary } from 'cloudinary';

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;

if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
  console.error('❌  Variabili CLOUDINARY mancanti.');
  process.exit(1);
}

cloudinary.config({ cloud_name: CLOUD_NAME, api_key: API_KEY, api_secret: API_SECRET, secure: true });

// ---------------------------------------------------------------------------
// Dati da migrare
// ---------------------------------------------------------------------------

const SHOWCASE = [
  {
    id: 'quinto-della-luna',
    title: 'Quinto della Luna',
    subtitle: 'Azienda agricola',
    category: 'Agricoltura',
    order: 0,
    videoSrc: 'https://firebasestorage.googleapis.com/v0/b/righello-site.firebasestorage.app/o/quintodellaluna%201.mov?alt=media&token=9d2fea38-515a-44ee-b9d5-006fefdb7ada',
  },
  { id: 'mauro-poles',    title: 'Geom. Mauro Poles',     subtitle: 'Video Showcase',         category: 'Corporate',    order: 1, youtubeId: 'vBgqFc_Dls8' },
  { id: 'living-door',   title: 'Living Door',            subtitle: 'Capannone industriale',  category: 'Industrial',   order: 2, youtubeId: 'b5WBbuzS5lM' },
  { id: 'riviera-resort',title: 'Riviera Resort Hotel',   subtitle: 'Lignano Sabbiadoro',     category: 'Hospitality',  order: 3, youtubeId: '2rS-ZnjuBjo' },
  { id: 'hotel-miramare',title: 'Hotel Miramare',         subtitle: 'Lignano Sabbiadoro',     category: 'Hospitality',  order: 4, youtubeId: 'rpXZDOoJzqU' },
  { id: 'zanutta',       title: 'Zanutta',                subtitle: 'Proof of Work',          category: 'Corporate',    order: 5, youtubeId: 'Xz2G9BqWI50' },
];

const REELS = [
  { id: 'ricci-scuolasci',  title: 'Ricci Group x Scuola Sci Piancavallo', subtitle: 'Partnership per la promozione dei corsi di sci',   category: 'Partnership', order: 0, youtubeId: '2EAJzZjnGUo' },
  { id: '3r-tech',          title: '3R Technology',                         subtitle: 'Sostituzione fulminea di uno schermo',            category: 'Product',     order: 1, youtubeId: 'q0hHmap4xkM' },
  { id: 'reguta',           title: 'Reguta',                                subtitle: '#IOVENDEMMIOVOLENTIERI2025',                      category: 'Social',      order: 2, youtubeId: 'Yrq9lMebfUQ' },
  { id: 'neura',            title: 'Neura',                                 subtitle: 'Come migliorare le difficolta di apprendimento',  category: 'Salute',      order: 3, youtubeId: 'SzTxXsg27OM' },
  { id: 'ricci-hyundai',   title: 'Ricci Group',                           subtitle: 'Basta spendere in carburante scegli Hyundai i20', category: 'Automotive',  order: 4, youtubeId: '6oCjVbhG7Es' },
  { id: 'mggrill',         title: 'MgGrill',                               subtitle: 'Per noi il cibo e una cosa seria',               category: 'Food',        order: 5, youtubeId: 'R4IzWaHu8z8' },
  { id: 'scuolasci-openday',title: 'Scuola Sci Piancavallo',               subtitle: 'Tutto gratis al open day della scuola',          category: 'Sport',       order: 6, youtubeId: 'VZ-BqtFqx6w' },
];

const TESTIMONIALS = [
  {
    id: 'ardea',
    title: 'Ardea',
    subtitle: 'Scuola Nautica e Guida auto',
    category: 'Testimonial',
    order: 0,
    clientName: 'Ardea',
    clientRole: 'Scuola Nautica e Guida auto',
    company: 'Ardea',
    quote: 'Hanno trasformato la nostra comunicazione digitale.',
    // File Firebase >100MB → usiamo YouTube
    youtubeId: 'Wf3aN6uTolM',
  },
  {
    id: '3r-technology',
    title: '3R Technology',
    subtitle: 'Technology',
    category: 'Testimonial',
    order: 1,
    clientName: '3R Technology',
    clientRole: 'Technology',
    company: '3R Technology',
    quote: 'Marketing digitale efficace per il nostro settore tech.',
    videoSrc: 'https://firebasestorage.googleapis.com/v0/b/righello-site.firebasestorage.app/o/IMG_8537.mp4?alt=media&token=029ac90a-7f59-4577-9066-b22594257f31',
  },
  {
    id: 'reguta-vini',
    title: 'Reguta Vini',
    subtitle: 'Cantina',
    category: 'Testimonial',
    order: 2,
    clientName: 'Reguta Vini',
    clientRole: 'Cantina',
    company: 'Reguta Vini',
    quote: 'La strategia social ha portato +180% di engagement.',
    // File Firebase >100MB → usiamo YouTube
    youtubeId: '4Ndme0QfXrk',
  },
  {
    id: 'clara-falomo',
    title: 'Clara Falomo',
    subtitle: 'Avvocato',
    category: 'Testimonial',
    order: 3,
    clientName: 'Clara Falomo',
    clientRole: 'Avvocato',
    company: 'Studio Avv. Clara Falomo',
    quote: 'Professionalita e risultati concreti per il mio studio legale.',
    // File Firebase >100MB → usiamo YouTube
    youtubeId: 'kG0uofbW2cU',
  },
];

const HERO = { id: 'main', youtubeId: 'Rj5N4BMF-Vw', title: 'Hero Righello', subtitle: 'Reel principale', category: 'Hero', order: 0 };

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------
function buildContext(meta) {
  return Object.entries(meta)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => `${k}=${String(v).replace(/[|=]/g, ' ')}`)
    .join('|');
}

async function existsOnCloudinary(publicId, resourceType = 'video') {
  try {
    await cloudinary.api.resource(publicId, { resource_type: resourceType });
    return true;
  } catch {
    return false;
  }
}

// ---------------------------------------------------------------------------
// Upload video da URL Firebase
// NOTA: NON passare 'folder' se public_id contiene già il path completo
// ---------------------------------------------------------------------------
async function uploadVideoFromUrl(item, section) {
  const publicId = `righello/${section}/${item.id}`;

  if (await existsOnCloudinary(publicId, 'video')) {
    console.log(`  ⏭  già presente (video): ${publicId}`);
    return;
  }

  const context = buildContext({
    title: item.title,
    subtitle: item.subtitle,
    category: item.category,
    order: item.order,
    clientName: item.clientName,
    clientRole: item.clientRole,
    company: item.company,
    quote: item.quote,
  });

  console.log(`  ⬆  upload video Firebase → ${publicId}`);
  try {
    const result = await cloudinary.uploader.upload(item.videoSrc, {
      resource_type: 'video',
      public_id: publicId,
      context,
      overwrite: false,
    });
    console.log(`  ✅  ${result.public_id}`);
  } catch (err) {
    console.error(`  ❌  ${item.id}:`, err.message);
  }
}

// ---------------------------------------------------------------------------
// Upload thumbnail YouTube come immagine (youtubeId nel contesto)
// ---------------------------------------------------------------------------
async function uploadYoutubePlaceholder(item, section) {
  const publicId = `righello/${section}/${item.id}`;

  // Check both image and video (in case already there as wrong type)
  if (await existsOnCloudinary(publicId, 'image') || await existsOnCloudinary(publicId, 'video')) {
    console.log(`  ⏭  già presente: ${publicId}`);
    return;
  }

  const thumbnailUrl = `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`;
  const context = buildContext({
    title: item.title,
    subtitle: item.subtitle,
    category: item.category,
    order: item.order,
    youtubeId: item.youtubeId,
    clientName: item.clientName,
    clientRole: item.clientRole,
    company: item.company,
    quote: item.quote,
  });

  console.log(`  ⬆  upload placeholder YouTube (${item.youtubeId}) → ${publicId}`);
  try {
    const result = await cloudinary.uploader.upload(thumbnailUrl, {
      resource_type: 'image',
      public_id: publicId,
      context,
      overwrite: false,
    });
    console.log(`  ✅  ${result.public_id}`);
  } catch (err) {
    console.error(`  ❌  ${item.id}:`, err.message);
  }
}

// ---------------------------------------------------------------------------
// Pulizia: elimina risorse con percorso duplicato (from errori run precedente)
// ---------------------------------------------------------------------------
async function cleanupDuplicates() {
  console.log('\n🧹  Pulizia risorse con path duplicato...');
  const wrongPaths = [
    { id: 'righello/hero/righello/hero/undefined', type: 'image' },
    { id: 'righello/showcase/righello/showcase/quinto-della-luna', type: 'video' },
    { id: 'righello/showcase/righello/showcase/mauro-poles', type: 'image' },
    { id: 'righello/showcase/righello/showcase/living-door', type: 'image' },
    { id: 'righello/showcase/righello/showcase/riviera-resort', type: 'image' },
    { id: 'righello/showcase/righello/showcase/hotel-miramare', type: 'image' },
    { id: 'righello/showcase/righello/showcase/zanutta', type: 'image' },
    { id: 'righello/reels/righello/reels/ricci-scuolasci', type: 'image' },
    { id: 'righello/reels/righello/reels/3r-tech', type: 'image' },
    { id: 'righello/reels/righello/reels/reguta', type: 'image' },
    { id: 'righello/reels/righello/reels/neura', type: 'image' },
    { id: 'righello/reels/righello/reels/ricci-hyundai', type: 'image' },
    { id: 'righello/reels/righello/reels/mggrill', type: 'image' },
    { id: 'righello/reels/righello/reels/scuolasci-openday', type: 'image' },
    { id: 'righello/testimonials/righello/testimonials/3r-technology', type: 'video' },
  ];

  for (const r of wrongPaths) {
    try {
      await cloudinary.uploader.destroy(r.id, { resource_type: r.type });
      console.log(`  🗑  eliminato: ${r.id}`);
    } catch (err) {
      console.log(`  ⚠  non trovato: ${r.id}`);
    }
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function migrate() {
  console.log('\n🚀  Migrazione video → Cloudinary\n');

  await cleanupDuplicates();

  console.log('\n📁  hero');
  await uploadYoutubePlaceholder(HERO, 'hero');

  console.log('\n📁  showcase');
  for (const item of SHOWCASE) {
    if (item.videoSrc) {
      await uploadVideoFromUrl(item, 'showcase');
    } else {
      await uploadYoutubePlaceholder(item, 'showcase');
    }
  }

  console.log('\n📁  reels');
  for (const item of REELS) {
    await uploadYoutubePlaceholder(item, 'reels');
  }

  console.log('\n📁  testimonials');
  for (const item of TESTIMONIALS) {
    if (item.videoSrc) {
      await uploadVideoFromUrl(item, 'testimonials');
    } else {
      await uploadYoutubePlaceholder(item, 'testimonials');
    }
  }

  console.log('\n✨  Migrazione completata!\n');
}

migrate().catch(console.error);
