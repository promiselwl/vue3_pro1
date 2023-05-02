<!-- 学员班期 -->
<template>
  <div class="select-class">
    <!--对话框 -->
    <el-dialog v-model="dialogVisible">
      <template #header>
        <h2>选择班期</h2>
      </template>
      <el-table :data="[studentClassObj]">
        <el-table-column prop="courseName" label="课程名称"></el-table-column>
        <el-table-column prop="className" label="班期名称">
          <template #default>
            <el-select v-model="className">
              <el-option
                v-for="item in studentClassObj.classOptions"
                :key="item"
                :value="item"
                :label="item"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
      </el-table>
      <template #footer>
        <el-button @click="close">取消</el-button>
        <el-button @click="reviseStudentClassFn">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, defineExpose, defineProps, nextTick, defineEmits } from "vue";
import { reviseStudentClass } from "@/api/student";
import { ElMessage } from "element-plus";
const props = defineProps(["studentClassObj"]); //接受父组件传来的值
const emit = defineEmits(["change"]); //接受父组件的自定义函数
const dialogVisible = ref(false); //定义对话框是否打开
const className = ref(null);
// 1.初始化课程名称
const initClassName = () => {
  className.value = props.studentClassObj.className; //把父组件的className赋值
};
// 2.打开对话框操作
const open = () => {
  dialogVisible.value = true; //打开对话框
  nextTick(initClassName); //下一次dom更新dom完成之后初始化课程名称
};
// 3.关闭对话框操作
const close = () => {
  dialogVisible.value = false; //关闭对话框
};
//4. 确认之后更新数据库
const reviseStudentClassFn = async () => {
  // 调用后端接口并传入数据
  const { data } = await reviseStudentClass({
    phoneNumber: props.studentClassObj.phoneNumber,
    className: className.value,
  });
  ElMessage.success(data.txt);
  //触发父组件的自定义函数 更新数据
  emit("change");
  close(); //关闭对话框
};

defineExpose({
  open,
});
</script>

<style lang="scss" scoped>
</style>