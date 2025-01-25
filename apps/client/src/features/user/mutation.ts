import { httpRequest } from '@/shared/API'
import { User } from '@/shared/types'
import { AuthUtils } from '@/shared/utils'
import { message } from 'antd'
import { Dispatch, SetStateAction } from 'react'
import { handleAxiosError } from '../utils'
import { forgetPasswordByEmailDao, updatePasswordDao } from './types'

export const updateUserInfoMutation = (
  queryClient: () => Promise<void>,
  setOpenFlag: Dispatch<SetStateAction<boolean>>
) => {
  return useMutation({
    mutationFn: (user: User) => httpRequest.put('/user', user),
    onSuccess: async (data) => {
      setOpenFlag(false)
      message.success(data.message)
      await queryClient()
    },
    onError: handleAxiosError
  })
}

export const followUserByUserIdMutation = (
  queryClient1?: () => Promise<void>,
  queryClient2?: () => Promise<void>
) => {
  return useMutation({
    mutationFn: (followID: number) => httpRequest.post(`/follow/${followID}`),
    onSuccess: async (data) => {
      message.success(data.message)
      queryClient1 && (await queryClient1())
      queryClient2 && (await queryClient2())
    },
    onError: handleAxiosError
  })
}

export const unfollowUserByFollowMutation = (
  queryClient: () => Promise<void>
) => {
  return useMutation({
    mutationFn: (followID: number) => httpRequest.delete(`/follow/${followID}`),
    onSuccess: async (data) => {
      message.success(data.message)
      await queryClient()
    },
    onError: handleAxiosError
  })
}

export const updateUserPasswordMutation = () => {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: (user: updatePasswordDao) => httpRequest.put('/user/password', user),
    onSuccess: async (data) => {
      message.success(data.message)
      AuthUtils.clearAccessToken()
      AuthUtils.clearFreshToken()
      navigate({ to: '/', replace: true })
    },
    onError: handleAxiosError
  })
}

export const sendRegisterEmailMutation = () =>
  useMutation({
    mutationFn: (email: string) => httpRequest.get(`/user/register/email?email=${email}`),
    onSuccess: async (data) => {
      message.success(data.message)
    },
    onError: handleAxiosError
  })

export const sendResetPasswordEmailMutation = (callback: (email: string) => void) =>
  useMutation({
    mutationFn: (account: string) => httpRequest.get(`/user/forget/password?account=${account}`),
    onSuccess: async (data) => {
      message.success(data.message)
      callback(data.data.email)
    },
    onError: handleAxiosError
  })

export const forgetPasswordByEmailMutation = (callback: () => void) =>
  useMutation({
    mutationFn: (data: forgetPasswordByEmailDao) => httpRequest.put('/user/forget/password', data),
    onSuccess: async (data) => {
      message.success(data.message)
      callback()
    },
    onError: handleAxiosError
  })


export const systemRateMutation = () =>
  useMutation({
    mutationFn: (rate: number) => httpRequest.put(`/user/rate?rate=${rate}`),
    onSuccess: async (data) => {
      message.success(data.message)
    },
    onError: handleAxiosError
  })
