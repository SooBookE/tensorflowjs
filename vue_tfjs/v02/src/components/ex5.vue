<template>
  <div>ex5 예제</div>
  <button @click="tf1()">스캐터차트 만들기</button>
  <button @click="tf2()">컨퓨전매트릭스 만들기</button>
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
      const data = {
        values: [
          [
            { x: 1, y: 34 },
            { x: 0, y: 56 },
            { x: 0, y: 71 },
            { x: 7, y: 40 },
            { x: 7, y: 4 },
            { x: 32, y: 1 },
            { x: 8, y: 0 }
          ],
          [
            { x: 25, y: 40 },
            { x: 14, y: 22 },
            { x: 1, y: 93 },
            { x: 0, y: 21 },
            { x: 78, y: 3 },
            { x: 21, y: 4 },
            { x: 17, y: 0 }
          ]
        ],
        series: ['Apple', 'Orange']
      }
      const option = {
        width: 400,
        xLabel: 'Apple',
        yLabel: 'Orange',
        zoomToFit: true
      }
      this.$tfvis.render.scatterplot(
        document.getElementById('plot1'),
        data,
        option
      )
    },
    tf2 () {
      const rows = 5
      const cols = 5
      const values = []
      for (let i = 0; i < rows; i++) {
        const row = []
        for (let j = 0; j < cols; j++) {
          row.push(Math.round(Math.random() * 50))
        }
        values.push(row)
      }
      const data = { values }

      const option = { width: 400, shadeDiagonal: false }

      this.$tfvis.render.confusionMatrix(
        document.getElementById('plot1'),
        data,
        option
      )
    }
  }
}
</script>

<style></style>
