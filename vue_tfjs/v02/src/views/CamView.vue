<template>
  <div>웹캠 뜨게 하기</div>
  <button @click="init()">촬영 시작</button>
  <div id="container">
    <video autoplay="true" id="videoElement"></video>
  </div>
</template>

<script setup>
const video = document.querySelector("#videoElement");

if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then(function (stream) {
      video.srcObject = stream;
    })
    .catch(function (err0r) {
      console.log("Something went wrong!");
    });
}
</script>
<style>
#container {
  margin: 0px auto;
  width: 500px;
  height: 375px;
  border: 10px #333 solid;
}
#videoElement {
  width: 500px;
  height: 375px;
  background-color: #666;
}
</style>
