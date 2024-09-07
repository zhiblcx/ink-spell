import { hash } from 'bcryptjs'

export async function bcryptPassword(password: string) {
  return hash(password, Number(import.meta.env.VITE_HASH_SALT_OR_ROUNDS))
}
