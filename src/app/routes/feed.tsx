import { LoaderFunction } from '@remix-run/node'
import { getPosts } from '../../atproto'
import { getProfile } from '../../atproto'

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
  const posts = await getPosts(undefined)
  const profile = await getProfile()
  const externalLinks = [
    // Add external links here
    // Example:
    // {
    //   title: 'Example External Link',
    //   type: 'external',
    //   url: 'https://example.com',
    //   date: new Date('2022-01-01T00:00:00.000Z')
    // }
  ]

  // Filter out draft posts
  const postsFiltered = posts.filter(p => !p.content?.startsWith('NOT_LIVE'))

  // Combine blog posts and external links
  const allItems = [...postsFiltered, ...externalLinks]

  // Create RSS feed
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
<channel>
<title>${escapeXml(profile.displayName)}</title>
<description>${escapeXml(profile.description || `Personal Blog of ${profile.displayName}`)}</description>
<link>${escapeXml(new URL(request.url).origin)}</link>
${allItems.map(item => `
<item>
<title>${escapeXml(item.title)}</title>
<description><![CDATA[${item.type === 'external' ? '' : item.content}]]></description>
<pubDate>${new Date(item.date || item.createdAt).toUTCString()}</pubDate>
<link>${escapeXml(item.url || `${new URL(request.url).origin}/posts/${item.rkey}`)}</link>
<guid isPermaLink="true">${escapeXml(item.url || `${new URL(request.url).origin}/posts/${item.rkey}`)}</guid>
</item>`).join('\n')}
</channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600'
    }
  })
}
