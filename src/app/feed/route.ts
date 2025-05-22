import { NextResponse } from 'next/server'; // Using NextResponse for convenience, standard Response is also fine.
import { getProfile } from '../../atproto/getProfile';
import { getPosts as getAtprotoPosts } from '../../atproto/getPosts';
import { getLocalPosts } from '../../utils/getLocalPosts';
import { fetchMediumFeed } from '../../utils/fetchMediumFeed';
import { externalLinks } from '../../data/external-links'; // Assuming this is static data

// Assuming types are defined elsewhere or can be simplified for the feed
// For example, from WhtwndBlogEntryView, LocalPost, MediumPost etc.
interface FeedItem {
  title: string;
  url: string;
  date: string; // ISO string
  content?: string;
  type: 'atprotoblog' | 'local' | 'medium' | 'external';
  source?: string; // e.g., 'Medium'
  rkey?: string;
  slug?: string;
  year?: string;
}

// Function to escape special characters in XML
function escapeXml(unsafe: string | undefined): string {
  if (typeof unsafe !== 'string') {
    return '';
  }
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const origin = process.env.NEXT_PUBLIC_SITE_URL || url.origin; // Use env var if available, else derive

  let profileData;
  let atprotoPostsData = [];
  let localPostsData = [];
  let mediumPostsData = [];

  try {
    profileData = await getProfile();
  } catch (e) { console.error("Error fetching profile for RSS:", e); }
  try {
    atprotoPostsData = await getAtprotoPosts(undefined);
  } catch (e) { console.error("Error fetching ATProto posts for RSS:", e); }
  try {
    localPostsData = await getLocalPosts(true); // true to include content
  } catch (e) { console.error("Error fetching local posts for RSS:", e); }
  try {
    mediumPostsData = await fetchMediumFeed();
  } catch (e) { console.error("Error fetching Medium posts for RSS:", e); }

  const profileName = profileData?.displayName || "My Blog"; // Fallback title
  const blogDescription = profileData?.description || "Latest posts from my blog."; // Fallback description

  const postsFiltered = atprotoPostsData.filter((p: any) => p && !p.content?.startsWith('NOT_LIVE'));

  const allItems: FeedItem[] = [];

  postsFiltered.forEach((post: any) => {
    allItems.push({
      type: 'atprotoblog',
      title: post.title || 'Untitled ATProto Post',
      url: `${origin}/posts/${post.rkey}`,
      date: post.createdAt || new Date().toISOString(),
      content: post.content, // Assuming content is plain text or HTML-like for CDATA
      rkey: post.rkey,
    });
  });

  localPostsData.forEach((post: any) => {
    allItems.push({
      type: 'local',
      title: post.title || 'Untitled Local Post',
      url: `${origin}/blog/${post.year}/${post.slug}`,
      date: post.date || new Date().toISOString(),
      content: post.content, // Markdown content, will be wrapped in CDATA
      slug: post.slug,
      year: post.year,
    });
  });
  
  // Assuming externalLinks is an array of objects with title, url, date, (optional) content
  externalLinks.forEach((link: any) => {
    allItems.push({
      type: 'external',
      title: link.title || 'External Link',
      url: link.url,
      date: link.date || new Date().toISOString(),
      content: link.content || link.description, // Use description if content not present
      source: link.source,
    });
  });

  mediumPostsData.forEach((post: any) => {
    allItems.push({
      type: 'medium',
      title: post.title || 'Medium Article',
      url: post.url,
      date: post.date || new Date().toISOString(),
      content: post.content, // Content from Medium, typically HTML
      source: 'Medium',
    });
  });
  
  allItems.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const rssItems = allItems.map(item => {
    // For content, if it's known to be HTML or Markdown that can be rendered as HTML,
    // it's good to wrap it in CDATA. If it's plain text, CDATA is not strictly necessary but harmless.
    const description = item.content ? `<![CDATA[${item.content}]]>` : '';
    return `
  <item>
    <title>${escapeXml(item.title)}</title>
    <link>${escapeXml(item.url)}</link>
    <guid isPermaLink="true">${escapeXml(item.url)}</guid>
    <pubDate>${new Date(item.date).toUTCString()}</pubDate>
    ${description ? `<description>${description}</description>` : ''}
  </item>`;
  }).join('');

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(profileName)}</title>
    <link>${origin}</link>
    <description>${escapeXml(blogDescription)}</description>
    <language>en-us</language>
    <atom:link href="${origin}/feed" rel="self" type="application/rss+xml" />
    ${rssItems}
  </channel>
</rss>`;

  return new Response(rssXml, {
    headers: { 
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=1800', // Cache for 1 hour
    },
    status: 200,
  });
}
