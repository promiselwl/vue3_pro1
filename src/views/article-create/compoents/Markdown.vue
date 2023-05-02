<!-- markdown 组件的使用-->
<template>
  <div class="markdown-container">
    <div id="makdown-box" ref="boxRef"></div>
    <div class="bottom">
      <el-button type="primary" @click="submitFn">提交</el-button>
    </div>
  </div>
</template>

<script setup>
import { nextTick, onMounted, ref } from "vue";
import MKEditor from "@toast-ui/editor"; // 引用插件
import "@toast-ui/editor/dist/toastui-editor.css"; // Editor's Style
import "@toast-ui/editor/dist/i18n/zh-cn"; //引入汉化功能
import { ElMessage } from "element-plus";

const boxRef = ref(null);
const emit = defineEmits(["success"]);
let mkEditor; //初始化实例
// 1.初始化插件函数
const innitEditor = () => {
  // 获取makdown的实例
  mkEditor = new MKEditor({
    el: boxRef.value, //自带的配置项获取dom,
    height: "500px", //需要的高度
    previewStyle: "vertical", //视野样式垂直的
    language: "zh-CN", //语言中文
  });
  mkEditor.getMarkdown(); //运行makdown插件
};
const clearEditor = () => {
  mkEditor.reset(); // mkEditor自带的重置方法 调用就行
};
//页面 挂载成功后
onMounted(async () => {
  await nextTick();
  innitEditor();
});
// 新建文章提交按钮
const submitFn = () => {
  const htmlStr = mkEditor.getHTML(); // console.log(htmlStr);<p><br></p>初始值
  console.log(htmlStr);
  if (htmlStr === "<p><br></p>") {
    ElMessage.warning("内容不能为空");
  } else {
    // 成功就触发 父组件中的自定义事件 并将内容传过去
    emit("success",htmlStr);
  }
};
defineExpose({ clearEditor });
</script>
<style lang="scss" scoped>
.markdown-container {
  .bottom {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
