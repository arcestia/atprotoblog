import React from 'react'
import {json, MetaFunction} from '@remix-run/node'
import {getProfile} from '../../atproto'
import {useLoaderData} from '@remix-run/react'
import {AppBskyActorDefs} from '@atproto/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faJs, 
  faReact, 
  faNode, 
  faGithub 
} from '@fortawesome/free-brands-svg-icons'
import { 
  faCloud, 
  faCode, 
  faLock,
  faGlobe,
  faUserShield,
  faPaintBrush
} from '@fortawesome/free-solid-svg-icons'

export const meta: MetaFunction = () => {
  return [
    {title: "About Me | Skiddle's Blog"},
    {
      name: 'description',
      content: 'Learn more about me, my work, and my interests in technology and development.',
    },
  ]
}

export const loader = async () => {
  const profile = await getProfile()
  return json({profile})
}

export default function About() {
  const {profile} = useLoaderData<{
    profile: AppBskyActorDefs.ProfileViewDetailed
  }>()

  const skills = [
    {
      name: 'JavaScript/TypeScript',
      icon: faJs,
      color: 'text-yellow-500'
    },
    {
      name: 'React',
      icon: faReact,
      color: 'text-blue-400'
    },
    {
      name: 'Node.js',
      icon: faNode,
      color: 'text-green-500'
    },
    {
      name: 'ATProtocol',
      icon: faCloud,
      color: 'text-sky-500'
    },
    {
      name: 'Web Development',
      icon: faGlobe,
      color: 'text-purple-500'
    },
    {
      name: 'Decentralized Systems',
      icon: faCode,
      color: 'text-indigo-500'
    }
  ]

  const interests = [
    {
      name: 'Decentralized Social Networks',
      icon: faCloud,
      color: 'text-blue-400'
    },
    {
      name: 'Open Source Development',
      icon: faGithub,
      color: 'text-gray-500'
    },
    {
      name: 'Web Technologies',
      icon: faCode,
      color: 'text-green-500'
    },
    {
      name: 'User Experience Design',
      icon: faPaintBrush,
      color: 'text-pink-500'
    },
    {
      name: 'Digital Privacy & Security',
      icon: faUserShield,
      color: 'text-red-500'
    }
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
          {profile?.avatar && (
            <img
              src={profile.avatar}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover"
            />
          )}
          <div>
            <h1 className="text-4xl font-bold text-primary mb-4">About Me</h1>
            <p className="text-xl text-primary mb-4">
              Hi! I'm Skiddle, a passionate developer and technology enthusiast.
            </p>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-primary mb-4">Background</h2>
          <p className="text-lg text-primary mb-4">
            I specialize in web development and decentralized technologies, with a particular
            focus on the ATProtocol ecosystem. My journey in tech has been driven by a
            desire to create meaningful and impactful solutions.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-primary mb-4">Skills & Expertise</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="bg-tertiary text-primary p-4 rounded-lg flex items-center gap-3 hover:bg-secondary transition-colors duration-200"
              >
                <FontAwesomeIcon icon={skill.icon} className={`w-5 h-5 ${skill.color}`} />
                <span>{skill.name}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-primary mb-4">Current Focus</h2>
          <p className="text-lg text-primary mb-4">
            I'm currently working on various projects in the decentralized social media
            space, with a particular emphasis on building tools and applications for the
            Bluesky ecosystem.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary mb-4">Interests</h2>
          <ul className="space-y-3">
            {interests.map((interest) => (
              <li 
                key={interest.name}
                className="flex items-center gap-3 text-lg text-primary"
              >
                <FontAwesomeIcon icon={interest.icon} className={`w-5 h-5 ${interest.color}`} />
                {interest.name}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
