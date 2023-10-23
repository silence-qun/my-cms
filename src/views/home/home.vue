<template>
  <el-container class="home-page">
    <el-aside class="hp-aside" width="200px">
      <NavMenu></NavMenu>
    </el-aside>
    <el-container>
      <el-header class="hp-header">Header</el-header>
      <el-main class="hp-main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavMenu from '@/components/nav-menu'

export default defineComponent({
  name: 'HomePage',
  components: { NavMenu }
})
</script>

<style lang="less" scoped>
.home-page {
  height: 100%;
  overflow: hidden;
}
.hp-aside {
  background: #fff;
}
.hp-header {
  background: #fff;
}
.hp-main {
  background: #f0ffff;
}
</style>
