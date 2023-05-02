<!-- 右键标签功能 -->
<template>
  <ul class="context-menu-container">
    <li @click="onRefreshClick">刷新</li>
    <li @click="onCloseRight">关闭右侧</li>
    <li @click="onCloseOther">关闭其他</li>
  </ul>
</template>

<script setup>
import { useAppStore } from "@/store/app";
import { computed ,defineProps} from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const appStore = useAppStore();
// 接受父组件传来的值
const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
});
// 获取 tagsViewList的值
const tagsViewList = computed(() => appStore.tagsViewList);
console.log(tagsViewList);
// 刷新
const onRefreshClick = () => {
  router.go(0);
};
// 关闭右侧    需要考虑当前的亮度 是否在是删除的范围内
const onCloseRight = () => {
  // 当前高亮显示的标签数组下标值,找出与当前遍历的路由与当前路由的值第一个相同的数组的下标
  const activeIndex = tagsViewList.value.findIndex(
    (item) => item.path === route.path
  );
  if (activeIndex > props.index) {
    // 跳转到自己身上
    router.push(tagsViewList.value[props.index].path);
  }
  //console.log(activeIndex);
  //清除删除项
  appStore.removeTagViewList("right", props.index);
};
// 关闭其他
const onCloseOther = () => {
  appStore.removeTagViewList("other", props.index);
  router.push(tagsViewList.value[0].path);
};
</script>

<style lang="scss" scoped>
.context-menu-container {
  position: fixed;
  background: #fff;
  z-index: 3000;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
}
</style>