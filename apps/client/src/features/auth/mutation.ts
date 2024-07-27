import request from '@/shared/API/request'
import { AuthUtils } from '@/shared/utils'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import { message } from 'antd'
import { AxiosError } from 'axios'
import { SignInDao, SigninValue, SignUpDao } from './types'

export const signinMutation = () => {
  const router = useRouter()
  return useMutation({
    mutationFn: (signInDao: SignInDao) => request.post('/auth/login', signInDao),
    onSuccess: (result, variables: SigninValue) => {
      AuthUtils.setToken(result.data.data.access_token)
      router.navigate({ to: '/', replace: true })
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
    }
  })
}

export const signupMutation = () => {
  const router = useRouter()
  return useMutation({
    mutationFn: (signUpDao: SignUpDao) => request.post('/auth/register', signUpDao),
    onSuccess: async (result) => {
      AuthUtils.setToken(result.data.data.access_token)
      router.navigate({ to: '/', replace: true })
    },
    onError: (result: AxiosError) => {
      const responseData = result.response?.data as { message?: string[] }
      responseData.message?.forEach((item) => {
        message.error(item)
      })
    }
  })
}
