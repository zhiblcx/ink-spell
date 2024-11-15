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

