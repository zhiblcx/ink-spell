import { QueryKeysEnum } from "@/shared/enums/QueryKeysEnum"
import { httpRequest } from "@/shared/API"
import { useQuery, keepPreviousData } from '@tanstack/vue-query'

export const selectOneselfInfoQuery = () =>
  useQuery({
    queryKey: [QueryKeysEnum.USER_KEY],
    queryFn: () => httpRequest.get('/user/profile')
  })


export const selectAllUserInfoQuery = (page: Ref<number>, limit: Ref<number>) =>
  useQuery({
    queryKey: [QueryKeysEnum.ALL_USER_KEY, page, limit],
    queryFn: () => httpRequest.get(`/user/all/info?page=${page.value}&limit=${limit.value}`),
    placeholderData: keepPreviousData
  })

export const selectUserInfoByUsernameQuery = (username: Ref<string>, page: Ref<number>, limit: Ref<number>) =>
  useQuery({
    queryKey: [QueryKeysEnum.ALL_USER_KEY, username, page, limit],
    queryFn: () => httpRequest.get(`/user/username/${username.value}?page=${page.value}&limit=${limit.value}`),
    placeholderData: keepPreviousData,
    enabled: false,
  })
