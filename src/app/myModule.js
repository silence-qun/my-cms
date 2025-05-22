// 自定义模块，导出方式一
const myInfo = {
  name: 'zhangsan',
  age: 20,
}

const myFunction = function (inputNumber) {
  return inputNumber + 5
}

exports.myInfo = myInfo
exports.myFunction = myFunction
