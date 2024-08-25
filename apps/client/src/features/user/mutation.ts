import { request } from '@/shared/API'
import { User } from '@/shared/types'
import { useMutation } from '@tanstack/react-query'
import { message } from 'antd'
import { handleAxiosError } from '../utils'

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
