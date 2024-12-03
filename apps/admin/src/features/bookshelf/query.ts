import { httpRequest } from "@/shared/API";
import { QueryKeysEnum } from "@/shared/enums/QueryKeysEnum";
import { keepPreviousData, useQuery } from "@tanstack/vue-query";

export const selectAllBookshelfQuery = (page: Ref<number>, limit: Ref<number>) =>
  useQuery({
    queryKey: [QueryKeysEnum.ALL_BOOKSHELF_KEY, page, limit],
    queryFn: () => httpRequest.get(`/bookshelf/all/info?page=${page.value}&limit=${limit.value}`),
    placeholderData: keepPreviousData
  })


export const selectBookshelfSearchQuery = (page: Ref<number>, limit: Ref<number>, select?: Ref<string>, search?: Ref<string>) =>
  useQuery({
    queryKey: [QueryKeysEnum.ALL_BOOKSHELF_KEY, page, limit, search],
    queryFn: () => httpRequest.get(`/bookshelf/all/info?page=${page.value}&limit=${limit.value}&${select?.value}=${search?.value}`),
    placeholderData: keepPreviousData,
    enabled: false
  })
