<template>
  <div class="dept">{{ title }}</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  name: 'sDept',
  setup() {
    const data = reactive({
      title: 'this is a dept component'
    })

    return {
      ...toRefs(data)
    }
  }
})
</script>

<style lang="less" scoped></style>
