// Direct build script for Cloudflare Pages
const { execSync } = require('child_process');
const path = require('path');

console.log('Starting Cloudflare Pages build process...');

// Set environment variables
process.env.NODE_ENV = 'production';

try {
  // Install dependencies
  console.log('Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });

  // Run the Remix build directly from node_modules
  console.log('Building Remix application...');
  const remixCliPath = path.join(__dirname, 'node_modules', '@remix-run', 'dev', 'dist', 'cli.js');
  execSync(`node ${remixCliPath} build`, { stdio: 'inherit' });

  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
