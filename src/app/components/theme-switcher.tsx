import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'

export const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme')
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (savedTheme) {
      setTheme(savedTheme as 'light' | 'dark')
    } else if (systemPrefersDark) {
      setTheme('dark')
    }
  }, [])

  useEffect(() => {
    if (!mounted) return

    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme, mounted])

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  if (!mounted) return null

  return (
    <button
      onClick={toggleTheme}
      className="
        relative p-2 rounded-lg text-secondary
        bg-tertiary hover:bg-accent-blue/10
        dark:bg-secondary dark:hover:bg-accent-blue/10
        focus:outline-none focus:ring-2 focus:ring-accent-blue/50
        transition-colors duration-200
      "
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      <div className="w-6 h-6 relative flex items-center justify-center">
        <FontAwesomeIcon
          icon={faSun}
          className={`
            text-lg absolute
            transition-all duration-300 ease-in-out
            ${theme === 'dark'
              ? 'opacity-0 rotate-90 scale-50'
              : 'opacity-100 rotate-0 scale-100'
            }
          `}
        />
        <FontAwesomeIcon
          icon={faMoon}
          className={`
            text-lg absolute
            transition-all duration-300 ease-in-out
            ${theme === 'light'
              ? 'opacity-0 rotate-90 scale-50'
              : 'opacity-100 rotate-0 scale-100'
            }
          `}
        />
      </div>
    </button>
  )
}
