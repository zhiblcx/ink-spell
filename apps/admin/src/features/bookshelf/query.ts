import { httpRequest } from '@/shared/API'
import { QueryKeysEnum } from '@/shared/enums/QueryKeysEnum'
import { keepPreviousData, useQuery } from '@tanstack/vue-query'

export const selectAllBookshelfQuery = (page: Ref<number>, limit: Ref<number>) =>
  useQuery({
    queryKey: [QueryKeysEnum.ALL_BOOKSHELF_KEY, page, limit],
    queryFn: () => httpRequest.get(`/bookshelf/all/info?page=${page.value}&limit=${limit.value}`),
    placeholderData: keepPreviousData
  })

export const selectBookshelfSearchQuery = (
  page: Ref<number>,
  limit: Ref<number>,
  select?: Ref<string>,
  search?: Ref<string>
) =>
  useQuery({
    queryKey: [QueryKeysEnum.ALL_BOOKSHELF_KEY, page, limit, search],
    queryFn: () =>
      httpRequest.get(`/bookshelf/all/info?page=${page.value}&limit=${limit.value}&${select?.value}=${search?.value}`),
    placeholderData: keepPreviousData,
    enabled: false
  })

export const selectApplyBookshelfQuery = (page: Ref<number>, limit: Ref<number>) =>
  useQuery({
    queryKey: [QueryKeysEnum.REVIEW_BOOKSHELF_KEY, page, limit],
    queryFn: () => httpRequest.get(`/bookshelf/review?page=${page.value}&limit=${limit.value}`)
  })

export const selectBookshelfByIdShowBookQuery = (bookshelfId: Ref<number>, page: Ref<number>, limit: Ref<number>) =>
  useQuery({
    queryKey: [QueryKeysEnum.BOOKSHELF_ID_BOOK, bookshelfId, page, limit],
    queryFn: () => httpRequest.get(`/bookshelf/${bookshelfId.value}?page=${page.value}&limit=${limit.value}`)
  })
