<template>
  <div class="nav-header">
    <s-icon class="nh-arrow" :name="isOpen ? 'expand' : 'fold'" @click="switchSidebar"></s-icon>
    <div class="nh-section">
      <breadcrumb :breadcrumbs="breadcrumbs" />
      <user-info></user-info>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'
import UserInfo from './user-info.vue'
import Breadcrumb from '@/base-ui/breadcrumb'
import { getBreadByMenus } from '@/base-ui/breadcrumb/utils/map-menu'

export default defineComponent({
  name: 'navHeader',
  components: { UserInfo, Breadcrumb },
  setup() {
    const route = useRoute()

    const store = useStore()

    const isOpen = computed(() => store.state.app.sidebarOpen)
    const switchSidebar = () => {
      store.commit('app/setSidebarOpen', !isOpen.value)
    }

    const breadcrumbs = computed(() => {
      return getBreadByMenus(store.state.login.menu, route.path)
    })

    return {
      isOpen,
      switchSidebar,
      breadcrumbs
    }
  }
})
</script>

<style lang="less" scoped>
.nav-header {
  height: 100%;
  display: flex;
  align-items: center;
  gap: 15px;
  .nh-arrow {
    cursor: pointer;
    font-size: 20px;
  }
  .nh-section {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
