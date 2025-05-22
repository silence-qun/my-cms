// dns 模块，解析 IP 地址
const dns = require('dns')

// 183.246.62.238    114.114.114.114
dns.reverse('183.246.62.238', function (err, domain) {
  console.log(domain)
})
