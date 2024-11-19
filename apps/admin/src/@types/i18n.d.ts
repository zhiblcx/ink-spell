import resources from './resource'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'Chinese'
    resources: typeof resources
  }
}

