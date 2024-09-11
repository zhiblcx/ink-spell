import { request } from '@/shared/API'
import { User } from '@/shared/types'
import { AuthUtils } from '@/shared/utils'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { message } from 'antd'
import { handleAxiosError } from '../utils'
import { updatePasswordDao } from './types'

export const updateUserInfoMutation = (queryClient: () => Promise<void>) => {
  return useMutation({
    mutationFn: (user: User) => request.put('/user', user),
    onSuccess: async (data) => {
      message.success(data.data.message)
      await queryClient()
    },
    onError: handleAxiosError
  })
}

export const followUserByUserIdMutation = (queryClient1?: () => Promise<void>, queryClient2?: () => Promise<void>) => {
  return useMutation({
    mutationFn: (followID: number) => request.post(`/follow/${followID}`),
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
    mutationFn: (followID: number) => request.delete(`/follow/${followID}`),
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
    mutationFn: (user: updatePasswordDao) => request.put('/user/password', user),
    onSuccess: async (data) => {
      message.success(data.data.message)
      AuthUtils.clearToken()
      navigate({ to: '/', replace: true })
    },
    onError: handleAxiosError
  })
}
