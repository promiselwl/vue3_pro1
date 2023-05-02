<template>
  <div class="import-student">
    <el-card><h4>导入学员</h4></el-card>
    <el-card class="table">
      <!-- 导入说明 -->
      <div class="import-intro">
        <!-- activeName当前激活的名字 -->
        <el-collapse v-model="activeName">
          <el-collapse-item name="first">
            <template #title>
              <span class="title">导入说明</span>
            </template>
            <ul class="content">
              <li>1.导入前请先下载相应的模板，严格按照模板规则进行数据输入</li>
              <li>2.只支持excel文件,文件大小要求在2M以内</li>
              <li>3.在本页面导入学员,学员会进入学员管理模块</li>
            </ul>
          </el-collapse-item>
        </el-collapse>
      </div>
      <!-- 下载说明 -->
      <div class="import-template">
        <!-- 这里的a标签 换成了el-button -->
        <el-button type="primary" @click="importTemplateFn">下载模板</el-button>
        <div class="import">
          <!-- readonly只读的 fileName上传文件名-->
          <el-input readonly placeholder="请选择Excel文件" v-model="fileName">
          </el-input>
          <!-- delete删除图标  v-show="fileName"-->
          <el-icon class="icon" v-show="fileName" @click="clearFile"
            ><Delete
          /></el-icon>
          <!-- 选择文件 -->
          <!-- <el-upload
            action="/import/student" // 对应的后台地址
            accept=".xlsx, .xls" // 限制文件类型
            :auto-upload="false" // 是否自动上传 默认是的 所以设置一下不让其自动上传
            :show-file-list="false" // 关闭展示文件列表
            :on-change="onChange" // 提交后做的事情
            :on-success="successFn" // 成功后做的事情
            :file-list="fileList" // 有文件时 放在fileList里面 是个数组
            ref="uploadRef" // 提交事件 用到
          > -->
          <el-upload
            action="/import/student"
            accept=".xlsx,.xls"
            :auto-upload="false"
            :show-file-list="false"
            :on-change="onChange"
            :on-success="successFn"
            :file-list="fileList"
            ref="uploadRef"
          >
            <el-button type="primary" v-if="!fileName">选择文件</el-button>
            <!-- 这里@click.prevent.stop是因为上面一个按钮 UI组件库有绑定点击事件 为了防止不必要的冲突
              所以阻止一下默认事件和冒泡-->
            <el-button type="primary" v-else @click.prevent.stop="submitFile"
              >导入文件</el-button
            >
          </el-upload>
        </div>
      </div>
      <!-- 上传文件详情 -->
      <div class="import-table">
        <!--  v-loading="loading"加载项  :max-height="tableHeight最大高度-->
        <el-table
          v-loading="loading"
          :data="importList"
          class="table-wrapper"
          :max-height="tableHeight"
        >
          <el-table-column prop="filename" label="文件名称"></el-table-column>
          <el-table-column label="导入时间">
            <template #default="{ row }">
              {{ formatTime(row.time) }}
            </template>
          </el-table-column>
          <el-table-column prop="importPeople" label="导入人"></el-table-column>
          <el-table-column label="导入状态">
            <template #default="{ row }">
              <i class="dot" :style="bgStatus(row.status)"></i>
              <span>{{ txtStatus(row.status) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="total" label="数据总量"></el-table-column>
          <el-table-column prop="succeedNum" label="成功数"></el-table-column>
          <el-table-column prop="errNum" label="数据总量"></el-table-column>
          <el-table-column label="上传详情">
            <template #default="{ row }">
              <el-button size="small" @click="openDetail(row)">上传详情</el-button>
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
          @size-change="getImportListFn"
          @current-change="getImportListFn"
          class="pagination"
        />
      </div>
    </el-card>
    <!-- 上传详情 -->
    <ImportDetail ref="importDetailRef" :detailObj="detailObj"></ImportDetail>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { getImportList, importTemplate } from "@/api/import"; //引入导入列表,下载模板接口
import { Delete } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { getAutoHeight } from "@/hooks/getAutoHeight";
import { formatTime } from "@/utils/formatTime";
import  ImportDetail  from "./compoents/ImportDetail";
const activeName = ref("first");
const fileName = ref(""); //上传文件名
const fileList = ref([]); //有文件时 放在fileList里面 是个数组
const uploadRef = ref(null); //上传文件用的ref
const loading = ref(true);
const importList = ref([]); //请求后端返回的数据
const total = ref(0); //定义总数据
const importDetailRef = ref(null);//操作子组件
const detailObj = ref({}); //上传数据的详情给子组件的

const queryParams = ref({
  currentPage: 1,
  pageSize: 10,
});
const { tableHeight, refresh } = getAutoHeight(450); //自适应高度
watch(activeName, () => {
  if (activeName.value.length) {
    // 关闭了 折叠410
    refresh(410);
  } else {
    // 打开了折叠450
    refresh(450);
  }
});
// 1.a标签换成el-button后的点击事件 下载模板
const importTemplateFn = async () => {
  const { data } = await importTemplate();
  const downloadUrl = window.URL.createObjectURL(data);
  const link = document.createElement("a");
  link.href = downloadUrl;
  link.download = "模板.xlsx";
  link.click();
};
// 2.上传文件触发的函数 value就是你选择的文件的所有信息 一个对象
const onChange = (value) => {
  console.log(value);
  // value.percentage刚开始为0;
  if (value.percentage) {
    // value.percentage 上传进度  0为没完成  100 是完成
    clearFile();
  } else {
    // 文件上传至 upload 会触发 0 的情况只是上传至 upload
    fileName.value = value.name; //把上传的文件名赋值给自定义的fileName
  }
};
// 3.清空文件
const clearFile = () => {
  fileName.value = ""; //清空文件名
  fileList.value = []; //清空文件列表
};
// 4.导入文件
const submitFile = () => {
  uploadRef.value.submit(); //触发submit	手动上传文件列表
};
// 5.上传成功的函数
const successFn = (result) => {
  // 这里的result就是后端成功过后res.send返回给前端的值
  if (!result.code) {
    // 0全部成功
    ElMessage.success(result.txt);
  } else if (result.code === 1) {
    // 部分成功
    ElMessage.warning(result.txt);
  } else {
    // 全部失败
    ElMessage.error(result.txt);
  }
};
// 6.定义后端的接口
const getImportListFn = async () => {
  loading.value = true;
  const { data } = await getImportList(queryParams.value); //调用后端接口把数据传入后端
  importList.value = data.data;
  total.value = data.total;
  setTimeout(() => {
    loading.value = false;
  }, 500);
};
getImportListFn();

// 7.处理导入的显示状态的图标颜色
const bgStatus = (status) => {
  let background = "";
  switch (status) {
    case 0:
      background = "green"; //全部成功
      break;
    case 1:
      background = "orange"; //部分成功
      break;
    case 2:
      background = "red"; //全部失败
      break;
  }
  return { background }; //属性名和属性值一致
};
// 7.处理导入状态的文本描述
const txtStatus = (status) => {
  let txt = "";
  switch (status) {
    case 0:
      txt = "全部成功";
      break;
    case 1:
      txt = "部分成功";
      break;
    case 2:
      txt = "全部失败";
      break;
  }
  return txt;
};

// 打开详情
const openDetail = (row) => {
  detailObj.value = row; //把当前数据的上传详情赋值给 detailObj
  console.log(detailObj.value);
  importDetailRef.value.open(); //打开子组件对话框
};
</script>

<style lang="scss" scoped>
.import-intro {
  border: 1px solid #eee;
}
.import-template {
  display: flex;
  margin-top: 15px;
  .download {
    display: inline-block;
    line-height: 30px;
    height: 30px;
    font-size: 14px;
    padding: 0 15px;
    border-radius: 6px;
    color: #fff;
    background-color: #409eff;

    &:hover {
      background-color: #79bbfa;
    }
  }
  .import {
    position: relative;
    display: flex;
    margin-left: 40px;
    width: 400px;
    height: 34px;
    .icon {
      position: absolute;
      right: 100px;
      top: 10px;
      font-size: 13px;
      cursor: pointer;
    }
  }
}
:deep(.el-collapse) {
  border: 0 !important;
  .el-collapse-item__wrap {
    border: 0 !important;
  }
  .el-collapse-item__header {
    position: relative;
    border-bottom: 1px solid #eee;
    background-color: #fafafa;
  }
  .el-collapse-item__arrow {
    margin: 0 !important;
    position: absolute;
    left: 20px;
  }
  .title {
    position: absolute;
    left: 40px;
  }
  .content {
    padding-top: 15px;
    padding-left: 20px;
    list-style: none;
    line-height: 30px;
  }
  .el-collapse-item:last-child {
    margin: 0 !important;
  }
}
.table-wrapper {
  margin-top: 20px;
  border: 1px solid #eee !important;
}
.dot {
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  vertical-align: 2px;
  margin-right: 5px;
}

:deep(.el-table) {
  .cell {
    padding: 0px 8px !important;
  }
}
</style>
