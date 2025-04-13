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

const themeScript = `
  let theme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.classList.toggle('dark', theme === 'dark');
`

export default function App() {
  const location = useLocation()

  return (
    <html lang="en" className="antialiased">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-adsense-account" content="ca-pub-5163720941664319" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5163720941664319" crossOrigin="anonymous"></script>
        <Meta />
        <Links />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex flex-col min-h-screen bg-main text-color antialiased">
        <div className="flex flex-1">
          {/* Sidebar for desktop */}
          <div className="hidden md:block">
            <Sidebar />
          </div>
          
          {/* Mobile header */}
          <header className="md:hidden sticky top-0 z-50 border-b border-light bg-header-blur">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="flex justify-between items-center h-16">
                <nav className="flex items-center space-x-4 sm:space-x-6">
                  <a 
                    href="/" 
                    className="text-color hover:text-secondary transition-colors font-bold"
                  >
                    skiddle.dev
                  </a>
                </nav>
                <button 
                  className="text-color hover:text-secondary transition-colors"
                  aria-label="Menu"
                >
                  ☰
                </button>
              </div>
            </div>
          </header>
          
          {/* Main content */}
          <div className="flex-1 flex flex-col">
            <main className="flex-1">
              <Outlet />
            </main>
            
            <footer className="bg-neutral-100 dark:bg-neutral-800 py-8">
              <div className="container mx-auto px-4">
                <div className="text-center text-sm text-neutral-600 dark:text-neutral-400">
                  <div className="flex justify-center space-x-4 mb-4">
                    <a href="mailto:hello@skiddle.dev" className="hover:text-secondary">Email</a>
                    <span>•</span>
                    <a href="https://github.com/arcestia" className="hover:text-secondary">GitHub</a>
                    <span>•</span>
                    <a href="https://bsky.app/profile/skiddle.id" className="hover:text-secondary">Bluesky</a>
                    <span>•</span>
                    <a href="#" className="hover:text-secondary">Buy me a coffee</a>
                  </div>
                  <div className="flex justify-center space-x-2 mb-2">
                    <a href="#" className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">Contact</a>
                    <a href="#" className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">Privacy</a>
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
  console.error(error)

  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <h1>Something went wrong!</h1>
        <Scripts />
      </body>
    </html>
  )
}
