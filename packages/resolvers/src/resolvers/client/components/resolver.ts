import type { Resolver } from 'unplugin-auto-import/types'

import { componentBuiltInApi } from './preset'

export const clientComponentResolver = (): Resolver => ({
  type: 'component',
  resolve: (name: string) => {
    if (componentBuiltInApi.includes(name)) {
      return {
        from: '@/shared/components',
        name
      }
    }
    return undefined
  }
})
