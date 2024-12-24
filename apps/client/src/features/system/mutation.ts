import { httpRequest } from "@ink-spell/axios";
import { handleAxiosError } from "../utils";

export const updateAnnouncementUserMutation = () => useMutation({
  mutationFn: (id: number) => httpRequest.put(`system/announcement/read/${id}`),
  onError: handleAxiosError
})

