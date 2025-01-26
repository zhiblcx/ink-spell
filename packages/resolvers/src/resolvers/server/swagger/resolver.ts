import type { Resolver } from 'unplugin-auto-import/types'
import { serverSwaggerBuiltInApi } from './preset'

export const serverSwaggerResolver = (): Resolver => ({
  type: 'component',
  resolve: (name: string) => {
    if (serverSwaggerBuiltInApi.includes(name)) {
      return {
        from: '@nestjs/swagger',
        name
      }
    }
    return undefined
  }
})
