import { ref } from 'vue'
import PageContent from '@/components/page-content'

export function usePageSearch(): any {
  const pageContentRef = ref<InstanceType<typeof PageContent> | null>(null)

  const search = (value: any) => {
    pageContentRef.value?.getPageData(value)
  }

  const reset = () => {
    pageContentRef.value?.getPageData()
  }

  return [pageContentRef, search, reset]
}
