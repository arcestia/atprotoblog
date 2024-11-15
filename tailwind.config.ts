import type {Config} from 'tailwindcss'

export default {
  content: ['./src/app/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    container: {
      padding: '1.5rem',
      screens: {
        sm: '100%',
        md: '100%',
        lg: '850px',
      },
    },
    borderWidth: {
      0: '0',
      1: '1px',
      2: '2px',
      3: '3px',
      4: '4px',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#fff',
      black: '#000',
      0: 'var(--color-bg)',
      50: 'var(--color-50)',
      100: 'var(--color-100)',
      200: 'var(--color-200)',
      300: 'var(--color-300)',
      400: 'var(--color-400)',
      500: 'var(--color-500)',
      600: 'var(--color-600)',
      700: 'var(--color-700)',
      800: 'var(--color-800)',
      900: 'var(--color-900)',
      gray: '#1a1a1a',
    },
    extend: {},
  },
  plugins: [],
} satisfies Config
