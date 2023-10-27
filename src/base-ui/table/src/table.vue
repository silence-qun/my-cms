<template>
  <el-table :data="list" style="width: 100%">
    <template v-for="item in propList" :key="item.prop">
      <el-table-column v-bind="item">
        <template #default="{ row }">
          <slot :name="item.slotName" :row="row"> {{ row[item.prop] }}</slot>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<script lang="ts">
import { PropType, defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  name: 'sTable',
  props: {
    list: {
      type: Array,
      required: true
    },
    propList: {
      type: Array as PropType<any[]>,
      required: true
    }
  },
  setup() {
    const data = reactive({
      title: 'this is a sTable component'
    })

    return {
      ...toRefs(data)
    }
  }
})
</script>

<style lang="less" scoped></style>
