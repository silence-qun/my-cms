<template>
  <div class="user">
    <s-form v-bind="searchFormConfig" v-model="formData"></s-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import SForm from '@/base-ui/form/index'
import { searchFormConfig } from './config/search.config'

export default defineComponent({
  name: 'sUser',
  components: { SForm },
  setup() {
    const formData = ref({
      name: '',
      psd: '',
      role: '',
      time: []
    })

    return {
      searchFormConfig,
      formData
    }
  }
})
</script>

<style lang="less" scoped></style>
