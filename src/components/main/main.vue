<template>
  <el-card class="box-card">
    <div>{{ title }}</div>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

interface Data {
  title: string
}

export default defineComponent({
  name: 'mainPage',
  setup() {
    const data = reactive<Data>({
      title: 'this is a main component'
    })

    return {
      ...toRefs(data)
    }
  }
})
</script>

<style lang="less" scoped></style>
