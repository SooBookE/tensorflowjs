<template>
  <div>공공API 공기질 데이터</div>
  <hr />
  <button @click="[getpm25()]">부산지역 공기질 데이터 가져오기</button>
  <!-- 배열에 담으면 함수 여러 개 사용할 수 있다. -->
  <div>{{ pm25 }}</div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      pm25: ''
    }
  },
  methods: {
    getpm25 () {
      const key = process.env.VUE_APP_pkey
      //   console.log(key)
      const surl =
        'http://apis.data.go.kr/6260000/AirQualityInfoService/getAirQualityInfoClassifiedByStation?serviceKey=' +
        key +
        '&pageNo=1&numOfRows5&areaIndex=221162&resultType=json'
      this.pm25 = '데이터 로드 중...'
      fetch(surl)
        .then((res) => res.json())
        .then((body) => {
          const _ =
            body.getAirQualityInfoClassifiedByStation.body.items.item[0]
          const str = `부산의 초미세먼지: ${_.pm25}, 미세먼지: ${_.pm10}, 이산화탄소: ${_.co}`
          console.log(_)
          console.log(str)
          this.pm25 = str
        })
    }
  }
}
</script>

<style></style>
