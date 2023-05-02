<template>
  <div>
    <svg-icon :icon="icon" @click="onToggle" id="guide-fullscreen"></svg-icon>
  </div>
</template>
<script setup>
import { computed, ref } from "vue";
import screenfull from "screenfull"; //引入全屏插件
const isFullScreen = ref(false); //控制全屏
const icon = computed(() =>
  isFullScreen.value ? "exit-fullscreen" : "fullscreen"
);

//触发screenfull插件的自带方法toggle（）来切换全屏
const onToggle = () => {
  screenfull.toggle();
  isFullScreen.value =!isFullScreen.value //图标切换
};
</script>

<style lang="scss" scoped>
</style>