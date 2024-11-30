import { useMutation } from "@tanstack/vue-query";
import { handleAxiosError } from "../utils";
import { httpRequest } from "@/shared/API";
import { UpdatePasswordDto } from "./types/update-password.dto";
import { ModelRef } from "vue";

export const deleteUserByIdMutation = () => useMutation({
  mutationFn: (userId: number) => httpRequest.delete(`/user/${userId}`),
  onSuccess: (data) => {
    window.$message.success(data.message as string)
  },
  onError: handleAxiosError
})

export const updatePasswordMutation = (showModal: ModelRef<unknown, string, unknown, unknown>, modelRef: globalThis.Ref) => useMutation({
  mutationFn: (updatePasswordDto: UpdatePasswordDto) => httpRequest.put("/user/password", updatePasswordDto),
  onSuccess: (data) => {
    window.$message.success(data.message as string)
    showModal.value = false
    modelRef.value = {
      password: null,
      newPassword: null,
      reenteredPassword: null
    }
  },
  onError: handleAxiosError
})
