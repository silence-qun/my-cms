import { ref } from 'vue'
import PageModal from '@/components/page-modal'

type CallbackFn = (row?: any) => void

export function usePageModal(createCb?: CallbackFn, editCb?: CallbackFn): any {
  const pageModalRef = ref<InstanceType<typeof PageModal>>()
  const defaultInfo = ref({})
  const creatItem = () => {
    defaultInfo.value = {}
    if (pageModalRef.value) pageModalRef.value.dialogVisible = true
    createCb && createCb()
  }
  const editItem = (item: any) => {
    defaultInfo.value = { ...item }
    if (pageModalRef.value) pageModalRef.value.dialogVisible = true
    editCb && editCb(item)
  }

  return [pageModalRef, defaultInfo, creatItem, editItem]
}
