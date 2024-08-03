// 创建 axios 实例

import { AuthUtils } from '@/shared/utils'
import axios from 'axios'

export const request = axios.create({
  // 请求 api 公共部分
  baseURL: process.env.VITE_BASE_API_PREFIX,
  // 超时
  timeout: 30000
})

// 设置请求拦截器
request.interceptors.request.use(
  (config) => {
    const token = AuthUtils.getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

// 设置响应拦截器
request.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response && error.response.status == 401) {
      window.location.href = '/signin'
      AuthUtils.clearToken()
    }
  }
)
