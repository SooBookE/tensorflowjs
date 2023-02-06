<template>
  <div>ex3 예제</div>
  <button @click="tf1()">히스토그램 만들기</button>
  <div id="plot1"></div>
  <div id="plot2"></div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {}
  },
  methods: {
    tf1 () {
      const data = [1, 5, 5, 5, 5, 10, -3, -3]
      // const id = document.getElementById
      this.$tfvis.render.histogram(document.getElementById('plot1'), data, {
        width: 800
      })
      this.$tfvis.render.histogram(document.getElementById('plot2'), data, {
        maxBins: 3, // 출력 막대기 갯수?
        width: 400
      })
    }
  }
}
</script>

<style>
canvas {
  width: 60% !important;
  display: inline !important;
  /* !important 삽입하면 강제로 내 css룰을 우선시켜준다. */
}
</style>
