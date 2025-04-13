import React from 'react'
import { json, LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import ReactMarkdown from 'react-markdown'
import { promises as fs } from 'fs'
import path from 'path'
import { getProfile } from '../../atproto'
import { Comments } from '../components/Comments'

interface BlogPost {
  content: string
  frontmatter: {
    title: string
    date: string
    description: string
    tags?: string
  }
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { year, slug } = params
  const profile = await getProfile()
  
  try {
    if (!year || !slug) {
      throw new Error('Year and slug parameters are required')
    }

    const postsDir = path.join(process.cwd(), 'posts', year)
    // Find the file that matches the slug pattern
    const files = await fs.readdir(postsDir)
    const postFile = files.find(file => {
      // Remove date prefix and .md extension to get the slug
      const fileSlug = file.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '')
      return fileSlug === slug
    })

    if (!postFile) {
      throw new Error('Post not found')
    }

    const filePath = path.join(postsDir, postFile)
    const content = await fs.readFile(filePath, 'utf-8')
    
    const [, frontmatterStr = '', ...contentParts] = content.split('---')
    const frontmatter = frontmatterStr.split('\n').reduce((acc, line) => {
      const [key, ...valueParts] = line.split(':')
      if (key && valueParts.length > 0) {
        acc[key.trim()] = valueParts.join(':').trim()
      }
      return acc
    }, {} as Record<string, string>)
    
    const blogPost: BlogPost = {
      content: contentParts.join('---'),
      frontmatter: {
        title: frontmatter.title || (slug || '').replace(/-/g, ' '),
        date: frontmatter.date || frontmatter.updated || new Date().toISOString(),
        description: frontmatter.description || '',
        tags: frontmatter.tags || '',
      },
    }
    
    return json({ post: blogPost, profile })
  } catch (error) {
    throw new Response('Not Found', { status: 404 })
  }
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data?.post) {
    return [
      { title: 'Post Not Found' },
      { description: 'The requested blog post was not found.' },
    ]
  }

  return [
    { title: `${data.post.frontmatter.title} | Skiddle's Blog` },
    { description: data.post.frontmatter.description },
    { name: 'og:title', content: data.post.frontmatter.title },
    { name: 'og:description', content: data.post.frontmatter.description },
  ]
}

// Define the components in a way that's compatible with ReactMarkdown
const markdownComponents: React.ComponentProps<typeof ReactMarkdown>['components'] = {
  h1: (props) => <h1 className="text-4xl font-bold mb-8">{props.children}</h1>,
  h2: (props) => <h2 className="text-3xl font-bold mb-6 mt-12">{props.children}</h2>,
  h3: (props) => <h3 className="text-2xl font-bold mb-4 mt-8">{props.children}</h3>,
  p: (props) => <p className="mb-6 leading-relaxed">{props.children}</p>,
  a: (props) => (
    <a
      href={props.href}
      className="text-blue-600 hover:text-blue-800 underline"
      target="_blank"
      rel="noopener noreferrer"
    >
      {props.children}
    </a>
  ),
  ul: (props) => <ul className="list-disc pl-6 mb-6 space-y-2">{props.children}</ul>,
  ol: (props) => <ol className="list-decimal pl-6 mb-6 space-y-2">{props.children}</ol>,
  li: (props) => <li>{props.children}</li>,
  blockquote: (props) => (
    <blockquote className="border-l-4 border-gray-300 pl-4 italic my-6">
      {props.children}
    </blockquote>
  ),
  code: (props) => <code className="bg-gray-100 px-1 rounded">{props.children}</code>,
  pre: (props) => (
    <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
      {props.children}
    </pre>
  ),
}

export default function BlogPost() {
  const { post, profile } = useLoaderData<typeof loader>()

  return (
    <div className="container mx-auto pt-10 md:pt-20 pb-20">
      <div className="flex flex-col text-center gap-4">
        <h1 className="text-5xl md:text-6xl font-bold">{post.frontmatter.title}</h1>
        <span className="text-md italic text-300">
          Written by {profile?.displayName} on{' '}
          {new Date(post.frontmatter.date).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </span>
      </div>

      <div className="py-4" />
      <div>
        <ReactMarkdown components={markdownComponents} className="break-words">
          {post.content}
        </ReactMarkdown>
      </div>
      
      {/* Comments section */}
      <Comments title={post.frontmatter.title} />
    </div>
  )
}
