<template>
  <div class="menu">
    <PageSearch :searchFormConfig="searchFormConfig" @search="search" @reset="reset"></PageSearch>
    <page-content :contentTabelConfig="contentTabelConfig" page-name="Menu" ref="pageContentRef"></page-content>
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
  name: 'sMenu',
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
