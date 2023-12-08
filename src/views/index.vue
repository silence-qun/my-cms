<template>
  <div class="my-cms">
    <div ref="barChart" class="bar-chart"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import * as echarts from 'echarts'

export default defineComponent({
  name: 'myCms',
  setup() {
    const barChart = ref<HTMLDivElement>()

    onMounted(() => {
      const barChartInstance = echarts.init(barChart.value)
      barChartInstance.setOption({
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      })
    })

    return { barChart }
  }
})
</script>

<style lang="less" scoped>
.my-cms {
  background-color: #fff;
  border-radius: 20px;
  padding: 20px;
}
.bar-chart {
  width: 500px;
  height: 300px;
}
</style>
