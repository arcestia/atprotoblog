// Removed: "use client";

import React from 'react';
import Link from 'next/link';
import { projects } from '../data/projects'; // Static data, path is correct from src/app/

// Import data fetching functions
import { getProfile } from '../atproto/getProfile';
import { getPosts as getAtprotoPosts } from '../atproto/getPosts'; // Renamed to avoid conflict if any
import { fetchMediumFeed } from '../utils/fetchMediumFeed';
import { getLocalPosts } from '../utils/getLocalPosts';

// Import types (assuming these might be defined or need to be defined)
import { AppBskyActorDefs } from '@atproto/api'; // For ProfileViewDetailed
import { WhtwndBlogEntryView } from '../types/whtwnd'; // For ATProto posts
import { MediumPost } from '../types/medium'; // For Medium posts
import { LocalPost } from '../types/links'; // For local posts

// Define a common structure for writing items
interface WritingItem {
  url: string;
  title: string;
  date: string; // ISO string
  type: 'atprotoblog' | 'medium' | 'local' | 'external'; // 'external' was in mock, can be for other links
  source?: string; // e.g., 'Medium', 'Local Blog', 'Atprotoblog'
  rkey?: string; // for atprotoblog
  slug?: string; // for local
  year?: string; // for local
}

export const metadata = {
  title: "Home | Skiddle's Blog",
  description: "Welcome to Skiddle's personal blog. JavaScript, ATProto, decentralized social media, and more.",
};

export default async function IndexPage() {
  let profile: AppBskyActorDefs.ProfileViewDetailed | null = null;
  let atprotoPosts: WhtwndBlogEntryView[] = [];
  let mediumPosts: MediumPost[] = [];
  let localPosts: LocalPost[] = [];

  try {
    profile = await getProfile();
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    // profile remains null
  }

  try {
    atprotoPosts = await getAtprotoPosts(undefined); // Fetch all posts
  } catch (error) {
    console.error("Failed to fetch ATProto posts:", error);
    // atprotoPosts remains empty
  }

  try {
    mediumPosts = await fetchMediumFeed();
  } catch (error) {
    console.error("Failed to fetch Medium posts:", error);
    // mediumPosts remains empty
  }

  try {
    localPosts = await getLocalPosts(); // Content not needed for list view
  } catch (error) {
    console.error("Failed to fetch local posts:", error);
    // localPosts remains empty
  }

  // Combine and process data for latestWritings
  const allWritings: WritingItem[] = [];

  // Add ATProto posts
  atprotoPosts
    .filter(p => p && !p.content?.startsWith('NOT_LIVE')) // Filter drafts
    .forEach(post => {
      allWritings.push({
        url: `/posts/${post.rkey}`,
        title: post.title || 'Untitled ATProto Post',
        date: post.createdAt, // Assuming createdAt is an ISO string
        type: 'atprotoblog',
        source: 'ATProtoblog',
        rkey: post.rkey,
      });
    });

  // Add Medium posts
  mediumPosts.forEach(post => {
    allWritings.push({
      url: post.url, // Medium posts should have their full URL
      title: post.title || 'Untitled Medium Post',
      date: post.date, // Assuming date is an ISO string
      type: 'medium',
      source: 'Medium',
    });
  });

  // Add Local posts
  localPosts.forEach(post => {
    allWritings.push({
      url: `/blog/${post.year}/${post.slug}`,
      title: post.title || 'Untitled Local Post',
      date: post.date, // Assuming date is an ISO string
      type: 'local',
      source: 'Local Blog',
      slug: post.slug,
      year: post.year,
    });
  });
  
  // Sort all writings by date, most recent first
  allWritings.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const latestWritings = allWritings.slice(0, 5); // Get top 5 for the homepage

  // Tech Blog Posts are typically local posts, sorted by date
  const techBlogPosts = localPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3); // Get top 3 for the homepage

  return (
    <div className="py-8 px-6 md:px-8 w-full max-w-5xl mx-auto">
      {/* Hero Section */}
      <section className="mb-12">
        <div className="flex flex-col md:flex-row md:items-center gap-8">
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-4 text-primary">Hey, I'm {profile?.displayName || 'Skiddle'}!</h1>
            <p className="text-lg mb-3 text-primary">
              {profile?.description?.split('\n')[0] || "I'm a software developer passionate about JavaScript and open protocols, creating better information ecosystems."}
            </p>
            <p className="text-lg mb-6 text-primary">
              Check out my writings, explore my open-source projects, or learn more about what I'm working on.
            </p>
            <div className="flex gap-3 mt-4">
              <Link 
                href="/about" 
                className="inline-block px-4 py-2 bg-[var(--accent-blue)] text-white font-medium rounded hover:opacity-90 transition-colors"
              >
                About Me
              </Link>
            </div>
          </div>
          <div className="md:w-1/3 flex justify-center">
            {profile?.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img 
                src={profile.avatar} 
                alt={`${profile.displayName || 'Skiddle'}'s avatar`}
                className="w-48 h-48 rounded-lg object-cover"
              />
            ) : (
              <div className="w-48 h-48 rounded-lg bg-tertiary flex items-center justify-center">
                <span className="text-secondary">No avatar</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Notes Section */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-primary">Notes</h2>
          <Link href="/notes" className="text-secondary hover:underline">See All</Link>
        </div>
        <p className="text-lg mb-4 text-primary">Personal notes about life, music, projects, and everything else.</p>
        
        <div className="space-y-6">
          {latestWritings.length > 0 ? latestWritings.slice(0, 3).map((writing, index) => {
            const date = new Date(writing.date);
            const formattedDate = date.toLocaleDateString('en-US', { 
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            });
            const isNew = index === 0; // Consider "new" based on sorted list

            return (
              <div key={writing.url} className="border-b border-[var(--border-color)] pb-4"> {/* Use CSS var for border */}
                <div className="flex justify-between items-start mb-1">
                  <Link href={writing.url} className="text-xl font-semibold text-primary hover:text-secondary transition-colors" target={writing.type === 'medium' ? '_blank' : undefined} rel={writing.type === 'medium' ? 'noopener noreferrer' : undefined}>
                    {writing.title}
                  </Link>
                  <div className="text-sm text-300">
                    {formattedDate}
                    {isNew && <span className="ml-2 px-2 py-0.5 bg-[var(--accent-blue)] text-white text-xs rounded-full">New</span>}
                  </div>
                </div>
                <div className="text-sm text-300">
                  {writing.source}
                </div>
              </div>
            );
          }) : <p className="text-primary">No notes available at the moment.</p>}
        </div>
      </section>

      {/* Tech Blog Section */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-primary">Tech Blog</h2>
          <Link href="/tech" className="text-secondary hover:underline">See All</Link>
        </div>
        <p className="text-lg mb-4 text-primary">Guides, references, and tutorials.</p>
        
        <div className="space-y-4">
          {techBlogPosts.length > 0 ? techBlogPosts.map((post, index) => {
            const date = new Date(post.date);
            const formattedDate = date.toLocaleDateString('en-US', { 
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            });
            const isNew = index === 0; // Consider "new" based on sorted list
            
            return (
              <div key={post.slug} className="border-b border-[var(--border-color)] pb-4"> {/* Use CSS var for border */}
                <div className="flex justify-between items-start mb-1">
                  <Link href={`/blog/${post.year}/${post.slug}`} className="text-xl font-semibold text-primary hover:text-secondary transition-colors">
                    {post.title}
                  </Link>
                  <div className="text-sm text-300 flex items-center">
                    {formattedDate}
                    {isNew && <span className="ml-2 px-2 py-0.5 bg-[var(--accent-blue)] text-white text-xs rounded-full">New</span>}
                  </div>
                </div>
              </div>
            );
          }) : <p className="text-primary">No tech blog posts available at the moment.</p>}
        </div>
      </section>

      {/* Projects Section (static data) */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-primary">Projects</h2>
          <Link href="/projects" className="text-secondary hover:underline">All Projects</Link>
        </div>
        <p className="text-lg mb-4 text-primary">Open-source projects I've worked on over the years.</p>
        
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <a // External links can remain as <a> tags
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-tertiary rounded-lg hover:bg-secondary/10 transition-colors"
            >
              <h3 className="text-xl font-semibold mb-2 text-primary">{project.name}</h3>
              <p className="text-primary mb-4"> {/* Adjusted text color for consistency */}
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.languages.map((lang) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={lang}
                    src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${lang}/${lang}-original.svg`}
                    alt={`${lang} icon`}
                    className="w-6 h-6"
                  />
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-secondary/20 text-secondary text-xs rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
