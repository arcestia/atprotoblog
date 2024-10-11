import {atpAgent} from './agent.js'
import {whtwndBlogEntryRecordToView} from './dataToView'
import {WhtwndBlogEntryRecord, WhtwndBlogEntryView} from '../types'

export const getPosts = async (
  cursor: string | undefined,
) => {
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

  return posts
}