import { AppBskyActorDefs } from '@atproto/api'
import { WhtwndBlogEntryView } from '../types'
import Redis from 'ioredis'

// Redis configuration
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379'
const CACHE_TTL = 60 * 60 // 1 hour in seconds

// Create a lazy-loaded Redis client
let redisClient: Redis | null = null

const getRedisClient = () => {
  if (!redisClient) {
    try {
      redisClient = new Redis(REDIS_URL, {
        retryStrategy: (times) => {
          const delay = Math.min(times * 50, 2000)
          return delay
        },
        maxRetriesPerRequest: 3,
        // Add a connection timeout
        connectTimeout: 10000,
        // Disable auto reconnect in development
        reconnectOnError: process.env.NODE_ENV === 'production' ? () => true : () => false,
      })

      redisClient.on('error', (error) => {
        console.error('Redis connection error:', error)
        if (process.env.NODE_ENV !== 'production') {
          // In development, null out the client on error so it can be recreated
          redisClient = null
        }
      })

      redisClient.on('connect', () => {
        console.log('Successfully connected to Redis')
      })
    } catch (error) {
      console.error('Failed to create Redis client:', error)
      return null
    }
  }
  return redisClient
}

// Helper function to handle Redis operations with fallback
const handleRedisOperation = async <T>(operation: () => Promise<T>): Promise<T | null> => {
  const client = getRedisClient()
  if (!client) {
    console.warn('Redis client not available, skipping cache operation')
    return null
  }

  try {
    return await operation()
  } catch (error) {
    console.error('Redis operation failed:', error)
    return null
  }
}

export const getCachedPosts = async (): Promise<WhtwndBlogEntryView[] | null> => {
  return handleRedisOperation(async () => {
    const client = getRedisClient()
    if (!client) return null
    const data = await client.get('posts')
    return data ? JSON.parse(data) : null
  })
}

export const setCachedPosts = async (posts: WhtwndBlogEntryView[]): Promise<void> => {
  await handleRedisOperation(async () => {
    const client = getRedisClient()
    if (!client) return
    await client.setex('posts', CACHE_TTL, JSON.stringify(posts))
  })
}

export const getCachedPost = async (rkey: string): Promise<WhtwndBlogEntryView | null> => {
  return handleRedisOperation(async () => {
    const client = getRedisClient()
    if (!client) return null
    const data = await client.get(`post:${rkey}`)
    return data ? JSON.parse(data) : null
  })
}

export const setCachedPost = async (post: WhtwndBlogEntryView): Promise<void> => {
  await handleRedisOperation(async () => {
    const client = getRedisClient()
    if (!client) return
    await client.setex(`post:${post.record.rkey}`, CACHE_TTL, JSON.stringify(post))
  })
}

export const getCachedProfile = async (): Promise<AppBskyActorDefs.ProfileViewDetailed | null> => {
  return handleRedisOperation(async () => {
    const client = getRedisClient()
    if (!client) return null
    const data = await client.get('profile')
    return data ? JSON.parse(data) : null
  })
}

export const setCachedProfile = async (
  profile: AppBskyActorDefs.ProfileViewDetailed,
): Promise<void> => {
  await handleRedisOperation(async () => {
    const client = getRedisClient()
    if (!client) return
    await client.setex('profile', CACHE_TTL, JSON.stringify(profile))
  })
}

// Clean up Redis connection on process exit
if (process.env.NODE_ENV === 'production') {
  process.on('SIGTERM', () => {
    if (redisClient) {
      redisClient.disconnect()
    }
  })
}