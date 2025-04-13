import React from 'react';
import { Link } from '@remix-run/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faBluesky } from '@fortawesome/free-brands-svg-icons';
import { faBook, faCode, faUser, faNoteSticky } from '@fortawesome/free-solid-svg-icons';
import { ThemeSwitcher } from './theme-switcher';

export function Topbar() {
  return (
    <nav className="bg-[var(--bg-secondary)] border-b border-light sticky top-0 z-10 py-3 px-4">
      <div className="container mx-auto flex justify-end items-center">
        <div className="flex items-center space-x-6">
          <Link to="/notes" className="flex items-center hover:text-[var(--accent-blue)] transition-colors">
            <FontAwesomeIcon icon={faNoteSticky} className="mr-2" />
            <span>Notes</span>
          </Link>
          
          <Link to="/tech" className="flex items-center hover:text-[var(--accent-blue)] transition-colors">
            <FontAwesomeIcon icon={faBook} className="mr-2" />
            <span>Blog</span>
          </Link>
          
          <Link to="/projects" className="flex items-center hover:text-[var(--accent-blue)] transition-colors">
            <FontAwesomeIcon icon={faCode} className="mr-2" />
            <span>Projects</span>
          </Link>
          
          <Link to="/about" className="flex items-center hover:text-[var(--accent-blue)] transition-colors">
            <FontAwesomeIcon icon={faUser} className="mr-2" />
            <span>About</span>
          </Link>
          
          <ThemeSwitcher />
          
          <a
            href="https://github.com/arcestia"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-[var(--bg-tertiary)] transition-colors"
            aria-label="GitHub Profile"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
          
          <a
            href="https://bsky.app/profile/skiddle.id"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-[var(--bg-tertiary)] transition-colors"
            aria-label="Bluesky Profile"
          >
            <FontAwesomeIcon icon={faBluesky} />
          </a>
        </div>
      </div>
    </nav>
  );
}
