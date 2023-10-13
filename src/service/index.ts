import Service from './request'

const service = new Service({
  baseURL: process.env.VUE_APP_BASE_URL
})

export default service
