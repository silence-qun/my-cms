<template>
  <div class="user">
    <PageSearch :searchFormConfig="searchFormConfig" @search="search" @reset="reset"></PageSearch>
    <page-content :contentTabelConfig="contentTabelConfig" page-name="User" ref="pageContentRef" @create="creatItem" @edit="editItem">
      <template #test>111</template>
    </page-content>
    <page-modal :modalConfig="modalConfigCom" :otherInfo="otherInfo" :defaultInfo="defaultInfo" ref="pageModalRef">
      <el-tree ref="treeRef" :data="list" node-key="id" :props="props" show-checkbox @checkChange="handleCheckChange" />
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, nextTick, onBeforeMount } from 'vue'
import { ElTree } from 'element-plus'
import { useStore } from '@/store'
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
    const store = useStore()

    const [pageContentRef, search, reset] = usePageSearch()

    const modalConfigProxy = ref(modalConfig)

    const createCb = () => {
      const psdItem = modalConfigProxy.value.formItem.find((item) => item.field === 'psd')
      if (psdItem) psdItem.isHidden = false
      // 这里设置 el-tree 回显
      nextTick(() => {
        treeRef.value?.setCheckedKeys([])
      })
    }
    const editCb = (row: any) => {
      const psdItem = modalConfigProxy.value.formItem.find((item) => item.field === 'psd')
      if (psdItem) psdItem.isHidden = true
      // 这里设置 el-tree 回显
      nextTick(() => {
        treeRef.value?.setCheckedKeys(row.menuList || [1, 5])
      })
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

    const treeRef = ref<InstanceType<typeof ElTree>>()
    const props = {
      label: 'title',
      children: 'children'
    }
    const list = computed(() => store.getters['system/pageListData']('menu'))
    const otherInfo = ref<any>({})
    const handleCheckChange = () => {
      const keys = treeRef.value?.getCheckedKeys()
      otherInfo.value = { menuList: keys }
    }

    onBeforeMount(() => {
      if (list.value.length === 0) {
        store.dispatch('system/getPageList', {
          pageName: 'Menu',
          query: {}
        })
      }
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
      editItem,
      treeRef,
      props,
      list,
      otherInfo,
      handleCheckChange
    }
  }
})
</script>

<style lang="less" scoped></style>
