<template>
  <div>
    <video id="cameraview" width="720" height="480"></video>
    <button @click="mainInit()">촬영시작!</button>
  </div>
</template>

<script setup>
function camInit (stream) {
  const cameraView = document.getElementById('cameraview')
  cameraView.srcObject = stream
  cameraView.play()
}

function camInitFailed (error) {
  console.log('get camera permission failed : ', error)
}

// Main init

function mainInit () {
  // Check navigator media device available
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    // Navigator mediaDevices not supported
    alert('Media Device not supported')
    return
  }

  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then(camInit)
    .catch(camInitFailed)
}
</script>

<style></style>
