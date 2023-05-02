<!-- 上传详情 -->
<template>
  <div class="import-detail">
    <el-dialog v-model="isShow">
      <template #header>
        <h4>上传详情</h4>
      </template>
      <el-row>
        <el-col :span="12">
          <h3>成功数据</h3>
          <el-table max-height="200" :data="detailObj.succeedStudent">
            <el-table-column label="手机号码" prop="phoneNumber" align="certer">
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="12">
          <h3>失败数据</h3>
          <el-table max-height="200" :data="detailObj.errorStudent">
            <el-table-column
              label="手机号码"
              prop="phoneNumber"
              align="certer"
            ></el-table-column>
            <el-table-column
              class-name="reason"
              label="失败原因"
              prop="phoneNumber"
              align="certer"
            ></el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, defineExpose, defineProps } from "vue";
const props = defineProps(["detailObj"]); //接受父组件传递的数据
const isShow = ref(false); //控制对话框是否打开
const open = () => {
  console.log(props.detailObj);
  isShow.value = true;
};
defineExpose({ open });
</script>
<style lang="scss" scoped>
.import-detail {
  .btn {
    display: inline-block;
    width: 80px;
    height: 30px;
    line-height: 30px;
    border-radius: 10px;
    text-align: center;
    background-color: #eee;
    font-size: 14px;
    cursor: pointer;
  }
  :deep(.el-col) {
    text-align: center;
  }
  h3 {
    line-height: 50px;
    background: #eee;
  }

  :deep(.reason) {
    div {
      color: red !important;
    }
  }
}
</style>
