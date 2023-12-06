<template>
  <div class="user">
    <PageSearch :searchFormConfig="searchFormConfig" @search="search" @reset="reset"></PageSearch>
    <page-content :contentTabelConfig="contentTabelConfig" page-name="User" ref="pageContentRef" @create="creatItem" @edit="editItem">
      <template #test>111</template>
    </page-content>
    <page-modal :modalConfig="modalConfigCom" :defaultInfo="defaultInfo" ref="pageModalRef"></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'
import { searchFormConfig } from './config/search.config'
import { contentTabelConfig } from './config/table.config'
import { modalConfig } from './config/modal.config'
import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModal } from '@/hooks/usePageModal'

export default defineComponent({
  name: 'sUser',
  components: { PageSearch, PageContent, PageModal },
  setup() {
    const [pageContentRef, search, reset] = usePageSearch()

    const modalConfigProxy = ref(modalConfig)

    const createCb = () => {
      const psdItem = modalConfigProxy.value.formItem.find((item) => item.field === 'psd')
      if (psdItem) psdItem.isHidden = false
    }
    const editCb = () => {
      const psdItem = modalConfigProxy.value.formItem.find((item) => item.field === 'psd')
      if (psdItem) psdItem.isHidden = true
    }
    const [pageModalRef, defaultInfo, creatItem, editItem] = usePageModal(createCb, editCb)

    const modalConfigCom = computed(() => {
      const roleItem = modalConfigProxy.value.formItem.find((item) => item.field === 'role')
      if (roleItem) {
        roleItem.options = [
          { label: '管理员', value: 'manager' },
          { label: '程序员', value: 'programmer' }
        ]
      }
      return modalConfigProxy.value
    })

    return {
      searchFormConfig,
      contentTabelConfig,
      modalConfigCom,
      pageContentRef,
      search,
      reset,
      pageModalRef,
      defaultInfo,
      creatItem,
      editItem
    }
  }
})
</script>

<style lang="less" scoped></style>
