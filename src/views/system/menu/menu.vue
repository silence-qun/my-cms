<template>
  <div class="menu">{{ title }}</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  name: 'sMenu',
  setup() {
    const data = reactive({
      title: 'this is a menu component'
    })

    return {
      ...toRefs(data)
    }
  }
})
</script>

<style lang="less" scoped></style>
