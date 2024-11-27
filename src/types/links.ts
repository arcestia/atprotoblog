export interface ExternalLink {
  type: 'external'
  title: string
  url: string
  source: string
  date: string
}

export interface BlogPost {
  type: 'blog'
  title: string
  url: string
  date: string
  rkey: string
}

export type WritingItem = ExternalLink | BlogPost
