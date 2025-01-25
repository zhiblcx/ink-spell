import type { Resolver } from 'unplugin-auto-import/types'
import { storeBuiltInApi } from './preset'

export const clientStoreResolver = (): Resolver => ({
  type: 'component',
  resolve: (name: string) => {
    if (storeBuiltInApi.includes(name)) {
      return {
        from: '@/shared/store',
        name
      }
    }
    return undefined
  }
})
