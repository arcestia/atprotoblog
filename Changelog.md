# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- Removed Redis cache dependency to enable deployment on Cloudflare Pages
- Modified API functions to work without caching
- Updated deployment configuration for Cloudflare Pages
- Removed Docker-related deployment files (Dockerfile and docker-compose.yml)
