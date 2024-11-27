import React from 'react'
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  useLocation,
  NavLink,
} from '@remix-run/react'
import { LinksFunction } from '@remix-run/node'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBluesky, faGithub } from '@fortawesome/free-brands-svg-icons'
import { faRss } from '@fortawesome/free-solid-svg-icons'

import tailwindStyles from './tailwind.css'
import themeStyles from './styles/theme.css'
import homeStyles from './styles/home.css'
import { ThemeSwitcher } from './components/theme-switcher'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: tailwindStyles },
  { rel: 'stylesheet', href: themeStyles },
  { rel: 'stylesheet', href: homeStyles },
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
        <Meta />
        <Links />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex flex-col min-h-screen bg-main text-color antialiased">
        <header className="sticky top-0 z-50 border-b border-light bg-header-blur">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex justify-between items-center h-16">
              <nav className="flex items-center space-x-4 sm:space-x-6">
                <NavLink 
                  to="/" 
                  end
                  className={({ isActive }) =>
                    `text-color hover:text-secondary transition-colors ${isActive ? 'font-bold' : ''}`
                  }
                >
                  Home
                </NavLink>
                <NavLink 
                  to="/writing"
                  className={({ isActive }) =>
                    `text-color hover:text-secondary transition-colors ${isActive ? 'font-bold' : ''}`
                  }
                >
                  Writing
                </NavLink>
                <NavLink 
                  to="/about"
                  className={({ isActive }) =>
                    `text-color hover:text-secondary transition-colors ${isActive ? 'font-bold' : ''}`
                  }
                >
                  About
                </NavLink>
              </nav>
              <ThemeSwitcher />
            </div>
          </div>
        </header>
        <main className="flex-1">
          <Outlet />
        </main>
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
