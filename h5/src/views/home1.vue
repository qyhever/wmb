
<template>
  <div>
    <div class="video-container">
      <!-- <video
        controls="controls"
        autoplay="autoplay"
        id="video"
        name="media"
        src="@/assets/videos/chrome.mp4"
        muted
      /> -->
      <van-button type="primary">
        button
      </van-button>
      <!-- <img
        src="@/assets/images/logo.svg"
        alt="logo"
        class="block w-[140px] h-[140px] mx-auto my-[30px]"
      > -->
      <div class="flex justify-center text-[20px] font-bold">
        home
      </div>
      <div
        v-for="item in 50"
        :key="item"
        class="leading-normal"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
onMounted(() => {
  // const video = document.querySelector('#video')
  // video.play()
  // video.src = new URL('@/assets/videos/chrome.mp4', import.meta.url).href
  // setTimeout(() => {
  //   video.pause()
  //   video.load()
  // }, 20)
})
</script>

<style lang="scss" scoped>
.video-container {
  // height: 500px;
}
.video-container video {
  width: 100%;
}
</style>
