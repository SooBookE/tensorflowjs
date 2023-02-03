import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
/* eslint-disable */
import * as tf from "@tensorflow/tfjs";

const app = createApp(App);

app.config.globalProperties.$tf = tf; // this.$tf 이런 식으로 변수를 사용할 수 있다.

app.use(store).use(router).mount("#app");
