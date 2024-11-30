import { router } from "@/routes"
import { AuthUtils } from "@ink-spell/axios"
import { PATH_LOGIN } from "../constants/router-path"

export const logoutUtils = () => {
  AuthUtils.clearAccessToken()
  AuthUtils.clearFreshToken()
  router.replace(PATH_LOGIN)
}
