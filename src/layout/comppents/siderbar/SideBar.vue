<template>
  <div>
    <div class="logo-container">
      <!-- shape="square"形状 :size="40"尺寸 :src="avatarsrc"头像路径 -->
      <el-avatar shape="square" :size="40" :src="avatarSrc"></el-avatar>
      <!-- v-show="appStore.sidebarOpened折叠文字消失 -->
      <h1 class="logo-title" v-show="appStore.sidebarOpened">{{ username }}</h1>
    </div>
    <!-- collapse 为true折叠 false不折叠 -->
    <el-menu
      :default-active="activeRoute"
      :collapse="!appStore.sidebarOpened"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#fff"
      router
      :unique-opened="true"
      id="guide-menu"
    >
      <!-- 菜单项   遍历菜单项数据 key唯一标识  :route="item"给子组件传递数据-->
      <SidebarItem
        v-for="item in menuRoute"
        :key="item.path"
        :route="item"
      ></SidebarItem>
    </el-menu>
  </div>

  <!--
         default-active	页面加载时默认激活菜单的 index 
         collapse	是否水平折叠收起菜单（仅在 mode 为 vertical 时可用）
         background-color 
         text-color
         active-text-color 被激活项文本高亮颜色 
         router 开启菜单跳转导航模式  index='/profile'
         unique-opened 保持一个菜单项被打开 
    -->
</template>

<script setup>
import SidebarItem from "./SidebarItem.vue"; //引入菜单项
import { useRouteStore } from "@/store/route"; //引入储存侧边栏项数据的store定义的函数
import { computed } from "vue";
import { useRoute } from "vue-router"; //引入路由
import { getAvatar } from "@/hooks/getAvatar"; //引入头像的封装方法
import { useUserStore } from "@/store/user"; //拿到储存用户数据的函数
import { useAppStore } from "@/store/app"; //拿到是否折叠的函数

const appStore = useAppStore(); //执行函数
const { username } = useUserStore().userInfo; //解构拿到用户名称
const routeStore = useRouteStore(); //执行侧边栏数据的函数
// 通过计算属性来拿到储存侧边栏数据使其具有响应式
const menuRoute = computed(() => routeStore.menuRoute);
const route = useRoute(); //调用路由方法
console.log(route);
const activeRoute = computed(() => route.path); //计算出路由方法
const { avatarSrc } = getAvatar(); //解构拿到头像
</script>

<style lang="scss" scoped>
.logo-container {
  height: v-bind(logoHeight) + "px";
  padding: 10px 0 22px 0;
  display: flex;
  align-items: center;
  justify-content: center;

  .logo-title {
    margin-left: 10px;
    color: #fff;
    font-weight: 600;
    line-height: 50px;
    font-size: 16px;
    white-space: nowrap;
  }
}
.el-menu {
  border-right: 0 !important;
}
</style>