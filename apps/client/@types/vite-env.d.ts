/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_PORT: number
  readonly VITE_BASE_API_PREFIX: string
  readonly VITE_SERVER_URL: string
  readonly VITE_HASH_SALT_OR_ROUNDS: string
}
