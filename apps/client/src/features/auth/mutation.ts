import { request } from '@/shared/API'
import { AuthUtils } from '@/shared/utils'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { message } from 'antd'
import { AxiosError } from 'axios'
import { SignInDao, SigninValue, SignUpDao } from './types'

export const signinMutation = () => {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: async (signInDao: SignInDao) => request.post('/auth/login', signInDao),
    onSuccess: (result, variables: SigninValue) => {
      AuthUtils.setToken(result.data.data.access_token)
      navigate({ to: '/', replace: true })
      message.success('登录成功')
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
      const data = (result.response?.data as { message?: string })?.message ?? '服务器错误'
      message.error(data)
    }
  })
}

export const signupMutation = () => {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: async (signUpDao: SignUpDao) => request.post('/auth/register', signUpDao),
    onSuccess: (result) => {
      AuthUtils.setToken(result.data.data.access_token)
      navigate({ to: '/', replace: true })
      message.success('登录成功')
    },
    onError: (result: AxiosError) => {
      const responseData = result.response?.data as { message?: string[] }
      responseData.message?.forEach((item) => {
        message.error(item)
      })
    }
  })
}
