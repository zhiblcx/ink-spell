import type { Resolver } from 'unplugin-auto-import/types'
import { i18nextBuiltInApi } from './preset'

export const clientI18nResolver = (): Resolver => ({
  type: 'component',
  resolve: (name: string) => {
    if (i18nextBuiltInApi.includes(name)) {
      return {
        from: 'react-i18next',
        name
      }
    }
    return undefined
  }
})
