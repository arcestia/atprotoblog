import {atpAgent} from './agent.js'
import {whtwndBlogEntryRecordToView} from './dataToView'
import {WhtwndBlogEntryRecord, WhtwndBlogEntryView} from '../types'
import {getCachedPosts, setCachedPosts} from '../redis/redis'

export const getPosts = async (
  cursor: string | undefined,
): Promise<WhtwndBlogEntryView[]> => {
  // Try to get posts from cache first
  if (!cursor) {
    const cachedPosts = await getCachedPosts()
    if (cachedPosts) {
      console.log('Returning posts from cache')
      return cachedPosts
    }
  }

  const repo = process.env.ATP_IDENTIFIER!
  const res = await atpAgent.com.atproto.repo.listRecords({
    collection: 'com.whtwnd.blog.entry',
    repo,
    cursor,
  })

  if (!res.success) {
    throw new Error('Failed to get posts.')
  }

  const posts = res.data.records.map(data =>
    whtwndBlogEntryRecordToView({
      uri: data.uri,
      cid: data.cid?.toString() ?? '',
      value: data.value as WhtwndBlogEntryRecord,
    }),
  ) as WhtwndBlogEntryView[]

  // Cache posts only if this is the first page (no cursor)
  if (!cursor) {
    await setCachedPosts(posts)
    console.log('Posts cached successfully')
  }

  return posts
}