import { QueryKeysEnum } from "@/shared/enums/QueryKeysEnum";
import { httpRequest } from "@ink-spell/axios";
import { useQuery } from "@tanstack/vue-query";

export const getAllTagQuery = (page: Ref<number>, limit: Ref<number>) =>
  useQuery({
    queryKey: [QueryKeysEnum.ALL_TAG, page, limit],
    queryFn: () => httpRequest.get(`/tag?page=${page.value}&limit=${limit.value}`)
  })

export const getTagSearchQuery = (page: Ref<number>, limit: Ref<number>, select?: Ref<string>, search?: Ref<string>) =>
  useQuery({
    queryKey: [QueryKeysEnum.ALL_TAG, page, limit, select, search],
    queryFn: () => httpRequest.get(`/tag?page=${page.value}&limit=${limit.value}&${select?.value}=${search?.value}`),
    enabled: false
  })
