import { httpRequest } from "@ink-spell/axios";
import { handleAxiosError } from "../utils";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { QueryKeysEnum } from "@/shared/enums/QueryKeysEnum";

export const addAnnouncementMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (text: string) => httpRequest.post(`system/announcement`, { text }),
    onSuccess: (data) => {
      window.$message.success(data.message as string)
      queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.ANNOUNCEMENT] })
    },
    onError: handleAxiosError
  })
}

export const updateAnnouncementMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, text }: { id: number, text: string }) => httpRequest.put(`system/announcement/${id}`, { text }),
    onSuccess: (data) => {
      window.$message.success(data.message as string)
      queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.ANNOUNCEMENT] })
    },
    onError: handleAxiosError
  })
}

export const deleteAnnouncementMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => httpRequest.delete(`system/announcement/${id}`),
    onSuccess: (data) => {
      window.$message.success(data.message as string)
      queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.ANNOUNCEMENT] })
    },
    onError: handleAxiosError
  })
}
