// dns 模块，解析域名
const dns = require('dns')

const domain = 'www.sohu.com'

dns.resolve(domain, function (err, address) {
  if (err) {
    console.log(err)
    return
  }

  console.log(address)
})
