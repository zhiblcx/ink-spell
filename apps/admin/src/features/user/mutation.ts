import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { handleAxiosError } from "../utils";
import { httpRequest } from "@/shared/API";
import { UpdatePasswordDto } from "./types/update-password.dto";
import { ModelRef } from "vue";
import { QueryKeysEnum } from "@/shared/enums/QueryKeysEnum";

const BASE_USER_API = '/user/'

export const deleteUserByIdMutation = (page: number, limit: number) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (userId: number) => httpRequest.delete(`${BASE_USER_API}${userId}`),
    onSuccess: (data) => {
      window.$message.success(data.message as string)
      queryClient.invalidateQueries({ queryKey: [QueryKeysEnum.ALL_USER_KEY, page, limit] })
    },
    onError: handleAxiosError
  })
}

export const updatePasswordMutation = (showModal: ModelRef<unknown, string, unknown, unknown>, modelRef: globalThis.Ref) => useMutation({
  mutationFn: (updatePasswordDto: UpdatePasswordDto) => httpRequest.put(`${BASE_USER_API}password`, updatePasswordDto),
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

export const resetUserPasswordMutation = () => useMutation({
  mutationFn: (userId: number) => httpRequest.put(`${BASE_USER_API}/reset/password/${userId}`),
  onSuccess: (data) => {
    const message = (data.message as string) + '：' + data.data.password
    window.$message.success(message)
  },
  onError: handleAxiosError
})
