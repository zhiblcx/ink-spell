import { Resolver } from 'unplugin-auto-import/types'
import { iconsBuiltApi } from './preset'

export const adminIconsResolver = (): Resolver => ({
  type: "component",
  resolve: (name: string) => {
    if (iconsBuiltApi.includes(name)) {
      return {
        name,
        from: "~icons/mingcute/" + (name
          .replace('Mingcute', '')
          .replace(/([0-9])([A-Z])/g, '$1-$2') // 在数字和大写字母之间添加短横线
          .replace(/([a-z])([0-9])/g, '$1-$2')
          .replace(/([a-z])([A-Z])/g, '$1-$2')
          .toLowerCase())
      }
    }
    return undefined
  }
})
