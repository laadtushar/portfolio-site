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
    console.log('🚀 Starting data import (upsert mode - no duplicates)...\n');

    // Read seed data
    const seedData = JSON.parse(fs.readFileSync(path.join(__dirname, 'seed-data.json'), 'utf8'));
    
    let authorId = null;

    // Import authors first (needed for blog posts)
    if (seedData.authors) {
      console.log(`👤 Importing ${seedData.authors.length} authors...\n`);
      for (const author of seedData.authors) {
        try {
          console.log(`   Checking author: ${author.name}`);
          
          // Check if author exists by name (since email might not be set)
          const existingAuthor = await client.fetch(
            '*[_type == "author" && name == $name][0]',
            { name: author.name }
          );

          if (existingAuthor) {
            // Update existing author
            const result = await client
              .patch(existingAuthor._id)
              .set({
                name: author.name,
                slug: author.slug,
                email: author.email,
                bio: author.bio,
              })
              .commit();
            authorId = result._id;
            console.log(`   ✅ Updated author with ID: ${result._id}\n`);
          } else {
            // Create new author
            const result = await client.create(author);
            authorId = result._id;
            console.log(`   ✅ Created author with ID: ${result._id}\n`);
          }
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
          console.log(`   Checking project: ${project.title}`);
          
          // Check if project exists by slug
          const existingProject = await client.fetch(
            '*[_type == "project" && slug.current == $slug][0]',
            { slug: project.slug.current }
          );

          if (existingProject) {
            // Update existing project
            const result = await client
              .patch(existingProject._id)
              .set({
                title: project.title,
                slug: project.slug,
                description: project.description,
                mainImage: project.mainImage,
                videoFigure: project.videoFigure,
                technologies: project.technologies,
                links: project.links,
                body: project.body,
                color1: project.color1,
                color2: project.color2,
                publishedAt: project.publishedAt,
              })
              .commit();
            console.log(`   ✅ Updated project with ID: ${result._id}\n`);
          } else {
            // Create new project
            const result = await client.create(project);
            console.log(`   ✅ Created project with ID: ${result._id}\n`);
          }
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
          console.log(`   Checking post: ${post.title}`);
          
          // Check if post exists by slug
          const existingPost = await client.fetch(
            '*[_type == "post" && slug.current == $slug][0]',
            { slug: post.slug.current }
          );

          // Add author reference if we have one
          const postData = { ...post };
          if (authorId && !postData.author) {
            postData.author = {
              _type: 'reference',
              _ref: authorId
            };
          }

          if (existingPost) {
            // Update existing post
            const result = await client
              .patch(existingPost._id)
              .set({
                title: postData.title,
                slug: postData.slug,
                body: postData.body,
                linkedinUrl: postData.linkedinUrl,
                publishedAt: postData.publishedAt,
                author: postData.author,
              })
              .commit();
            console.log(`   ✅ Updated post with ID: ${result._id}\n`);
          } else {
            // Create new post
            const result = await client.create(postData);
            console.log(`   ✅ Created post with ID: ${result._id}\n`);
          }
        } catch (error) {
          console.error(`   ❌ Failed to import ${post.title}:`, error.message, '\n');
        }
      }
    }

    console.log('✨ Import complete! (No duplicates created)');
  } catch (error) {
    console.error('❌ Import failed:', error.message);
    process.exit(1);
  }
}

// Run the import
importData();
