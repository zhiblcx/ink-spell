import { httpRequest } from "@ink-spell/axios";

export const getReadHistoryQuery = () => useQuery({
  queryKey: [QueryKeysEnum.READ_HISTORY],
  queryFn: () => httpRequest.get("read-history")
})
