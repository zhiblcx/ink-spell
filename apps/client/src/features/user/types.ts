export interface updatePasswordDao {
  password: string
  newPassword: string
}

export interface forgetPasswordByEmailDao {
  code: string
  password: string
  email: string
}
