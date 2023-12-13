<template>
  <div class="my-cms">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card shadow="hover">
          <pie-echarts :data="pieData"></pie-echarts>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <rose-echarts :data="pieData"></rose-echarts>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <line-echarts :data="pieData"></line-echarts>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="hover">
          <bar-echarts :data="pieData"></bar-echarts>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <map-echarts :data="pieData"></map-echarts>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useStore } from '@/store'
import { PieEcharts, RoseEcharts, LineEcharts, BarEcharts, MapEcharts } from '@/components/page-echarts'

export default defineComponent({
  name: 'myCms',
  components: { PieEcharts, RoseEcharts, LineEcharts, BarEcharts, MapEcharts },
  setup() {
    const store = useStore()

    const goods = computed(() => store.state.analysis.goods)

    const pieData = computed(() => goods.value.map((item) => ({ value: item.count, name: item.name })))

    onMounted(async () => {
      if (!goods.value.length) await store.dispatch('analysis/getGoods')
    })

    return { pieData }
  }
})
</script>

<style lang="less" scoped>
.my-cms {
  background-color: #fff;
  border-radius: 20px;
  padding: 20px;
  .el-row + .el-row {
    margin-top: 20px;
  }
}
</style>
