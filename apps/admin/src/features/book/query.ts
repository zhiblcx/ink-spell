import { httpRequest } from "@/shared/API";
import { QueryKeysEnum } from "@/shared/enums/QueryKeysEnum";
import { useQuery } from "@tanstack/vue-query";

export const selectAllBookQuery = (page: Ref<number>, limit: Ref<number>) =>
  useQuery({
    queryKey: [QueryKeysEnum.ALL_BOOK_KEY, page, limit],
    queryFn: () => httpRequest.get(`/book/all/info?page=${page.value}&limit=${limit.value}`)
  })
