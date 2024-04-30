<template>
  <div class="flex-1 flex flex-col">
    <div class="py-[10px] px-[12px]">
      <div class="search-bar">
        <ComSvgIcon name="search" class="text-[18px] text-color-regular" />
        <span class="pl-[10px] text-color-secondary">请输入搜索的商品</span>
      </div>
    </div>
    <div class="flex-1 flex">
      <div class="aside">
        <div
          v-for="(item, index) in state.navList"
          :key="index"
          class="nav-item"
          :class="{
            active: state.activeNavId === item.id
          }"
          @click="onNavItemClick(item)"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="flex-1 classify-body">
        <div class="second-header flex items-center justify-between px-[14px] py-[10px]">
          <span class="font-bold">
            春夏新品
          </span>
          <ComSvgIcon name="chevron-right" class="text-color-secondary text-[16px]" />
        </div>
        <div class="classify-list">
          <div
            v-for="(item, index) in 10"
            :key="index"
            class="classify-item-outter"
          >
            <div class="classify-item">
              <div class="classify-item-img-con">
                <img class="classify-item-img" src="@/assets/images/category/01spring/10001.jpg" alt="classify">
              </div>
              <div class="pt-[6px] text-color-regular text-[12px] text-center">
                套装
              </div>
            </div>
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

defineOptions({
  name: 'Classify'
})

const state = reactive({
  navList: [],
  activeNavId: null
})

const onNavItemClick = row => {
  if (state.activeNavId === row.id) {
    return
  }
  state.activeNavId = row.id
}

const queryNavList = () => {
  setTimeout(() => {
    state.activeNavId = 13166048356250
    state.navList = [
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
  }, 2000)
}

onMounted(() => {
  queryNavList()
})

</script>

<style lang="less" scoped>
.search-bar {
  display: flex;
  align-items: center;
  height: 36px;
  padding: 0 14px;
  border-radius: 6px;
  background-color: #f5f5f5;
}

.aside {
  flex: 0 0 100px;
  background-color: #f5f5f5;
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
  &:before {
    top: -6px;
    background: radial-gradient(circle at top left, #f5f5f5 70.7%, #fff 70.7%, #fff 100%);
  }
  &:after {
    bottom: -6px;
    background: radial-gradient(circle at bottom left, #f5f5f5 70.7%, #fff 70.7%, #fff 100%);
  }
  &.active {
    border-radius: 0;
    background-color: #fff;
    color: rgb(255, 125, 172);
    font-weight: 700;
    &:before, &:after {
      display: block;
    }
  }
  &:first-of-type:before {
    opacity: 0;
  }
  &:last-of-type:after {
    opacity: 0;
  }
}

.classify-list {
  display: flex;
  flex-wrap: wrap;
  padding-top: 6px;
  padding-left: 14px;
}

.classify-item-outter {
  flex: 0 0 33.33%;
  padding-right: 14px;
  padding-bottom: 14px;
}

.classify-item-img-con {
  position: relative;
  height: 0;
  padding-bottom: 100%;
}

.classify-item-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}
</style>
