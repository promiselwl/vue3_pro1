<template>
  <div class="">
    <el-card><h4>我的直播</h4></el-card>
    <el-card class="table">
      <div class="filter-section">
        <el-date-picker
          v-model="queryParams.liveTime"
          type="daterange"
          start-placeholder="直播时间"
          end-placeholder="开播时间"
          range-separator="至"
          class="filter"
          @change="getLiveListFn"
        >
        </el-date-picker>
        <el-input
          v-model="queryParams.liveName"
          placeholder="请输入直播名称"
          class="filter"
          @change="getLiveListFn"
        ></el-input>
      </div>
      <!-- table表格 -->
      <el-table
        class="table-wrapper"
        :data="liveList.liveList"
        v-loading="loading"
        :max-height="tableHeight"
      >
        <el-table-column label="上课日期/星期" width="200">
          <template #default="{ row }">
            {{ formatDate(row.liveTime) }}
          </template>
        </el-table-column>
        <el-table-column label="上课时间" width="200">
          <template #default="{ row }">
            {{ formatDetail(row.liveTime) }}
          </template>
        </el-table-column>
        <el-table-column
          label="直播标题"
          prop="liveName"
          width="200"
        ></el-table-column>
        <el-table-column label="直播状态" width="200">
          <template #default="{ row }">
            {{ statusTxt(row.liveTime) }}
          </template>
        </el-table-column>
        <el-table-column
          label="直播时长"
          width="200"
          prop="liveDuration"
        ></el-table-column>
        <el-table-column
          label="班期名称"
          width="200"
          prop="className"
        ></el-table-column>
        <el-table-column
          label="课程名称"
          width="200"
          prop="courseName"
        ></el-table-column>
        <el-table-column
          label="讲师"
          width="200"
          prop="teacher"
        ></el-table-column>
        <el-table-column label="操作" width="200" fixed="right" align="center">
          <template #default="{ row }">
            <!-- 过了时间的disabled Date.now()当前时间戳-->
            <el-button
              size="small"
              :disabled="row.liveTime < Date.now()"
              @click="openReviseLive(row)"
              >编辑直播</el-button
            >
            <!-- effect="dark"黑色  placement="top"居中 -->
            <el-tooltip effect="dark" placement="top">
              <!-- 在新的页面打开target="_new" -->
              <template #content>
                <a href="http://www.baidu.com" target="_new"
                  >http://www.baidu.com</a
                >
              </template>
              <el-button size="small" v-show="row.liveTime >= Date.now()"
                >进入直播</el-button
              >
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="queryParams.currentPage"
        v-model:page-size="queryParams.pageSize"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="getLiveListFn"
        @current-change="getLiveListFn"
        class="pagination"
      >
      </el-pagination>
    </el-card>
    <reviseLiveDialog
      ref="reviseLiveRef"
      :liveObj="liveObj"
      @change="getLiveListFn"
    ></reviseLiveDialog>
  </div>
</template>

<script setup>
import { onActivated, ref } from "vue";
import { getLiveList } from "@/api/live"; //获取直播
import { getAutoHeight } from "@/hooks/getAutoHeight"; //自适应高度
import { formatDate, formatDetail } from "@/utils/formatTime";
import reviseLiveDialog from "./compoent/reviseLiveDialog.vue";
const queryParams = ref({
  liveName: "",
  liveTime: "",
  pageSize: 10,
  currentPage: 1,
});
const total = ref(0);
const liveList = ref({});
const liveObj = ref({}); //给子组件的数据
const loading = ref(true);
const { tableHeight } = getAutoHeight(340);
const reviseLiveRef = ref(null);
// 获取直播的函数
const getLiveListFn = async () => {
  loading.value = true;
  const { data } = await getLiveList(queryParams.value);
  total.value = data.total;
  liveList.value = data.data;
  setTimeout(() => {
    loading.value = false;
  }, 500);
};
getLiveListFn();

// 直播状态
const statusTxt = (time) => {
  let date = new Date(); //获取当前日期
  let txt = "未开播";
  if (time >= date / 1) {
    txt = "未开播";
  } else if (time < date / 1 && time / 1 + 1000 * 60 * 60 * 2 > date) {
    txt = "直播中";
  } else {
    txt = "已结束";
  }

  return txt;
};
// 编辑直播函数
const openReviseLive = (row) => {
  liveObj.value = row; //把当前行的数据赋值给liveObj传递给子组件
  liveObj.value.id = liveList.value._id;//把liveList的外侧_id赋值给liveObj的内侧id
  reviseLiveRef.value.open();
};
onActivated(getLiveListFn);
</script>

<style lang="scss" scoped>
:deep(.el-date-editor) {
  vertical-align: -2px;
  width: 30% !important;
}
</style>
