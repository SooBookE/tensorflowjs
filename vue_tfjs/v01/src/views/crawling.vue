<template>
  <div>크롤링 데이터 학식 정보</div>
  <div>(Node.js 서버로 크롤링을 명령하고, 콜백 받은 데이터 가져오기.)</div>
  <button @click="getData()">명령 후 데이터 가져오기</button>
  <!-- <div>{{ data }}</div> -->
  <!-- 기본처럼 하면 받는 값을 html 기능으로 출력하지 못한다. -->
  <div v-html="data"></div>
  <!-- 이렇게 v-html 사용하면 html 기능 사용할 수 있다. -->
</template>

<script>
import axios from 'axios'

export default {
  name: 'app',
  data () {
    return {
      data: ''
    }
  },
  methods: {
    getData () {
      this.data = '정보 크롤링 중....'
      axios.get('/hak').then((res) => {
        this.data = res.data
      })
    }
  }
}
</script>

<style></style>
