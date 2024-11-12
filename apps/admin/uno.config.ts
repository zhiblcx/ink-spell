import presetIcons from '@unocss/preset-icons'
import { defineConfig, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    //当指定presets选项时，默认预设将被忽略,所以要加上 presetUno
    presetUno(),
    presetIcons({
      collections: {
        // 导入图标
        mdi: () => import('@iconify-json/mdi/icons.json').then(i => i.default),
      }
    }),
  ],
})
