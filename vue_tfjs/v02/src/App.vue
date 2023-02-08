<template>
  <nav>
    <router-link to="/">그래프 연습</router-link> |
    <router-link to="/cam">웹캠 켜보기</router-link> |
    <router-link to="/tmPose">웹캠 머신러닝</router-link> |
    <router-link to="/caam">웹캠 강사님 솔루션(mobilenet)</router-link> |
    <router-link to="/img">이미지(mobilenet)</router-link>
  </nav>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
