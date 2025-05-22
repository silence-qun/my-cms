// 创建一个 Buffer，分配128字节内存
// const buffer = Buffer.alloc(128)

// const length = buffer.write('hello world, 你好', 'utf8')

// console.log(`byte count: ${length}`)

// 按字节顺序比较两个 buffer，返回 -1(buffer 在 target 之前), 0, 1
// const buffer1 = Buffer.from('hello')
// const buffer2 = Buffer.from('world')

// const compareRes = buffer1.compare(buffer2)

// console.log(compareRes)

// buffer 转字符串
// const buffer = Buffer.alloc(3)

// buffer[0] = 65 // ASCII 字符码
// buffer[1] = 66
// buffer[2] = 67

// console.log(buffer.toString('utf8'))

// 字符串转 buffer
// 字符串的长度跟 buffer 长度不一定相等
// const str = 'abcde你'
// const buffer = Buffer.from(str)

// console.log(str.length)
// console.log(buffer.length)
// console.log(buffer)

// buffer 合并
// const buffer1 = Buffer.from('hello')
// const buffer2 = Buffer.from('world')
// const buffer3 = Buffer.from('welcome')
// const buffer4 = Buffer.from('你好')

// const bufferArr = [buffer1, buffer2, buffer3, buffer4]

// const bufferRes = Buffer.concat(bufferArr, buffer1.length + buffer2.length + buffer3.length + buffer4.length)

// console.log(bufferRes.length)
// console.log(bufferRes.toString('utf8'))

// Buffer 与 JSON 转换
// const buffer = Buffer.from('你好，张三')
// const jsonStr = JSON.stringify(buffer)

// console.log(jsonStr)

// const jsonObj = JSON.parse(jsonStr)

// console.log(jsonObj)

// const buffer2 = Buffer.from(jsonObj)

// console.log(buffer2.toString('utf8'))

// Buffer 判断有效的编码格式
// const str = 'utf8'
// const str1 = 'utf-8'
// const str2 = 'UTF-8'
// const str3 = 'utf9'
// const str4 = 'gb312'
// const str5 = 'gbk'

// console.log(Buffer.isEncoding(str))
// console.log(Buffer.isEncoding(str1))
// console.log(Buffer.isEncoding(str2))
// console.log(Buffer.isEncoding(str3))
// console.log(Buffer.isEncoding(str4))
// console.log(Buffer.isEncoding(str5))

// Buffer 类型判断
const buffer = Buffer.from('hello')
const obj = {}
const str = 'aa'
const flag = true
const count = 4

console.log(typeof buffer, Buffer.isBuffer(buffer))
console.log(typeof obj, Buffer.isBuffer(obj))
console.log(typeof str)
console.log(typeof flag)
console.log(typeof count)
