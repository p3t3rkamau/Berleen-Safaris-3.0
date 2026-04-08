// scripts/generate-sitemap.js
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Your website URL
const SITE_URL = 'https://www.berleensafaris.com';

// Static pages with their details
const staticPages = [
  { url: '/', priority: 1.0, changefreq: 'daily', lastmod: new Date().toISOString().split('T')[0] },
  { url: '/safaris', priority: 0.9, changefreq: 'daily', lastmod: new Date().toISOString().split('T')[0] },
  { url: '/destinations', priority: 0.9, changefreq: 'weekly', lastmod: new Date().toISOString().split('T')[0] },
  { url: '/about', priority: 0.8, changefreq: 'monthly', lastmod: new Date().toISOString().split('T')[0] },
  { url: '/contact', priority: 0.8, changefreq: 'monthly', lastmod: new Date().toISOString().split('T')[0] },
  { url: '/gallery', priority: 0.7, changefreq: 'weekly', lastmod: new Date().toISOString().split('T')[0] },
];

// Safari packages - Update these with your actual safari data
const safaris = [
  { id: 'masai-mara-wildlife-safari', title: 'Masai Mara Wildlife Safari', updatedAt: new Date().toISOString().split('T')[0] },
  { id: 'amboseli-elephant-safari', title: 'Amboseli Elephant Safari', updatedAt: new Date().toISOString().split('T')[0] },
  { id: 'tsavo-national-park-safari', title: 'Tsavo National Park Safari', updatedAt: new Date().toISOString().split('T')[0] },
  { id: 'diani-beach-safari', title: 'Diani Beach Safari', updatedAt: new Date().toISOString().split('T')[0] },
  { id: 'kenya-classic-safari', title: 'Kenya Classic Safari', updatedAt: new Date().toISOString().split('T')[0] },
  { id: 'great-migration-safari', title: 'Great Migration Safari', updatedAt: new Date().toISOString().split('T')[0] },
  { id: 'samburu-safari', title: 'Samburu Safari', updatedAt: new Date().toISOString().split('T')[0] },
  { id: 'lake-nakuru-safari', title: 'Lake Nakuru Safari', updatedAt: new Date().toISOString().split('T')[0] },
];

// Destinations - Update these with your actual destination data
const destinations = [
  { id: 'maasai-mara', name: 'Maasai Mara', updatedAt: new Date().toISOString().split('T')[0] },
  { id: 'amboseli', name: 'Amboseli National Park', updatedAt: new Date().toISOString().split('T')[0] },
  { id: 'tsavo-east', name: 'Tsavo East', updatedAt: new Date().toISOString().split('T')[0] },
  { id: 'tsavo-west', name: 'Tsavo West', updatedAt: new Date().toISOString().split('T')[0] },
  { id: 'diani-beach', name: 'Diani Beach', updatedAt: new Date().toISOString().split('T')[0] },
  { id: 'samburu', name: 'Samburu National Reserve', updatedAt: new Date().toISOString().split('T')[0] },
  { id: 'lake-nakuru', name: 'Lake Nakuru', updatedAt: new Date().toISOString().split('T')[0] },
  { id: 'nairobi', name: 'Nairobi', updatedAt: new Date().toISOString().split('T')[0] },
];

// Generate main sitemap.xml
function generateMainSitemap() {
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  sitemap += '        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"\n';
  sitemap += '        xmlns:xhtml="http://www.w3.org/1999/xhtml"\n';
  sitemap += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"\n';
  sitemap += '        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n\n';

  // Add static pages
  staticPages.forEach(page => {
    sitemap += `  <url>\n`;
    sitemap += `    <loc>${SITE_URL}${page.url}</loc>\n`;
    sitemap += `    <lastmod>${page.lastmod}</lastmod>\n`;
    sitemap += `    <changefreq>${page.changefreq}</changefreq>\n`;
    sitemap += `    <priority>${page.priority}</priority>\n`;
    sitemap += `  </url>\n\n`;
  });

  // Add safari pages
  safaris.forEach(safari => {
    sitemap += `  <url>\n`;
    sitemap += `    <loc>${SITE_URL}/safari/${safari.id}</loc>\n`;
    sitemap += `    <lastmod>${safari.updatedAt}</lastmod>\n`;
    sitemap += `    <changefreq>weekly</changefreq>\n`;
    sitemap += `    <priority>0.8</priority>\n`;
    sitemap += `  </url>\n\n`;
  });

  // Add destination pages
  destinations.forEach(destination => {
    sitemap += `  <url>\n`;
    sitemap += `    <loc>${SITE_URL}/destinations/${destination.id}</loc>\n`;
    sitemap += `    <lastmod>${destination.updatedAt}</lastmod>\n`;
    sitemap += `    <changefreq>weekly</changefreq>\n`;
    sitemap += `    <priority>0.8</priority>\n`;
    sitemap += `  </url>\n\n`;
  });

  sitemap += '</urlset>';
  return sitemap;
}

// Generate sitemap-index.xml
function generateSitemapIndex() {
  const currentDate = new Date().toISOString().split('T')[0];
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE_URL}/sitemap.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/sitemap-images.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/sitemap-videos.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
</sitemapindex>`;
}

// Generate sitemap-images.xml
function generateImageSitemap() {
  const images = [
    { url: '/images/maasai-mara-hero.jpg', title: 'Maasai Mara Safari', caption: 'Wildlife safari in Maasai Mara' },
    { url: '/images/amboseli-elephants.jpg', title: 'Amboseli Elephants', caption: 'Elephants with Kilimanjaro backdrop' },
    { url: '/images/tsavo-lions.jpg', title: 'Tsavo Lions', caption: 'Lions in Tsavo National Park' },
    { url: '/images/diani-beach.jpg', title: 'Diani Beach', caption: 'Beautiful Diani Beach Kenya' },
    { url: '/images/safari-jeep.jpg', title: 'Safari Vehicle', caption: '4x4 safari vehicle' },
    { url: '/images/cultural-visit.jpg', title: 'Cultural Experience', caption: 'Maasai cultural visit' },
  ];

  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  sitemap += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n\n';

  images.forEach(image => {
    sitemap += `  <url>\n`;
    sitemap += `    <loc>${SITE_URL}${image.url}</loc>\n`;
    sitemap += `    <image:image>\n`;
    sitemap += `      <image:loc>${SITE_URL}${image.url}</image:loc>\n`;
    sitemap += `      <image:title>${image.title}</image:title>\n`;
    sitemap += `      <image:caption>${image.caption}</image:caption>\n`;
    sitemap += `    </image:image>\n`;
    sitemap += `  </url>\n\n`;
  });

  sitemap += '</urlset>';
  return sitemap;
}

// Generate sitemap-videos.xml
function generateVideoSitemap() {
  const videos = [
    { 
      url: '/videos/kenya-safari-promo.mp4', 
      title: 'Kenya Safari Experience', 
      description: 'Experience the magic of African safaris with Berleen Safaris',
      thumbnail: '/videos/thumbnails/safari-promo.jpg',
      duration: 180
    },
    { 
      url: '/videos/great-migration.mp4', 
      title: 'Great Migration', 
      description: 'Witness the greatest wildlife spectacle on earth',
      thumbnail: '/videos/thumbnails/migration.jpg',
      duration: 240
    },
  ];

  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  sitemap += '        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n\n';

  videos.forEach(video => {
    sitemap += `  <url>\n`;
    sitemap += `    <loc>${SITE_URL}${video.url}</loc>\n`;
    sitemap += `    <video:video>\n`;
    sitemap += `      <video:thumbnail_loc>${SITE_URL}${video.thumbnail}</video:thumbnail_loc>\n`;
    sitemap += `      <video:title>${video.title}</video:title>\n`;
    sitemap += `      <video:description>${video.description}</video:description>\n`;
    sitemap += `      <video:player_loc>${SITE_URL}${video.url}</video:player_loc>\n`;
    sitemap += `      <video:duration>${video.duration}</video:duration>\n`;
    sitemap += `    </video:video>\n`;
    sitemap += `  </url>\n\n`;
  });

  sitemap += '</urlset>';
  return sitemap;
}

// Ensure public directory exists
const publicDir = resolve(__dirname, '../public');
if (!existsSync(publicDir)) {
  mkdirSync(publicDir, { recursive: true });
}

// Write all sitemaps
try {
  writeFileSync(resolve(publicDir, 'sitemap.xml'), generateMainSitemap());
  console.log('✅ sitemap.xml generated successfully');
  
  writeFileSync(resolve(publicDir, 'sitemap-index.xml'), generateSitemapIndex());
  console.log('✅ sitemap-index.xml generated successfully');
  
  writeFileSync(resolve(publicDir, 'sitemap-images.xml'), generateImageSitemap());
  console.log('✅ sitemap-images.xml generated successfully');
  
  writeFileSync(resolve(publicDir, 'sitemap-videos.xml'), generateVideoSitemap());
  console.log('✅ sitemap-videos.xml generated successfully');
  
  console.log('\n📁 All sitemaps saved to: /public/');
  console.log(`\n📊 Sitemap Statistics:`);
  console.log(`   - Static pages: ${staticPages.length}`);
  console.log(`   - Safari pages: ${safaris.length}`);
  console.log(`   - Destination pages: ${destinations.length}`);
  console.log(`   - Total URLs: ${staticPages.length + safaris.length + destinations.length}`);
  console.log(`\n🌐 Sitemap URLs:`);
  console.log(`   - ${SITE_URL}/sitemap.xml`);
  console.log(`   - ${SITE_URL}/sitemap-index.xml`);
  console.log(`   - ${SITE_URL}/sitemap-images.xml`);
  console.log(`   - ${SITE_URL}/sitemap-videos.xml`);
} catch (error) {
  console.error('❌ Error generating sitemaps:', error);
}