<template>
  <div class="">
    <CountDown
      msg="您访问的页面不存在"
      :isLogin="!!userStore.userInfo.username"
    >
      <el-icon><WarningFilled /></el-icon>
    </CountDown>
  </div>
</template>

<script setup>
import CountDown from "@/components/CountDown/CountDown.vue";
import { useUserStore } from "@/store/user";
import { WarningFilled } from "@element-plus/icons-vue";
const userStore = useUserStore();
</script>

<style lang="scss" scoped></style>