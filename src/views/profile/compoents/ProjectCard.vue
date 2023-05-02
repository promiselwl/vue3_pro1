<!-- 项目介绍功能代码 -->
<template>
  <el-card class="user-container">
    <!-- 插槽 -->
    <template #header>
      <div>项目介绍</div>
    </template>
    <!-- 登录信息 -->
    <div class="user-profile">
      <div class="box-center">
        <!-- 头像 -->
        <el-avatar :src="avatarSrc" :size="100"></el-avatar>
        <div class="user-name">
          {{ useStore.userInfo.username }}
        </div>
        <div class="user-role text-muted">
          {{ useStore.userInfo.username ? "管理员" : "普通用户" }}
        </div>
      </div>
    </div>
    <!-- 项目介绍 -->
    <div class="project-bio-section">
      <div class="project-bio-section-header">
        <!-- 自定义组件 -->
        <svg-icon icon="introduce"></svg-icon>
        <span>项目介绍</span>
      </div>
      <div class="project-bio-section-body">
        <div class="text-muted">
          《 vue3 vue-element-admin 实现后台前端综合解决方案 》项目演示
        </div>
      </div>
    </div>
    <!-- 具体功能 -->
    <div class="project-bio-section">
      <div class="project-bio-section-header">
        <svg-icon icon="reward"></svg-icon>
        <span>项目功能</span>
      </div>
      <div class="project-bio-section-body">
        <div class="progress-item" v-for="item in featureData" :key="item.id">
          <div>{{ item.title }}</div>
          <!-- 图标  percentage	百分比，必填 status	进度条当前状态-->
          <el-progress
            :percentage="item.percentage"
            status="success"
          ></el-progress>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import {  defineProps } from "vue";
import { getAvatar } from "@/hooks/getAvatar"; //头像
import { useUserStore } from "@/store/user";
const useStore = useUserStore();
const { avatarSrc } = getAvatar();
const props = defineProps(["featureData"]);
</script>

<style lang="scss" scoped>
.user-container {
  margin-right: 20px;
  .text-muted {
    font-size: 14px;
    color: #777;
  }

  .user-profile {
    text-align: center;
    .user-name {
      margin-top: 20px;
      font-weight: bold;
    }

    .box-center {
      padding-top: 10px;
      .avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
    }

    .user-role {
      padding-top: 10px;
      font-weight: 400;
    }
  }

  .project-bio-section {
    margin-bottom: 36px;
    margin-top: 20px;
    color: #606266;
    span {
      padding-left: 4px;
    }
    .project-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
    .project-bio-section-body {
      .progress-item {
        margin-top: 10px;
        div {
          font-size: 14px;
          margin-bottom: 2px;
        }
      }
    }
  }
}
</style>
