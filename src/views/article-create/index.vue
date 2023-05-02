<template>
  <div class="">
    <el-card class="table">
      <el-form :model="queryParams" ref="formRef" :rules="rules">
        <el-form-item label="文章标题" prop="title">
          <el-input
            v-model="queryParams.title"
            placeholder="请输入文章标题"
          ></el-input>
        </el-form-item>
        <el-form-item label="文章描述" prop="description">
          <el-input
            v-model="queryParams.description"
            placeholder="请输入文章描述"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-tabs v-model="activeName">
        <el-tab-pane name="first" label="markdown"></el-tab-pane>
      </el-tabs>

      <!-- markdown插件 -->
      <Markdown ref="markdownRef" @success="successFn"></Markdown>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Markdown from "./compoents/Markdown.vue";
import { addArticle } from "@/api/article"; //新建文章接口
import { ElMessage } from "element-plus";
const formRef = ref(null);
const markdownRef = ref(null);
// 传入后端的数据
const queryParams = ref({
  title: "",
  description: "",
  content: "",
});
const activeName = ref("first");
const rules = {
  title: [{ required: true, message: "文章标题不能为空", trigger: "blur" }],
  description: [
    { required: true, message: "文章描述不能为空", trigger: "blur" },
  ],
};
// 给组件添加的自定义事件 子组件提交触发 成功就会吧你写的内容传过来
// content为子组件传递的值
const successFn = (content) => {
  queryParams.value.content = content;
  formRef.value.validate(async (value) => {
    if (value) {
      const { data } = await addArticle(queryParams.value);
      if (!data.code) {
        ElMessage.success(data.txt);
        formRef.value.resetFields();  // 表单接着清空里面的内容 
        markdownRef.value.clearEditor();  // 清空markdown内容子组件定义一个清空的函数 在导出空的函数 在导出
      } else {
        ElMessage.error(data.txt);
      }
    }
  });
};
</script>

<style lang="scss" scoped>
:deep(.el-input) {
  width: 50% !important;
}
</style>
