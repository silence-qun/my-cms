<template>
  <div class="rose-echarts">
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

const options = computed<EChartsOption>(() => ({
  legend: {
    top: 'bottom'
  },
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  series: [
    {
      name: 'Nightingale Chart',
      type: 'pie',
      radius: ['5%', '65%'],
      center: ['50%', '50%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 8
      },
      data: props.data
    }
  ]
}))
</script>

<style lang="less" scoped></style>
