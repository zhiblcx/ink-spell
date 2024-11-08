import type { Resolver } from 'unplugin-auto-import/types'
import { enumsBuiltInApi } from './preset'

export const clientEnumsResolver = (): Resolver => ({
  type: 'component',
  resolve: (name: string) => {
    if (enumsBuiltInApi.includes(name)) {
      return {
        from: '@/shared/enums',
        name
      }
    }
    return undefined
  }
})
