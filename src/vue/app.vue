<template>
  <div class="app">
    <h2>{{ title }}</h2>
    <h2>{{ mas }}</h2>
    <HelloWorld></HelloWorld>
  </div>
</template>

<script>
import HelloWorld from './HelloWorld.vue'
export default {
  name: 'app',
  components: {
    HelloWorld,
  },
  data() {
    return {
      title: 'vue-sfcs',
      mas: 'HMR'
    }
  }
}
</script>

<style scoped>
h2 {
  color: red;
}
</style>