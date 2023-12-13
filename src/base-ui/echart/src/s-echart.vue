<template>
  <div class="s-echart">
    <div ref="chartRef" :style="{ width, height }"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineProps, withDefaults, watchEffect } from 'vue'
import { EChartsOption } from 'echarts'
import useEcharts from '../hooks/useEcharts'

// 使用 props 并设置默认值
const props = withDefaults(defineProps<{ options: EChartsOption; width?: string; height?: string }>(), {
  width: '100%',
  height: '400px'
})

const chartRef = ref<HTMLDivElement>()

onMounted(() => {
  if (!chartRef.value) return
  const { setOptions } = useEcharts(chartRef.value)
  watchEffect(() => {
    setOptions(props.options)
  })
})
</script>

<style lang="less" scoped>
.s-echart > div {
  width: 500px;
  height: 400px;
}
</style>
