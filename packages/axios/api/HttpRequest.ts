import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { AuthUtils, LanguageUtils } from '../utils'

interface PendingTask {
  config: AxiosRequestConfig
  resolve: (value: unknown) => void
}

export interface ResponseData<T = any> {
  code: number | string
  message: string | null
  data: T
}

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  expectData?: boolean
}

interface expectDataAxiosRequestConfig extends AxiosRequestConfig {
  expectData?: boolean
}

export class HttpRequest {
  instance: AxiosInstance

  // 认证失败跳转登录页面
  loginURL = "/signin"

  // 刷新令牌的标识
  isRefreshing = false

  // 等待请求队列
  pendingQueue: PendingTask[] = []

  constructor(baseURL = '/api', loginURL?: string) {
    if (loginURL) {
      this.loginURL = loginURL
    }

    this.instance = axios.create({
      baseURL,
      timeout: 5 * 1000
    })

    // 请求拦截器
    this.instance.interceptors.request.use(
      (req: InternalAxiosRequestConfig) => {
        const token = AuthUtils.getAccessToken()
        if (token) {
          req.headers.Authorization = `Bearer ${token}`
        }
        req.headers['x-custom-lang'] = LanguageUtils.getLanguage()
        return req
      },
      (error: AxiosError) => Promise.reject(error)
    )

    // 响应拦截器
    this.instance.interceptors.response.use(
      (res: AxiosResponse) => (!(res.config as CustomAxiosRequestConfig).expectData ? res.data : res),
      async (err) => {
        const { data, config } = err.response
        if (this.isRefreshing) {
          return new Promise((resolve) => {
            this.pendingQueue.push({ config, resolve })
          })
        }
        if (data.statusCode === 401 && !config.url.includes('refresh')) {
          this.isRefreshing = true
          const { code } = await this.refreshToken()
          this.isRefreshing = false
          if (code === 200) {
            this.pendingQueue.forEach(({ config, resolve }) => {
              resolve(this.instance(config))
            })
          } else {
            this.handleUnauthorized()
          }
        }
        throw err
      }
    )
  }

  /**
   * 处理认证失败
   * @description
   * - 清除 token
   * - 跳转到登录页
   */
  handleUnauthorized() {
    window.location.href = this.loginURL
    AuthUtils.clearAccessToken()
    AuthUtils.clearFreshToken()
  }

  /**
   * 处理 access_token 失败
   * @description
   * - 覆盖本地 token
   */
  async refreshToken() {
    const res = await this.get(`/auth/refresh?refresh_token=${AuthUtils.getFreshToken()}`)
    if (res.data != undefined) {
      const { access_token, refresh_token } = res.data as {
        access_token: string
        refresh_token: string
      }
      AuthUtils.setAccessToken(access_token)
      AuthUtils.setFreshToken(refresh_token)
    }
    return res
  }

  /**
   * 通用请求
   * @param config 请求配置
   */
  request<T>(config: AxiosRequestConfig<T>): Promise<T> {
    return this.instance.request(config)
  }

  /**
   * GET 请求
   * @param url 请求地址
   * @param params 请求参数
   * @param config 请求配置
   */
  get<T = ResponseData>(
    url: string,
    params?: Record<string, unknown>,
    config?: expectDataAxiosRequestConfig
  ): Promise<T> {
    return this.instance.get(url, { params, ...config })
  }

  /**
   * POST 请求
   * @param url 请求地址
   * @param data 请求数据
   * @param config 请求配置
   */
  post<T = ResponseData>(
    url: string,
    data?: Record<string, unknown>,
    config?: expectDataAxiosRequestConfig
  ): Promise<T> {
    return this.instance.post(url, data, config)
  }

  /**
   * PUT 请求
   * @param url 请求地址
   * @param data 请求数据
   * @param config 请求配置
   */
  put<T = ResponseData>(
    url: string,
    data?: Record<string, unknown>,
    config?: expectDataAxiosRequestConfig
  ): Promise<T> {
    return this.instance.put(url, data, config)
  }

  /**
   * DELETE 请求
   * @param url 请求地址
   * @param params 请求参数
   * @param config 请求配置
   */
  delete<T = ResponseData>(
    url: string,
    params?: Record<string, unknown>,
    config?: expectDataAxiosRequestConfig
  ): Promise<T> {
    return this.instance.delete(url, { params, ...config })
  }
}
export const httpRequest = new HttpRequest()
