import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { handleAxiosError } from "../utils";
import { httpRequest } from "@ink-spell/axios";
import { TagDto } from "./types";
import { QueryKeysEnum } from "@/shared/enums/QueryKeysEnum";


export const addTagMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (tag: TagDto) => httpRequest.post('/tag', tag),
    onSuccess: (data) => {
      window.$message.success(data.message as string)
      queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.ALL_TAG] })
    },
    onError: handleAxiosError
  })
}

export const updateTagMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (tag: TagDto) => httpRequest.put(`/tag/${tag.id}`, tag),
    onSuccess: (data) => {
      window.$message.success(data.message as string)
      queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.ALL_TAG] })
    },
    onError: handleAxiosError
  })
}

export const deleteTagMutation = (page: number, limit: number) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (tagId: number) => httpRequest.delete(`/tag/${tagId}`),
    onSuccess: (data) => {
      window.$message.success(data.message as string)
      queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.ALL_TAG, page, limit] })
    },
    onError: handleAxiosError
  })
}
