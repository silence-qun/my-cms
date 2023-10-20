import Mock from 'mockjs'

Mock.setup({
  timeout: '200-600'
})

Mock.mock('/login', 'get', {
  isLogin: true
})
