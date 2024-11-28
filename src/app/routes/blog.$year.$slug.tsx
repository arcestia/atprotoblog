import React from 'react'
import { json, LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import ReactMarkdown from 'react-markdown'
import { promises as fs } from 'fs'
import path from 'path'
import { getProfile } from '../../atproto'

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
        title: frontmatter.title || slug.replace(/-/g, ' '),
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

const markdownComponents = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-4xl font-bold mb-8">{children}</h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-3xl font-bold mb-6 mt-12">{children}</h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-2xl font-bold mb-4 mt-8">{children}</h3>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="mb-6 leading-relaxed">{children}</p>
  ),
  a: ({ href, children }: { href?: string; children: React.ReactNode }) => (
    <a
      href={href}
      className="text-blue-600 hover:text-blue-800 underline"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="list-disc pl-6 mb-6 space-y-2">{children}</ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="list-decimal pl-6 mb-6 space-y-2">{children}</ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li>{children}</li>
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="border-l-4 border-gray-300 pl-4 italic my-6">
      {children}
    </blockquote>
  ),
  code: ({ children }: { children: React.ReactNode }) => (
    <code className="bg-gray-100 px-1 rounded">{children}</code>
  ),
  pre: ({ children }: { children: React.ReactNode }) => (
    <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
      {children}
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
    </div>
  )
}
