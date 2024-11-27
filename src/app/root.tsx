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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBluesky, faGithub } from '@fortawesome/free-brands-svg-icons'

import styles from './tailwind.css?url'
import themeStyles from './styles/theme.css?url'
import { Link } from './components/link'
import { ThemeSwitcher } from './components/theme-switcher'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles },
  { rel: 'stylesheet', href: themeStyles },
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
  {
    href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
    rel: 'stylesheet',
  },
]

const themeScript = `
  let theme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.classList.toggle('dark', theme === 'dark');
`

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation()

  return (
    <html lang="en" className="antialiased">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex flex-col min-h-screen bg-main text-primary antialiased">
        <div className="flex-grow">
          <header className="sticky top-0 z-50 border-b border-light bg-header-blur">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="flex justify-between items-center h-16">
                <nav className="flex items-center space-x-4 sm:space-x-6">
                  <NavLink href="/" selected={location.pathname === '/'}>
                    Home
                  </NavLink>
                  <NavLink href="/writing" selected={location.pathname === '/writing'}>
                    Writing
                  </NavLink>
                  <NavLink href="/about" selected={location.pathname === '/about'}>
                    About
                  </NavLink>
                  <NavLink href="/contact" selected={location.pathname === '/contact'}>
                    Contact
                  </NavLink>
                </nav>
                <ThemeSwitcher />
              </div>
            </div>
          </header>

          <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
            <div className="bg-card rounded-lg border border-light p-4 sm:p-6">
              {children}
            </div>
          </main>
        </div>

        <footer className="mt-auto border-t border-light bg-footer">
          <div className="container mx-auto px-4 sm:px-6 py-6">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <a
                  href="https://bsky.app/profile/skiddle.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary hover-text-blue transition-colors"
                  aria-label="Bluesky Profile"
                >
                  <FontAwesomeIcon icon={faBluesky} className="w-5 h-5" />
                </a>
                <a
                  href="https://github.com/arcestia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary hover-text-blue transition-colors"
                  aria-label="GitHub Profile"
                >
                  <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />
                </a>
              </div>
              <p className="text-secondary text-sm">
                {new Date().getFullYear()}{' '}
                <a
                  href="https://github.com/arcestia/atprotoblog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="accent-blue hover-text-purple transition-colors"
                >
                  ATProtoBlog
                </a>
              </p>
            </div>
          </div>
        </footer>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}

function NavLink({
  href,
  selected,
  children,
}: {
  href: string
  selected: boolean
  children: string
}) {
  return (
    <Link
      href={href}
      className={`
        relative py-1 text-primary hover-text-blue
        transition-colors duration-200 font-medium
        ${selected ? 'accent-blue' : ''}
        after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5
        after:bg-accent-blue after:scale-x-0 hover:after:scale-x-100
        after:transition-transform after:duration-200
        ${selected ? 'after:scale-x-100' : ''}
      `}
    >
      {children}
    </Link>
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
      <body className="bg-main text-primary">
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <div className="max-w-md w-full space-y-4 text-center">
            <h1 className="text-4xl font-bold accent-red">Oops!</h1>
            <p className="text-lg text-secondary">Something went wrong.</p>
            <Link
              href="/"
              className="inline-block px-4 py-2 rounded-lg bg-accent-blue hover:bg-accent-purple text-white transition-colors"
            >
              Go back home
            </Link>
          </div>
        </div>
        <Scripts />
      </body>
    </html>
  )
}
