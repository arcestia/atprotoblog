import React from 'react'
import { json, MetaFunction } from '@remix-run/node'
import { getPosts, getProfile } from '../../atproto'
import { useLoaderData } from '@remix-run/react'
import { WhtwndBlogEntryView } from '../../types/whtwnd'
import { AppBskyActorDefs } from '@atproto/api'
import { Link } from '../components/link'
import { externalLinks } from '../../data/external-links'
import { WritingItem, BlogPost, ExternalLink } from '../../types/links'
import { fetchMediumFeed } from '../../utils/fetchMediumFeed';

export const meta: MetaFunction = () => {
  return [
    { title: "Writing | Skiddle's Blog" },
    {
      name: 'description',
      content: 'Collection of blog posts, articles, and thoughts.',
    },
  ]
}

export const loader = async () => {
  const posts = await getPosts(undefined)
  const profile = await getProfile()

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

  // Combine blog posts and external links, then sort by date
  const allItems: WritingItem[] = [
    ...postsFiltered,
    ...externalLinks,
    ...mediumLinks
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  console.log('All items:', allItems) // Debug log

  return json({ items: allItems, profile })
}

function WritingItemCard({ item }: { item: WritingItem }) {
  const isExternal = item.type === 'external'
  
  return (
    <Link 
      href={item.url}
      className="flex flex-col space-y-1 mb-4 hover:opacity-75 transition-opacity"
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      <div className="w-full flex flex-row space-x-2">
        <p className="text-secondary w-[150px] tabular-nums">
          {new Date(item.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </p>
        <div className="flex flex-col w-full">
          <p className="text-primary tracking-tight">{item.title}</p>
          <p className="text-secondary text-sm italic">
            {isExternal ? (item as ExternalLink).source : 'Atprotoblog'}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default function Writing() {
  const { items } = useLoaderData<{
    items: WritingItem[]
    profile: AppBskyActorDefs.ProfileViewDetailed
  }>()

  return (
    <div className="container flex flex-col mx-auto gap-10">
      <div className="flex-col text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">Writing</h1>
        <p className="text-lg text-secondary">
          A collection of my thoughts, experiences, and learnings.
        </p>
      </div>

      <div className="flex flex-col">
        {items.map((item, index) => (
          <WritingItemCard key={item.type === 'atprotoblog' ? item.rkey : `external-${index}`} item={item} />
        ))}
      </div>
    </div>
  )
}
