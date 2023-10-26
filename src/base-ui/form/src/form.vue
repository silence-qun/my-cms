<template>
  <div class="s-form">
    <el-form :label-width="labelWidth">
      <el-row>
        <el-col v-bind="colLayout" v-for="(item, index) in formItem" :key="index">
          <el-form-item :label="item.label" :style="itemStyle">
            <template v-if="['input', 'password'].includes(item.type)">
              <el-input v-model="formData[item.field]" :show-password="item.type === 'password'" />
            </template>
            <template v-else-if="['select'].includes(item.type)">
              <el-select v-model="formData[item.field]">
                <el-option v-for="op in item.options" :key="op.value" :label="op.label" :value="op.value" />
              </el-select>
            </template>
            <template v-else-if="['datepicker'].includes(item.type)">
              <el-date-picker v-model="formData[item.field]" v-bind="item.otherOps" />
            </template>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, watch } from 'vue'
import { IFormItem } from '../types'

export default defineComponent({
  name: 'sForm',
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    formItem: {
      type: Array as PropType<IFormItem[]>,
      default: () => []
    },
    labelWidth: {
      type: String,
      default: '68px'
    },
    itemStyle: {
      type: Object,
      default: () => ({ padding: '5px 10px' })
    },
    colLayout: {
      type: Object,
      default: () => ({ xl: 6, lg: 8, md: 12, sm: 24, xs: 24 })
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const formData = ref({ ...props.modelValue })

    watch(
      formData,
      (val) => {
        emit('update:modelValue', val)
      },
      {
        deep: true
      }
    )

    return {
      formData
    }
  }
})
</script>

<style lang="less" scoped></style>
