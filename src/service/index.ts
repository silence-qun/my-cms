import Service from './request'
// import { AxiosHeaders } from 'axios'
import localCache from '@/utils/cache'

const service = new Service({
  baseURL: process.env.VUE_APP_BASE_URL,
  headers: { apifoxToken: '36rAIzrdg72Qo07iuYr8qMINlRnNedQM' },
  interceptors: {
    requestInterceptor: (config) => {
      // console.log('实例请求成功拦截')
      const token = localCache.getCache('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    }
  }
})

export default service
