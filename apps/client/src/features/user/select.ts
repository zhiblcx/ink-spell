import { request } from '@/shared/API'
import { useQuery } from '@tanstack/react-query'

export const selectAllMessages = () => ({
  queryKey: ['messages'],
  queryFn: () => request.get('/user/all/message')
})

export const selectOneselfInfoQuery = {
  queryKey: ['user'],
  queryFn: () => request.get('/user/profile')
}

export const selectUserByUserIdQuery = (userId: number) =>
  useQuery({
    queryKey: ['user-id'],
    queryFn: () => request.get(`/user/${userId}`)
  })
