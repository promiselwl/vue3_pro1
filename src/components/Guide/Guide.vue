<template>
  <div>
    <el-tooltip
      class="box-item"
      effect="dark"
      content="功能引导"
      placement="bottom"
    >
      <div>
        <!-- id="guide-start"功能导航对应的选择器 -->
        <svg-icon icon="guide" @click="startGuide" id="guide-start"></svg-icon>
      </div>
    </el-tooltip>
  </div>
</template>

<script  setup>
import Driver from "driver.js"; //引入功能导航
import steps from "./steps"; //配置项
import "driver.js/dist/driver.min.css"; //功能样式
import { onMounted } from "vue";
let driver = null; //设置一个driver为空
const startGuide = () => {
  driver.start(); //开始导航
};
// 页面挂载之后
onMounted(() => {
  // 实例化driver对象
  driver = new Driver({
    allowClose: false, //是否点击遮罩关闭
    closeBtnText: "关闭", //  关闭按钮文案
    nextBtnText: "下一个", // 下一步的按钮文案
    prevBtnText: "上一个", // 上一步的按钮文案
    animate: false, //是否要动画效果
    onHighlighted(element) {
      //元素开始完全高亮时调用
      console.log(element);  //高亮元素的dom
      const node = element.node;
      const divHighLight = document.querySelector(
        "#driver-highlighted-element-stage"
      );
      if (node.id === "guide-menu") {
        divHighLight.classList.add("change");
      } else {
        divHighLight.classList.remove("change");
      }
    },
  });
  driver.defineSteps(steps); //配置项
  console.log(driver);
});
</script>
<style lang="scss" scoped>
//全局  这样可以使元素自动适应父元素的高度。
:global(.change) {
  height: auto !important;
  top: 0 !important;
  bottom: 0 !important;
}

</style>