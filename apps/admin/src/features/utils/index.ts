import i18next from "i18next"
import { AxiosError } from 'axios'
import { useMessage } from "naive-ui"

export const handleAxiosError = (result: AxiosError) => {
  const message = useMessage()
  const responseData = result.response?.data as { message?: string | string[] }
  if (responseData.message) {
    if (Array.isArray(responseData.message)) {
      responseData.message.forEach((item) => {
        message.error(item)
      })
    } else {
      return message.error(responseData.message ?? i18next.t('PROMPT:server_error'))
    }
  }
}
