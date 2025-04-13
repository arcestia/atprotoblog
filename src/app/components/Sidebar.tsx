import React from 'react';
import { NavLink, Link } from '@remix-run/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBluesky, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faRss } from '@fortawesome/free-solid-svg-icons';
import { ThemeSwitcher } from './theme-switcher';

export function Sidebar() {
  return (
    <aside className="w-56 flex-shrink-0 border-r border-light bg-main h-screen sticky top-0 overflow-y-auto">
      <div className="p-5 flex flex-col h-full">
        <div className="mb-8">
          <Link to="/" className="text-xl font-bold hover:text-secondary transition-colors">
            skiddle.dev
          </Link>
        </div>

        <div className="mb-8">
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-300 uppercase tracking-wider">About Me</h2>
          </div>
          <div className="text-sm space-y-2">
            <p>I'm Skiddle, software engineer and open-source creator. This is my digital garden. 🌱</p>
          </div>
        </div>

        <div className="mb-8">
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-300 uppercase tracking-wider">Stay Connected</h2>
          </div>
          <nav className="space-y-2 text-sm">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faRss} className="w-4 h-4 mr-2 text-300" />
              <Link to="/rss.xml" className="hover:text-secondary transition-colors">RSS Feed</Link>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faBluesky} className="w-4 h-4 mr-2 text-300" />
              <a href="https://bsky.app/profile/skiddle.id" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">Bluesky Starter Pack</a>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faGithub} className="w-4 h-4 mr-2 text-300" />
              <a href="https://github.com/arcestia" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">GitHub</a>
            </div>
          </nav>
        </div>

        <div className="mb-8">
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-300 uppercase tracking-wider">Guides</h2>
          </div>
          <nav className="space-y-2 text-sm">
            <div className="flex items-center">
              <Link to="/guides/macos-setup" className="hover:text-secondary transition-colors">macOS Setup for Devs</Link>
            </div>
            <div className="flex items-center">
              <Link to="/guides/css-guidebook" className="hover:text-secondary transition-colors">CSS Guidebook</Link>
            </div>
            <div className="flex items-center">
              <Link to="/guides/react-architecture" className="hover:text-secondary transition-colors">React Architecture</Link>
            </div>
            <div className="flex items-center">
              <Link to="/guides" className="hover:text-secondary transition-colors">All Topics</Link>
            </div>
          </nav>
        </div>

        <div className="mb-8">
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-300 uppercase tracking-wider">Project Writeups</h2>
          </div>
          <nav className="space-y-2 text-sm">
            <div className="flex items-center">
              <Link to="/projects/keyboard-accordion" className="hover:text-secondary transition-colors">Keyboard Accordion</Link>
            </div>
            <div className="flex items-center">
              <Link to="/projects/snes-memory-game" className="hover:text-secondary transition-colors">SNES Memory Game</Link>
            </div>
            <div className="flex items-center">
              <Link to="/projects/chip-8-emulator" className="hover:text-secondary transition-colors">Chip-8 Emulator</Link>
            </div>
          </nav>
        </div>

        <div className="mt-auto">
          <ThemeSwitcher />
        </div>
      </div>
    </aside>
  );
}
