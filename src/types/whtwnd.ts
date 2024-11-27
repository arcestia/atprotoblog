export interface WhtwndBlogEntryRecord {
  title: string
  content: string
  createdAt: string
  ogp?: {
    url: string
  }
}

export interface WhtwndBlogEntryView {
  rkey: string
  cid: string
  title: string
  content: string
  createdAt: string
  banner?: string
}
