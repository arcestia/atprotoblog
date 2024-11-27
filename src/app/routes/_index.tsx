import React from 'react'
import {json, MetaFunction} from '@remix-run/node'
import {useLoaderData, NavLink, Link} from '@remix-run/react'
import {getProfile} from '../../atproto'
import {AppBskyActorDefs} from '@atproto/api'
import { ThemeSwitcher } from '../components/theme-switcher';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBluesky, faGithub, faMedium } from '@fortawesome/free-brands-svg-icons';
import { faRss } from '@fortawesome/free-solid-svg-icons';
import { socialLinks } from '../../data/social-links';
import { projects } from '../../data/projects';
import { getPosts } from '../../atproto';
import { externalLinks } from '../../data/external-links';
import { fetchMediumFeed } from '../../utils/fetchMediumFeed';

export const loader = async () => {
  const profile = await getProfile()
  const posts = await getPosts(undefined);
  const mediumLinks = await fetchMediumFeed();

  // Filter out draft posts
  const postsFiltered = posts
    .filter(p => !p.content?.startsWith('NOT_LIVE'))
    .map(post => ({
      type: 'atprotoblog' as const,
      title: post.title,
      url: `/posts/${post.rkey}`,
      date: post.createdAt,
      rkey: post.rkey,
    }));

  // Combine all writing items and sort by date
  const allItems = [
    ...postsFiltered,
    ...externalLinks,
    ...mediumLinks
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Get only the latest 5 items
  const latestWritings = allItems.slice(0, 5);

  return json({ profile, latestWritings })
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
  const {profile, latestWritings} = useLoaderData<{
    profile: AppBskyActorDefs.ProfileViewDetailed,
    latestWritings: any[]
  }>()

  return (
    <div className="flex-auto min-w-0 flex flex-col">
      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
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
                I'm always interested in connecting with fellow developers, technology enthusiasts, and anyone interested in decentralized social media. Feel free to reach out through any of the platforms below.
              </p>
              <p className="text-neutral-800 dark:text-neutral-200">
                Passionate about JavaScript, open protocols, and creating better information ecosystems.
              </p>
            </div>
          </div>
        </section>
        {latestWritings.length > 0 && (
          <section className="segment">
            <h2 className="home-heading">
              <div>
                <div className="title">Latest Writings</div>
              </div>
              <Link to="/writing" className="button">All Writings</Link>
            </h2>
            <div className="posts newspaper">
              {latestWritings.map((writing, index) => {
                const isNew = index === 0;
                const date = new Date(writing.date);
                const formattedDate = date.toLocaleDateString('en-US', { 
                  year: 'numeric',
                  month: 'long'
                });

                return (
                  <Link key={writing.url} to={writing.url} className="post">
                    <div className="post-row">
                      <h3 className="post-title">{writing.title}</h3>
                      <time className={isNew ? 'new-post' : ''}>
                        {formattedDate}
                        {isNew && <div className="new-post-pill">New!</div>}
                      </time>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4">Projects</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-6 bg-tertiary rounded-lg hover:bg-secondary transition-colors duration-200"
              >
                <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                <p className="text-neutral-800 dark:text-neutral-200 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-900 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </section>
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4">Connect with Me</h2>
          <div className="flex space-x-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-primary transition-colors"
              >
                <FontAwesomeIcon icon={link.icon} className="w-5 h-5" />
              </a>
            ))}
          </div>
        </section>
        <footer className="bg-neutral-100 dark:bg-neutral-800 py-6">
          <div className="container mx-auto px-4">
            <p className="text-center text-neutral-600 dark:text-neutral-400">
              2023 Skiddle's Blog. All rights reserved.
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}
