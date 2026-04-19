import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const sections = ['hero', 'showcase', 'reels', 'testimonials'];
const allVideos = [];

for (const section of sections) {
  const result = await cloudinary.search
    .expression(`folder:righello/${section}/*`)
    .with_field('context')
    .max_results(100)
    .execute();
  for (const r of result.resources) {
    allVideos.push({
      currentSection: section,
      publicId: r.public_id,
      title: (r.context?.custom || r.context || {}).title || '(no title)',
      width: r.width,
      height: r.height,
      ratio: r.width && r.height ? (r.width / r.height).toFixed(2) : '?',
      orientation: r.width && r.height ? (r.height > r.width ? 'VERTICAL' : 'HORIZONTAL') : '?',
    });
  }
}

console.log('\n=== Analysis ===\n');
for (const v of allVideos) {
  const suggested = v.orientation === 'VERTICAL' ? 'reels' : 'showcase';
  const mismatch = suggested !== v.currentSection ? ' ⚠️  MISMATCH' : ' ✓';
  console.log(
    `[${v.currentSection.padEnd(12)}] ${v.title.padEnd(30)} ${v.width}x${v.height} (${v.ratio}) ${v.orientation.padEnd(10)} → suggested: ${suggested}${mismatch}`
  );
}
