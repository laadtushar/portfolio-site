const fs = require('fs');
const path = require('path');

// Load environment variables
const rootDir = path.join(__dirname, '..');
const envPaths = [
  path.join(__dirname, '.env.local'),
  path.join(__dirname, '.env'),
  path.join(rootDir, '.env.local'),
  path.join(rootDir, '.env'),
];

for (const envPath of envPaths) {
  if (fs.existsSync(envPath)) {
    require('dotenv').config({ path: envPath });
  }
}
require('dotenv').config();

const sanityClient = require('@sanity/client');

// Read sanity.json
let sanityConfig = {};
try {
  sanityConfig = JSON.parse(fs.readFileSync(path.join(__dirname, 'sanity.json'), 'utf8'));
} catch (error) {
  console.warn('⚠️  Could not read sanity.json');
}

const projectId = process.env.SANITY_STUDIO_API_PROJECT_ID 
  || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID 
  || sanityConfig?.api?.projectId;

const dataset = process.env.SANITY_STUDIO_API_DATASET 
  || process.env.NEXT_PUBLIC_SANITY_DATASET 
  || sanityConfig?.api?.dataset 
  || 'production';

const token = process.env.SANITY_AUTH_TOKEN 
  || process.env.SANITY_TOKEN
  || process.env.SANITY_API_TOKEN;

const client = sanityClient({
  projectId,
  dataset,
  token,
  useCdn: false,
  apiVersion: '2023-05-03',
});

async function verifyNoDuplicates() {
  try {
    console.log('🔍 Checking for duplicate blogs...\n');

    const posts = await client.fetch(
      '*[_type == "post"] | order(_createdAt desc) { _id, _createdAt, title, slug }'
    );

    console.log(`📝 Total blog posts: ${posts.length}\n`);

    // Group by slug
    const postsBySlug = {};
    posts.forEach(post => {
      const slug = post.slug?.current;
      if (!postsBySlug[slug]) {
        postsBySlug[slug] = [];
      }
      postsBySlug[slug].push(post);
    });

    // Check for duplicates
    const duplicates = Object.keys(postsBySlug).filter(slug => postsBySlug[slug].length > 1);

    if (duplicates.length > 0) {
      console.log('❌ DUPLICATES FOUND:\n');
      duplicates.forEach(slug => {
        console.log(`Slug: "${slug}" (${postsBySlug[slug].length} copies)`);
        postsBySlug[slug].forEach((post, index) => {
          console.log(`  ${index + 1}. ${post.title}`);
          console.log(`     ID: ${post._id}`);
          console.log(`     Created: ${new Date(post._createdAt).toLocaleString()}\n`);
        });
      });
      process.exit(1);
    } else {
      console.log('✅ No duplicate blogs found!');
      console.log('\nUnique blogs:');
      Object.keys(postsBySlug).forEach((slug, index) => {
        const post = postsBySlug[slug][0];
        console.log(`${index + 1}. "${post.title}"`);
        console.log(`   Slug: ${slug}`);
        console.log(`   ID: ${post._id}\n`);
      });
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

verifyNoDuplicates();
