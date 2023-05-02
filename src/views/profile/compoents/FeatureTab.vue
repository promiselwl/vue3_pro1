<!-- 功能介绍区域 -->
<template>
  <el-card>
    <!-- el-tabs标签页 v-model="activeName"选中选项卡的name,label选项卡标题 -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="功能介绍" name="first">
        <!-- el-collapse折叠面板  v-model="activeCollapse"当前激活的面板 对应
            el-collapse-item的name属性的id
            accordion默认打开一个-->
        <el-collapse v-model="activeCollapse" accordion>
          <!-- title文章标题 -->
          <el-collapse-item
            v-for="item in featureData"
            :key="item.id"
            :name="item.id"
            :title="item.title"
          >
            <!-- v-html解析a标签 -->
            <div v-html="item.content"></div>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane label="作者" name="second">
        <div class="author-container">
          <div class="header">
            <el-avatar :src="avatarSrc" :size="60" class="avatar"></el-avatar>
            <div class="header-desc">
              <h3>{{ useStore.userInfo.username }}</h3>
              <span>一名80后程序猿</span>
            </div>
          </div>
          <div class="info">
            40年前进入程序猿领域,钻研技术,现已精通 :
            高级计算机的开机与关机,传统办公软件excel甚至word等高端软件的安装与卸载,在各大主流后端语言如python,java中输出hello
            world,意外发现前端,从此爱上了,并学废了前端至高要义,ctrl-a ctrl-v
            编程手法, 未来还将研究更多与前端有关的高端技术! 活到老 学到老!
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script setup>
import { defineProps, ref } from "vue";
import { getAvatar } from "@/hooks/getAvatar";
import { useUserStore } from "@/store/user";
const useStore = useUserStore();
const { avatarSrc } = getAvatar();
const activeName = ref("first");
const activeCollapse = ref("1");
const props = defineProps(["featureData"]);
</script>

<style lang="scss" scoped>
:deep(.el-collapse-item__header) {
  font-weight: bold;
}
.el-collapse-item {
  :deep(a) {
    color: #409eff;
    margin: 0 4px;
  }
}
.author-container {
  .header {
    display: flex;
    .avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
    .header-desc {
      margin-left: 12px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      span {
        font-size: 14px;
      }
    }
  }
  .info {
    margin-top: 16px;
    line-height: 22px;
    font-size: 14px;
    text-indent: 26px;
  }
}
</style>
