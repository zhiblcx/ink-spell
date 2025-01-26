import type { Resolver } from 'unplugin-auto-import/types'
import { serverNestCommonBuiltInApi } from './preset'

export const serverNestCommonResolver = (): Resolver => ({
  type: 'component',
  resolve: (name: string) => {
    if (serverNestCommonBuiltInApi.includes(name)) {
      return {
        from: '@nestjs/common',
        name
      }
    }
    return undefined
  }
})
