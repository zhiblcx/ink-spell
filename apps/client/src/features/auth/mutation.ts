import { axiosInstance } from '@/shared/API'
import { AuthUtils } from '@/shared/utils'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { message } from 'antd'
import { AxiosError } from 'axios'
import { useTranslation } from 'react-i18next'
import { SignInDao, SigninValue, SignUpDao } from './types'

export const signinMutation = () => {
  const { t } = useTranslation(['PROMPT'])
  const navigate = useNavigate()
  return useMutation({
    mutationFn: async (signInDao: SignInDao) => axiosInstance.post('/auth/login', signInDao),
    onSuccess: (result, variables: SigninValue) => {
      const { access_token, refresh_token } = result.data.data
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
    onError: (result: AxiosError) => {
      const data = (result.response?.data as { message?: string })?.message ?? t('PROMPT:server_error')
      message.error(data)
    }
  })
}

export const signupMutation = () => {
  const { t } = useTranslation(['PROMPT'])
  const navigate = useNavigate()
  return useMutation({
    mutationFn: async (signUpDao: SignUpDao) => axiosInstance.post('/auth/register', signUpDao),
    onSuccess: (result) => {
      const { access_token, refresh_token } = result.data.data
      AuthUtils.setAccessToken(access_token)
      AuthUtils.setFreshToken(refresh_token)
      AuthUtils.clearRememberAccountData()
      navigate({ to: '/', replace: true })
      message.success(t('PROMPT:login_successful'))
    },
    onError: (result: AxiosError) => {
      const responseData = result.response?.data as { message?: string[] }
      responseData.message?.forEach((item) => {
        message.error(item)
      })
    }
  })
}
