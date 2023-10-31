<template>
  <div class="s-table">
    <div class="st-header">
      <slot name="header">
        <div class="st-title">{{ title }}</div>
        <div class="st-handler"><slot name="headerHandler"></slot></div>
      </slot>
    </div>
    <el-table :data="list" style="width: 100%" @selection-change="handleSelectChange" v-bind="childrenProps">
      <el-table-column v-if="showSelectColumn" type="selection" align="center"></el-table-column>
      <el-table-column v-if="showIndexColumn" type="index" label="序号" align="center" width="60px"></el-table-column>
      <template v-for="item in propList" :key="item.prop">
        <el-table-column v-bind="item">
          <template #default="{ row }">
            <slot :name="item.slotName" :row="row"> {{ row[item.prop] }}</slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="st-footer" v-if="showFooter">
      <slot name="footer">
        <el-pagination
          :current-page="page.pageNum"
          :page-size="page.pageSize"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          background
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue'

export default defineComponent({
  name: 'sTable',
  props: {
    title: {
      type: String,
      default: '列表'
    },
    list: {
      type: Array,
      required: true
    },
    total: {
      type: Number,
      default: 0
    },
    propList: {
      type: Array as PropType<any[]>,
      required: true
    },
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    showSelectColumn: {
      type: Boolean,
      default: false
    },
    page: {
      type: Object,
      default: () => ({ pageNum: 1, pageSize: 20 })
    },
    childrenProps: {
      type: Object,
      default: () => ({})
    },
    showFooter: {
      type: Boolean,
      default: true
    }
  },
  emits: ['selectChange', 'update:page'],
  setup(props, { emit }) {
    const handleSelectChange = (value: any) => {
      emit('selectChange', value)
    }

    const handleSizeChange = (value: number) => {
      emit('update:page', { ...props.page, pageSize: value })
    }

    const handleCurrentChange = (value: number) => {
      emit('update:page', { ...props.page, pageNum: value })
    }

    return {
      handleSelectChange,
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>

<style lang="less" scoped>
.s-table {
  background: #fff;
  border-radius: 20px;
  padding: 20px;
  margin-top: 20px;
}
.st-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  .st-title {
    font-size: 16px;
    font-weight: bold;
  }
}
.st-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
