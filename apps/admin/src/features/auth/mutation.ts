import { httpRequest } from "@/shared/API";
import { useMutation } from "@tanstack/vue-query";
import { LoginDto } from "./types/login.dto";
import { handleAxiosError } from "../utils";
import { AuthUtils } from "@ink-spell/axios";
import { PATH_ROOT } from "@/shared/constants/router-path";
import { router } from "@/routes";

export const loginMutation = () => useMutation({
  mutationFn: (loginDto: LoginDto) => httpRequest.post("/auth/login", loginDto),
  onSuccess: (data) => {
    const { access_token, refresh_token } = data.data
    AuthUtils.setAccessToken(access_token)
    AuthUtils.setFreshToken(refresh_token)
    router.replace(PATH_ROOT)
  },
  onError: handleAxiosError
})
