import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBluesky, faGithub, faMedium } from '@fortawesome/free-brands-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact | Skiddle's Blog",
  description: 'Get in touch with me through various social platforms and communication channels.',
};

export default function ContactPage() {
  const contactMethods = [
    {
      name: 'Bluesky',
      username: '@skiddle.id',
      url: 'https://bsky.app/profile/skiddle.id',
      icon: <FontAwesomeIcon icon={faBluesky} className="w-5 h-5" />,
    },
    {
      name: 'GitHub',
      username: '@arcestia',
      url: 'https://github.com/arcestia',
      icon: <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />,
    },
    {
      name: 'Medium',
      username: '@arcestia',
      url: 'https://medium.com/@arcestia',
      icon: <FontAwesomeIcon icon={faMedium} className="w-5 h-5" />,
    },
  ];

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
            href="https://github.com/arcestia/atprotoblog" // This is the current repo name from the problem description
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-[var(--accent-blue)] hover:text-purple-500 transition-colors" // Updated class for accent color
          >
            View Project Repository 
            <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4 ml-2" />
          </a>
        </div>
      </div>
    </div>
  );
}
