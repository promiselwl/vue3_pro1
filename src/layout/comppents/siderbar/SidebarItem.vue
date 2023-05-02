<template>
  <!-- el-menu-item为菜单没有展开项的 el-sub-menu为菜单具有展开项 -->
  <!--  :index="route.path 能够使其点击跳转路由 -->
  <el-menu-item v-if="!route.children.length" :index="route.path">
    <!-- svg图标 :icon使其具有动态的-->
    <svg-icon :icon="route.icon" class="el-icon"></svg-icon>
    <!-- 文字 -->
    <span>{{ route.title }}</span>
  </el-menu-item>

  <!-- 有展开项的菜单 根据菜单数据是否有children来遍历数据 -->
  <el-sub-menu v-else :index="route.path">
    <template #title>
      <svg-icon :icon="route.icon" class="el-icon"></svg-icon>
      <span>{{ route.title }}</span>
    </template>
    <el-menu-item
      v-for="child in route.children"
      :key="child.path"
      :index="child.path"
    >
      <svg-icon :icon="child.icon" class="el-icon"></svg-icon>
      <span>{{ child.title }}</span>
    </el-menu-item>
  </el-sub-menu>
</template>
  
  <script setup >
// 子组件接受父组件传递的数据
const props = defineProps({
  route: {
    type: Object,
    required: true,
  },
});
</script>
  
  <style lang="scss" scoped>
span {
  margin-left: 10px;
}
</style>