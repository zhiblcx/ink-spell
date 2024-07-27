import { antdResolver } from '@silver-wolf/auto-import'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig, loadEnv } from 'vite'

const DEFAULT_PORT = 6600
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const { VITE_BASE_API_PORT, VITE_BASE_API_PREFIX, VITE_SERVER_URL } = loadEnv(mode, process.cwd())
  return {
    server: {
      port: parseInt(VITE_BASE_API_PORT) || DEFAULT_PORT,
      proxy: {
        [VITE_BASE_API_PREFIX]: {
          target: VITE_SERVER_URL,
          changeOrigin: true
          // rewrite: path => path.replace(RegExp('^api', ''))
        }
      }
    },
    plugins: [
      react(),
      TanStackRouterVite(),
      AutoImport({
        imports: ['react'],
        resolvers: [antdResolver()],
        dts: '@types/auto-imports.d.ts',
        eslintrc: {
          enabled: true
        }
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    define: {
      'process.env': loadEnv(mode, process.cwd())
    }
  }
})
