<template>
  <div class="page-search">
    <s-form v-bind="searchFormConfig" v-model="formData">
      <template #header>高级检索</template>
      <template #footer>
        <el-button type="primary" @click="getList">搜索</el-button>
        <el-button @click="reset">重置</el-button>
      </template>
    </s-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import SForm from '@/base-ui/form'

export default defineComponent({
  name: 'pageSearch',
  components: { SForm },
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  emits: ['reset', 'search'],
  setup(props, { emit }) {
    const formItems = props.searchFormConfig.formItem ?? []
    const formOriData: any = {}
    for (let item of formItems) {
      formOriData[item.field] = ''
    }

    let formData = ref(formOriData)

    const getList = () => {
      emit('search', formData.value)
    }

    const reset = () => {
      for (const key in formOriData) {
        formData.value[key] = formOriData[key]
      }

      // 当 s-form 组件中不使用 v-model 双向绑定，而使用 model-value 时，可直接赋值
      // formData.value = formOriData

      emit('reset')
    }

    return {
      formData,
      getList,
      reset
    }
  }
})
</script>

<style lang="less" scoped>
.page-search {
  background-color: #fff;
  border-radius: 20px;
  padding: 20px;
}
</style>
