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
import { TypingText } from '../components/typing-text';

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
        <section className="hero-wrapper mb-16">
          <header className="hero">
            <h1 className="text-4xl font-bold mb-4">Hey, I'm Skiddle! 👋</h1>
            <TypingText 
              lines={[
                "I'm a software developer",
                "passionate about JavaScript and open protocols,",
                "creating better information ecosystems."
              ]}
              className="hero-description text-lg mb-4"
            />
            <TypingText 
              lines={[
                "Check out my writings, explore my open-source projects,",
                "or learn more about what I'm working on."
              ]}
              className="hero-description text-lg"
              startDelay={2.4}
            >
              {(line, index) => {
                if (index === 0) {
                  return (
                    <>
                      Check out my <Link to="/writing" className="text-accent-blue hover:underline">writings</Link>, 
                      explore my <a href="https://github.com/arcestia" target="_blank" rel="noopener noreferrer" className="text-accent-blue hover:underline">open-source projects</a>,
                    </>
                  );
                }
                return line;
              }}
            </TypingText>
          </header>
          <div className="decoration">
            <img
              className="image hero-image"
              src={profile?.avatar}
              alt="Skiddle's avatar"
            />
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
                      className="project-tag"
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
          <h2 className="text-2xl font-bold mb-4">Connect</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-2.5 bg-tertiary rounded-lg hover:bg-secondary transition-colors duration-200 group"
              >
                <FontAwesomeIcon 
                  icon={link.icon} 
                  className="w-5 h-5 text-secondary group-hover:text-primary transition-colors" 
                />
                <span className="ml-2 text-sm text-secondary group-hover:text-primary transition-colors">{link.name}</span>
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
