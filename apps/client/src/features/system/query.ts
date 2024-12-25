import { httpRequest } from "@ink-spell/axios";

export const getAnnouncementUserQuery = () => useQuery({
  queryKey: [QueryKeysEnum.ANNOUNCEMENT],
  queryFn: () => httpRequest.get("system/announcement/user")
})

export const getAnnouncementQuery = (page: number, limit: number) => useQuery({
  queryKey: [QueryKeysEnum.ANNOUNCEMENT],
  queryFn: () => httpRequest.get(`system/announcement?page=${page}&limit=${limit}`)
})
