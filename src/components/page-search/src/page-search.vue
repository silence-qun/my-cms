<template>
  <s-form v-bind="searchFormConfig" v-model="formData">
    <template #header>高级检索</template>
    <template #footer>
      <el-button type="primary">搜索</el-button>
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
  setup() {
    const formData = ref({
      name: '',
      psd: '',
      role: '',
      time: []
    })

    return {
      formData
    }
  }
})
</script>

<style lang="less" scoped></style>
