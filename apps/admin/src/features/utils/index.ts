import i18next from "i18next"
import { AxiosError } from 'axios'

export const handleAxiosError = (result: AxiosError) => {
  const responseData = result.response?.data as { message?: string | string[] }
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
