import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'

class Service {
  instance: AxiosInstance

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)
  }

  request(config: AxiosRequestConfig): void {
    this.instance.request(config).then(({ data }) => {
      console.log(data)
    })
  }
}

export default Service
