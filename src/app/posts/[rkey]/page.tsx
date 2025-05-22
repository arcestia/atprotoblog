// Removed: "use client";

import React from 'react';
import Markdown, { Components } from 'react-markdown';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPost } from '../../../../atproto/getPost'; // Adjusted path
import { getProfile } from '../../../../atproto/getProfile'; // For author display name
import { Comments } from '../../../../components/Comments'; // Adjusted path
import type { WhtwndBlogEntryView } from '../../../../types/whtwnd'; // For post type
import type { AppBskyActorDefs } from '@atproto/api'; // For profile type
import type { Metadata, ResolvingMetadata } from 'next';

interface PageProps {
  params: {
    rkey: string;
  };
}

// Function to fetch a single post - utility for both page and generateMetadata
// getPost already throws if not found or fails
async function fetchPostData(rkey: string): Promise<WhtwndBlogEntryView | null> {
  try {
    const post = await getPost(rkey);
    return post;
  } catch (error) {
    console.error(`Failed to fetch post ${rkey}:`, error);
    return null;
  }
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await fetchPostData(params.rkey);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested ATProto blog post was not found.',
    };
  }

  // Assuming post.content is markdown, create a short summary
  const summary = post.content ? post.content.substring(0, 150) + '...' : 'An ATProto blog post.';
  
  return {
    title: `${post.title} | ATProto Blog`,
    description: summary, // Use summary from content, or a specific summary field if available
    openGraph: {
      title: post.title,
      description: summary,
      type: 'article',
      publishedTime: new Date(post.createdAt).toISOString(),
      images: post.banner ? [{ url: post.banner }] : [],
    },
  };
}

const markdownComponents: Partial<Components> = {
  h1: ({children}) => (
    <>
      <h1 className="text-3xl md:text-4xl font-bold text-primary">{children}</h1>
      <div className="w-full h-0.5 bg-300 my-2"></div>
    </>
  ),
  h2: ({children}) => (
    <>
      <h2 className="text-2xl md:text-3xl font-bold pt-6 text-primary">{children}</h2>
      <div className="w-full h-0.5 bg-300 my-2"></div>
    </>
  ),
  h3: ({children}) => (<h3 className="text-xl md:text-2xl font-bold pt-4 text-primary">{children}</h3>),
  h4: ({children}) => (<h4 className="text-lg md:text-xl font-bold pt-4 text-primary">{children}</h4>),
  h5: ({children}) => (<h5 className="text-base md:text-lg font-bold pt-4 text-primary">{children}</h5>),
  p: ({children}) => <p className="py-2 text-xl text-primary">{children}</p>,
  a: ({children, href}) => <Link href={href || '#'} className="text-blue-600 hover:text-blue-800 underline" target={href?.startsWith('http') ? '_blank' : undefined} rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}>{children}</Link>,
  ul: ({children}) => <ul className="list-disc pl-4 text-primary">{children}</ul>,
  ol: ({children}) => <ol className="list-decimal pl-4 text-primary">{children}</ol>, // Corrected </ul> to </ol>
  li: ({children}) => <li className="py-1 text-primary">{children}</li>,
  blockquote: ({children}) => (<blockquote className="border-l-4 border-300 my-3 pl-4 py-1 text-primary">{children}</blockquote>),
  code: ({children}) => (<code className="bg-tertiary text-primary px-2 py-1 rounded-md font-mono text-sm">{children}</code>),
  pre: ({children}) => (<pre className="bg-tertiary text-primary p-4 rounded-md overflow-x-auto my-4 font-mono text-sm"><code>{children}</code></pre>),
  img: ({src, alt}) => (
    <div className="flex justify-center p-6">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src as string} alt={alt as string} className="rounded-md max-w-full h-auto" />
    </div>
  ),
  hr: () => <hr className="my-4 border-gray-300" />,
  table: ({children}) => (<table className="table-auto w-full border-collapse border border-gray-300">{children}</table>),
  thead: ({children}) => <thead className="bg-gray-100">{children}</thead>,
  tbody: ({children}) => <tbody className="text-primary">{children}</tbody>,
  tr: ({children}) => <tr className="border-b border-gray-300">{children}</tr>,
  th: ({children}) => <th className="border border-gray-300 p-2 text-left text-primary">{children}</th>,
  td: ({children}) => <td className="border border-gray-300 p-2 text-primary">{children}</td>,
  strong: ({children}) => <strong className="font-bold text-primary">{children}</strong>,
  em: ({children}) => <em className="italic text-primary">{children}</em>,
  del: ({children}) => <del className="text-primary">{children}</del>,
  br: () => <br />,
};

export default async function AtprotoPostPage({ params }: PageProps) {
  const post = await fetchPostData(params.rkey);
  
  let authorProfile: AppBskyActorDefs.ProfileViewDetailed | null = null;
  try {
    authorProfile = await getProfile(); // Fetch the main blog profile for author name
  } catch (error) {
    console.error("Failed to fetch author profile:", error);
    // authorProfile remains null, UI will use a fallback
  }

  if (!post) {
    notFound(); // Triggers Next.js 404 page
  }

  const authorDisplayName = authorProfile?.displayName || "Blog Author";

  return (
    <div className="container mx-auto pt-10 md:pt-20 pb-20 px-4">
      <article className="max-w-3xl mx-auto">
        <div className="flex flex-col text-center gap-4 mb-10">
          <h1 className="text-5xl md:text-6xl font-bold text-primary">{post.title}</h1>
          <p className="text-md italic text-300">
            Written by {authorDisplayName} on{' '}
            {new Date(post.createdAt).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>

        {post.banner && post.banner !== '' && (
          <div className="my-8 flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.banner} alt={`${post.title} banner`} className="rounded-md max-w-4xl w-full h-auto" />
          </div>
        )}
        
        <div className="break-words prose lg:prose-xl dark:prose-invert max-w-none"> {/* Added prose for styling */}
          <Markdown components={markdownComponents}>
            {post.content || ''}
          </Markdown>
        </div>
      
        <div className="mt-12 border-t border-[var(--border-color)] pt-8">
          <Comments title={post.title} />
        </div>
      </article>
    </div>
  );
}
