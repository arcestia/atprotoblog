import { AtpAgent, BskyAgent } from '@atproto/api'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const ATP_SERVICE = process.env.ATP_SERVICE || 'https://pds.skiddle.id/'

if (!ATP_SERVICE) {
  throw new Error('ATP_SERVICE environment variable is not set')
}

export const atpAgent = new AtpAgent({
  service: ATP_SERVICE,
})

export const bskyAgent = new BskyAgent({
  service: 'https://public.api.bsky.app/',
})
