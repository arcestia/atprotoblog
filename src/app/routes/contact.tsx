import React from 'react'
import {MetaFunction} from '@remix-run/node'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBluesky, faGithub } from '@fortawesome/free-brands-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

export const meta: MetaFunction = () => {
  return [
    {title: "Contact | Skiddle's Blog"},
    {
      name: 'description',
      content: 'Get in touch with me through various social platforms and communication channels.',
    },
  ]
}

export default function Contact() {
  const contactMethods = [
    {
      name: 'Bluesky',
      username: '@skiddle.id',
      url: 'https://bsky.app/profile/skiddle.id',
      icon: <FontAwesomeIcon icon={faBluesky} className="text-2xl" />,
    },
    {
      name: 'GitHub',
      username: '@arcestia',
      url: 'https://github.com/arcestia',
      icon: <FontAwesomeIcon icon={faGithub} className="text-2xl" />,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8">Get in Touch</h1>
        
        <p className="text-lg text-primary mb-8">
          I'm always interested in connecting with fellow developers, technology enthusiasts,
          and anyone interested in decentralized social media. Feel free to reach out
          through any of the platforms below.
        </p>

        <div className="space-y-6">
          {contactMethods.map((method) => (
            <a
              key={method.name}
              href={method.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 bg-tertiary rounded-lg hover:bg-secondary transition-colors duration-200"
            >
              <div className="mr-4 text-primary">{method.icon}</div>
              <div>
                <h2 className="text-xl font-semibold text-primary">{method.name}</h2>
                <p className="text-secondary">{method.username}</p>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-12 p-6 bg-tertiary rounded-lg">
          <h2 className="text-2xl font-bold text-primary mb-4">Open Source</h2>
          <p className="text-primary mb-4">
            Interested in contributing to my projects? Check out my repositories on GitHub
            and feel free to open issues or submit pull requests.
          </p>
          <a
            href="https://github.com/arcestia/atprotoblog"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center accent-blue hover-text-purple transition-colors"
          >
            View ATProtoBlog Repository 
            <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
          </a>
        </div>
      </div>
    </div>
  )
}
