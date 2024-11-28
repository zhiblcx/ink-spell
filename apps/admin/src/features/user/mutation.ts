import { useMutation } from "@tanstack/vue-query";
import { handleAxiosError } from "../utils";
import { httpRequest } from "@/shared/API";

export const deleteUserByIdMutation = () => useMutation({
  mutationFn: (userId: number) => httpRequest.delete(`/user/${userId}`),
  onSuccess: () => {
    window.$message.success("")
  },
  onError: handleAxiosError
})
