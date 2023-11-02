<template>
  <div class="page-modal">
    <el-dialog v-model="dialogVisible" title="新建" width="30%" align-center>
      <s-form v-bind="modalConfig" v-model="formData"></s-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogVisible = false"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import SForm from '@/base-ui/form'

export default defineComponent({
  name: 'pageModal',
  components: { SForm },
  props: {
    modalConfig: {
      type: Object,
      required: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    }
  },
  setup() {
    const dialogVisible = ref(false)

    const formData = ref({})

    return {
      dialogVisible,
      formData
    }
  }
})
</script>

<style lang="less" scoped></style>
