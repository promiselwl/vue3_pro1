<template>
  <div class="hamburger-container" @click="changeSidebarOpened">
    <!-- 添加动态的svg图标 -->
    <svg-icon :icon="icon" class="hamburger" id="guide-hamburger"></svg-icon>
  </div>
</template>
<script  setup>
import { useAppStore } from "@/store/app";
import { computed } from "vue";
const appStore = useAppStore();
const icon = computed(() =>
  appStore.sidebarOpened ? "hamburger-opened" : "hamburger-closed"  //切换图标
);
const changeSidebarOpened = () => {
  appStore.changeSidebarOpened(); //触发函数   取反
};
</script>

<style lang="scss" scoped>
.hamburger-container {
  padding: 0 16px;
  .hamburger {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
  }
}
</style>