<template>
  <div class="login-account">
    <el-form :model="form" :rules="rules">
      <el-form-item label="账号" prop="account">
        <el-input v-model="form.account" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  name: 'loginAccount',
  setup() {
    const form = reactive({
      account: '',
      password: ''
    })

    const rules = reactive({
      account: [
        { required: true, message: '账号不能为空', trigger: 'blur' },
        { min: 3, max: 5, message: '账号长度在3到5个字符', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '密码不能为空', trigger: 'blur' },
        { min: 6, max: 18, message: '密码在6到18个字符', trigger: 'blur' }
      ]
    })

    return {
      form,
      rules
    }
  }
})
</script>

<style lang="less" scoped></style>
