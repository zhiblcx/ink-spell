import { httpRequest } from "@ink-spell/axios";

export const getAllTagQuery = () =>
  useQuery({
    queryKey: [QueryKeysEnum.ALL_TAG],
    queryFn: () => httpRequest.get('/tag')
  })
