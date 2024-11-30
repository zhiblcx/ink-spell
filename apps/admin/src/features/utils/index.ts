import i18next from "i18next"
import { AxiosError } from 'axios'
import { useRouter } from "vue-router"
import { PATH_FORBIDDEN, PATH_INTERNAL_SERVER_ERROR } from "@/shared/constants/router-path"
import { router } from "@/routes"

export const handleAxiosError = (result: AxiosError) => {
  const router = useRouter()
  const responseData = result.response?.data as { message?: string | string[] }
  const status = result.response?.status
  if (status === 500) {
    return router.push(PATH_INTERNAL_SERVER_ERROR)
  } else if (status === 403) {
    return router.push(PATH_FORBIDDEN)
  } else {
    if (responseData.message) {
      if (Array.isArray(responseData.message)) {
        responseData.message.forEach((item) => {
          window.$message.error(item)
        })
      } else {
        return window.$message.error(responseData.message ?? i18next.t('PROMPT:server_error'))
      }
    }
  }
}


export const handleRetryDelay = (_: number, error: AxiosError): number => {
  if (error.status === 403) {
    router.push(PATH_FORBIDDEN)
  } else if (error.status === 500) {
    router.push(PATH_INTERNAL_SERVER_ERROR)
  }
  return 2000
}
