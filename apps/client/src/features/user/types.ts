export interface updatePasswordDao {
  password: string
  newPassword: string
  [key: string]: string | undefined
}

export interface forgetPasswordByEmailDao {
  code: string
  password: string
  email: string
  [key: string]: string | undefined
}
