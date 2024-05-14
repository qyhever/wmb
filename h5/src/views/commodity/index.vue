<template>
  <div class="commodity-page">
    <div class="pr-[12px] flex header-bar">
      <div class="menu-icon flex items-center justify-center">
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
    <div>
      <div v-for="(item) in 100" :key="item">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  onMounted,
  onBeforeUnmount
} from 'vue'

const filterBarHidden = ref(false)

defineOptions({
  name: 'Commodity'
})

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
</style>
