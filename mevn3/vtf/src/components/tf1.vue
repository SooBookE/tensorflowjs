<template>
  <div>
    <p>1. xlsx에서 가져온 자료를 Vue.js에서 직접 분석하기.</p>
    <p>자식의 키 엑셀 데이터 셋을 가져오세요.</p>
    <input
      type="file"
      id="file"
      accept=".xls, .xlsx"
      style="display: none"
      @change="tfget()"
    />
    <label for="file">+</label>
    <div v-if="filename">로드 된 파일 : {{ filename }}</div>
    <hr />
    <button v-if="filename" @click="makeModel()">새로 모델링 하기</button>
    <input v-if="done" type="text" v-model.number="inputData" />
    <button @click="predict()" v-if="done">모델적용</button>
    <div>{{ load }}</div>
    <div v-if="result">
      모델로 부터 얻은 예측: {{ inputData }} 일때 {{ result }}
    </div>
  </div>
  <div id="plot1"></div>
</template>
<!-- <script setup>
  // import { defineProps } from 'vue' //  vue3부터 안해도 됨
  // const pr = defineProps({ // 테스트 해봄
  //   name: String,
  //   age: Number
  // })

  </script> -->

<script>
import * as XLSX from 'xlsx/xlsx.mjs'
export default {
  name: 'app',
  data() {
    return {
      done: false,
      filename: '',
      tfF: [],
      tfS: [],
      inputData: 174,
      result: '',
      load: ''
    }
  },

  watch: {
    inputData: 'predict'
  },
  methods: {
    run(father, son, name = '아버지와 자식의 키') {
      const tfvis = this.$tfvis
      const fatherD = father.map((v, i) => ({
        x: i,
        y: v
      }))
      const sonD = son.map((v, i) => ({
        x: i,
        y: v
      }))

      tfvis.render.scatterplot(
        { name },
        { values: [fatherD, sonD] },
        {
          xLabel: 'x',
          yLabel: '키',
          height: 250,
          width: 500,
          zoomToFit: 1
        }
      )
    },
    tfget() {
      const father = []
      const son = []

      const input = document.getElementById('file')
      this.filename = input.files[0].name

      const reader = new FileReader()
      // 기본적으로 제공하는 클래스. 업로드한 파일 구조를 파악할 수 있다.
      // 업로드 하고 분석해야 하므로 동기적으로 구성해야 한다.
      reader.onload = () => {
        // 다 읽고 난 후 동작.
        const data = reader.result // 결과 담기.
        const workBook = XLSX.read(data, { type: 'binary' }) // xlsx 파일을 읽어온다.
        const x = workBook.Sheets.train // 시트 이름에 따라 바꿔줘야 한다.

        for (let i = 2; i <= Number(x['!ref'].replace('A1:B', '')); i++) {
          father.push(x['A' + i].v)
          son.push(x['B' + i].v)
        }
        // console.log(x) // 파일 확인용 콘솔.

        this.tfF = father // 다루기 쉽도록 텐서로 바꾸기 전에 담아서 프록시 객체로 감싸지 못하도록 하기.
        this.tfS = son // 다루기 쉽도록 텐서로 바꾸기 전에 담아서 프록시 객체로 감싸지 못하도록 하기.
        // console.log(this.tfF) // 아버지 키 확인용 콘솔.
        // console.log(this.tfS) // 자식 키 확인용 콘솔.
        this.run(father, son)
      }
      reader.readAsBinaryString(input.files[0]) // 이 구문으로 엑셀 파일 분석 시작.
    },
    async makeModel() {
      this.load = '셔플 후 모델링 중...'
      // 텐서로 변환해서 모델 만들기 위한 빌드업.
      const tf = this.$tf
      const tfvis = this.$tfvis
      const tff = this.tfF
      const tfs = this.tfS
      const tffs = []
      const tfss = []
      const bs = []
      /* 객체 방식으로 데이터 섞기. */
      tff.forEach((v, i) => {
        const obj = {}
        obj[v] = tfs[i]
        bs.push(obj)
      })
      tf.util.shuffle(bs)
      bs.forEach((v, i) => {
        tffs.push(Number(Object.keys(bs[i])[0]))
        tfss.push(Object.values(bs[i])[0])
      })
      this.run(tffs, tfss, '셔플 후 아버지와 자식의 키')

      /* 셔플 데이터 텐서로 변환. */
      const tfF = tf.tensor(tffs)
      const tfS = tf.tensor(tfss)

      function createModel() {
        const model = tf.sequential()
        model.add(tf.layers.dense({ units: 12, inputShape: 1 }))

        model.add(tf.layers.dense({ units: 12, activation: 'relu' })) // activation: 'relu'
        model.add(tf.layers.dense({ units: 1 }))
        model.compile({
          loss: 'meanSquaredError', // 'binaryCrossentropy',
          optimizer: 'adam'
        })
        return model
      }
      const fitParam = {
        batchSize: 36,
        epochs: 100,
        callbacks: [
          tfvis.show.fitCallbacks(
            { name: '아버지 키에 대한 자식 키 예측 ' },
            ['loss', 'mse'],
            { height: 200, width: 500, callbacks: ['onEpochEnd'] }
          ),
          {
            onEpochEnd: function (epoch, logs) {
              console.log('epoch', epoch, logs, 'RMSE=>', Math.sqrt(logs.loss))
            }
          }
        ]
      }

      const model = createModel()
      console.time('동작시간')
      console.log(3, tfF, tfS, fitParam, model)
      await model.fit(tfF, tfS, fitParam)
      await model.summary()
      this.load = ''
      await model.predict(tf.tensor([170])).print()
      await model.save('localstorage://fatherSon')
      await console.log('모델 저장됨')
      tf.dispose(tfF)
      tf.dispose(tfS)
      console.timeEnd('동작시간')
      this.done = true
    },
    async predict() {
      const tf = this.$tf
      const model = await tf.loadLayersModel('localstorage://fatherSon')
      console.log(model.getWeights())
      const pre = await model.predict(tf.tensor([this.inputData]))
      this.result = pre.dataSync()[0].toFixed(2)
      pre.print()
    }
  }
}
</script>

<style scoped>
label {
  display: inline-block;
  padding: 20px 30px;
  border-radius: 10px;
  background-color: #96aae7;
  color: #fff;
  font-size: 2.5em;
}
label:active {
  transform: scale(0.9);
  background-color: #6d85ce;
}
</style>
