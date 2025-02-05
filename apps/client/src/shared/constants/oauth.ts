export const OAUTH_METHODS = {
  GITHUB: 'github',
  GOOGLE: 'google',
  GITEE: 'gitee'
}

const redirect_uri = 'redirect_uri=http://127.0.0.1:6600/oauth?method='

const github =
  'https://github.com/login/oauth/authorize?client_id=' + import.meta.env.VITE_GITHUB_CLIENT_ID

const gitee = 'https://gitee.com/oauth/authorize?client_id=' + import.meta.env.VITE_GITEE_CLIENT_ID

const response_type = 'response_type=code'

export const GITHUB_LOGIN_URL = `${github}&${redirect_uri}${OAUTH_METHODS.GITHUB}`

export const GITEE_LOGIN_URL = `${gitee}&${redirect_uri}${OAUTH_METHODS.GITEE}&${response_type}`
