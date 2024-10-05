export interface SignInDao {
  account: string
  password: string
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
