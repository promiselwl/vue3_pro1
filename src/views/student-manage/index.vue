<template>
  <div class="student-manage">
    <el-card><h4>学员管理</h4></el-card>
    <!-- class="table"设置一个公共样式 -->
    <el-card class="table">
      <div class="filter-section">
        <!-- 选择器 -->
        <!--    v-model="queryParams.kindName" 选择分类 项
                clearable:是否可以清空选项
               filterable Select组件是否可筛选
               change选中的值发生变化时  回调参数val目前选中的值
        -->
        <!-- 1.课程分类选项 -->
        <el-select
          v-model="queryParams.kindName"
          class="filter"
          placeholder="请选择项目"
          clearable
          filterable
          @change="kindNameChanged"
        >
          <!-- 选择项 courseObj.kindName遍历课程分类label用户看到的,value显示的值-->
          <el-option
            v-for="item in courseObj.kindName"
            :key="item.value"
            :label="item.value"
            :value="item.value"
          ></el-option>
        </el-select>
        <!-- 2.课程名称 -->
        <el-select
          v-model="queryParams.courseName"
          class="filter"
          placeholder="请选择课程名称"
          clearable
          filterable
          @change="getStudentData"
        >
          <el-option
            v-for="item in courseName"
            :key="item.value"
            :label="item.value"
            :value="item.value"
          ></el-option>
        </el-select>
        <!-- 3.输入班期 -->
        <el-input
          v-model="queryParams.className"
          class="filter"
          placeholder="请输入班期名称"
          clearable
          @change="getStudentData"
        ></el-input>
      </div>
      <!-- table表格 -->
      <!-- 
        data	显示的数据, prop字段名称 对应列内容的字段名 label	显示的标题
         v-loading="loading" loading页面加载
          :max-height="tableHeight"页面加载的最大高度
       -->
      <el-table
        :data="studentList"
        v-loading="loading"
        :max-height="tableHeight"
      >
        <el-table-column prop="phoneNumber" label="手机号码" width="200" />
        <el-table-column prop="courseName" label="课程名称" width="200" />
        <el-table-column prop="className" label="班期名称" width="200" />
        <el-table-column prop="origin" label="学员来源" width="200" />
        <el-table-column label="是否启用" width="200">
          <!-- active-text=>switch 打开时的文字描述 active-color=>当在 on 状态时的背景颜色  :before-change切换之前的操作
          switch 状态改变前的钩子， 返回 false 或者返回 Promise 且被 reject 则停止切换 -->
          <!-- 通过 slot 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据 -->
          <!-- scope为当前项的数组项对象 scope.row=>{row}解构拿到row-->
          <template #default="{ row }">
            <!-- <el-switch active-color="#13ce66" active-text="启用" /> -->
            <el-switch
              v-model="row.isEnable"
              active-color="#13ce66"
              active-text="启用"
              :before-change="isEnableChanged(row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="updatePeople" label="更新人" width="200" />
        <el-table-column label="更新时间" width="200">
          <template #default="{ row }">
            <span>{{ formatTime(row.updateTime) }}</span>
          </template>
        </el-table-column>
        <!--  align="center"居中  fixed="right"列固定到右侧 align对齐方式-->
        <el-table-column label="操作" width="300" fixed="right" align="center">
          <template #default="{ row }">
            <el-button size="small" @click="openDetail(row)"
              >学员详情</el-button
            >
            <el-button size="small" @click="openClass(row)">
              选择班期</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <!-- size-change页数发生变化时触发的函数,current-change页码发生变化触发的函数 
       @size-change="getStudentData"  @current-change="getStudentData"重新获取数据
        page-size/ v-model	每页显示条目个数 current-page 当前页数
      -->
      <el-pagination
        v-model:current-page="queryParams.currentPage"
        v-model:page-size="queryParams.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="getStudentData"
        @current-change="getStudentData"
        class="pagination"
      />
    </el-card>
    <!-- 学员详情组件 :studentObj="studentObj"父传子 -->
    <StudentDetail
      ref="studentDetailRef"
      :studentObj="studentObj"
      @change="getStudentData"
    >
    </StudentDetail>
    <!-- 学员班期 -->
    <StudentClass
      ref="studentClassRef"
      :studentClassObj="studentClassObj"
      @change="getStudentData"
    >
    </StudentClass>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { getStudentList, getCourseObj, reviseISEnable } from "@/api/student"; //引入接口
import { ElMessage } from "element-plus";
import { formatTime } from "@/utils/formatTime"; //引入时间规则
import { getAutoHeight } from "@/hooks/getAutoHeight"; //引入筛选条件时的计算高度
import StudentDetail from "./compoents/StudentDetail.vue"; //学员详情组件
import StudentClass from "./compoents/StudentClass.vue";
const { tableHeight } = getAutoHeight(340);
// 定义前端筛选项
const queryParams = ref({
  kindName: "", // 课程分类
  courseName: "", //课程名称
  className: "", //班级名称
  currentPage: 1, //页码
  pageSize: 10, //一页的页面容量
});
const studentList = ref([]); //预设的筛选项
const total = ref(0); //定义总数据
const courseObj = ref({}); //定义预设课程分类对象
const loading = ref(true); //定义请求数据的loading
const studentObj = ref({}); //学生对象(保存当前行的数据)
const studentClassObj = ref({}); //学生班期
const studentDetailRef = ref(null);
const studentClassRef = ref(null);
//1.获取学员列表接口
const getStudentData = async () => {
  const { data } = await getStudentList(queryParams.value); //把数据传送后端,后端返回结果,解构拿到结果
  // console.log(data);
  studentList.value = data.data; //把筛选项的结果数据赋值给 studentList
  // console.log(studentList.value);
  total.value = data.total; //把总数据赋值给total
  // 在页面请求之前把loading变为true然后500ms变为false
  loading.value = true;
  setTimeout(() => {
    loading.value = false; //loading消失
  }, 500);
};
// 2.获取分类课程对象函数
const getCourse = async () => {
  const { data } = await getCourseObj();
  courseObj.value = data;
  console.log(courseObj.value);
};
getStudentData();
getCourse();

//3. 计算属性计算出课程名称(因为当你选择第一个输入框类型的时候,影响第二个输入框的类型)
const courseName = computed(() => {
  const kindName = queryParams.value.kindName; //获取当前课程名称(前端or后端)
  const courseObjValue = courseObj.value; //获取课程名称
  //通过分类课程计算出课程名称的选择项
  if (!kindName) {
    // 如果第一个输入框没有选择(前端or后端) 返回整个课程
    return courseObjValue.courseName; //整个个课程
  } else {
    // 课程分类有筛选时====> 返回找出与之获取课程分类相同的数组项的课程分类的课程名称
    return courseObjValue.kindName.find((item) => item.value === kindName)
      .courseName;
  }
});
// 4.课程分类选项数据发生变化时,value为选中的数据(前端or后端)
const kindNameChanged = (value) => {
  if (value) {
    // 如果选择数据   拿出 kindName数组中对应value(前端/后端)的数组项中的 courseName后面的value是课程类别
    const courseName = courseObj.value.kindName.find(
      (item) => item.value === value
    ).courseName;
    // 判断第二个筛选框中的课程 是否属于第一个筛选框选中的 项目类别
    const obj = courseName.find(
      (item) => item.value === queryParams.value.courseName
    );
    if (!obj) {
      queryParams.value.courseName = ""; //清空课程名称
    }
  }
  getStudentData(); //重新获取调用获取学员的接口
};

// 5.切换是否启用课程
// reviseIsEnable(row);传入row用于是否开启按钮
const isEnableChanged = (row) => {
  return async () => {
    const { data } = await reviseISEnable(row);
    if (!data.code) {
      ElMessage.success(data.txt);
      return true; //允许修改成功
    } else {
      ElMessage.error(data.txt);
      return false; //不允许被修改
    }
  };
};

//6.学员详情的操作
const openDetail = (row) => {
  studentObj.value = row; //把当前行的数据信息给studentObj
  studentDetailRef.value.open();
};

// 1.打开学员班期
const openClass = (row) => {
  // console.log(row);
  const classOptions = courseName.value.find(
    (item) => item.value === row.courseName
  ).className;
  studentClassObj.value = {
    phoneNumber: row.phoneNumber,
    courseName: row.courseName,
    className: row.className,
    classOptions,
  };
  // console.log(StudentClassObj.value);
  studentClassRef.value.open(); //触发子组件打开对话框
};
</script>







<style lang="scss" scoped></style>
