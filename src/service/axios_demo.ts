// import axios from 'axios'

// axios.get('https://httpbin.org/get').then(({ data }) => {
//   console.log(data)
// })
import service from '.'

interface DataType {
  args: any
  headers: any
  origin: string
  url: string
}

service
  .request<DataType>({
    url: 'get',
    interceptors: {
      responseInterceptor: (res) => {
        console.log('单个响应成功拦截')
        return res
      }
    },
    showLoading: false
  })
  .then((res) => {
    console.log('单个请求数据：', res)
  })
