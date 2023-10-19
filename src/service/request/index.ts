import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { SRequestInterceptors, RequestConfig } from './types'
import { ElLoading } from 'element-plus'
import { LoadingInstance } from 'element-plus/es/components/loading/src/loading'

const DEFAULT_LOADING = true

class Service {
  instance: AxiosInstance
  interceptors?: SRequestInterceptors
  showLoading: boolean
  loading?: LoadingInstance

  constructor(config: RequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? true

    // 每个实例单独的拦截器，从 config 中传入
    this.instance.interceptors.request.use(this.interceptors?.requestInterceptor, this.interceptors?.requestInterceptorCatch)
    this.instance.interceptors.response.use(this.interceptors?.responseInterceptor, this.interceptors?.responseInterceptorCatch)

    // 每个实例共有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('共有拦截器：请求成功拦截')
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '加载中...'
          })
        }
        return config
      },
      (err) => {
        return err
      }
    )

    this.instance.interceptors.response.use(
      ({ data }) => {
        this.loading?.close()
        return data
      },
      (err) => {
        this.loading?.close()
        return err
      }
    )
  }

  request<T>(config: RequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 每个请求单独的请求拦截
      // config 类型为 RequestConfig，扩展于 AxiosRequestConfig
      // 但 requestInterceptor 的参数类型为 InternalAxiosRequestConfig，需要添加 headers
      // 由于每个请求都要添加，故去掉
      // if (config.interceptors?.requestInterceptor) {
      //   config = config.interceptors.requestInterceptor(config)
      // }
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          resolve(res)
        })
        .catch((e) => {
          reject(e)
        })
        .finally(() => {
          this.showLoading = DEFAULT_LOADING
        })
    })
  }

  get<T>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default Service
