import * as echarts from 'echarts'
import chinaMapData from '../data/china.json'

echarts.registerMap('china', chinaMapData)

export default function (el: HTMLElement) {
  const chartInstance = echarts.init(el)

  const setOptions = (options: echarts.EChartsOption) => {
    chartInstance.setOption(options)
  }

  const or = new ResizeObserver(() => {
    chartInstance.resize()
  })

  or.observe(el)

  return {
    chartInstance,
    setOptions
  }
}
