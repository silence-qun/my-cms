<template>
  <div class="user">
    <PageSearch :searchFormConfig="searchFormConfig"></PageSearch>
    <page-content :contentTabelConfig="contentTabelConfig" page-name="User"></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import { searchFormConfig } from './config/search.config'
import { contentTabelConfig } from './config/table.config'

export default defineComponent({
  name: 'sUser',
  components: { PageSearch, PageContent },
  setup() {
    return {
      searchFormConfig,
      contentTabelConfig
    }
  }
})
</script>

<style lang="less" scoped></style>
