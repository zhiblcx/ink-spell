import { QueryKeysEnum } from "@/shared/enums/QueryKeysEnum"
import { httpRequest } from "@/shared/API"
import { useQuery } from "@tanstack/vue-query"


export const selectOneselfInfoQuery = () =>
  useQuery({
    queryKey: [QueryKeysEnum.USER_KEY],
    queryFn: () => httpRequest.get('/user/profile')
  })


export const selectAllUserInfoQuery = () =>
  useQuery({
    queryKey: [QueryKeysEnum.ALL_USER_KEY],
    queryFn: () => httpRequest.get("/user/all/info")
  })

