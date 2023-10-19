<template>
  <div class="login-panel">
    <h4>后台管理系统</h4>
    <el-tabs v-model="name" type="border-card" stretch>
      <el-tab-pane :name="tab.name" v-for="tab in tabs" :key="tab.name">
        <template #label>
          <span class="custom-tabs-label">
            <s-icon :name="tab.icon"></s-icon>
            <span>{{ tab.label }}</span>
          </span>
        </template>
        <component :ref="(el) => setRef(el, tab)" :is="tab.conponent"></component>
      </el-tab-pane>
    </el-tabs>
    <div class="lp-psd">
      <el-checkbox v-model="isSavePsd" label="记住密码" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" class="lp-btn" @click="handleLogin">立即登录</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, markRaw, onBeforeMount } from 'vue'
import type { ComponentPublicInstance } from 'vue'
import Account from './account.vue'
import Phone from './phone.vue'
import localCache from '@/utils/cache'

export default defineComponent({
  name: 'loginPanel',
  components: { Account, Phone },
  setup() {
    let name = ref('account')

    const tabs = reactive([
      {
        name: 'account',
        label: '账号登录',
        icon: 'avatar',
        conponent: markRaw(Account),
        eleRef: null as InstanceType<typeof Account> | null
      },
      { name: 'phone', label: '手机登录', icon: 'iphone', conponent: markRaw(Phone), eleRef: null as InstanceType<typeof Phone> | null }
    ])
    let isSavePsd = ref(true)
    const setRef = (el: ComponentPublicInstance | Element | null, tab: any) => {
      if (el) tab.eleRef = el
    }

    const handleLogin = () => {
      const tab = tabs.find((item) => item.name === name.value)
      tab?.eleRef?.login(isSavePsd.value)
    }

    onBeforeMount(() => {
      isSavePsd.value = localCache.getCache('isSavePsd') ?? true
    })

    return {
      name,
      tabs,
      isSavePsd,
      setRef,
      handleLogin
    }
  }
})
</script>

<style lang="less" scoped>
.login-panel {
  width: 25%;
  height: 50%;
}
.custom-tabs-label {
  display: flex;
  align-items: center;
  span {
    margin-left: 3px;
  }
}

.lp-psd {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
}
.lp-btn {
  width: 100%;
}
</style>
