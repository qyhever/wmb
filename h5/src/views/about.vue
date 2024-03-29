<template>
  <div class="about">
    <van-nav-bar
      title="标题"
      left-text="返回"
      right-text="按钮"
      left-arrow
      safe-area-inset-top
      fixed
      placeholder
    />
    content
    <van-tabbar
      fixed
      placeholder
      safe-area-inset-bottom
    >
      <van-tabbar-item icon="home-o">
        标签
      </van-tabbar-item>
      <van-tabbar-item icon="search">
        标签
      </van-tabbar-item>
      <van-tabbar-item icon="friends-o">
        标签
      </van-tabbar-item>
      <van-tabbar-item icon="setting-o">
        标签
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
