import React from 'react'
import { json, MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getPosts, getProfile } from '../../atproto'
import { AppBskyActorDefs } from '@atproto/api'
import { Link } from '../components/link'
import { externalLinks } from '../../data/external-links'
import { WritingItem, ExternalLink } from '../../types/links'
import { fetchMediumFeed } from '../../utils/fetchMediumFeed'

export const meta: MetaFunction = () => {
  return [
    { title: "Notes | Skiddle's Blog" },
    {
      name: 'description',
      content: 'Personal notes, thoughts, and external writings.',
    },
  ]
}

export const loader = async () => {
  const [posts, profile] = await Promise.all([
    getPosts(undefined),
    getProfile()
  ])

  const postsFiltered = posts
    .filter(p => !p.content?.startsWith('NOT_LIVE'))
    .map(post => ({
      type: 'atprotoblog' as const,
      title: post.title,
      url: `/posts/${post.rkey}`,
      date: post.createdAt,
      rkey: post.rkey,
    }))

  const mediumLinks = await fetchMediumFeed();

  // Combine AT Protocol posts and external links, then sort by date
  const allItems: WritingItem[] = [
    ...postsFiltered,
    ...externalLinks,
    ...mediumLinks
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return json({ items: allItems, profile })
}

function NoteItem({ item, isNew }: { item: WritingItem; isNew?: boolean }) {
  const isExternal = item.type === 'external'
  
  return (
    <Link 
      href={item.url}
      className="flex flex-col space-y-1 mb-4 hover:opacity-75 transition-opacity"
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      <div className="w-full flex flex-row justify-between items-center">
        <div className="flex flex-col">
          <p className="text-primary tracking-tight">{item.title}</p>
          <p className="text-secondary text-sm italic">
            {isExternal ? (item as ExternalLink).source : 'Atprotoblog'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <p className={`text-secondary tabular-nums text-right ${isNew ? 'new-post' : ''}`}>
            {new Date(item.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
            {isNew && <div className="new-post-pill">New!</div>}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default function Notes() {
  const { items, profile } = useLoaderData<{
    items: WritingItem[]
    profile: AppBskyActorDefs.ProfileViewDetailed
  }>()

  return (
    <div className="container flex flex-col mx-auto gap-10">
      <div className="flex-col text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">Notes</h1>
        <p className="text-lg text-secondary">
          Personal notes, thoughts, and external writings about life, music, projects, and everything else.
        </p>
      </div>

      <div className="flex flex-col gap-6 mt-8">
        {items.map((item, index) => (
          <NoteItem 
            key={item.type === 'atprotoblog' ? item.rkey : item.url} 
            item={item} 
            isNew={index === 0}
          />
        ))}
      </div>
    </div>
  )
}
