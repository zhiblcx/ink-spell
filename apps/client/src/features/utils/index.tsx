import { message } from 'antd'
import { AxiosError } from 'axios'
import { useTranslation } from 'react-i18next'

export const handleAxiosError = (result: AxiosError) => {
  const { t } = useTranslation(['PROMPT'])
  const responseData = result.response?.data as { message?: string | string[] }
  if (responseData.message) {
    if (Array.isArray(responseData.message)) {
      responseData.message.forEach((item) => {
        message.error(item)
      })
    } else {
      message.error(responseData.message ?? t('PROMPT:server_error'))
    }
  }
}
