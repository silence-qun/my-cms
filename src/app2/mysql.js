// Error: ER_NOT_SUPPORTED_AUTH_MODE
// 由于 MySQL 8.0+ 默认使用新的身份验证插件 caching_sha2_password，而旧版的 Node.js mysql 模块不支持此插件
// const mysql = require('mysql')
const mysql = require('mysql2')
const { v1: uuidv1 } = require('uuid')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root0987',
  database: 'user',
})

connection.connect((err) => {
  if (err) throw err
  console.log('connection successful')
  // connection.end()
  const id = uuidv1()
  const username = 'nihao'
  const real_name = 'wagnwu'
  const age = 20
  const address = 'shenzhen'

  connection.query('insert into users set ?', { id, username, real_name, age, address }, (err, res) => {
    if (err) {
      console.log(`insert error occurred: ${err}`)
      throw err
    }
    console.log(res)
    connection.query('select * from users', (err, res) => {
      if (err) {
        console.log(`select error occurred: ${err}`)
        throw err
      }
      console.log(res)
      connection.end((err) => {
        if (err) {
          console.log(`end error occurred`)
          throw err
        }
      })
    })
  })
})
