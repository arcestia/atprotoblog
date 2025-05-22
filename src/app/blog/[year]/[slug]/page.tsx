// Removed: "use client";

import React from 'react';
import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';
import { getLocalPosts, LocalPost } from '../../../../utils/getLocalPosts'; // Adjusted path
import { Comments } from '../../../../components/Comments'; // Adjusted path
import type { Metadata, ResolvingMetadata } from 'next';

interface PageProps {
  params: {
    year: string;
    slug: string;
  };
}

// Function to fetch a single post - utility for both page and generateMetadata
async function getPost(params: { year: string; slug: string }): Promise<LocalPost | undefined> {
  const allPosts = await getLocalPosts(true); // true to include content
  return allPosts.find(p => p.year === params.year && p.slug === params.slug);
}

export async function generateStaticParams() {
  const posts = await getLocalPosts(); // Content not needed for params
  return posts.map(post => ({
    year: post.year,
    slug: post.slug,
  }));
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await getPost(params);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post was not found.',
    };
  }

  return {
    title: `${post.title} | Blog`, // Add your site name or blog name
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: new Date(post.date).toISOString(),
      // Add other OpenGraph tags as needed, e.g., images
    },
  };
}

const markdownComponents: React.ComponentProps<typeof ReactMarkdown>['components'] = {
  h1: (props) => <h1 className="text-4xl font-bold mb-8 text-primary">{props.children}</h1>,
  h2: (props) => <h2 className="text-3xl font-bold mb-6 mt-12 text-primary">{props.children}</h2>,
  h3: (props) => <h3 className="text-2xl font-bold mb-4 mt-8 text-primary">{props.children}</h3>,
  p: (props) => <p className="mb-6 leading-relaxed text-primary">{props.children}</p>,
  a: (props) => (
    <a
      href={props.href}
      className="text-blue-600 hover:text-blue-800 underline"
      target={props.href?.startsWith('http') ? '_blank' : undefined}
      rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {props.children}
    </a>
  ),
  ul: (props) => <ul className="list-disc pl-6 mb-6 space-y-2 text-primary">{props.children}</ul>,
  ol: (props) => <ol className="list-decimal pl-6 mb-6 space-y-2 text-primary">{props.children}</ol>,
  li: (props) => <li className="text-primary">{props.children}</li>,
  blockquote: (props) => (
    <blockquote className="border-l-4 border-gray-300 pl-4 italic my-6 text-primary">
      {props.children}
    </blockquote>
  ),
  code: (props) => {
    // Basic syntax highlighting for inline code, can be expanded with a library
    const { className, children } = props;
    const match = /language-(\w+)/.exec(className || '');
    if (match) {
      return <code className={`language-${match[1]} bg-gray-100 text-gray-800 px-1 rounded text-sm`}>{children}</code>;
    }
    return <code className="bg-gray-100 text-gray-800 px-1 rounded text-sm">{children}</code>;
  },
  pre: (props) => (
    <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6 text-sm">
      {/* This pre component does not apply syntax highlighting by default with react-markdown alone */}
      <code>{props.children}</code>
    </pre>
  ),
  img: ({src, alt}) => (
    <div className="flex justify-center my-6">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src as string} alt={alt as string} className="rounded-md max-w-full h-auto" />
    </div>
  ),
};

export default async function BlogPostPage({ params }: PageProps) {
  const post = await getPost(params);

  if (!post) {
    notFound(); // Triggers Next.js 404 page
  }

  // The 'profile' or author name for local markdown posts is usually not in the frontmatter.
  // You might want to use a generic site name or a fixed author name.
  const authorName = "Skiddle"; // Or your site's author name

  return (
    <div className="container mx-auto pt-10 md:pt-20 pb-20 px-4">
      <article className="max-w-3xl mx-auto"> {/* Wrap content in article tag */}
        <div className="flex flex-col text-center gap-4 mb-10">
          <h1 className="text-5xl md:text-6xl font-bold text-primary">{post.title}</h1>
          <p className="text-md italic text-300"> {/* Changed from span to p */}
            Written by {authorName} on{' '}
            {new Date(post.date).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          {post.description && (
            <p className="text-lg text-secondary mt-2">{post.description}</p>
          )}
        </div>

        {/* Removed: <div className="py-4" /> */}
        
        {/* Apply prose styles for better markdown readability if using Tailwind Typography */}
        {/* For example: className="prose prose-lg dark:prose-invert mx-auto" */}
        <div className="break-words"> 
          <ReactMarkdown components={markdownComponents}>
            {post.content || ''}
          </ReactMarkdown>
        </div>
      
        <div className="mt-12 border-t border-[var(--border-color)] pt-8"> {/* Added border-top */}
          <Comments title={post.title} />
        </div>
      </article>
    </div>
  );
}
