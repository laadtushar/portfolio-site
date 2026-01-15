const fs = require('fs');
const path = require('path');

// Read the backup (has full projects data)
const backupData = JSON.parse(fs.readFileSync(path.join(__dirname, 'seed-data-backup.json'), 'utf8'));

// Read the full blogs data
const fullBlogsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'seed-data-full-blogs.json'), 'utf8'));

// Merge: keep projects from backup, posts from full blogs
const mergedData = {
  authors: backupData.authors,
  projects: backupData.projects,
  posts: fullBlogsData.posts
};

// Write the merged data
fs.writeFileSync(
  path.join(__dirname, 'seed-data.json'),
  JSON.stringify(mergedData, null, 2),
  'utf8'
);

console.log('✅ Successfully merged seed data!');
console.log(`   - ${mergedData.projects.length} projects`);
console.log(`   - ${mergedData.posts.length} blog posts (full content)`);
