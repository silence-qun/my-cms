<template>
  <div class="s-form">
    <div class="sf-header" v-if="$slots.header"><slot name="header"></slot></div>
    <el-form :label-width="labelWidth">
      <el-row>
        <el-col v-bind="colLayout" v-for="(item, index) in formItem" :key="index">
          <el-form-item :label="item.label" :style="itemStyle" v-if="!item.isHidden">
            <template v-if="['input', 'password'].includes(item.type)">
              <el-input v-model="formData[item.field]" :placeholder="item.placeholder" :show-password="item.type === 'password'" />
              <!-- 不使用 v-model 双向绑定，而使用 model-value 时，手动触发值更新事件 -->
              <!-- <el-input
                :model-value="modelValue[item.field]"
                @update:model-value="handleValueChange($event, item.field)"
                :placeholder="item.placeholder"
                :show-password="item.type === 'password'"
              /> -->
            </template>
            <template v-else-if="['select'].includes(item.type)">
              <el-select v-model="formData[item.field]" class="sf-select">
                <el-option v-for="op in item.options" :key="op.value" :label="op.label" :value="op.value" />
              </el-select>
              <!-- 不使用 v-model 双向绑定，而使用 model-value 时，手动触发值更新事件 -->
              <!-- <el-select :model-value="modelValue[item.field]" @update:model-value="handleValueChange($event, item.field)" class="sf-select">
                <el-option v-for="op in item.options" :key="op.value" :label="op.label" :value="op.value" />
              </el-select> -->
            </template>
            <template v-else-if="['datepicker'].includes(item.type)">
              <el-date-picker v-model="formData[item.field]" v-bind="item.otherOps" />
              <!-- 不使用 v-model 双向绑定，而使用 model-value 时，手动触发值更新事件 -->
              <!-- <el-date-picker
                :model-value="modelValue[item.field]"
                @update:model-value="handleValueChange($event, item.field)"
                v-bind="item.otherOps"
              /> -->
            </template>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="sf-footer" v-if="$slots.header"><slot name="footer"></slot></div>
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
    // 使用这种方法会导致数据不更新
    // const formData = ref({ ...props.modelValue })
    const formData = ref<any>({})
    watch(
      () => props.modelValue,
      (val) => {
        // 只更新字段值，而不是替换整个 formData ，可防止进入死循环
        Object.keys(val).forEach((key) => {
          formData.value[key] = val[key]
        })
      },
      {
        immediate: true,
        deep: true
      }
    )

    watch(
      () => formData.value,
      (val) => {
        emit('update:modelValue', { ...val })
      },
      {
        deep: true
      }
    )

    // 当组件不使用 v-model 双向绑定，而使用 model-value 时，手动触发值更新事件
    // const handleValueChange = (value: any, field: string) => {
    //   emit('update:modelValue', { ...props.modelValue, [field]: value })
    // }

    return {
      formData
      // handleValueChange
    }
  }
})
</script>

<style lang="less" scoped>
.sf-header {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
}
.sf-footer {
  text-align: right;
}

.sf-select {
  width: 100%;
}
</style>
