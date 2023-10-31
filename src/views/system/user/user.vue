<template>
  <div class="user">
    <PageSearch :searchFormConfig="searchFormConfig" @search="search" @reset="reset"></PageSearch>
    <page-content :contentTabelConfig="contentTabelConfig" page-name="User" ref="pageContentRef">
      <template #test>111</template>
    </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import { searchFormConfig } from './config/search.config'
import { contentTabelConfig } from './config/table.config'
import { usePageSearch } from '@/hooks/usePageSearch'

export default defineComponent({
  name: 'sUser',
  components: { PageSearch, PageContent },
  setup() {
    const [pageContentRef, search, reset] = usePageSearch()

    return {
      searchFormConfig,
      contentTabelConfig,
      pageContentRef,
      search,
      reset
    }
  }
})
</script>

<style lang="less" scoped></style>
