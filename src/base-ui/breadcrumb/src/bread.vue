<template>
  <el-breadcrumb separator="/">
    <template v-for="item in breadcrumbs" :key="item.path">
      <el-breadcrumb-item :to="{ path: item.path || '' }">{{ item.label }}</el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, PropType } from 'vue'
import { IBreadcrumb } from '../types'

export default defineComponent({
  name: 'breadCrumb',
  props: {
    breadcrumbs: {
      type: Array as PropType<IBreadcrumb[]>,
      default: () => []
    }
  },
  setup() {
    const data = reactive({
      title: 'this is a new component'
    })

    return {
      ...toRefs(data)
    }
  }
})
</script>

<style lang="less" scoped></style>
