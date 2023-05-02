<template>
  <div class="my-container">
    <el-row>
      <el-col :span="6">
        <!-- 父传子 -->
        <ProjectCard :featureData="featureData"></ProjectCard>
      </el-col>
      <el-col :span="18">
        <FeatureTab :featureData="featureData"></FeatureTab>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ProjectCard from "./compoents/ProjectCard.vue"; //项目功能代码
import  FeatureTab  from './compoents/FeatureTab.vue'
import { getFeature } from "@/api/getData"; //功能代码
const featureData = ref([]);
// 页面加载渲染到页面上
const getFeatureFn = async () => {
  const { data } = await getFeature();
  featureData.value = data;
  console.log(data);
};
getFeatureFn();
</script>

<style lang="scss" scoped></style>
