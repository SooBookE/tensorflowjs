import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as tf from '@tensorflow/tfjs'
import * as tfvis from '@tensorflow/tfjs-vis'
import * as mobilenet from '@tensorflow-models/mobilenet'
import * as tmPose from '@teachablemachine/pose'
// npm i로 다 설치하기.

const app = createApp(App)
app.config.globalProperties.$tf = tf
app.config.globalProperties.$tfvis = tfvis
app.config.globalProperties.$mobilenet = mobilenet
app.config.globalProperties.$tmPose = tmPose
// $를 변수 이름 앞에 붙여주는 것은 전역으로 사용하겠다는 암묵적 룰.

app.use(store).use(router).mount('#app')
