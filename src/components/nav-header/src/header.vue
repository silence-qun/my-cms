<template>
  <div class="nav-header">
    <s-icon class="nh-arrow" :name="isOpen ? 'expand' : 'fold'" @click="switchSidebar"></s-icon>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'

export default defineComponent({
  name: 'navHeader',
  setup() {
    const store = useStore()

    const isOpen = computed(() => store.state.app.sidebarOpen)
    const switchSidebar = () => {
      store.commit('app/setSidebarOpen', !isOpen.value)
    }

    return {
      isOpen,
      switchSidebar
    }
  }
})
</script>

<style lang="less" scoped>
.nav-header {
  height: 100%;
  display: flex;
  align-items: center;
  .nh-arrow {
    cursor: pointer;
    font-size: 20px;
  }
}
</style>
