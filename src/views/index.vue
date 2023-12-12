<template>
  <div class="my-cms">
    <pie-echarts :data="pieData"></pie-echarts>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useStore } from '@/store'
import { PieEcharts } from '@/components/page-echarts'

export default defineComponent({
  name: 'myCms',
  components: { PieEcharts },
  setup() {
    const store = useStore()

    const goods = computed(() => store.state.analysis.goods)

    const pieData = [
      { value: 1048, name: 'Search Engine' },
      { value: 735, name: 'Direct' },
      { value: 580, name: 'Email' },
      { value: 484, name: 'Union Ads' },
      { value: 300, name: 'Video Ads' }
    ]

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
}
.bar-chart {
  width: 500px;
  height: 300px;
}
</style>
