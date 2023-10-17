<template>
  <div class="login-panel">
    <h4>后台管理系统</h4>
    <el-tabs type="border-card" stretch>
      <el-tab-pane>
        <template #label>
          <span class="custom-tabs-label">
            <s-icon name="avatar"></s-icon>
            <span>账号登录</span>
          </span>
        </template>
        <account />
      </el-tab-pane>
      <el-tab-pane>
        <template #label>
          <span class="custom-tabs-label">
            <s-icon name="iphone"></s-icon>
            <span>手机登录</span>
          </span>
        </template>
        <phone />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import Account from './account'
import Phone from './phone'

export default defineComponent({
  name: 'loginPanel',
  components: { Account, Phone },
  setup() {
    const data = reactive({
      title: 'this is a new component'
    })

    return {
      ...toRefs(data)
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
</style>
