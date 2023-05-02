<!-- 页面标签及跳转 -->
<template>
  <div class="tags-view-container">
    <router-link
      class="tags-view-item"
      v-for="(item, index) in tagsViewList"
      :key="item.path"
      :to="item.path"
      :class="{ active: item.path === route.path }"
      @contextmenu.prevent="openContextMenu($event, index)"
    >
      {{ item.title }}
      <!--   v-show="item.path !== route.path"控制关闭标签显示 -->
      <el-icon
        class="el-icon-close"
        @click.stop.prevent="closeTag(index)"
        v-show="item.path !== route.path"
      >
        <Close />
      </el-icon>
    </router-link>
    <!-- 右键标签 :index="selectIndex"父传子 -->
    <ContextMenu
      v-show="visible"
      :style="menuStyle"
      :index="selectIndex"
    ></ContextMenu>
  </div>
</template>

<script setup>
import ContextMenu from "./compoents/ContextMenu.vue";
import { useAppStore } from "@/store/app"; //引入store中存储标签的数组
import { computed, ref, watch } from "vue";
import { Close } from "@element-plus/icons-vue"; //引入icon图标
import { useRoute } from "vue-router"; //引入路由
const route = useRoute(); //使用路由
const appStore = useAppStore(); //执行函数得到一个对象
const tagsViewList = computed(() => appStore.tagsViewList); //计算属性获取tagsViewList存储的值 刚开始是一个空数组
const visible = ref(false); //控制右键标签功能
const menuStyle = ref({}); //控制点击菜单样式
const selectIndex = ref(0);
// 右键菜单项
const openContextMenu = (event, index) => {
  //   console.log(event, index);
  visible.value = true; //右键标签显示
  selectIndex.value = index; //右键菜单项的index下标值赋值给 selectIndex传给子组件的值
  const { x, y } = event;
  menuStyle.value = {
    top: y + "px",
    left: x + "px",
  };
};
// 关闭标签
const closeTag = (index) => {
  appStore.removeTagViewList("me", index);
};
watch(
  route,
  () => {
    // 监视路由的变化
    console.log(route);
    const tag = route.matched[route.matched.length - 1]; //获取数组的最后一项
    console.log(tag);
    //   新增标签
    appStore.addTagViewList({
      path: tag.path,
      title: tag.meta.title,
    });
  },
  {
    immediate: true,
  }
);
const closeContextMenu = () => {
  visible.value = false; //关闭标签
};
// 监听右键菜单点击其他区域可关闭
watch(visible, () => {
  // 标签显示
  if (visible.value) {
    // 点击任意处给其关闭
    document.addEventListener("click", closeContextMenu);
  } else {
    // 解绑
    document.removeEventListener("click", closeContextMenu);
  }
});
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-item {
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;
    // 给前面的值设置
    &:first-of-type {
      margin-left: 15px;
    }
    // 给后面的值设置
    &:last-of-type {
      margin-right: 15px;
    }
    // 被激活的样式
    &.active {
      color: #fff;
      background-color: $menuBg;
      border-color: $menuBg;
      // 添加伪类元素
      &::before {
        content: "";
        background: #fff;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: relative;
        margin-right: 4px;
      }
    }
    // close 按钮没有被激活的元素
    .el-icon-close {
      width: 16px;
      height: 16px;
      margin-left: 8px;
      line-height: 10px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      vertical-align: -1px;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      // 触发hover的变化
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>