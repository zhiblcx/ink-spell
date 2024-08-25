import { request } from '@/shared/API'
import { useQuery } from '@tanstack/react-query'

export const selectOneselfInfoQuery = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => request.get('/user/profile')
  })
}
