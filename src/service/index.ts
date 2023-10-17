import Service from './request'
// import { AxiosHeaders } from 'axios'

const service = new Service({
  baseURL: process.env.VUE_APP_BASE_URL,
  // headers: new AxiosHeaders(),
  interceptors: {
    requestInterceptor: (config) => {
      console.log('实例请求成功拦截')
      const token = ''
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    }
  }
})

export default service
