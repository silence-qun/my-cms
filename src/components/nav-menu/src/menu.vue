<template>
  <div class="nav-menu">
    <div class="logo">
      <img src="~@/assets/logo.png" alt="logo" />
      <span :class="{ collapse: isCollapse }">my-cms</span>
    </div>
    <el-menu :collapse="isCollapse" router class="el-menu-vertical-demo">
      <template v-for="item in menu" :key="item.id">
        <template v-if="item.type === 1">
          <el-sub-menu :index="item.path">
            <template #title>
              <s-icon v-if="item.icon" :name="item.icon" />
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subItem in item.children" :key="subItem.id">
              <el-menu-item :index="subItem.path">{{ subItem.name }}</el-menu-item>
            </template>
          </el-sub-menu>
        </template>

        <template v-else-if="item.type === 2">
          <el-menu-item :index="item.path">
            <s-icon v-if="item.icon" :name="item.icon" />
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

export default defineComponent({
  name: 'navMenu',
  setup() {
    const store = useStore()

    const menu = computed(() => store.state.login.menu)

    const isCollapse = computed(() => !store.state.app.sidebarOpen)

    return { menu, isCollapse }
  }
})
</script>

<style lang="less" scoped>
.logo {
  padding-left: var(--el-menu-base-level-padding);
  line-height: 40px;
  height: 40px;
  font-size: 14px;
  img {
    width: 20px;
    height: auto;
    vertical-align: middle;
    margin: 0 5px 0 3px;
  }
  .collapse {
    visibility: hidden;
    height: 0;
    width: 0;
    overflow: hidden;
    display: inline-block;
  }
}

.el-menu {
  border-right: none;
}
</style>
