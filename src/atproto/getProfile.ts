import {bskyAgent} from './agent.js'
import {getCachedProfile, setCachedProfile} from '../redis/redis'

export const getProfile = async () => {
  // Try to get profile from cache first
  const cachedProfile = await getCachedProfile()
  if (cachedProfile) {
    console.log('Returning profile from cache')
    return cachedProfile
  }

  const did = process.env.ATP_DID!

  const res = await bskyAgent.getProfile({
    actor: did,
  })

  if (!res.success) {
    throw new Error('Failed to get profile.')
  }

  // Cache the profile
  await setCachedProfile(res.data)
  console.log('Profile cached successfully')

  return res.data
}
