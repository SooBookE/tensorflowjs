import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as tfvis from '@tensorflow/tfjs-vis'
import * as tf from '@tensorflow/tfjs'

const app = createApp(App)
app.config.globalProperties.$tfvis = tfvis
app.config.globalProperties.$tf = tf

app.use(store).use(router).mount('#app')
