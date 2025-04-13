import React from 'react'
import { json, MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { Link } from '../components/link'
import { getLocalPosts } from '../../utils/getLocalPosts'
import { LocalPost } from '../../types/links'

export const meta: MetaFunction = () => {
  return [
    { title: "Tech Blog | Skiddle's Blog" },
    {
      name: 'description',
      content: 'Technical guides, tutorials, and programming articles.',
    },
  ]
}

export const loader = async () => {
  const localPosts = await getLocalPosts()
  
  // Sort by date (newest first)
  const sortedPosts = localPosts.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return json({ posts: sortedPosts })
}

function TechBlogItem({ post, isNew }: { post: LocalPost; isNew?: boolean }) {
  return (
    <Link 
      href={`/blog/${post.year}/${post.slug}`}
      className="flex flex-col space-y-1 mb-4 hover:opacity-75 transition-opacity"
    >
      <div className="w-full flex flex-row justify-between items-center">
        <div className="flex flex-col">
          <p className="text-primary tracking-tight">{post.title}</p>
          <p className="text-secondary text-sm italic">
            {post.description || 'Technical article'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <p className={`text-secondary tabular-nums text-right ${isNew ? 'new-post' : ''}`}>
            {new Date(post.date).toLocaleDateString('en-US', {
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

export default function TechBlog() {
  const { posts } = useLoaderData<{
    posts: LocalPost[]
  }>()

  return (
    <div className="container flex flex-col mx-auto gap-10">
      <div className="flex-col text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">Tech Blog</h1>
        <p className="text-lg text-secondary">
          Guides, references, and tutorials on software development and technology.
        </p>
      </div>

      <div className="flex flex-col gap-6 mt-8">
        {posts.map((post, index) => (
          <TechBlogItem 
            key={post.slug} 
            post={post} 
            isNew={index === 0}
          />
        ))}
      </div>
    </div>
  )
}
