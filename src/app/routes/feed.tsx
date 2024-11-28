import { LoaderFunction } from '@remix-run/node'
import { getPosts } from '../../atproto'
import { getProfile } from '../../atproto'
import { externalLinks } from '../../data/external-links';
import { fetchMediumFeed } from '../../utils/fetchMediumFeed';
import { getLocalPosts } from '../../utils/getLocalPosts';

// Function to escape special characters in XML
function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;'
      case '>': return '&gt;'
      case '&': return '&amp;'
      case '\'': return '&apos;'
      case '"': return '&quot;'
      default: return c
    }
  })
}

export const loader: LoaderFunction = async ({ request }) => {
  const [posts, profile, localPosts] = await Promise.all([
    getPosts(undefined),
    getProfile(),
    getLocalPosts(true) // Include content for RSS feed
  ])

  // Filter out draft posts
  const postsFiltered = posts.filter(p => !p.content?.startsWith('NOT_LIVE'))

  // Fetch Medium links
  const mediumLinks = await fetchMediumFeed();

  // Combine all items
  const allItems = [
    ...postsFiltered.map(post => ({
      type: 'atprotoblog' as const,
      title: post.title,
      url: `${new URL(request.url).origin}/posts/${post.rkey}`,
      date: post.createdAt,
      content: post.content,
    })),
    ...localPosts.map(post => ({
      ...post,
      url: `${new URL(request.url).origin}/blog/${post.year}/${post.slug}`,
      content: post.content
    })),
    ...externalLinks,
    ...mediumLinks
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  // Create RSS feed
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
<channel>
<title>${escapeXml(profile.displayName)}'s Blog</title>
<link>${new URL(request.url).origin}</link>
<description>Personal blog and writings</description>
<language>en-us</language>
<atom:link href="${new URL(request.url).href}" rel="self" type="application/rss+xml"/>
${allItems.map(item => `
  <item>
    <title>${escapeXml(item.title)}</title>
    <link>${item.url}</link>
    <guid>${item.url}</guid>
    <pubDate>${new Date(item.date).toUTCString()}</pubDate>
    ${item.content ? `<description>${escapeXml(item.content)}</description>` : ''}
  </item>
`).join('')}
</channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
