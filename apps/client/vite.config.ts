import { antdResolver } from '@silver-wolf/auto-import'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'

const DEFAULT_PORT = 6600

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: DEFAULT_PORT,
    proxy: {
      '/api': {
        target: 'http://localhost:8800',
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
  }
})
