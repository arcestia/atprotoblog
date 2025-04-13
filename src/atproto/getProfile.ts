import {bskyAgent} from './agent.js'

export const getProfile = async () => {
  const did = process.env.ATP_DID!

  const res = await bskyAgent.getProfile({
    actor: did,
  })

  if (!res.success) {
    throw new Error('Failed to get profile.')
  }

  return res.data
}
