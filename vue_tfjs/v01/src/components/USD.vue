<template>
  <div>1. 실시간 환율 API</div>
  원화로 계산 할 달러는 <input v-model="input" />달러
  <div>현 시세: 1달러에 {{ onedollar }}원 입니다.</div>
  <br />
  <div>입력하신 {{ input }} 달러에 {{ result }}</div>
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
        'https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD'
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

<style></style>
