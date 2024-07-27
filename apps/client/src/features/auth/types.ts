export interface SignInDao {
  account: string
  password: string
}

export interface SignUpDao extends SignInDao {
  username: string
}
