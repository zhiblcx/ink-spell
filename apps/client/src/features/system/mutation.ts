import { httpRequest } from "@ink-spell/axios";
import { handleAxiosError } from "../utils";
import { message } from "antd";

export const updateAnnouncementUserMutation = () => useMutation({
  mutationFn: (id: number) => httpRequest.put(`system/announcement/read/${id}`),
  onError: handleAxiosError
})


export const postFeedbackMutation = () => useMutation({
  mutationFn: (data: { text: string }) => httpRequest.post('system/feedback', data),
  onSuccess: async (data) => { message.success(data.message) },
  onError: handleAxiosError
})
