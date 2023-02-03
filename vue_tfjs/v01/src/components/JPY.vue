<template>
  <div>2. 실시간 환율 API</div>
  원화로 계산 할 엔는 <input v-model="input" />엔
  <div>현 시세: 1엔에 {{ onedollar }}원 입니다.</div>
  <br />
  <div>입력하신 {{ input }} 엔에 {{ result }}</div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      input: 0,
      onedollar: 0,
      result: '숫자를 입력하세요.'
    }
  },
  watch: {
    // 이 객체에서 동작을 감시하는 속성.
    input () {
      const dollar = this.input
      if (isNaN(dollar)) {
        this.result = '계산중........'
        return
      }
      const url =
        'https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWJPY'
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          this.onedollar = data[0].basePrice
          const mydata = this.input * this.onedollar
          this.result = `${mydata.toLocaleString('ko-KR')}`
        })
    }
  },
  methods: {}
}
</script>
<!-- 해당 컴포넌트 범위만 스타일 주고 싶을 때 -->
<style scoped>
input {
  width: 80px;
  text-align: right;
  border-style: none;
  font-size: 1em;
  border-bottom: 1px solid cadetblue;
  border-bottom-color: cadetblue;
}
input:focus {
  outline: none;
}
</style>
<!-- 전역 스타일 주고 싶을 때 -->
<!-- <style>
input {
  width: 80px;
  text-align: right;
  border-style: none;
  font-size: 1em;
  border-bottom: 1px solid cadetblue;
  border-bottom-color: cadetblue;
}
input:focus {
  outline: none;
}
</style> -->
