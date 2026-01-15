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

async function importProjects() {
  try {
    console.log('🚀 Starting project import...\n');

    // Read seed data
    const seedData = JSON.parse(fs.readFileSync(path.join(__dirname, 'seed-data.json'), 'utf8'));
    const projects = seedData.projects;

    console.log(`Found ${projects.length} projects to import\n`);

    // Import each project
    for (const project of projects) {
      try {
        console.log(`📦 Importing: ${project.title}`);
        
        // Create the document
        const result = await client.create(project);
        
        console.log(`   ✅ Successfully imported with ID: ${result._id}\n`);
      } catch (error) {
        console.error(`   ❌ Failed to import ${project.title}:`, error.message, '\n');
      }
    }

    console.log('✨ Import complete!');
  } catch (error) {
    console.error('❌ Import failed:', error.message);
    process.exit(1);
  }
}

// Run the import
importProjects();
