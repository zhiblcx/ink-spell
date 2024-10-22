import { message } from 'antd'
import { AxiosError } from 'axios'
import i18next from 'i18next'

export const handleAxiosError = (result: AxiosError) => {
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
