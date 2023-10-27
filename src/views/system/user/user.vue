<template>
  <div class="user">
    <PageSearch :searchFormConfig="searchFormConfig"></PageSearch>
    <s-table :list="userList" :propList="propList">
      <template #avatar="{ row }"> <el-avatar :src="row.avatar" /> </template>
      <template #gender="{ row }">
        <div class="u-avatar">
          {{ genders[row.gender as keyof typeof genders].label }}
          <s-icon :name="genders[row.gender as keyof typeof genders].icon" :color="genders[row.gender as keyof typeof genders].color"></s-icon>
        </div>
      </template>
    </s-table>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import PageSearch from '@/components/page-search'
import STable from '@/base-ui/table'
import { searchFormConfig } from './config/search.config'
import { propList, genders } from './config/table.config'
import { useStore } from '@/store'

export default defineComponent({
  name: 'sUser',
  components: { PageSearch, STable },
  setup() {
    const store = useStore()
    store.dispatch('system/getPageList', {
      url: 'User'
    })
    const userList = computed(() => store.state.system.userList)

    return {
      searchFormConfig,
      userList,
      propList,
      genders
    }
  }
})
</script>

<style lang="less" scoped>
.u-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
}
</style>
