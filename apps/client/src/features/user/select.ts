import { httpRequest } from '@/shared/API'
import { QueryKeys } from '@/shared/enums'

export const selectAllMessages = () =>
  useQuery({
    queryKey: [QueryKeys.MESSAGE_KEY],
    queryFn: () => httpRequest.get('/user/all/message')
  })

export const selectOneselfInfoQuery = () =>
  useQuery({
    queryKey: [QueryKeys.USER_KEY],
    queryFn: () => httpRequest.get('/user/profile')
  })

export const selectUserByUserIdQuery = (userId: number) =>
  useQuery({
    queryKey: [QueryKeys.USER_ID_KEY, userId],
    queryFn: () => httpRequest.get(`/user/${userId}`)
  })
