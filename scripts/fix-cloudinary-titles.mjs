import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Convert "promo6dicembre_1776585699" → "Promo 6 Dicembre"
function prettyTitle(publicId) {
  // Take the last segment after the final slash
  const last = publicId.split('/').pop() || publicId;
  // Strip trailing _<timestamp> (10+ digit number)
  const noTs = last.replace(/_\d{10,}$/, '');
  // Replace underscores/dashes with spaces, split camelCase digits
  const spaced = noTs
    .replace(/[_-]+/g, ' ')
    .replace(/([a-z])(\d)/gi, '$1 $2')
    .replace(/(\d)([a-z])/gi, '$1 $2')
    .trim();
  // Title-case each word
  return spaced
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}

const sections = ['hero', 'showcase', 'reels', 'testimonials'];

for (const section of sections) {
  const result = await cloudinary.search
    .expression(`folder:righello/${section}/*`)
    .with_field('context')
    .max_results(100)
    .execute();

  for (const r of result.resources) {
    const ctx = r.context?.custom || r.context || {};
    const currentTitle = ctx.title || '';
    if (currentTitle) {
      console.log(`SKIP  ${r.public_id}  (already has title "${currentTitle}")`);
      continue;
    }
    const newTitle = prettyTitle(r.public_id);
    try {
      await cloudinary.uploader.add_context(`title=${newTitle}`, [r.public_id], {
        resource_type: 'video',
      });
      console.log(`SET   ${r.public_id}  →  "${newTitle}"`);
    } catch (e) {
      console.log(`ERROR ${r.public_id}: ${e.message}`);
    }
  }
}

console.log('\nDone.');
