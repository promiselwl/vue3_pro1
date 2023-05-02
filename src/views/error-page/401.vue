<template>
  <div class="">
    <CountDown msg="您没有权限" :isLogin="!!userStore.userInfo.username">
      <el-icon>
        <Warning></Warning>
      </el-icon>
    </CountDown>
  </div>
</template>

<script setup>
import CountDown from "@/components/CountDown/CountDown.vue";
import { useUserStore } from "@/store/user";
import { Warning } from "@element-plus/icons-vue";
const userStore = useUserStore();
</script>

<style lang="scss" scoped></style>
