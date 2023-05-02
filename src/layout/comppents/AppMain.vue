<!--个人中心主页  -->
<template>
  <div class="app-main">
    <!-- 缓存路由 二级路由视口 -->
    <router-view v-slot="{ Component }" class="wrapper">
        <!-- name="fade-transform"为为组件设置转场动画的名字 -->
        <!-- transition 设置动画-->
      <transition name="fade-transform">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
</script>

<style lang="scss" scoped>
.app-main {
  min-width: 980px;
  width: 100%;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  .wrapper {
    position: relative;
    margin: 105px 20px 0px;
    box-sizing: border-box;
  }
}

/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}

.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
