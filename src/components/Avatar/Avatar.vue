<template>
  <!-- 下拉菜单 trigger="click"点击触发-->
  <el-dropdown trigger="click">
    <!-- 头像  -->
    <el-avatar :size="40" :src="avatarSrc" shape="square"></el-avatar>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          ><router-link to="/">首页</router-link></el-dropdown-item
        >
        <!-- divided分割线 -->
        <el-dropdown-item divided @click="handleLogout"
          >退出登录</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { getAvatar } from "@/hooks/getAvatar"; //引入头像
import { useUserStore } from "@/store/user"; //用户信息
const { avatarSrc } = getAvatar(); //函数执行并解构赋值
console.log(avatarSrc);
const userStore = useUserStore();
const handleLogout = () => {
  userStore.logoutFn(); //退出登录
};
</script>
<style>
</style>