<template>
  <div class="navbar">
    {{ activeTabbar.label }}
  </div>
  <div class="basic-main">
    <router-view />
  </div>
  <div class="tabbar">
    <div
      v-for="(item, index) in state.tabbarList"
      :key="index"
      class="tabbar-item"
      :class="{
        active: item.path === state.activeTabbarPath
      }"
      @click="onTabbarClick(item)"
    >
      <ComSvgIcon :name="item.icon" class="tabbar-item-icon" />
      <div class="tabbar-item-label">
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

defineOptions({
  name: 'TabbarLayout'
})

const route = useRoute()
const router = useRouter()

const state = reactive({
  tabbarList: [
    {
      path: '/home',
      label: '首页',
      icon: 'home'
    },
    {
      path: '/classify',
      label: '分类',
      icon: 'classify'
    },
    {
      path: '/commodity',
      label: '全部商品',
      icon: 'commodity'
    },
    {
      path: '/cart',
      label: '购物车',
      icon: 'cart'
    },
    {
      path: '/mine',
      label: '我的',
      icon: 'user'
    }
  ],
  activeTabbarPath: route.path
})

const activeTabbar = computed(() => {
  return state.tabbarList.find(item => item.path === state.activeTabbarPath) || {}
})

const onTabbarClick = row => {
  if (state.activeTabbarPath === row.path) {
    return
  }
  state.activeTabbarPath = row.path
  router.push(row.path)
}
</script>

<style lang="less" scoped>
.navbar {
  z-index: 999;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 44px;
  min-width: 320px;
  max-width: 750px;
  background-color: #fff;
  padding-top: constant(safe-area-inset-top);
  padding-top: env(safe-area-inset-top);
  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background-color: #eee;
  }
}

.tabbar {
  z-index: 999;
  position: fixed;
  bottom: 0;
  display: flex;
  width: 100%;
  height: 48px;
  min-width: 320px;
  max-width: 750px;
  background-color: #fff;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background-color: #eee;
  }
}

.tabbar-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: rgb(178, 177, 175);
  &.active,
  &.active .tabbar-item-icon {
    color: rgb(255, 125, 172);
  }
}

.tabbar-item-icon {
  font-size: 20px;
  color: rgb(102, 102, 102);
}

.tabbar-item-label {
  padding-top: 4px;
  font-size: 12px;
}

.basic-main {
  padding-top: 44px;
  padding-bottom: 48px;
}
</style>
