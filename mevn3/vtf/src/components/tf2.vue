<template>
  <div>
    <p>2. 캠으로 얼굴 인식.(인원수 체크)</p>
    <button @click="main()">캠 동작</button>
    <button>분석</button>
    <p v-if="length">{{ length }}</p>
    <!-- 인원 수.(데이터의 길이로 출력됨.) -->
    <div id="display">
      <canvas id="canvas"></canvas>
    </div>
  </div>
</template>

<script>
import * as blazeface from '@tensorflow-models/blazeface'
const video = document.createElement('video') // 미리 생성을 해도 된다.

export default {
  name: 'app',
  data() {
    return {
      length: 0,
      predictions: ''
    }
  },
  methods: {
    async main() {
      const tf = this.$tf
      this.length = '얼굴 인식 중...'
      const display = document.getElementById('display')
      const canvas = document.getElementById('canvas')
      const ctx = canvas.getContext('2d') // 캔버스에서 자주 쓰는 예제. 잘 알아 둘 것!

      display.append(video)

      /* canvas 사이즈와 같아야 한다. */
      video.width = 400
      video.height = 400

      tf.data.webcam(video)
      // console.log(blazeface)
      while (1) {
        const blaze = await blazeface.load() // 인식 모듈 장착.
        const predictions = await blaze.estimateFaces(video) // 비디오 분석 기능 할당.

        await tf.dispose(blaze) // 모델 측정하면 텐서 비우기.
        this.predictions = predictions // 데이터 자체 저장.
        this.length = predictions.length // 인원 수 저장.

        if (predictions.length > 0) {
          // 사람이 있는 것 같으면.
          for (let i = 0; i < predictions.length; i++) {
            // 사람 인원 수 만큼 사각형을 그리도록 명령해줘야 한다.
            const start = predictions[i].topLeft
            const end = predictions[i].bottomRight
            const size = [end[0] - start[0], end[1] - start[1]]
            // 유동적인 얼굴 사이즈 지정. x길이와 y길이를 지정해준다.

            canvas.height = video.height
            canvas.width = video.width

            ctx.strokeStyle = 'greenyellow' // 테두리 색.
            ctx.lineWidth = 4 // 테두리 굵기.

            // const RE = predictions[i].landmarks[0] // 우안 위치.
            // const LE = predictions[i].landmarks[1] // 좌안 위치.
            // console.log(ctx)
            const loop = () => {
              ctx.strokeRect(start[0], start[1], size[0], size[1])
            }
            setTimeout(loop) // 무한 루프이므로, 계속 연산 해제하기. 과부하 걸리면 시간을 좀 늘려주자.
          }
        } else {
          // 없으면 캔버스를 0으로 만든다.
          canvas.height = 0
          canvas.width = 0
        }
      }
    }
  }
}
</script>

<style scoped>
body {
  position: relative;
}
canvas,
video {
  position: absolute;
}
</style>
