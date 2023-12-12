<template>
  <div class="pie-echarts">
    <s-echart :options="options"></s-echart>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import { EChartsOption } from 'echarts'
import SEchart from '@/base-ui/echart'
import type { IPieData } from '../types'

const props = defineProps<{
  data: IPieData[]
}>()

const options: EChartsOption = {
  title: {
    text: 'Referer of a Website',
    subtext: 'Fake Data',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: props.data,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}
</script>

<style lang="less" scoped></style>
