import { request } from '@/shared/API'
import { QueryKeys } from '@/shared/enums'
import { useQuery } from '@tanstack/react-query'

export const selectAllMessages = () => ({
  queryKey: [QueryKeys.MESSAGE_KEY],
  queryFn: () => request.get('/user/all/message')
})

export const selectOneselfInfoQuery = {
  queryKey: [QueryKeys.USER_KEY],
  queryFn: () => request.get('/user/profile')
}

export const selectUserByUserIdQuery = (userId: number) =>
  useQuery({
    queryKey: [QueryKeys.USER_ID_KEY, userId],
    queryFn: () => request.get(`/user/${userId}`)
  })
