export interface BskyProfileView {
  did: string
  handle: string
  displayName?: string
  description?: string
  avatar?: string
  banner?: string
  followsCount: number
  followersCount: number
  postsCount: number
  indexedAt: string
}
