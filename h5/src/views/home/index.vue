<template>
  <div>
    <van-swipe class="my-swipe" :autoplay="30000" indicator-color="white">
      <van-swipe-item
        v-for="(item, index) in state.swipeList"
        :key="index"
      >
        <div class="swipe-img-container">
          <img class="swipe-img" :src="item.imageURL" alt="swipe">
        </div>
      </van-swipe-item>
    </van-swipe>
    <div class="shortcut pt-[20px] pl-[10px] pb-[10px]">
      <div class="shortcut-list flex flex-wrap">
        <div
          v-for="(item, index) in state.shortcutList"
          :key="index"
          class="shortcut-item-outter"
        >
          <div class="shortcut-item">
            <div class="shortcut-item-img-outter">
              <img class="shortcut-item-img" :src="item.imageURL" alt="shortcut">
            </div>
            <p class="pt-[10px] pb-[8px] text-[16px]">
              {{ item.title }}
            </p>
            <span class="text-[12px] underline">即刻选购</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  reactive,
  onMounted
} from 'vue'
import Loading from '@/components/loading'

defineOptions({
  name: 'Home'
})

const state = reactive({
  swipeList: [],
  shortcutList: []
})

const querySwipeList = () => {
  setTimeout(() => {
    state.swipeList = Array(3).fill(null).map((_, index) => {
      return {
        imageURL: '/imgs/swiper/' + (index + 1) + '.png'
      }
    })
  }, 2000)
}

const queryShortcutList = () => {
  setTimeout(() => {
    state.shortcutList = [
      {
        title: '配饰专区'
      },
      {
        title: '好物推荐'
      },
      {
        title: '经典百搭'
      },
      {
        title: '春夏新品'
      }
    ].map((item, index) => {
      return {
        ...item,
        imageURL: '/imgs/shortcut/' + (index + 1) + '.png'
      }
    })
  }, 2000)
}

onMounted(() => {
  querySwipeList()
  queryShortcutList()
  setTimeout(() => {
    Loading.open()
    setTimeout(() => {
      Loading.close()
    }, 3000)
  }, 2000)
})

</script>

<style lang="less" scoped>
.my-swipe {
  width: 100%;
  height: 0;
  padding-bottom: 138%;
  .swipe-img-container {
    position: relative;
    height: 0;
    padding-bottom: 138%;
  }
}

.swipe-img {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.shortcut-list {}

.shortcut-item-outter {
  position: relative;
  flex: 0 0 50%;
  padding-right: 10px;
  padding-bottom: 20px;
}

.shortcut-item {}

.shortcut-item-img-outter {
  position: relative;
  height: 0;
  padding-bottom: 134%;
}

.shortcut-item-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
