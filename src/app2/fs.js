// fs: Node 操作文件系统的原生模块
// fs 中的绝大多数 api，node 都提供相同功能的两个版本：同步版本与异步版本
// 命名规则：xxx(异步)，xxxSync(同步)
// 尽可能使用异步版本
const fs = require('fs')

/**
 * 文件 api
 */

// 读文件（同步）
// try {
//   const data = fs.readFileSync('test.txt', 'utf8')
//   console.log('sync: ', data)
// } catch (e) {
//   console.log(e)
// }

// 读文件（异步）
// fs.readFile('test.txt', 'utf8', function (err, data) {
//   if (err) {
//     console.log('error occured')
//     console.log(err)
//   } else {
//     console.log(data)
//   }
// })

// 写文件，覆盖
// fs.writeFile('mytest.txt', 'mytext hello node.', function (err) {
//   if (err) {
//     console.log('write file error')
//   } else {
//     console.log('write file successful')
//   }
// })

// 写文件，追加
// fs.writeFile('mytest2.txt', 'mytext hello node.\r\n', { flag: 'a' }, function (err) {
//   if (err) {
//     console.log('write file error')
//   } else {
//     console.log('write file successful')
//   }
// })

// 打开、关闭文件
// fs.open('test.txt', 'r+', function (err, fd) {
//   if (err) {
//     return console.error(err)
//   }
//   console.log('file is open')

//   fs.close(fd, function (err) {
//     if (err) {
//       return console.error(err)
//     }

//     console.log('file is closed')
//   })
// })

// 删文件
// fs.unlink('app1.js', (err) => {
//   if (err) {
//     throw err
//   }
//   console.log('success')
// })

// 重命名文件，并查看文件信息
// fs.rename('test.txt', 'test_new.txt', (err) => {
//   if (err) throw err

//   fs.stat('test_new.txt', (err, stats) => {
//     if (err) throw err
//     console.log(JSON.stringify(stats))
//   })
// })

// 文件不存在会创建文件，文件存在会追加新的内容
// 比 writeFile 使用起来简洁
// fs.appendFile('info.txt', '\n\rhello world', 'utf8', (err) => {
//   if (err) throw err
//   console.log('success')
// })

/**
 * 目录 api
 */

// 创建目录，目录存在会报错
// 第一个参数为 mydir/hello，也会报错
// 默认是创建一层目录，指定第二个参数 {recursive: true}，可深层创建，重复创建不会报错
// fs.mkdir('mydir/hello/world', { recursive: true }, (err) => {
//   if (err) throw err
//   console.log('success')
// })

// 查看目录
// fs.readdir('./', (err, files) => {
//   if (err) throw err
//   console.log(files)
// })

// 检测目录是否存在
// fs.access('app1.js', (err) => {
//   if (err) throw err
//   console.log('success')
// })

// 获取绝对路径
// fs.realpath('app0.js', (err, resolvePath) => {
//   if (err) throw err
//   console.log(resolvePath)
// })

// 删除目录
// 目录为空（不包含子目录或文件）才能删除成功
// 指定第二参数 {recursive: true}，可递归删除目录，目录不存在也不会报错
// fs.rmdir('mydir', { recursive: true }, (err) => {
//   if (err) throw err
//   console.log('success')
// })

/**
 * 文件流，适用于大文件
 */

// 读入流
const readStream = fs.createReadStream('fs.js', { encoding: 'utf8' })

// 写出流
const writeStream = fs.createWriteStream('fs_write.js', { encoding: 'utf8' })

readStream.on('open', (fd) => {
  console.log(fd)
})

readStream.on('ready', () => {
  console.log('ready')
})

readStream.on('data', (data) => {
  writeStream.write(data, () => {
    console.log(data)
  })
})

readStream.on('end', () => {
  console.log('end')
})

readStream.on('close', () => {
  console.log('close')
})

readStream.on('error', (err) => {
  console.log(err)
})
