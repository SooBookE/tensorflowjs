<template>
  <div>
    <div id="display"></div>
    <button @click="main()">스크린샷 분석</button>
    <button @click="alog()">디버거</button>
    <div>{{ result }}</div>
    <div>{{ trans }}</div>
  </div>
</template>

<script>
import * as tf from '@tensorflow/tfjs'
import * as mobilenet from '@tensorflow-models/mobilenet'
import axios from 'axios'

const VideoElement = document.createElement('video') // 캠 태그 생성.
export default {
  name: 'app',
  data () {
    return {
      result: '스크린샷 분석을 시작하세요.',
      trans: '',
      output: ''
    }
  },
  methods: {
    alog () {
      console.log(tf)
    },
    async main () {
      this.result = '이미지 분석중...'
      this.trans = '결과 변역중...'
      const display = document.getElementById('display')

      display.appendChild(VideoElement) // 캠 태그 할당.
      VideoElement.width = 400 // 캠 너비 할당.
      VideoElement.height = 400 // 캠 높이 할당.

      const cam = await tf.data.webcam(VideoElement)
      const net = await mobilenet.load() // 모바일넷 로드.(렌더링을 구동하므로 구문 작성 순서가 중요하다.)
      const img = await cam.capture() // 스크린샷 찍기.
      //   img.print();
      //   tf.dispose(img); // 왜 안댐??

      const cresult = await net.classify(img)

      this.output = `${cresult[0].className}(${(
        cresult[0].probability * 100
      ).toFixed(2)}%)`
      this.result = '분석 결과 : ' + this.output

      const cid = process.env.VUE_APP_nid
      const csecret = process.env.VUE_APP_npw
      const query = this.output
      const url = '/v1/papago/n2mt'

      const frm = new FormData()
      frm.append('source', 'en')
      frm.append('target', 'ko')
      frm.append('text', query)

      axios
        .post(url, frm, {
          headers: {
            'Content-Type': 'application/json',
            'X-Naver-Client-Id': cid,
            'X-Naver-Client-Secret': csecret
          }
        })
        // axios의 정식 요청 구문.
        .then((res) => {
          // console.log(res)
          const rst = res.data.message.result.translatedText
          //   console.log(rst);
          this.trans = '변환 결과 : ' + rst
        })

      // force와 legacy 차이.. ( 레거시가 쪼끔 더 안전하다? )
      // 포스는 우회우회우회... 해서 어거지로 깔아주는데, 문제 생기면 경로 때문에 골치 아파진다.

      // vue에서 methods 안에 바로 async function을 사용하면 this.변수 잡을 때 에러가 안 뜨지만,
      // function 안에 async function을 만들고, 그 안에서 this.변수를 잡으면 Proxy 에러가 발생한다...
    }
  }
}
</script>

<style></style>
