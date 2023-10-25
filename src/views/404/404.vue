<template>
  <div class="not-found">
    <el-empty description="Not Found">
      <el-button type="primary" :icon="Back" @click="$router.back()">返回前一页</el-button>
    </el-empty>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Back } from '@element-plus/icons-vue'

export default defineComponent({
  name: 'notFound',
  setup() {
    return {
      Back
    }
  }
})
</script>

<style lang="less" scoped></style>
