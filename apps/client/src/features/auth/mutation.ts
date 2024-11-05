import { ResponseData, signinApi, signupApi } from '@/shared/API'
import { AuthUtils } from '@/shared/utils'
import { message } from 'antd'
import { useTranslation } from 'react-i18next'
import { handleAxiosError } from '../utils'
import { SignInDao, SigninValue, SignUpDao } from './types'

export const signinMutation = () => {
  const { t } = useTranslation(['PROMPT'])
  const navigate = useNavigate()
  return useMutation({
    mutationFn: async (signInDao: SignInDao) => signinApi(signInDao),
    onSuccess: (result: ResponseData, variables: SigninValue) => {
      const { access_token, refresh_token } = result.data
      AuthUtils.setAccessToken(access_token)
      AuthUtils.setFreshToken(refresh_token)
      navigate({ to: '/', replace: true })
      message.success(t('PROMPT:login_successful'))
      if (variables) {
        AuthUtils.setRememberAccountData(
          JSON.stringify({
            account: variables.account,
            password: variables.password
          })
        )
      } else {
        AuthUtils.clearRememberAccountData()
      }
    },
    onError: handleAxiosError
  })
}

export const signupMutation = () => {
  const { t } = useTranslation(['PROMPT'])
  const navigate = useNavigate()
  return useMutation({
    mutationFn: async (signUpDao: SignUpDao) => signupApi(signUpDao),
    onSuccess: (result: ResponseData) => {
      const { access_token, refresh_token } = result.data
      AuthUtils.setAccessToken(access_token)
      AuthUtils.setFreshToken(refresh_token)
      AuthUtils.clearRememberAccountData()
      navigate({ to: '/', replace: true })
      message.success(t('PROMPT:login_successful'))
    },
    onError: handleAxiosError
  })
}
