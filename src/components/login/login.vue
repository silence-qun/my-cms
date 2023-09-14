<template>
  <div class="componentName">{{ title }}</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

interface Data {
  title: string
}

export default defineComponent({
  name: 'componentName',
  setup() {
    const data = reactive<Data>({
      title: 'this is a login component'
    })

    return {
      ...toRefs(data)
    }
  }
})
</script>

<style lang="less" scoped></style>
