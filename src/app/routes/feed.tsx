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
  
  // Filter out draft posts
  const postsFiltered = posts.filter(p => !p.content?.startsWith('NOT_LIVE'))

  // Create RSS feed
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
<channel>
<title>${escapeXml(profile.displayName)}</title>
<description>${escapeXml(profile.description || `Personal Blog of ${profile.displayName}`)}</description>
<link>${escapeXml(new URL(request.url).origin)}</link>
${postsFiltered.map(post => `
<item>
<title>${escapeXml(post.title)}</title>
<description><![CDATA[${post.content}]]></description>
<pubDate>${new Date(post.createdAt).toUTCString()}</pubDate>
<link>${escapeXml(`${new URL(request.url).origin}/posts/${post.rkey}`)}</link>
<guid isPermaLink="true">${escapeXml(`${new URL(request.url).origin}/posts/${post.rkey}`)}</guid>
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
