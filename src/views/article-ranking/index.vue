<template>
  <div class="article-ranking-container">
    <!-- 勾选框 -->
    <el-card class="header">
      <div class="dynamic-box">
        <span class="title">动态展示</span>
        <!--  一个数组 动态排序 多个多选框el-checkbox-group 里面包着el-checkbox selectDynamic已经勾选上的项-->
        <el-checkbox-group v-model="selectDynamic">
          <!-- 准备好的数据 -->
          <el-checkbox
            v-for="item in dynamicData"
            :label="item.label"
            :key="item.label"
            :disabled="item.prop === 'title'"
          ></el-checkbox>
        </el-checkbox-group>
      </div>
    </el-card>
    <!-- 根据上面的数组进行遍历  border带有纵向边框-->
    <el-card class="table">
      <el-table
        :data="articleList"
        v-loading="loading"
        border
        :max-height="tableHeight"
        ref="tableRef"

      >
        <el-table-column
          v-for="item in tableColumns"
          :key="item.label"
          :label="item.label"
          :prop="item.prop"
        >
          <template #default="{ row }" v-if="item.prop === 'date'">
            {{ formatTime(row.date) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="openDetail(row)"
              >查看详情</el-button
            >
            <el-button type="danger" size="small" @click="deleteArticleFn(row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- // 分页器 -->
      <el-pagination
        v-model:current-page="queryParams.currentPage"
        v-model:page-size="queryParams.pageSize"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="getArticleListFn"
        @current-change="getArticleListFn"
        class="pagination"
      />
    </el-card>
    <!-- 文章详情组件 -->
    <articleDetail ref="articleDetailRef" :content="content"></articleDetail>
  </div>
</template>

<script setup>
import { ref, onActivated, onMounted, nextTick } from "vue";
import { selectDynamic, tableColumns, dynamicData } from "./dynamic"; // 导入 勾选框 和计算好的数组
import { tableRef, initSortable } from "./sortable"; //排序函数
import { getArticleList, deleteArticle } from "@/api/article"; //获取文章删除文章的接口
import { formatTime } from "@/utils/formatTime";
import { getAutoHeight } from "@/hooks/getAutoHeight"; //自适应高度
import { quitFn } from "@/hooks/quitFn";
import articleDetail from "./compoents/articleDetail.vue"; //文章详情组件
import { ElMessage } from "element-plus";
const { tableHeight } = getAutoHeight(340);
const articleList = ref([]); //获取文章的数据
const total = ref(0);
const loading = ref(true);
const content = ref(null); //文章内容
const articleDetailRef = ref(null);
const queryParams = ref({
  pageSize: 10,
  currentpage: 1,
});
// 获取文章的接口函数
const getArticleListFn = async () => {
  loading.value = true;
  const { data } = await getArticleList(queryParams.value);
  articleList.value = data.data;
  total.value = data.total;
  setTimeout(() => {
    loading.value = false;
  }, 500);
};
getArticleListFn();
// 查看详情
const openDetail = (row) => {
  console.log(row);
  content.value = row.content;
  articleDetailRef.value.open();
};
// 删除文章
const deleteArticleFn = (row) => {
  quitFn({ contentTxt: "确定要删除当前项吗?" }, async () => {
    const { data } = await deleteArticle({ _id: row._id });
    if (!data.code) {
      ElMessage.success(data.txt);
      getArticleListFn(); //重新获取数据
    }
  });
};
// 激活时 使用 去报创建文章后 文章排名里面会出现新增的文章
onActivated(getArticleListFn);

// 页面挂载之后
onMounted(async () => {
  await nextTick();
  initSortable(articleList, getArticleListFn); //传入当前文章的数据和对应的获取请求后端接口的函数
});
</script>

<style lang="scss" scoped>
:deep(.el-card__body) {
  overflow: hidden;
}
.article-ranking-container {
  .header {
    margin-bottom: 20px;
    .dynamic-box {
      display: flex;
      align-items: center;
      .title {
        margin-right: 20px;
        font-size: 14px;
        font-weight: bold;
      }
    }
  }

  :deep(.el-table__row) {
    cursor: pointer;
    height: 75px !important;
  }

  :deep(.sortable-ghost) {
    opacity: 0.6;
    color: #fff !important;
    background: #304156 !important;
  }
}
</style>

