// import axios from 'axios'

// axios.get('https://httpbin.org/get').then(({ data }) => {
//   console.log(data)
// })
import service from '.'

service.request({
  url: 'get'
})
