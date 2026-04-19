import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const sections = ['hero', 'showcase', 'reels', 'testimonials'];
for (const section of sections) {
  const result = await cloudinary.search
    .expression(`folder:righello/${section}/*`)
    .with_field('context')
    .max_results(100)
    .execute();
  console.log(`\n=== righello/${section} (${result.resources.length} video) ===`);
  for (const r of result.resources) {
    const ctx = r.context?.custom || r.context || {};
    const title = ctx.title || '(no title)';
    const hidden = ctx.hidden === '1' ? '[HIDDEN]' : '';
    console.log(`  ${r.public_id}  -->  "${title}" ${hidden}`);
  }
}
