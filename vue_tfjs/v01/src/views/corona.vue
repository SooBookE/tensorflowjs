<template>
  <div>공공API 코로나데이터</div>
  <button @click="test()">console 환경변수 테스트</button>
  <hr />
  <select name="sel" id="selbox" v-model="local">
    <option value="부산">부산</option>
    <option value="대전">대전</option>
    <option value="대구">대구</option>
    <option value="광주">광주</option>
    <option value="서울">서울</option>
  </select>
  <select name="sel2" id="selbox2" v-model="day">
    <option value="어제">어제</option>
    <option value="오늘">오늘</option>
  </select>
  <button @click="getCorona()">
    ({{ day }}){{ local }}지역 코로나데이터 가져오기
  </button>
  <div>{{ corona }}</div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      local: '부산',
      day: '어제',
      corona: ''
    }
  },
  methods: {
    getCorona () {
      const key = process.env.VUE_APP_pkey

      const date = new Date()
      let str = ''
      let str2 = ''
      if ((date.getMonth() + '').length === 2) {
        str += date.getFullYear()
      } else {
        str += date.getFullYear() + '-0'
      }
      if ((date.getDate() + '').length === 2) {
        str += date.getMonth()
      } else {
        str += date.getMonth() + 1 + '-0'
      }
      str2 = str
      str += date.getDate()
      str2 += date.getDate() - 1
      const url =
        'http://apis.data.go.kr/1352000/ODMS_COVID_04/callCovid04Api?serviceKey=' +
        key +
        '&apiType=JSON&std_day='
      const today = url + str
      const yesterday = url + str2
      // console.log(str)
      // console.log(str2)
      this.corona = '데이터 로드 중....'
      if (this.day === '오늘') {
        fetch(today)
          .then((res) => res.json())
          .then((body) => {
            body.items.forEach((v) => {
              if (v.gubun === this.local) {
                this.corona =
                  '오늘자(' +
                  str +
                  ') ' +
                  this.local +
                  ' 확진자 수 : ' +
                  v.localOccCnt +
                  '명'
              }
            })
          })
      } else if (this.day === '어제') {
        fetch(yesterday)
          .then((res) => res.json())
          .then((body) => {
            body.items.forEach((v) => {
              if (v.gubun === this.local) {
                this.corona =
                  '어제자(' +
                  str2 +
                  ') ' +
                  this.local +
                  ' 확진자 수 : ' +
                  v.localOccCnt +
                  '명'
              }
            })
          })
      }
    }
  }
}
</script>

<style></style>
