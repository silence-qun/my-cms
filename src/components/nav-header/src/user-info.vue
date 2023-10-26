<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userName }}
      <s-icon name="arrow-down"></s-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'

export default defineComponent({
  name: 'userInfo',
  setup() {
    const store = useStore()

    const userName = computed(() => store.state.login.userInfo.name)

    return {
      userName
    }
  }
})
</script>

<style lang="less" scoped>
.el-dropdown-link {
  cursor: pointer;
}
</style>
