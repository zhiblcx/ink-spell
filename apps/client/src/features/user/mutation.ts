import { axiosInstance } from '@/shared/API'
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
    mutationFn: (user: User) => axiosInstance.put('/user', user),
    onSuccess: async (data) => {
      setOpenFlag(false)
      message.success(data.data.message)
      await queryClient()
    },
    onError: handleAxiosError
  })
}

export const followUserByUserIdMutation = (queryClient1?: () => Promise<void>, queryClient2?: () => Promise<void>) => {
  return useMutation({
    mutationFn: (followID: number) => axiosInstance.post(`/follow/${followID}`),
    onSuccess: async (data) => {
      message.success(data.data.message)
      queryClient1 && (await queryClient1())
      queryClient2 && (await queryClient2())
    },
    onError: handleAxiosError
  })
}

export const unfollowUserByFollowMutation = (queryClient: () => Promise<void>) => {
  return useMutation({
    mutationFn: (followID: number) => axiosInstance.delete(`/follow/${followID}`),
    onSuccess: async (data) => {
      message.success(data.data.message)
      await queryClient()
    },
    onError: handleAxiosError
  })
}

export const updateUserPasswordMutation = () => {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: (user: updatePasswordDao) => axiosInstance.put('/user/password', user),
    onSuccess: async (data) => {
      message.success(data.data.message)
      AuthUtils.clearAccessToken()
      AuthUtils.clearFreshToken()
      navigate({ to: '/', replace: true })
    },
    onError: handleAxiosError
  })
}

export const sendRegisterEmailMutation = () =>
  useMutation({
    mutationFn: (email: string) => axiosInstance.get(`/user/register/email?email=${email}`),
    onSuccess: async (data) => {
      message.success(data.data.message)
    },
    onError: handleAxiosError
  })

export const sendResetPasswordEmailMutation = (callback: (email: string) => void) =>
  useMutation({
    mutationFn: (account: string) => axiosInstance.get(`/user/forget/password?account=${account}`),
    onSuccess: async (data) => {
      message.success(data.data.message)
      callback(data.data.data.email)
    },
    onError: handleAxiosError
  })

export const forgetPasswordByEmailMutation = (callback: () => void) =>
  useMutation({
    mutationFn: (data: forgetPasswordByEmailDao) => axiosInstance.put('/user/forget/password', data),
    onSuccess: async (data) => {
      message.success(data.data.message)
      callback()
    },
    onError: handleAxiosError
  })
