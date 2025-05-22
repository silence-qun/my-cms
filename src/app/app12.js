// util 模块
const util = require('util')

const obj = {
  name: 'zhangsan',
  address: 'nanchang',
  age: 25,
  married: false,
  getAge: function () {
    return this.age
  },
}

const str = util.inspect(obj, { colors: true })

console.log(str)
