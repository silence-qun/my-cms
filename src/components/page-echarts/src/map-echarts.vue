<template>
  <div class="bar-echarts">
    <s-echart :options="options"></s-echart>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { EChartsOption } from 'echarts'
import SEchart from '@/base-ui/echart'

const randomData = () => {
  return Math.round(Math.random() * 1000)
}

const options = computed<EChartsOption>(() => ({
  title: {
    text: 'iphone销量',
    subtext: '纯属虚构',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
    // data: ['iphone3', 'iphone4', 'iphone5']
  },
  visualMap: {
    min: 0,
    max: 2500,
    left: 'left',
    top: 'bottom',
    text: ['高', '低'], // 文本，默认为数值文本
    calculable: true
  },
  toolbox: {
    show: true,
    orient: 'vertical',
    left: 'right',
    top: 'center',
    feature: {
      dataView: { readOnly: false },
      restore: {},
      saveAsImage: {}
    }
  },
  series: [
    {
      name: 'iphone3',
      type: 'map',
      map: 'china',
      data: [
        { name: '北京市', value: randomData() },
        { name: '天津市', value: randomData() },
        { name: '上海市', value: randomData() },
        { name: '重庆市', value: randomData() },
        { name: '河北省', value: randomData() },
        { name: '河南省', value: randomData() },
        { name: '云南省', value: randomData() },
        { name: '辽宁省', value: randomData() },
        { name: '黑龙江省', value: randomData() },
        { name: '湖南省', value: randomData() },
        { name: '安徽省', value: randomData() },
        { name: '山东省', value: randomData() },
        { name: '新疆维吾尔自治区', value: randomData() },
        { name: '江苏省', value: randomData() },
        { name: '浙江省', value: randomData() },
        { name: '江西省', value: randomData() },
        { name: '湖北省', value: randomData() },
        { name: '广西壮族自治区', value: randomData() },
        { name: '甘肃省', value: randomData() },
        { name: '山西省', value: randomData() },
        { name: '内蒙古自治区', value: randomData() },
        { name: '陕西省', value: randomData() },
        { name: '吉林省', value: randomData() },
        { name: '福建省', value: randomData() },
        { name: '贵州省', value: randomData() },
        { name: '广东省', value: randomData() },
        { name: '青海省', value: randomData() },
        { name: '西藏自治区', value: randomData() },
        { name: '四川省', value: randomData() },
        { name: '宁夏回族自治区', value: randomData() },
        { name: '海南省', value: randomData() },
        { name: '台湾省', value: randomData() },
        { name: '香港特别行政区', value: randomData() },
        { name: '澳门特别行政区', value: randomData() }
      ]
    }
  ]
}))
</script>

<style lang="less" scoped></style>
