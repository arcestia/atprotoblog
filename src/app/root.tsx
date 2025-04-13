import React from 'react'
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  useLocation,
} from '@remix-run/react'
import { LinksFunction } from '@remix-run/node'
import { Sidebar } from './components/Sidebar'
import { Topbar } from './components/Topbar'

import tailwindStyles from './tailwind.css'
import themeStyles from './styles/theme.css'
import homeStyles from './styles/home.css'
import blogStyles from './styles/blog.css'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: tailwindStyles },
  { rel: 'stylesheet', href: themeStyles },
  { rel: 'stylesheet', href: homeStyles },
  { rel: 'stylesheet', href: blogStyles },
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
  {
    href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
    rel: 'stylesheet',
  },
]

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-[var(--bg-main)] text-[var(--text-color)]">
        <div className="flex flex-col md:flex-row min-h-screen">
          {/* Sidebar - hidden on mobile */}
          <div className="hidden md:block">
            <Sidebar />
          </div>
          
          {/* Main content */}
          <div className="flex-1 flex flex-col">
            {/* Topbar - visible on all screen sizes */}
            <Topbar />
            
            <main className="flex-1">
              <Outlet />
            </main>
            
            <footer className="py-8 bg-[var(--bg-secondary)]">
              <div className="container mx-auto px-4">
                <div className="text-center text-sm text-[var(--text-tertiary)]">
                  <div className="flex justify-center space-x-4 mb-4">
                    <a href="mailto:hello@skiddle.id" className="hover:text-[var(--accent-blue)] transition-colors">Email</a>
                    <span>•</span>
                    <a href="https://github.com/arcestia" className="hover:text-[var(--accent-blue)] transition-colors">GitHub</a>
                    <span>•</span>
                    <a href="https://bsky.app/profile/skiddle.id" className="hover:text-[var(--accent-blue)] transition-colors">Bluesky</a>
                    <span>•</span>
                    <a href="https://github.com/sponsors/arcestia" className="hover:text-[var(--accent-blue)] transition-colors">Donate!</a>
                  </div>
                  <div className="flex justify-center space-x-2 mb-2">
                    <a href="#" className="px-3 py-1 bg-[var(--bg-tertiary)] text-[var(--text-color)] rounded-full text-xs font-medium hover:bg-[var(--accent-blue)] hover:text-white transition-colors">Contact</a>
                    <a href="#" className="px-3 py-1 bg-[var(--bg-tertiary)] text-[var(--text-color)] rounded-full text-xs font-medium hover:bg-[var(--accent-blue)] hover:text-white transition-colors">Privacy</a>
                  </div>
                  <div>
                    Made with ❤️ by Laurensius Jeffrey Chandra
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export function ErrorBoundary() {
  const error = useRouteError()

  return (
    <html lang="en">
      <head>
        <title>Error!</title>
        <Meta />
        <Links />
      </head>
      <body className="bg-[var(--bg-main)] text-[var(--text-color)]">
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Oops! Something went wrong</h1>
          <p className="text-xl mb-8">We encountered an error while trying to load this page.</p>
          <pre className="bg-[var(--bg-tertiary)] p-4 rounded-lg overflow-auto max-w-full">
            {error instanceof Error ? error.message : JSON.stringify(error, null, 2)}
          </pre>
          <a href="/" className="mt-8 px-4 py-2 bg-[var(--accent-blue)] text-white rounded hover:opacity-90">
            Go back home
          </a>
        </div>
        <Scripts />
      </body>
    </html>
  )
}
