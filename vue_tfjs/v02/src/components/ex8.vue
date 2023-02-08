<template>
  <div>ex8 예제 with Chartjs</div>
  <button @click="chart()">Chartjs</button>
  <br />
  <br />
  <br />
  <canvas id="myChart"></canvas>
</template>

<script setup>
import Chart from 'chart.js/auto'
// 빠른 실행을 위해 chart.js의 /auto를 가져온다?

// import { data } from "../assets/data.js";
// import { data as dd } from "../assets/data.js";
// import dd from "../assets/data.js";
import * as dd from '../assets/data.js'

function chart () {
  const ctx = document.getElementById('myChart')
  new Chart(ctx, {
    type: 'radar',
    data: dd.data,
    options: {
      responsive: false, // 반응형 끄기
      elements: { line: { borderWidth: 3 } }
    }
  })
}
</script>
