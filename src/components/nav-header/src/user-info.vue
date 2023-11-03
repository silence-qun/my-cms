<template>
  <el-dropdown @command="handleCommand">
    <span class="el-dropdown-link">
      {{ userName }}
      <s-icon name="arrow-down"></s-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <template v-for="(item, key) in userOps" :key="key">
          <el-dropdown-item :command="key">{{ item.label }}</el-dropdown-item>
        </template>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import localCache from '@/utils/cache'
import { ElMessage } from 'element-plus'

export default defineComponent({
  name: 'userInfo',
  setup() {
    const store = useStore()
    const router = useRouter()

    const userName = computed(() => store.state.login.userInfo.name)

    const personal = () => {
      ElMessage.success(`进入${userName.value}的个人中心`)
    }
    const loginout = () => {
      localCache.deleteCache('token')
      router.push('/login')
    }
    const userOps = {
      personal: { label: '个人中心', fn: personal },
      loginout: { label: '退出登录', fn: loginout }
    }

    const handleCommand = (command: keyof typeof userOps) => {
      userOps[command].fn()
    }

    return {
      userName,
      userOps,
      handleCommand
    }
  }
})
</script>

<style lang="less" scoped>
.el-dropdown-link {
  cursor: pointer;
}
</style>
