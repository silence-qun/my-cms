// 自定义模块，导出方式二
const myModule2 = {
  myInfo: {
    name: 'zhangsan',
    age: 20,
  },
  myFunction: function (inputNumber) {
    return inputNumber + 5
  },
}

// 单个导出
// exports.myModule2 = myModule2

// 整体导出
module.exports = myModule2
