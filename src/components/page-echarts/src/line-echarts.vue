<template>
  <div class="line-echarts">
    <s-echart :options="options"></s-echart>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue'
import { EChartsOption } from 'echarts'
import SEchart from '@/base-ui/echart'
import type { IPieData } from '../types'

const props = defineProps<{
  data: IPieData[]
}>()

const xData = computed(() => props.data.map((item) => item.name))
const yData = computed(() => props.data.map((item) => item.value))

const options = computed<EChartsOption>(() => ({
  title: {
    text: 'Stacked Area Chart'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  legend: {},
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: xData.value
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: 'Email',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: yData.value
    }
  ]
}))
</script>

<style lang="less" scoped></style>
