<template>
  <div class="">
    <el-card><h4>班期管理</h4></el-card>
    <!-- 展示内容 -->
    <el-card class="table">
      <div class="filter-section">
        <!-- type	显示类型daterange	-
          range-separator	选择范围时的分隔符
          start-placeholder	范围选择时开始日期的占位内容
          end-placeholder	范围选择时结束日期的占位内容
          change	用户确认选定的值时触发
        -->
        <el-date-picker
          v-model="queryParams.enrollTime"
          type="daterange"
          start-placeholder="招生时间"
          end-placeholder="招生时间"
          range-separator="至"
          class="filter"
          @change="getClassListFn"
        ></el-date-picker>
        <el-input
          v-model="queryParams.className"
          placeholder="请输入班期名称"
          class="filter"
          clearable
          @change="getClassListFn"
        ></el-input>
      </div>

      <el-table
        class="table-wrapper"
        v-loading="loading"
        :data="classList"
        :max-height="tableHeight"
      >
        <el-table-column width="200" label="招生时间">
          <template #default="{ row }">
            {{ formatTime(row.enrollTime[0]) }}
            <p>至</p>
            {{ formatTime(row.enrollTime[1]) }}
          </template>
        </el-table-column>
        <el-table-column
          width="200"
          label="班期名称"
          prop="className"
        ></el-table-column>
        <el-table-column width="200" label="直播数量" prop="className">
          <template #default="{ row }">
            {{ row.liveList.liveList.length }}
          </template>
        </el-table-column>
        <el-table-column
          width="200"
          label="学员人数"
          prop="studentNum"
        ></el-table-column>
        <el-table-column
          width="200"
          label="更新人"
          prop="updatePeople"
        ></el-table-column>
        <el-table-column width="200" label="更新时间">
          <template #default="{ row }">
            {{ formatTime(row.updateTime) }}
          </template>
        </el-table-column>
        <el-table-column width="200" label="操作" fixed="right" align="center">
          <!--  row 该行里面的数据  $index 为当前行 所在数组的下标 第一行 为0 第二行为 1 ... 以此类推 -->
          <template #default="{ row, $index }">
            <el-button disabled size="small">编辑课程</el-button>
            <el-button
              v-if="row.className === 'web-前端进阶框架-朱雀'"
              size="small"
              @click="openAddLive(row, $index)"
              >新增直播</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        v-model:current-page="queryParams.currentPage"
        v-model:page-size="queryParams.pageSize"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="getClassListFn"
        @current-change="getClassListFn"
        class="pagination"
      />
      <!-- 新增直播组件 -->
      <AddLive
        ref="addLiveRef"
        :classObj="classObj"
        @change="getClassListFn"
      ></AddLive>
    </el-card>
  </div>
</template>

<script setup>
import { onActivated, ref } from "vue";
import { getClassList } from "@/api/class"; // 获取课程接口
import { getAutoHeight } from "@/hooks/getAutoHeight";
import { formatTime } from "@/utils/formatTime";
import AddLive from "./compoents/AddLive.vue"; //新增直播组件
const loading = ref(true);
const total = ref(0);
const classList = ref([]);
const { tableHeight } = getAutoHeight(340); //使用自适应高度
const addLiveRef = ref(null);
const classObj = ref({});
const index = ref(0); //记录初始值
// 1.给后端传入的数据
const queryParams = ref({
  enrollTime: "", //招生时间
  currentPage: 1,
  pageSize: 10,
  className: "",
});
// 2.请求后端接口的函数
const getClassListFn = async () => {
  loading.value = true;
  const { data } = await getClassList(queryParams.value);
  console.log(data);
  classList.value = data.data;
  total.value = data.total;
  console.log(classList.value);
  const row = classList.value[index.value];
  // 判断一下 row是否为真 解决选择不在时间段的时候 一直处于加载的bug
  if (row) {
    //新增直播之后,找到当前点击的数组下标,重新赋值给classObj
    classObj.value = classObj.value = {
      className: row.className,
      courseName: row.courseName,
      liveList: row.liveList,
    };
  }
  setTimeout(() => {
    loading.value = false;
  }, 500);
};
getClassListFn();

//3. 新增直播函数
const openAddLive = (row, $index) => {
  // 获取当前行的索引值（下标）
  index.value = $index;
  classObj.value = {
    // 需要什么值就起个名字放在classObj中
    className: row.className,
    courseName: row.courseName,
    liveList: row.liveList,
  };
  addLiveRef.value.open(); // 使用子组件上的 open函数 打开抽屉组件展示
};
onActivated(getClassListFn);
</script>

<style lang="scss" scoped>
:deep(.el-date-editor) {
  vertical-align: -2px;
  width: 30% !important;
}
.table-wrapper p {
  text-indent: 50px;
}
</style>
