import { ref } from 'vue'
import PageModal from '@/components/page-modal'

export function usePageModal(): any {
  const pageModalRef = ref<InstanceType<typeof PageModal>>()
  const defaultInfo = ref({})
  const creatItem = () => {
    if (pageModalRef.value) pageModalRef.value.dialogVisible = true
  }
  const editItem = (item: any) => {
    console.log(item)
    if (pageModalRef.value) pageModalRef.value.dialogVisible = true
  }

  return [pageModalRef, defaultInfo, creatItem, editItem]
}
