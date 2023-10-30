<template>
  <s-table :list="dataList" v-bind="contentTabelConfig">
    <template #headerHandler><el-button type="primary">新建</el-button></template>
    <template #avatar="{ row }"> <el-avatar :src="row.avatar" /> </template>
    <template #gender="{ row }">
      <div class="u-avatar">
        {{ genders[row.gender as keyof typeof genders].label }}
        <s-icon :name="genders[row.gender as keyof typeof genders].icon" :color="genders[row.gender as keyof typeof genders].color"></s-icon>
      </div>
    </template>
    <template #date="{ row }">{{ $filter.formatTime(row.date) }}</template>
    <template #handle>
      <el-button type="primary" size="small" plain>修改</el-button>
      <el-button type="danger" size="small" plain>删除</el-button>
    </template>
  </s-table>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'
import STable from '@/base-ui/table'
import { genders } from '@/views/system/user/config/table.config'

export default defineComponent({
  name: 'pageContent',
  props: {
    contentTabelConfig: {
      type: Object as any,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  components: { STable },
  setup(props) {
    const store = useStore()
    store.dispatch('system/getPageList', {
      pageName: props.pageName
    })
    const dataList = computed(() => store.getters['system/pageListData'](props.pageName))

    return {
      genders,
      dataList
    }
  }
})
</script>

<style lang="less" scoped>
.u-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
}
</style>
