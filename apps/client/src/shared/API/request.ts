// 创建 axios 实例
import { AuthUtils, LanguageUtils } from '@/shared/utils'
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
interface PendingTask {
  config: AxiosRequestConfig
  resolve: Function
}

export const axiosInstance: AxiosInstance = axios.create({
  // 请求 api 公共部分
  baseURL: import.meta.env.VITE_BASE_API_PREFIX,
  // 超时
  timeout: 5 * 1000
})

let refreshFlag = false
const queue: PendingTask[] = []

// 设置请求拦截器
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = AuthUtils.getAccessToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    config.headers['x-custom-lang'] = LanguageUtils.getLanguage()
    return config
  },
  (error: AxiosError) => Promise.reject(error)
)

// 设置响应拦截器
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  async (error) => {
    const { data, config } = error.response

    if (refreshFlag) {
      return new Promise((resolve) => {
        queue.push({ config, resolve })
      })
    }

    if (data.statusCode == 401 && !config.url.includes('refresh')) {
      refreshFlag = true
      const res = await refreshToken()
      refreshFlag = false
      if (res.status === 200) {
        queue.forEach(({ config, resolve }) => {
          resolve(axiosInstance(config))
        })
      } else {
        window.location.href = '/signin'
        AuthUtils.clearAccessToken()
        AuthUtils.clearFreshToken()
      }
    } else {
      throw error
    }
  }
)

async function refreshToken() {
  const res = await axiosInstance.get(`auth/refresh?refresh_token=${AuthUtils.getFreshToken()}`)
  AuthUtils.setAccessToken(res.data.data.access_token)
  AuthUtils.setFreshToken(res.data.data.refresh_token)
  return res
}
