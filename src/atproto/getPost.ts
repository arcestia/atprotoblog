import {atpAgent} from './agent.js'
import {WhtwndBlogEntryRecord, WhtwndBlogEntryView} from '../types/whtwnd'
import {whtwndBlogEntryRecordToView} from './dataToView'
import {getCachedPost, setCachedPost} from '../redis/redis'

export const getPost = async (rkey: string) => {
  // Try to get post from cache first
  const cachedPost = await getCachedPost(rkey)
  if (cachedPost) {
    console.log('Returning post from cache')
    return cachedPost
  }

  const repo = process.env.ATP_IDENTIFIER!

  const res = await atpAgent.com.atproto.repo.getRecord({
    collection: 'com.whtwnd.blog.entry',
    repo,
    rkey,
  })

  if (!res.success) {
    throw new Error('Failed to get post.')
  }

  const post = whtwndBlogEntryRecordToView({
    uri: res.data.uri,
    cid: res.data.cid?.toString() ?? '',
    value: res.data.value as WhtwndBlogEntryRecord,
  }) as WhtwndBlogEntryView

  // Cache the post
  await setCachedPost(post)
  console.log('Post cached successfully')

  return post
}