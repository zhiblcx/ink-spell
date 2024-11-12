import vue from '@vitejs/plugin-vue'
import path from 'path'
import UnoCSS from 'unocss/vite'
import { defineConfig, loadEnv } from 'vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { adminIconsResolver } from '@ink-spell/resolvers'
// https://vite.dev/config/
const DEFAULT_PORT = 6600
export default defineConfig(({ mode }) => {
  const { VITE_BASE_API_PORT, VITE_BASE_API_PREFIX, VITE_SERVER_URL } = loadEnv(mode, process.cwd())
  return {
    server: {
      port: parseInt(VITE_BASE_API_PORT) || DEFAULT_PORT,
      proxy: {
        [VITE_BASE_API_PREFIX]: {
          ws: true,
          target: VITE_SERVER_URL,
          changeOrigin: true
          // rewrite: path => path.replace(RegExp('^api', ''))
        }
      }
    },
    plugins: [
      vue(),
      AutoImport({
        imports: ["vue"],
        resolvers: [adminIconsResolver()],
        dts: 'src/@types/auto-imports.d.ts',
        eslintrc: {
          enabled: true
        }
      }),
      UnoCSS(),
      Icons(),
      Components({
        resolvers: [IconsResolver()]
      })],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    }
  }
})
