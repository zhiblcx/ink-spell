import { httpRequest } from '@/shared/API'

export const selectAllMessages = () =>
  useQuery({
    queryKey: [QueryKeysEnum.MESSAGE_KEY],
    queryFn: () => httpRequest.get('/user/all/message')
  })

export const selectOneselfInfoQuery = () =>
  useQuery({
    queryKey: [QueryKeysEnum.USER_KEY],
    queryFn: () => httpRequest.get('/user/profile')
  })

export const selectUserByUserIdQuery = (userId: number) =>
  useQuery({
    queryKey: [QueryKeysEnum.USER_ID_KEY, userId],
    queryFn: () => httpRequest.get(`/user/${userId}`)
  })
