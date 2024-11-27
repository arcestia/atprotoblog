import React from 'react'
import {json, MetaFunction} from '@remix-run/node'
import {getProfile} from '../../atproto'
import {useLoaderData} from '@remix-run/react'
import {AppBskyActorDefs} from '@atproto/api'

export const loader = async () => {
  const profile = await getProfile()
  return json({profile})
}

export const meta: MetaFunction = () => {
  return [
    {title: "It's Skiddle! 👋"},
    {
      name: 'description',
      content: 'javascript, ATProto, decentralized social media',
    },
  ]
}

export default function Index() {
  const {profile} = useLoaderData<{
    profile: AppBskyActorDefs.ProfileViewDetailed
  }>()

  return (
    <div className="flex-auto min-w-0 mt-6 flex flex-col">
      <section className="mb-16">
        <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
          {profile ? (
            <img
              className="rounded-full w-24 h-24"
              src={profile.avatar}
              alt="Skiddle's avatar"
            />
          ) : (
            <div className="w-24 h-24 bg-neutral-200 dark:bg-neutral-800 rounded-full"></div>
          )}
          <div>
            <h1 className="text-2xl font-semibold tracking-tighter mb-4">Skiddle</h1>
            <p className="mb-4 text-neutral-800 dark:text-neutral-200">
              Building for the decentralized web. Currently working on ATProto and exploring the future of social networks.
            </p>
            <p className="text-neutral-800 dark:text-neutral-200">
              Passionate about JavaScript, open protocols, and creating better information ecosystems.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
