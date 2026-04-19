import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const sections = ['hero', 'showcase', 'reels', 'testimonials'];
const moves = [];

for (const section of sections) {
  const result = await cloudinary.search
    .expression(`folder:righello/${section}/*`)
    .with_field('context')
    .max_results(100)
    .execute();
  for (const r of result.resources) {
    const fileBase = r.public_id.split('/').pop();
    const isVertical = r.height > r.width;
    const correctSection = isVertical ? 'reels' : 'showcase';
    // Skip hero/testimonials — keep them in place
    const targetSection = (section === 'hero' || section === 'testimonials') ? section : correctSection;
    const cleanPath = `righello/${targetSection}/${fileBase}`;
    if (r.public_id !== cleanPath) {
      moves.push({ from: r.public_id, to: cleanPath, sectionChange: section !== targetSection });
    }
  }
}

console.log(`\n${moves.length} renames planned:\n`);
for (const m of moves) {
  console.log(`  ${m.sectionChange ? '🔀' : '🧹'} ${m.from}\n     → ${m.to}\n`);
}

console.log('\nExecuting renames...\n');
for (const m of moves) {
  try {
    await cloudinary.uploader.rename(m.from, m.to, {
      resource_type: 'video',
      overwrite: false,
      invalidate: true,
    });
    console.log(`✅  ${m.to}`);
  } catch (e) {
    console.log(`❌  ${m.from}: ${e.message}`);
  }
}

console.log('\nDone.');
