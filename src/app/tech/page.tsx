// Removed: "use client";

import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getLocalPosts } from '../../utils/getLocalPosts'; // Adjusted path
import type { LocalPost } from '../../types/links'; // Assuming LocalPost type is in a central place

export const metadata: Metadata = {
  title: "Tech Blog | Skiddle's Blog",
  description: 'Technical guides, tutorials, and programming articles.',
};

// This is the item component from the original file, slightly adapted.
function TechBlogItem({ post, isNew }: { post: LocalPost; isNew?: boolean }) {
  return (
    <Link 
      href={`/blog/${post.year}/${post.slug}`}
      className="flex flex-col space-y-1 mb-4 hover:opacity-75 transition-opacity"
    >
      <div className="w-full flex flex-row justify-between items-center">
        <div className="flex flex-col">
          <p className="text-primary tracking-tight">{post.title}</p>
          <p className="text-secondary text-sm italic">
            {post.description || 'Technical article'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <p className={`text-secondary tabular-nums text-right ${isNew ? 'new-post-pill' : ''}`}> {/* Ensure new-post-pill is defined or use alternative styling */}
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
            {isNew && <span className="ml-2 px-2 py-0.5 bg-[var(--accent-blue)] text-white text-xs rounded-full">New</span>}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default async function TechBlogPage() {
  let posts: LocalPost[] = [];
  try {
    posts = await getLocalPosts(); // Fetch all local posts
    // Already sorted by date descending by getLocalPosts
  } catch (error) {
    console.error("Failed to fetch tech blog posts:", error);
    // posts remains empty
  }

  return (
    <div className="container flex flex-col mx-auto gap-10 px-4 py-12">
      <div className="flex-col text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">Tech Blog</h1>
        <p className="text-lg text-secondary">
          Guides, references, and tutorials on software development and technology.
        </p>
      </div>

      <div className="flex flex-col gap-6 mt-8 max-w-2xl mx-auto w-full">
        {posts.length > 0 ? posts.map((post, index) => (
          <TechBlogItem 
            key={post.slug} 
            post={post} 
            isNew={index === 0} // Mark the first item in the sorted list as new
          />
        )) : (
          <p className="text-primary text-center">No tech articles available at the moment. Please check back soon!</p>
        )}
      </div>
    </div>
  );
}
