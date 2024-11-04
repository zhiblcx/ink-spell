import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'
import { AuthUtils, LanguageUtils } from '../utils'

interface PendingTask {
  config: AxiosRequestConfig
  resolve: Function
}

export interface ResponseData<T = any> {
  code: number | string
  message: string | null
  data: T
}

class HttpRequest {
  instance: AxiosInstance

  // 刷新令牌的标识
  isRefreshing = false

  // 等待请求队列
  pendingQueue: PendingTask[] = []

  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_BASE_API_PREFIX,
      timeout: 5 * 1000
    })

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

    this.instance.interceptors.response.use(
      (res: AxiosResponse) => res.data,
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
    window.location.href = '/signin'
    AuthUtils.clearAccessToken()
    AuthUtils.clearFreshToken()
  }

  /**
   * 处理 access_token 失败
   * @description
   * - 覆盖本地 token
   */
  async refreshToken() {
    const res = await this.get(`/auth/refresh?refresh_token=${AuthUtils.getFreshToken}`)
    const { access_token, refresh_token } = res.data as {
      access_token: string
      refresh_token: string
    }
    AuthUtils.setAccessToken(access_token)
    AuthUtils.setFreshToken(refresh_token)
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
  get<T>(
    url: string,
    params?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ): Promise<ResponseData<T>> {
    return this.instance.get(url, { params, ...config })
  }

  /**
   * POST 请求
   * @param url 请求地址
   * @param data 请求数据
   * @param config 请求配置
   */
  post<T>(
    url: string,
    data: Record<string, unknown>,
    config?: AxiosRequestConfig
  ): Promise<ResponseData<T>> {
    return this.instance.post(url, data, config)
  }

  /**
   * PUT 请求
   * @param url 请求地址
   * @param data 请求数据
   * @param config 请求配置
   */
  put<T>(
    url: string,
    data: Record<string, unknown>,
    config?: AxiosRequestConfig
  ): Promise<ResponseData<T>> {
    return this.instance.post(url, data, config)
  }

  /**
   * DELETE 请求
   * @param url 请求地址
   * @param params 请求参数
   * @param config 请求配置
   */
  delete<T>(
    url: string,
    params?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ): Promise<ResponseData<T>> {
    return this.instance.delete(url, { params, ...config })
  }
}

const httpRequest = new HttpRequest()
export default httpRequest
