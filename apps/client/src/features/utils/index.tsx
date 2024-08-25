import { message } from 'antd'
import { AxiosError } from 'axios'

export const handleAxiosError = (result: AxiosError) => {
  const responseData = result.response?.data as { message?: string | string[] }
  if (responseData.message) {
    if (Array.isArray(responseData.message)) {
      responseData.message.forEach((item) => {
        message.error(item)
      })
    } else {
      message.error(responseData.message ?? '服务器错误')
    }
  }
}
