<template>
  <el-container class="home-page">
    <el-aside class="hp-aside" :width="sidebarOpen ? '200px' : '64px'">
      <NavMenu></NavMenu>
    </el-aside>
    <el-container>
      <el-header class="hp-header">
        <nav-header></nav-header>
      </el-header>
      <el-main class="hp-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import NavMenu from '@/components/nav-menu'
import NavHeader from '@/components/nav-header'
import { useStore } from '@/store'

export default defineComponent({
  name: 'HomePage',
  components: { NavMenu, NavHeader },
  setup() {
    const store = useStore()

    const sidebarOpen = computed(() => store.state.app.sidebarOpen)

    return { sidebarOpen }
  }
})
</script>

<style lang="less" scoped>
.home-page {
  height: 100%;
  overflow: hidden;
}
.hp-aside {
  background: #fff;
  transition: all 0.3s;
}
.hp-header {
  background: #fff;
}
.hp-main {
  background: #f0ffff;
}
</style>
