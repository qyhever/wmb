<template>
  <div class="commodity-page">
    <div class="pr-[12px] flex header-bar">
      <div class="menu-icon flex items-center justify-center" @click="onOpenPopup">
        <ComSvgIcon name="menu" class="text-[18px] text-color-regular" />
      </div>
      <div class="py-[10px] flex-1">
        <div class="search-bar">
          <ComSvgIcon name="search" class="text-[18px] text-color-regular" />
          <span class="pl-[10px] text-color-secondary">请输入搜索的商品</span>
        </div>
      </div>
    </div>
    <div
      class="filter-bar"
      :class="{
        hidden: filterBarHidden
      }"
    >
      <div class="filter-item">
        综合
      </div>
      <div class="filter-item">
        销量
      </div>
      <div class="filter-item">
        新品
      </div>
      <div class="filter-item">
        价格
      </div>
    </div>
    <div class="flex flex-wrap pt-[10px] pl-[10px]">
      <div
        v-for="(item) in 100"
        :key="item"
        class="goods-item-outter"
      >
        <div class="goods-item">
          <div class="goods-item-image-con">
            <img class="goods-item-image" src="/imgs/1.jpg" alt="goods">
          </div>
          <div class="p-[10px]">
            <div class="text-color-default leading-[20px]">
              皮制蝴蝶结发夹
            </div>
            <div class="text-color-secondary text-[12px] leading-[20px]">
              已售11件
            </div>
            <div>
              <van-tag plain color="rgba(245,111,166,1)">
                满50包邮
              </van-tag>
            </div>
            <div>
              ￥19
            </div>
          </div>
        </div>
      </div>
    </div>
    <van-popup
      v-model:show="state.visible"
      position="left"
      :style="{ width: state.width, height: '100%' }"
    >
      <div>
        <div
          v-for="(item, index) in state.navList"
          :key="index"
          class="nav-item"
          @click="onNavItemClick(item)"
        >
          {{ item.name }}
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import {
  ref,
  reactive,
  onMounted,
  onBeforeUnmount
} from 'vue'

const filterBarHidden = ref(false)

defineOptions({
  name: 'Commodity'
})

const state = reactive({
  visible: false,
  width: '30%',
  navList: [
    {
      id: 13166048356250,
      name: '春夏新品'
    },
    {
      id: 12520499356250,
      name: '好物推荐'
    },
    {
      id: 12520416356250,
      name: '首饰'
    },
    {
      id: 12908574356250,
      name: '经典百搭'
    },
    {
      id: 120881912151,
      name: '鞋包专区'
    }
  ]
})

const onOpenPopup = () => {
  state.visible = true
}

const onNavItemClick = () => {
  state.width = '80%'
}

const onScroll = () => {
  const scrollT = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
  console.log('scrollT: ', scrollT)
  filterBarHidden.value = scrollT > 240
}

onMounted(() => {
  window.addEventListener('scroll', onScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style lang="less" scoped>
.commodity-page {
  padding-top: 100px;
}

.header-bar {
  z-index: 5;
  position: fixed;
  top: 0;
  width: 100%;
  min-width: 320px;
  max-width: 750px;
  background-color: #fff;
}

.search-bar {
  display: flex;
  align-items: center;
  height: 36px;
  padding: 0 14px;
  border-radius: 6px;
  background-color: #f5f5f5;
}

.menu-icon {
  flex: 0 0 56px;
}

.filter-bar {
  z-index: 2;
  position: fixed;
  top: 56px;
  width: 100%;
  min-width: 320px;
  max-width: 750px;
  display: flex;
  align-items: center;
  height: 44px;
  background-color: rgba(238, 238, 238, 1);
  transition: .6s;
  &.hidden {
    top: -62px;
  }
}

.filter-item {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.goods-item-outter {
  flex: 0 0 50%;
  height: 300px;
  padding-right: 10px;
  padding-bottom: 10px;
}

.goods-item {
  border-radius: 6px;
  overflow: hidden;
  background-color: #fff;
}

.goods-item-image-con {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 100%;
}

.goods-item-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.nav-item {
  padding: 16px 0 16px 12px;
  border-radius: 6px;
  line-height: 18px;
  color: @text-color-regular;
  &:before, &:after {
    display: none;
    content: "";
    position: absolute;
    right: 0;
    width: 6px;
    height: 6px;
  }
  &.active {
    border-radius: 0;
    background-color: #fff;
    color: rgb(255, 125, 172);
    font-weight: 700;
  }
}
</style>
