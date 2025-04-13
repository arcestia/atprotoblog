# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Comments section to blog posts using Utterances GitHub-based commenting system
- New sidebar layout with improved navigation and organization
- Redesigned home page with sections for Notes and Tech Blog
- Added simplified footer with contact links
- Added comments section to local blog posts
- Created dedicated routes for Notes (/notes) and Tech Blog (/tech) with separate content lists
- Added LocalPost type to support better type checking for local blog posts
- Restored typing animation for the hero section text on the home page
- Added topbar navigation with responsive design for mobile devices
- Implemented theme toggling functionality with light/dark mode support
- Added Bluesky icon to the topbar for quick access to Bluesky profile
- Created dedicated Projects page to showcase all open-source projects
- Added specific pages:build script for Cloudflare Pages deployment

### Changed
- Removed Redis cache dependency to enable deployment on Cloudflare Pages
- Modified API functions to work without caching
- Updated deployment configuration for Cloudflare Pages
- Removed Docker-related deployment files (Dockerfile and docker-compose.yml)
- Simplified wrangler.toml configuration for Cloudflare Pages
- Updated Tech Blog section to use local posts instead of sample data
- Removed Deep Dives section and restored Projects section to its previous implementation
- Removed copyright text from footer to simplify the layout
- Adjusted layout to reduce empty space on right side of the page
- Updated "See All" links to point to dedicated routes for Notes and Tech Blog
- Enhanced Link component to accept additional props like className, target, and rel
- Updated email address to hello@skiddle.id in footer
- Changed website name from skiddle.dev to skiddle.id in sidebar
- Updated Donate link to point to GitHub Sponsors
- Changed RSS feed link to point to /feed instead of /rss.xml
- Simplified sidebar by removing Guides and Project Writeups sections
- Updated hero section text with new professional introduction focused on software development and open protocols
- Removed Newsletter button from hero section
- Fixed About Me button to use theme's accent blue color with proper styling
- Improved date formatting across the site to show full dates (month name, day, and year)
- Enhanced "New" label styling to use the theme's accent blue color for better visibility
- Improved mobile responsiveness by hiding sidebar on small screens and showing topbar navigation
- Removed site name from topbar for a cleaner navigation appearance
- Aligned all navigation elements in the topbar to the right
- Updated light theme colors to use a blue-ish color scheme for better visual consistency
- Enhanced light theme contrast with darker blue tones for improved readability and visibility
- Fixed theme implementation to properly use CSS variables throughout the application
- Updated wrangler.toml with production environment variables for Cloudflare Pages deployment
- Completely revised README.md with modern features, detailed deployment instructions, and improved documentation
- Modified build configuration to directly use Remix CLI through node_modules path

### Removed
- Deleted PM2 ecosystem configuration file (ecosystem.config.cjs)
- Removed PM2-related scripts from package.json
- Removed PM2 dependency from package.json
- Eliminated PM2 deployment instructions from README.md to focus exclusively on Cloudflare Pages deployment
- Removed build.sh script in favor of direct npm script execution

### Fixed
- Corrected theme variable usage in root layout to ensure consistent styling across light and dark modes
- Fixed footer link hover states to use theme accent colors
- Improved theme color contrast for better accessibility
- Updated button styling in footer to use theme variables consistently
- Fixed build process for Cloudflare Pages deployment by using direct path to Remix CLI
- Resolved Cloudflare Pages deployment configuration by aligning wrangler.toml with the correct build command
- Updated wrangler.toml to use correct build output directory (public/build) to match Remix configuration
