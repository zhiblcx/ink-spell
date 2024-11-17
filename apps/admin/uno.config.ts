import presetIcons from '@unocss/preset-icons'
import { defineConfig, presetUno, PresetUnoTheme } from 'unocss'

export default defineConfig({
  extendTheme: (theme: PresetUnoTheme) => ({
    ...theme,
    breakpoints: {
      ...theme.breakpoints,
      ssm: "550px",
    }
  }),
  presets: [
    //当指定presets选项时，默认预设将被忽略,所以要加上 presetUno
    presetUno({ dark: "class" }),
    presetIcons({
      collections: {
        // 导入图标
        mdi: () => import('@iconify-json/mdi/icons.json').then(i => i.default),
      }
    }),
  ],
})
