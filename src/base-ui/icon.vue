<template>
  <el-icon>
    <component :is="name"></component>
  </el-icon>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SIcon',
  props: ['name']
})
</script>

<style lang="less" scoped></style>
