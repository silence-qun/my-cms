<template>
  <el-card class="box-card">
    <div>{{ title }}</div>
  </el-card>
  <el-button>按需引用</el-button>
  <el-button type="primary">按需引用</el-button>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
// import { ElCard, ElButton } from 'element-plus'
// import 'element-plus/theme-chalk/base.css'
// import 'element-plus/theme-chalk/el-card.css'
// import 'element-plus/theme-chalk/el-button.css'

interface Data {
  title: string
}

export default defineComponent({
  name: 'mainPage',
  // components: { ElCard, ElButton },
  setup() {
    const data = reactive<Data>({
      title: 'this is a main component'
    })

    return {
      ...toRefs(data)
    }
  }
})
</script>

<style lang="less" scoped></style>
