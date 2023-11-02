<template>
  <s-table :list="dataList" :total="total" v-bind="contentTabelConfig" v-model:page="pageInfo">
    <template #headerHandler><el-button type="primary" @click="$emit('create')">新建</el-button></template>
    <template #avatar="{ row }"> <el-avatar :src="row.avatar" /> </template>
    <template #gender="{ row }">
      <div class="u-avatar">
        {{ genders[row.gender as keyof typeof genders].label }}
        <s-icon :name="genders[row.gender as keyof typeof genders].icon" :color="genders[row.gender as keyof typeof genders].color"></s-icon>
      </div>
    </template>
    <template #handle="{ row }">
      <el-button type="primary" size="small" plain @click="$emit('edit', row)">修改</el-button>
      <el-button type="danger" size="small" plain @click="remove(row)">删除</el-button>
    </template>
    <template v-for="item in otherPropSlots" #[item.slotName]="{ row }" :key="item.prop">
      <template v-if="item.slotName">
        <slot :name="item.slotName" :row="row"></slot>
      </template>
    </template>
  </s-table>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useStore } from '@/store'
import STable from '@/base-ui/table'
import { genders } from '@/views/system/user/config/table.config'
import { watch } from 'vue'

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
  emits: ['create', 'edit'],
  setup(props) {
    const store = useStore()

    const pageInfo = ref({ pageNum: 1, pageSize: 10 })
    watch(pageInfo, () => getPageData())

    const getPageData = (query: any = {}) => {
      store.dispatch('system/getPageList', {
        pageName: props.pageName,
        query: {
          ...pageInfo.value,
          ...query
        }
      })
    }
    getPageData()

    const dataList = computed(() => store.getters['system/pageListData'](props.pageName))

    const total = computed(() => dataList.value.length)

    const otherPropSlots = props.contentTabelConfig?.propList.filter((item: any) => {
      if (['avatar', 'gender', 'date', 'handle'].includes(item.slotName)) return false
      return true
    })

    const remove = (row: any) => {
      store.dispatch('system/deletePageData', { pageName: props.pageName, id: row.id })
    }

    return {
      genders,
      dataList,
      total,
      pageInfo,
      otherPropSlots,
      getPageData,
      remove
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
