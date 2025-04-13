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
