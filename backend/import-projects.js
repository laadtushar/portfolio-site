const sanityClient = require('@sanity/client');
const fs = require('fs');
const path = require('path');

// Initialize Sanity client
const client = sanityClient({
  projectId: process.env.SANITY_STUDIO_API_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_API_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
  apiVersion: '2023-05-03',
});

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
