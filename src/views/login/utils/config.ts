export const rules = {
  account: [
    { required: true, message: '账号不能为空', trigger: 'blur' },
    { min: 3, max: 5, message: '账号长度在3到5个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 6, max: 18, message: '密码在6到18个字符', trigger: 'blur' }
  ]
}
