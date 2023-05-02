<template>
  <!--:class="open"给侧边栏动态添加类名  -->
  <div class="app-wrapper" :class="open">
    <!-- 左侧侧边栏  -->
    <SideBar class="sidebar-container"></SideBar>
    <div class="main-container">
      <!-- 头部导航栏区域 -->
      <div class="fixed-header">
        <Navbar></Navbar>
        <TagsView id="guide-tags"></TagsView>
      </div>
      <!-- 主要内容区 也是二级路由展示的位置  -->
      <AppMain></AppMain>
    </div>
  </div>
</template>
  <script setup>
import SideBar from "./comppents/siderbar/SideBar.vue"; //引入侧边栏组件
import AppMain from "./comppents/AppMain.vue"; //只要内容区域
import Navbar from "./comppents/Navbar.vue"; //引入组件Navbar
import { useAppStore } from "@/store/app"; //引入储存是否折叠的函数
import TagsView from "@/components/TagsViews/TagsViews.vue";
import { computed } from "vue";
const appStore = useAppStore(); //执行函数
//计数sidebarOpened的值为真添加 openSidebar类名为假添加hideSidebar
const open = computed(() =>
  appStore.sidebarOpened ? "openSidebar" : "hideSidebar"
);
</script>

<style lang="scss" scoped>
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  .main-container {
    height: 100%;
    transition: margin-left 0.28s;
    margin-left: $sideBarWidth;
    position: relative;
    background-color: #f0f2f5;

    transition: margin-left, $sideBarDuration !important;
    .fixed-header {
      position: fixed;
      top: 0;
      right: 0;
      z-index: 9;
      // 减去 侧边导航栏的宽度
      width: calc(100% - #{$sideBarWidth});
      transition: width #{$sideBarDuration};
    }
  }
  .sidebar-container {
    overflow: hidden;
    position: fixed;
    z-index: 1001;
    width: $sideBarWidth;
    height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    background-color: $menuBg;
    transition: width #{$sideBarDuration};
  }
}
//面包屑菜单折叠
.openSidebar {
  // 展开时
  .sidebar-container {
    // 210px
    width: $sideBarWidth !important;
  }
}

.hideSidebar {
  // 折叠时
  .sidebar-container {
    width: $hideSideBarWidth !important;
    // 54px
  }
  .main-container {
    margin-left: $hideSideBarWidth !important;
  }
  .fixed-header {
    width: calc(100% - $hideSideBarWidth) !important;
  }
}
</style>

