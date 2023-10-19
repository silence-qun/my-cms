<template>
  <div class="login-account">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="账号" prop="account">
        <el-input v-model="form.account" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import type { FormInstance } from 'element-plus'
import { rules } from '../utils/config'
import localCache from '@/utils/cache'

export default defineComponent({
  name: 'loginAccount',
  setup() {
    const store = useStore()

    const formRef = ref<FormInstance | null>(null)

    const form = reactive({
      account: '',
      password: ''
    })

    const login = (isSavePsd: boolean) => {
      localCache.setCache('isSavePsd', isSavePsd)
      formRef.value?.validate((valid) => {
        if (valid) {
          if (isSavePsd) {
            localCache.setCache('account', form.account)
            localCache.setCache('password', form.password)
          }
          store.dispatch('login/accountLogin', { ...form })
          ElMessage.success('登录成功！')
        } else {
          ElMessage.error('账号或密码错误！')
        }
      })
    }

    onBeforeMount(() => {
      if (!localCache.getCache('isSavePsd')) {
        form.account = ''
        form.password = ''
        localCache.deleteCache('account')
        localCache.deleteCache('password')
      } else {
        form.account = localCache.getCache('account') ?? ''
        form.password = localCache.getCache('password') ?? ''
      }
    })

    return {
      formRef,
      form,
      rules,
      login
    }
  }
})
</script>

<style lang="less" scoped></style>
