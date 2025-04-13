import React from 'react'
import {json, MetaFunction} from '@remix-run/node'
import {useLoaderData, Link} from '@remix-run/react'
import {getProfile} from '../../atproto'
import {AppBskyActorDefs} from '@atproto/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBluesky, faGithub } from '@fortawesome/free-brands-svg-icons'
import { projects } from '../../data/projects'
import { getPosts } from '../../atproto'
import { externalLinks } from '../../data/external-links'
import { fetchMediumFeed } from '../../utils/fetchMediumFeed'
import { getLocalPosts } from '../../utils/getLocalPosts'
import { TypingText } from '../components/typing-text'

export const loader = async () => {
  const [profile, posts, mediumLinks, localPosts] = await Promise.all([
    getProfile(),
    getPosts(undefined),
    fetchMediumFeed(),
    getLocalPosts()
  ])

  // Filter out draft posts
  const postsFiltered = posts
    .filter(p => !p.content?.startsWith('NOT_LIVE'))
    .map(post => ({
      type: 'atprotoblog' as const,
      title: post.title,
      url: `/posts/${post.rkey}`,
      date: post.createdAt,
      rkey: post.rkey,
    }))

  // Combine all writing items and sort by date
  const allItems = [
    ...postsFiltered,
    ...localPosts.map(post => ({
      ...post,
      url: `/blog/${post.year}/${post.slug}`,
      type: 'local'
    })),
    ...externalLinks,
    ...mediumLinks
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  // Get only the latest items for each section
  const latestWritings = allItems.slice(0, 5)
  
  // Filter tech blog posts (using local posts for tech blog)
  const techBlogPosts = localPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3)

  return json({ profile, latestWritings, techBlogPosts })
}

export const meta: MetaFunction = () => {
  return [
    {title: "It's Skiddle! "},
    {
      name: 'description',
      content: 'javascript, ATProto, decentralized social media',
    },
  ]
}

export default function Index() {
  const {profile, latestWritings, techBlogPosts} = useLoaderData<{
    profile: AppBskyActorDefs.ProfileViewDetailed,
    latestWritings: any[],
    techBlogPosts: any[]
  }>()

  return (
    <div className="py-8 px-6 md:px-8 w-full max-w-5xl mx-auto">
      {/* Hero Section */}
      <section className="mb-12">
        <div className="flex flex-col md:flex-row md:items-center gap-8">
          <div className="flex-1">
            <TypingText
              lines={[
                "Hey, I'm Skiddle!",
                "I'm a software engineer, open-source creator, and former professional chef. I've been making websites since 1998 and writing on this blog for the past decade.",
                "I enjoy weight lifting, reading sci-fi and fantasy, playing retro video games, and spending time with my partner and friends."
              ]}
              className="mb-6"
              startDelay={0.2}
            >
              {(line, i) => (
                i === 0 ? (
                  <h1 className="text-4xl font-bold mb-4">{line}</h1>
                ) : (
                  <p className="text-lg mb-3">{line}</p>
                )
              )}
            </TypingText>
            <div className="flex gap-3">
              <Link 
                to="/about" 
                className="inline-block px-4 py-2 bg-secondary text-white font-medium rounded hover:bg-secondary/90 transition-colors"
              >
                About Me
              </Link>
              <a 
                href="https://bsky.app/profile/skiddle.id" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 border border-secondary text-secondary font-medium rounded hover:bg-secondary/10 transition-colors"
              >
                Newsletter
              </a>
            </div>
          </div>
          <div className="md:w-1/3 flex justify-center">
            <img 
              src={profile?.avatar} 
              alt="Skiddle's avatar" 
              className="w-48 h-48 rounded-lg object-cover"
            />
          </div>
        </div>
      </section>

      {/* Notes Section */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Notes</h2>
          <Link to="/notes" className="text-secondary hover:underline">See All</Link>
        </div>
        <p className="text-lg mb-4">Personal notes about life, music, projects, and everything else.</p>
        
        <div className="space-y-6">
          {latestWritings.slice(0, 3).map((writing, index) => {
            const date = new Date(writing.date);
            const formattedDate = date.toLocaleDateString('en-US', { 
              year: 'numeric',
              month: 'long'
            });
            const isNew = index === 0;

            return (
              <div key={writing.url} className="border-b border-light pb-4">
                <div className="flex justify-between items-start mb-1">
                  <Link to={writing.url} className="text-xl font-semibold hover:text-secondary transition-colors">
                    {writing.title}
                  </Link>
                  <div className="text-sm text-300">
                    {formattedDate}
                    {isNew && <span className="ml-2 px-2 py-0.5 bg-accent-blue text-white text-xs rounded-full">New</span>}
                  </div>
                </div>
                <div className="text-sm text-300">
                  {writing.type === 'external' ? writing.source : writing.type === 'local' ? 'Local Blog' : 'Atprotoblog'}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Tech Blog Section */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Tech Blog</h2>
          <Link to="/tech" className="text-secondary hover:underline">See All</Link>
        </div>
        <p className="text-lg mb-4">Guides, references, and tutorials.</p>
        
        <div className="space-y-4">
          {techBlogPosts.map((post, index) => {
            const date = new Date(post.date);
            const formattedDate = date.toLocaleDateString('en-US', { 
              year: 'numeric',
              month: 'long'
            });
            const isNew = index === 0;
            
            return (
              <div key={post.slug} className="border-b border-light pb-4">
                <div className="flex justify-between items-start mb-1">
                  <Link to={`/blog/${post.year}/${post.slug}`} className="text-xl font-semibold hover:text-secondary transition-colors">
                    {post.title}
                  </Link>
                  <div className="text-sm text-300 flex items-center">
                    {formattedDate}
                    {isNew && <span className="ml-2 px-2 py-0.5 bg-accent-blue text-white text-xs rounded-full">New</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Projects Section */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Projects</h2>
          <Link to="/projects" className="text-secondary hover:underline">All Projects</Link>
        </div>
        <p className="text-lg mb-4">Open-source projects I've worked on over the years.</p>
        
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <a
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-tertiary rounded-lg hover:bg-secondary/10 transition-colors"
            >
              <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
              <p className="text-neutral-800 dark:text-neutral-200 mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.languages.map((lang) => (
                  <img
                    key={lang}
                    src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${lang}/${lang}-original.svg`}
                    alt={`${lang} icon`}
                    className="w-6 h-6"
                  />
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-secondary/20 text-secondary text-xs rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
