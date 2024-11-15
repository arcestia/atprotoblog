import { vitePlugin as remix } from '@remix-run/dev'
import { installGlobals } from '@remix-run/node'
import { defineConfig, loadEnv } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

installGlobals()

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [remix({ appDirectory: './src/app' }), tsconfigPaths()],
    define: {
      'process.env.ATP_SERVICE': JSON.stringify(env.ATP_SERVICE),
      'process.env.ATP_IDENTIFIER': JSON.stringify(env.ATP_IDENTIFIER),
      'process.env.ATP_DID': JSON.stringify(env.ATP_DID),
      'process.env.REDIS_URL': JSON.stringify(env.REDIS_URL),
    },
  }
})
