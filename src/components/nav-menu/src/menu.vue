<template>
  <div class="nav-menu">
    <div class="logo">
      <img src="~@/assets/logo.png" alt="logo" />
      <span>my-cms</span>
    </div>
    <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
      <template v-for="item in menu" :key="item.id">
        <template v-if="item.type === 1">
          <el-sub-menu :index="item.id">
            <template #title>{{ item.name }}</template>
            <template v-for="subItem in item.children" :key="subItem.id">
              <el-menu-item :index="subItem.id">{{ subItem.name }}</el-menu-item>
            </template>
          </el-sub-menu>
        </template>

        <template v-else-if="item.type === 2">
          <el-menu-item :index="item.id">
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

    const handleOpen = () => {
      console.log('open')
    }

    const handleClose = () => {
      console.log('close')
    }

    return { handleOpen, handleClose, menu }
  }
})
</script>

<style lang="less" scoped>
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  line-height: 40px;
  height: 40px;
  font-size: 14px;
  img {
    width: 20px;
    height: auto;
  }
}
</style>
