<!-- 搜索区域 -->
<template>
  <!-- v-model:选中项绑定值  filterable:Select 组件是否可筛选
    remote:其中的选项是否从服务器远程加载 remote-method:自定义远程搜索方法
    -->
  <div class="header-search">
    <svg-icon
      icon="search"
      class="search-icon"
      @click.stop="onShowClick"
      id="guide-search"
    ></svg-icon>
    <!-- 搜索池 -->
    <!--    class="header-search-select"刚开始隐藏 
            change	选中值发生变化时触发	val，目前的选中值
            v-model="searchValue" 选中项绑定值  对应选项的值
    -->
    <el-select
      v-model="searchValue"
      filterable
      placeholder="搜索"
      class="header-search-select"
      :class="{ show: isShow }"
      remote
      :remote-method="querySearch"
      @change="chooseOption"
    >
      <!-- value选项的值    label选项的标签，若不设置则默认与value相同 -->
      <el-option
        v-for="item in searchOption"
        :value="item.item"
        :key="item.item.path"
        :label="item.item.titles.join(' > ')"
      ></el-option>
    </el-select>
  </div>
</template>
<script setup>
import { ref, watch } from "vue";
import getRoutePool from "@/assets/js/handleData";
import Fuse from "fuse.js"; //模糊搜索

import { useRouter } from "vue-router";
const router = useRouter(); //使用路由
const searchValue = ref({}); //搜索的对象值
const isShow = ref(false); //控制显示隐藏
const searchOption = ref([]); //筛选项的数组

// 点击svg搜索来控制搜索框是否隐藏
const onShowClick = () => {
  isShow.value = !isShow.value; //取反操作
};
const pool = getRoutePool(); //使用搜索池
const fuse = new Fuse(pool, {
  //第一个参数为搜索池数据名称，第二个参数为配置项
  shouldSort: true, //是否按优先级排序
  keys: [
    //分配权重
    { name: "title", weight: 0.7 },
    { name: "path", weight: 0.3 },
  ],
});

const querySearch = (query) => {
  // query为输入的value  返回筛选的数组  fuse.search搜索方法
  searchOption.value = fuse.search(query);
  console.log(searchOption.value);
};

// 关闭方法
const onClose = () => {
  isShow.value = false; //输入框开启隐藏
  searchOption.value = []; //清空搜索池数据
  searchValue.value = null; //清空输入框输入数据
};
//监视isShow的变化
watch(isShow, () => {
  if (isShow.value) {
    // 搜索框状态打开
    document.addEventListener("click", onClose);
  } else {
    document.removeEventListener("click", onClose);
  }
});
// change	选中值发生变化时触发	val，目前的选中值
const chooseOption = (val) => {
  onClose(); //调用方法
  router.push(val.path); //跳转路由
};
</script>
<!-- 搜索池根据用户侧边栏数据来遍历渲染到页面 -->
<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;
  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }

  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;
    &.show {
      //添加类名
      width: 210px;
      margin-left: 10px;
    }

    :deep(.el-input__wrapper) {
      box-shadow: none !important;
      .el-input__inner {
        border-bottom: 1px solid #d9d9d9;
      }
    }
  }
}
</style>
