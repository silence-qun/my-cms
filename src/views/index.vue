<template>
  <div class="my-cms">{{ title }}</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  name: 'myCms',
  setup() {
    const data = reactive({
      title: 'My Cms'
    })

    return {
      ...toRefs(data)
    }
  }
})
</script>

<style lang="less" scoped>
.my-cms {
  text-align: center;
}
</style>
