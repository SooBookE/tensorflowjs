<template>
  <div>
    <h2>특강2. tfjs 활용</h2>
    <a href="https://www.tensorflow.org/js">www.tensorflow.org.js</a>
  </div>
  <hr />
  <h3>외부링크들</h3>
  <ol>
    <!-- <li v-for="i of 9" :key="i"></li> -->
    <li v-for="i of 9" :key="i">
      <a :href="'http://localhost:8080/danfo0' + i + '.html'"
        >danfo0{{ i }}.html</a
      >
      <!-- <a :href="link + i + end">danfo0{{ i }}.html</a> -->
    </li>
  </ol>
</template>

<script>
/* eslint-disable */
export default {
  name: "app",
  data() {
    return {
      // link: "http://localhost:8080/danfo0",
      // end: ".html",
    };
  },
  methods: {},
};
</script>

<style></style>
