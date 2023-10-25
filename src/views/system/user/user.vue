<template>
  <div class="user">{{ title }}</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  name: 'sUser',
  setup() {
    const data = reactive({
      title: 'this is a user component'
    })

    return {
      ...toRefs(data)
    }
  }
})
</script>

<style lang="less" scoped></style>
