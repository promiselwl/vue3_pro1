<!--  -->
<template>
  <div class="">
    <el-dialog v-model="isopen" :before-close="close">
      <template #header>新建直播</template>
      <el-form :model="queryParams" :rules="rules" ref="formRef" class="form">
        <el-form-item prop="liveName" label="直播标题">
          <el-input
            v-model="queryParams.liveName"
            clearable
            placeholder="请输入直播标题"
          ></el-input>
        </el-form-item>
        <el-form-item prop="liveTime" label="直播开始时间">
          <!--  :default-time="defaultTime"默认时间
          disabled-date	一个用来判断该日期是否被禁用的函数，接受一个 Date 对象作为参数。
           应该返回一个 Boolean 值。
          -->
          <el-date-picker
            v-model="queryParams.liveTime"
            type="datetime"
            placeholder="直播开始时间"
            :default-time="defaultTime"
            clearable
            :disabled-date="disabledDateFn"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="直播时长" prop="liveDuration">
          <el-input
            v-model="queryParams.liveDuration"
            placeholder="请输入直播时长(分钟)"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="teacher" label="讲师">
          <el-select v-model="queryParams.teacher" clearable>
            <el-option value="朱雀" label="朱雀"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="submitAddLive">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, defineExpose, defineProps, defineEmits } from "vue";
import { quitFn } from "@/hooks/quitFn";
import { addLive } from "@/api/live";
import { ElMessage } from "element-plus";
const isopen = ref(false);
const props = defineProps(["classObj"]);
const emit = defineEmits(["change"]);

const formRef = ref(null);

const defaultTime = new Date(2000, 1, 1, 20, 30, 0); //默认时间
// const emit = defineEmits("change");
// 1.传入后端的数据
const queryParams = ref({
  liveName: "",
  liveTime: "",
  liveDuration: "", //直播时长
  teacher: "",
});
// 表单校验
const rules = ref({
  liveName: [{ required: true, message: "直播标题是必选项", trigger: "blur" }],
  liveTime: [
    { required: true, message: "直播开始时间是必填项", trigger: "blur" },
  ],
  liveDuration: [
    { required: true, message: "直播时长是必填项", trigger: "blur" },
  ],
  teacher: [{ required: true, message: "讲师是必填项", trigger: "blur" }],
});
const open = () => {
  isopen.value = true;
};
// 取消新增
const close = () => {
  quitFn({}, () => {
    isopen.value = false; //关闭对话框
    formRef.value.resetFields(); // resetFields()重置该表单项，将其值重置为初始值，并移除校验结果
  });
};
// 确定新增
const submitAddLive = () => {
  formRef.value.validate(async (value) => {
    if (value) {
      // 如果有值走这里
      const classObj = props.classObj;
      const { data } = await addLive({
        // 取出queryParams里面的数据
        ...queryParams.value,
        // 拿到_id
        _id: classObj.liveList._id,
        className: classObj.className,
        courseName: classObj.courseName,
      });
      if (!data.code) {
        ElMessage.success(data.txt);
        isopen.value = false;
        formRef.value.resetFields();
        emit("change");//触发父组件的AddLive组件

      }
    }
  });
};

// 判断直播是否被禁用
const disabledDateFn = (value) => {
  const date = new Date();
  return date >= value;
};
defineExpose({ open });
</script>

<style lang="scss" scoped>
:deep(.el-form-item__label) {
  width: 130px;
}
.form :deep(.el-input) {
  width: 80% !important;
}
</style>