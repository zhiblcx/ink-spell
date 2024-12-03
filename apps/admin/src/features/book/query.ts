import { httpRequest } from "@/shared/API";
import { QueryKeysEnum } from "@/shared/enums/QueryKeysEnum";
import { keepPreviousData, useQuery } from "@tanstack/vue-query";

export const selectAllBookQuery = (page: Ref<number>, limit: Ref<number>) =>
  useQuery({
    queryKey: [QueryKeysEnum.ALL_BOOK_KEY, page, limit],
    queryFn: () =>
      httpRequest.get(`/book/all/info?page=${page.value}&limit=${limit.value}`),
    placeholderData: keepPreviousData,
  })

export const selectBookByUsernameAndBookshelfNameQuery = (page: Ref<number>, limit: Ref<number>, select?: Ref<string>, search?: Ref<string>) =>
  useQuery({
    queryKey: [QueryKeysEnum.ALL_BOOK_KEY, page, limit, select, search],
    queryFn: () =>
      httpRequest.get(`/book/all/info?page=${page.value}&limit=${limit.value}&${select?.value}=${search?.value}`),
    placeholderData: keepPreviousData,
    enabled: false
  })


export const selectReadHistoryByUserIdQuery = (userId: Ref<number>) =>
  useQuery({
    queryKey: [QueryKeysEnum.READ_HISTORY_KEY, userId],
    queryFn: () => httpRequest.get(`/read-history/${userId.value}`),
    enabled: false
  })
