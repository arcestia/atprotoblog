// Removed: "use client";

import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

// Data fetching functions
import { getPosts as getAtprotoPosts } from '../../atproto/getPosts';
import { getLocalPosts } from '../../utils/getLocalPosts';
import { fetchMediumFeed } from '../../utils/fetchMediumFeed';
import { externalLinks } from '../../data/external-links'; // Static data

// Types - these should ideally be centralized
import type { WhtwndBlogEntryView } from '../../types/whtwnd';
import type { MediumPost } from '../../types/medium';
import type { LocalPost } from '../../types/links';
import type { ExternalLink as ExternalLinkType } from '../../types/links';

// Unified WritingItem type for this page
interface WritingItem {
  type: 'atprotoblog' | 'local' | 'medium' | 'external';
  title: string;
  url: string;
  date: string; // ISO String
  source: string;
  rkey?: string;
  slug?: string;
  year?: string;
}

export const metadata: Metadata = {
  title: "Writing | Skiddle's Blog",
  description: 'A collection of my thoughts, experiences, and learnings.',
};

// This is the item component from the original file, slightly adapted.
function WritingItemCard({ item, isNew }: { item: WritingItem; isNew?: boolean }) {
  const isExternal = item.type === 'external' || item.type === 'medium';
  
  const linkProps = {
    href: item.url,
    className: "flex flex-col space-y-1 mb-4 hover:opacity-75 transition-opacity",
    ...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})
  };
  
  return (
    // @ts-ignore TODO: Fix type issue with LinkProps if isExternal is true
    <Link {...linkProps}>
      <div className="w-full flex flex-row justify-between items-center">
        <div className="flex flex-col">
          <p className="text-primary tracking-tight">{item.title}</p>
          <p className="text-secondary text-sm italic">
            {item.source}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <p className={`text-secondary tabular-nums text-right ${isNew ? 'new-post-pill' : ''}`}> {/* Ensure new-post-pill is defined */}
            {new Date(item.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short', // Using short month as in original
              day: 'numeric',
            })}
            {isNew && <span className="ml-2 px-2 py-0.5 bg-[var(--accent-blue)] text-white text-xs rounded-full">New!</span>}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default async function WritingPage() {
  let atprotoPosts: WhtwndBlogEntryView[] = [];
  let localPostsData: LocalPost[] = [];
  let mediumPostsData: MediumPost[] = [];
  // externalLinks is already imported

  try {
    atprotoPosts = await getAtprotoPosts(undefined);
  } catch (e) { console.error("Error fetching ATProto posts for Writing page:", e); }
  try {
    localPostsData = await getLocalPosts(); // Content not needed for list view
  } catch (e) { console.error("Error fetching local posts for Writing page:", e); }
  try {
    mediumPostsData = await fetchMediumFeed();
  } catch (e) { console.error("Error fetching Medium posts for Writing page:", e); }

  const allItems: WritingItem[] = [];

  atprotoPosts
    .filter(p => p && !p.content?.startsWith('NOT_LIVE'))
    .forEach(post => {
      allItems.push({
        type: 'atprotoblog',
        title: post.title || 'Untitled ATProto Post',
        url: `/posts/${post.rkey}`,
        date: post.createdAt,
        source: 'ATProtoblog',
        rkey: post.rkey,
      });
    });

  localPostsData.forEach(post => {
    allItems.push({
      type: 'local',
      title: post.title || 'Untitled Local Post',
      url: `/blog/${post.year}/${post.slug}`,
      date: post.date,
      source: 'Local Blog',
      slug: post.slug,
      year: post.year,
    });
  });
  
  mediumPostsData.forEach(post => {
    allItems.push({
      type: 'medium',
      title: post.title || 'Untitled Medium Post',
      url: post.url,
      date: post.date,
      source: post.source || 'Medium',
    });
  });

  externalLinks.forEach((link: ExternalLinkType) => {
    allItems.push({
      type: 'external',
      title: link.title || 'External Article',
      url: link.url,
      date: link.date,
      source: link.source,
    });
  });

  allItems.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="container flex flex-col mx-auto gap-10 px-4 py-12">
      <div className="flex-col text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">Writing</h1>
        <p className="text-lg text-secondary">
          A collection of my thoughts, experiences, and learnings.
        </p>
      </div>

      <div className="flex flex-col max-w-2xl mx-auto w-full">
        {allItems.length > 0 ? allItems.map((item, index) => (
          <WritingItemCard 
            key={`${item.type}-${item.url}-${index}`} // More unique key
            item={item}
            isNew={index === 0} // Mark the first item in the sorted list as new
          />
        )) : (
          <p className="text-primary text-center">No articles available at the moment. Please check back soon!</p>
        )}
      </div>
    </div>
  );
}
