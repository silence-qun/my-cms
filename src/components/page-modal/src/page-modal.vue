<template>
  <div class="page-modal">
    <el-dialog v-model="dialogVisible" title="新建" width="30%" align-center>
      <s-form v-bind="modalConfig" v-model="formData"></s-form>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirm"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import SForm from '@/base-ui/form'
import { ElMessage } from 'element-plus'

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
  setup(props) {
    const dialogVisible = ref(false)

    const formData = ref<any>({})

    watch(
      () => props.defaultInfo,
      (newVal) => {
        for (let item of props.modalConfig.formItem) {
          formData.value[item.field] = newVal[item.field] || ''
        }
      }
    )

    const confirm = () => {
      dialogVisible.value = false
      if (Object.keys(props.defaultInfo).length > 0) {
        // 编辑
        ElMessage.success(`${props.defaultInfo.name}修改成功`)
      } else {
        // 新增
        ElMessage.success(`新增${formData.value.name}成功`)
      }
    }

    return {
      dialogVisible,
      formData,
      confirm
    }
  }
})
</script>

<style lang="less" scoped></style>
