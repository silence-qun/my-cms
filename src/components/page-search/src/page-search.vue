<template>
  <s-form v-bind="searchFormConfig" v-model="formData">
    <template #header>高级检索</template>
    <template #footer>
      <el-button type="primary">搜索</el-button>
      <el-button @click="reset">重置</el-button>
    </template>
  </s-form>
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
  setup(props) {
    const formItems = props.searchFormConfig.formItem ?? []
    const formOriData: any = {}
    for (let item of formItems) {
      formOriData[item.field] = ''
    }

    let formData = ref(formOriData)

    const reset = () => {
      formData.value = formOriData
    }

    return {
      formData,
      reset
    }
  }
})
</script>

<style lang="less" scoped></style>
