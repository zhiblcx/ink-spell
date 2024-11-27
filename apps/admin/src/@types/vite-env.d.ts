/// <reference types="vite/client" />
declare module '~icons/*'
{
  import type { DefineComponent } from 'vue'
  const def: DefineComponent
  export default def
}

declare module '*.vue' {
  import { ComponentOptions } from 'vue'
  const componentOptions: ComponentOptions
  export default componentOptions
}


interface ImportMetaEnv {
  readonly VITE_APP_PORT: number
  readonly VITE_BASE_API_PREFIX: string
  readonly VITE_SERVER_URL: string
  readonly VITE_HASH_SALT_OR_ROUNDS: string
  readonly VITE_CLIENT_ID: string
}
