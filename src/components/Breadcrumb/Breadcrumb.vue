<template>
  <!-- separator分割符 -->
  <el-breadcrumb separator="/" class="breadcrumb">
    <!-- 遍历当前点击侧边栏的路由值 -->
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbData"
        :key="item.path"
        id="guide-breadcrumb"
      >
        <!-- 只要不是最后一项就跳转 -->
        <router-link
          :to="item.path"
          v-if="index !== breadcrumbData.length - 1"
          class="redirect"
          >{{ item.meta.title }}</router-link
        >
        <span v-else class="no-redirect">{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>
<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
console.log(route); //查看当前的路由信息
const breadcrumbData = computed(
  () => route.matched.filter((item) => item.meta && item.meta.title) //筛选条件是有meta的和meta.title的整合到新的数组里面
);
// console.log(breadcrumbData.value);
</script>

<!-- 面包屑需要拿到路由信息然后遍历渲染到页面 -->
<style lang="scss" scoped>
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
  .redirect {
    color: #666;
    font-weight: 600;
  }
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
//进来离开的效果
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.5s;
}

.breadcrumb-enter-from,
.breadcrumb-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

//离开的那个元素
.breadcrumb-leave-active {
  position: absolute;
}
</style>

  