
import { HttpRequest } from "@ink-spell/axios"
export { type ResponseData } from "@ink-spell/axios"
export const httpRequest = new HttpRequest(import.meta.env.VITE_BASE_API_PREFIX, "/login")
