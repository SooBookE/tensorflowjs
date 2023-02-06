<template>
  <div>ex4 예제</div>
  <button @click="tf1()">히트맵 만들기</button>
  <div id="plot1"></div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {}
  },
  methods: {
    tf1 () {
      const data = {
        values: [
          [1, 0, 0],
          [0, 0.3, 0.7],
          [0, 0.7, 0.3] // heatmap에 전달되는 값은 중첩된 JS 배열 또는 2D tf.tensor이다.
        ],
        xTickLabels: ['Apple', 'Orange', 'Tangerline'], // xLabel과는 다름에 주의할 것. x축에 따라 놓인 개별 라벨들이다.
        yTickLabels: ['Apple', 'Orange', 'Tangerline']
      }
      const option = {
        width: 500,
        height: 300,
        xLabel: 'Actual Fruit', // 그래프 전체에 x축에 적히는 타이틀.
        yLabel: 'Recognized Fruit',
        colorMap: 'blues' // 그 외에 greyscale, viridis 존재.
      }
      this.$tfvis.render.heatmap(
        document.getElementById('plot1'),
        data,
        option
      )
    }
  }
}
</script>

<style></style>
