<template>
  <div class="login-phone">
    <el-form ref="formRef" :model="form" label-width="80px">
      <el-form-item label="手机号" prop="number">
        <el-input v-model="form.number" />
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="code">
          <el-input v-model="form.code" />
          <el-button type="primary">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { FormInstance } from 'element-plus'

export default defineComponent({
  name: 'loginPhone',
  setup() {
    let formRef = ref<FormInstance | null>(null)

    const form = reactive({
      number: '',
      code: ''
    })

    const login = () => {
      formRef.value?.validate((valid, fields) => {
        if (valid) {
          console.log('submit!')
        } else {
          console.log('error submit!', fields)
        }
      })
    }

    return {
      formRef,
      form,
      login
    }
  }
})
</script>

<style lang="less" scoped>
.code {
  display: flex;
  gap: 12px;
}
</style>
