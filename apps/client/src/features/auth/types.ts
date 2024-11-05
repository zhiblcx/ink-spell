export interface SignInDao {
  account: string
  password: string
  [key: string]: string | undefined | boolean
}

export interface SignUpDao extends SignInDao {
  username: string
  email?: string
  code?: string
}

export interface SigninValue extends SignInDao {
  remember: boolean
}

export interface SignupValue extends SignUpDao {
  confirmPassword: string
}
