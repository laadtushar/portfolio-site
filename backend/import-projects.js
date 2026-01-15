const fs = require('fs');
const path = require('path');

// Load environment variables from .env files
// Try multiple locations: backend/.env.local, backend/.env, root/.env.local, root/.env
const rootDir = path.join(__dirname, '..');
const envPaths = [
  path.join(__dirname, '.env.local'),
  path.join(__dirname, '.env'),
  path.join(rootDir, '.env.local'),
  path.join(rootDir, '.env'),
];

for (const envPath of envPaths) {
  if (fs.existsSync(envPath)) {
    console.log(`📄 Loading ${path.relative(process.cwd(), envPath)}...`);
    require('dotenv').config({ path: envPath });
  }
}
// Also try default .env location
require('dotenv').config();

const sanityClient = require('@sanity/client');

// Read sanity.json for project config
let sanityConfig = {};
try {
  sanityConfig = JSON.parse(fs.readFileSync(path.join(__dirname, 'sanity.json'), 'utf8'));
} catch (error) {
  console.warn('⚠️  Could not read sanity.json, using environment variables only');
}

// Initialize Sanity client
// Try all possible environment variable names
const projectId = process.env.SANITY_STUDIO_API_PROJECT_ID 
  || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID 
  || process.env.SANITY_PROJECT_ID
  || process.env.SANITY_STUDIO_PROJECT_ID
  || sanityConfig?.api?.projectId;

const dataset = process.env.SANITY_STUDIO_API_DATASET 
  || process.env.NEXT_PUBLIC_SANITY_DATASET 
  || process.env.SANITY_DATASET
  || process.env.SANITY_STUDIO_DATASET
  || sanityConfig?.api?.dataset 
  || 'production';

const token = process.env.SANITY_AUTH_TOKEN 
  || process.env.SANITY_TOKEN
  || process.env.SANITY_API_TOKEN
  || process.env.SANITY_STUDIO_API_TOKEN;

// Debug: Show what we found (without exposing full token)
console.log('\n🔍 Environment check:');
console.log(`   Project ID: ${projectId ? '✅ Found' : '❌ Missing'}`);
console.log(`   Dataset: ${dataset ? `✅ ${dataset}` : '❌ Missing'}`);
console.log(`   Token: ${token ? '✅ Found' : '❌ Missing'}`);
console.log('');

if (!projectId) {
  console.error('❌ Error: Sanity projectId is required!');
  console.error('   Set one of these environment variables:');
  console.error('   - SANITY_STUDIO_API_PROJECT_ID');
  console.error('   - NEXT_PUBLIC_SANITY_PROJECT_ID');
  console.error('   - SANITY_PROJECT_ID');
  console.error('   Or set it in backend/sanity.json under api.projectId');
  process.exit(1);
}

if (!token) {
  console.error('❌ Error: Sanity auth token is required!');
  console.error('   Set one of these environment variables:');
  console.error('   - SANITY_AUTH_TOKEN');
  console.error('   - SANITY_TOKEN');
  console.error('   - SANITY_API_TOKEN');
  console.error('   Get your token from: https://sanity.io/manage');
  console.error('   Make sure the token has Editor permissions for project:', projectId);
  process.exit(1);
}

const client = sanityClient({
  projectId,
  dataset,
  token,
  useCdn: false,
  apiVersion: '2023-05-03',
});

console.log(`📋 Using Sanity project: ${projectId}, dataset: ${dataset}`);
console.log(`🔑 Token: ${token ? `${token.substring(0, 10)}...` : 'NOT SET'}\n`);

async function importData() {
  try {
    console.log('🚀 Starting data import...\n');

    // Read seed data
    const seedData = JSON.parse(fs.readFileSync(path.join(__dirname, 'seed-data.json'), 'utf8'));
    
    let authorId = null;

    // Import authors first (needed for blog posts)
    if (seedData.authors) {
      console.log(`👤 Importing ${seedData.authors.length} authors...\n`);
      for (const author of seedData.authors) {
        try {
          console.log(`   Importing author: ${author.name}`);
          const result = await client.create(author);
          authorId = result._id;
          console.log(`   ✅ Successfully imported with ID: ${result._id}\n`);
        } catch (error) {
          console.error(`   ❌ Failed to import ${author.name}:`, error.message, '\n');
        }
      }
    }
    
    // Import projects
    if (seedData.projects) {
      console.log(`📦 Importing ${seedData.projects.length} projects...\n`);
      for (const project of seedData.projects) {
        try {
          console.log(`   Importing project: ${project.title}`);
          const result = await client.create(project);
          console.log(`   ✅ Successfully imported with ID: ${result._id}\n`);
        } catch (error) {
          console.error(`   ❌ Failed to import ${project.title}:`, error.message, '\n');
        }
      }
    }

    // Import blog posts
    if (seedData.posts) {
      console.log(`📝 Importing ${seedData.posts.length} blog posts...\n`);
      for (const post of seedData.posts) {
        try {
          // Add author reference if we created one
          if (authorId && !post.author) {
            post.author = {
              _type: 'reference',
              _ref: authorId
            };
          }
          console.log(`   Importing post: ${post.title}`);
          const result = await client.create(post);
          console.log(`   ✅ Successfully imported with ID: ${result._id}\n`);
        } catch (error) {
          console.error(`   ❌ Failed to import ${post.title}:`, error.message, '\n');
        }
      }
    }

    console.log('✨ Import complete!');
  } catch (error) {
    console.error('❌ Import failed:', error.message);
    process.exit(1);
  }
}

// Run the import
importData();
