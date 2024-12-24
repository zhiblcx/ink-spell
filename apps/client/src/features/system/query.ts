import { httpRequest } from "@ink-spell/axios";

export const getAnnouncementUserQuery = () => useQuery({
  queryKey: [QueryKeysEnum.SYSTEM],
  queryFn: () => httpRequest.get("system/announcement/user")
})
