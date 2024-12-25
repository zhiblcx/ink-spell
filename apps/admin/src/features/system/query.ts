import { QueryKeysEnum } from "@/shared/enums/QueryKeysEnum";
import { httpRequest } from "@ink-spell/axios";
import { useQuery } from "@tanstack/vue-query";

export const getAnnouncementQuery = (page: Ref<number>, limit: Ref<number>) => useQuery({
  queryKey: [QueryKeysEnum.ANNOUNCEMENT, page, limit],
  queryFn: () => httpRequest.get(`system/announcement?page=${page.value}&limit=${limit.value}`)
})

export const getFeedbackQuery = (page: Ref<number>, limit: Ref<number>) => useQuery({
  queryKey: [QueryKeysEnum.FEEDBACK, page, limit],
  queryFn: () => httpRequest.get(`system/feedback?page=${page.value}&limit=${limit.value}`)
})
