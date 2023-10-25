<template>
  <div class="role">{{ title }}</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  name: 'sRole',
  setup() {
    const data = reactive({
      title: 'this is a role component'
    })

    return {
      ...toRefs(data)
    }
  }
})
</script>

<style lang="less" scoped></style>
