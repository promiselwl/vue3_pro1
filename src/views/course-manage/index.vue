<template>
  <div class="">
    <!-- 头部卡片 -->
    <el-card><h4>课程管理</h4></el-card>
    <!-- 主体部分 -->
    <el-card class="table">
      <div class="filter-section">
        <!-- 
          同步绑定数据queryParams.kindName
          选中项绑定值 v-model="queryParams.kindName"
          clearable 是否可以清空选项 默认false
          class="filter"
          placeholder="请选择项目"
         @change="getCourseListFn" 选中值发生变化时触发change事件
         -->
        <!-- 筛选框 -->
        <el-select
          v-model="queryParams.kindName"
          clearable
          placeholder="请选择项目"
          class="filter"
          @change="getCourseListFn"
        >
          <!-- 选项的值 :value="item" 选项的标签，若不设置则默认与value相同 :label="item"-->
          <el-option
            v-for="item in kindNameOptions"
            :key="item"
            :value="item"
            :label="item"
            @change="getCourseListFn"
          ></el-option>
        </el-select>
        <!-- 输入框 -->
        <el-input
          v-model="queryParams.courseName"
          clearable
          placeholder="请输入课程名称"
          class="filter"
          @change="getCourseListFn"
        ></el-input>
      </div>
      <!-- 展示呢区域 -->
      <el-table
        :data="courseList"
        v-loading="loading"
        class="table-wrapper"
        :max-height="tableHeight"
      >
        <!--   fixed="left"固定到左侧 -->
        <el-table-column
          width="200"
          prop="courseName"
          label="课程名称"
          fixed="left"
        >
        </el-table-column>
        <el-table-column width="200" prop="sellingPrice" label="课程售价">
        </el-table-column>
        <el-table-column width="200" prop="downPrice" label="低价">
        </el-table-column
        ><el-table-column width="200" prop="kindName" label="项目">
        </el-table-column>
        <el-table-column width="200" label="是否售卖">
          <template #default="{ row }">
            <el-switch
              v-model="row.isSale"
              active-color="#13ce66"
              active-text="上架"
              disabled
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column width="200" prop="updatePeople" label="更新人">
        </el-table-column>
        <el-table-column width="200" label="更新时间">
          <template #default="{ row }">
            {{ formatTime(row.updateTime) }}
          </template>
        </el-table-column>
        <!-- fixed="right" align="center"固定到右侧,文本左右居中 -->
        <el-table-column width="200" label="操作" fixed="right" align="center">
          <template #default="{ row }">
            <!--点击后将这一行的数据row传过去 -->
            <el-button size="small" @click="openEditCourse(row)">编辑课程</el-button>
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
        @size-change="getCourseListFn"
        @current-change="getCourseListFn"
        class="pagination"
      >
      </el-pagination>
      <!-- 编辑课程组件 -->
      <EditCourse
        ref="editCourseRef"
        @change="getCourseListFn"
        :course="course"
      ></EditCourse>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getCourseList } from "@/api/course"; //获取课程列表接口
import { formatTime } from "@/utils/formatTime"; // 导入格式化时间函数
import { getAutoHeight } from "@/hooks/getAutoHeight"; //引入自适应高度
import EditCourse from "./compoent/EditCourse.vue";
const loading = ref(true);
const courseList = ref([]); // 存放所有课程数据（id,kindName,courseName...数据）
const kindNameOptions = ref([]); // 定义一个数组存放筛选后的kindName 因为传过来的数据中kindName有重复的
const total = ref(0); //总数据
const { tableHeight } = getAutoHeight(340);
const course = ref({}); //定义父组件给子组件传递的数据
const editCourseRef = ref(null);
// //1.定义好所需要的数据 然后运行导入的函数将数据传到后端
const queryParams = ref({
  pageSize: 10,
  currentPage: 1,
  kindName: "",
  courseName: "",
});
// 2.定义获取接口的函数
const getCourseListFn = async () => {
  loading.value = true;
  // 接收后端请求的数据 要将定义的queryParams的数据带上
  const { data } = await getCourseList(queryParams.value);
  console.log(data);
  courseList.value = data.data;
  total.value = data.total;
  kindNameOptions.value = data.kindNameOptions;
  setTimeout(() => {
    loading.value = false;
  }, 300);
};
getCourseListFn();

// 3.编辑课程
const openEditCourse = (row) => {
  course.value = row;
  editCourseRef.value.open()//触发组件的打开抽屉函数
};
</script>

<style lang="scss" scoped>
</style>
