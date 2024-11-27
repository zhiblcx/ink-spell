import { useMutation } from "@tanstack/vue-query";
import { handleAxiosError } from "../utils";
import { httpRequest } from "@/shared/API";
import { useMessage } from "naive-ui";

export const deleteUserByIdMutation = () => useMutation({
  mutationFn: (userId: number) => httpRequest.delete(`/user/${userId}`),
  onSuccess: () => {
    const message = useMessage()
    message.success("")
  },
  onError: handleAxiosError
})
