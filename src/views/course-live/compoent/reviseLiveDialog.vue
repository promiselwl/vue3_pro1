<!--  -->
<template>
  <div class="">
    <el-dialog v-model="isOpen" :before-close="close">
      <template #header>修改直播</template>
      <el-form :model="queryParams" :rules="rules" ref="formRef" class="form">
        <el-form-item label="直播标题" prop="liveName">
          <el-input
            v-model="queryParams.liveName"
            placeholder="请输入直播标题"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="直播开始时间" prop="liveTime">
          <el-date-picker
            v-model="queryParams.liveTime"
            type="datetime"
            placeholder="直播开始时间"
            :default-time="defaultTime"
            clearable
            :disabled-date="disabledDateFn"
          ></el-date-picker>
        </el-form-item>
        <el-form-item prop="liveDuration" label="直播时长">
          <el-input
            v-model="queryParams.liveDuration"
            placeholder="请输入直播时长(分钟)"
          ></el-input>
        </el-form-item>
        <el-form-item label="讲师" prop="teacher">
          <el-select v-model="queryParams.teacher" clearable>
            <el-option value="朱雀" label="朱雀"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="submitReviseLive">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { nextTick, ref } from "vue";
import { reviseLive } from "@/api/live"; //修改直播
import { quitFn } from "@/hooks/quitFn";
import { ElMessage } from "element-plus";
const props = defineProps(["liveObj"]); //接受父组件的数据
const emit = defineEmits(["change"]);
const isOpen = ref(false);
const formRef = ref(null);
const queryParams = ref({
  liveName: "", // 直播标题
  liveDuration: "", //直播开始时间
  teacher: "", //讲师
  liveTime: "", // 直播时长
});
const rules = ref({
  liveName: [{ required: true, message: "直播标题是必填项", trigger: "blur" }],
  liveTime: [
    { required: true, message: "直播开始时间是必填项", trigger: "blur" },
  ],
  liveDuration: [
    { required: true, message: "直播时长是必填项", trigger: "blur" },
  ],
  teacher: [{ required: true, message: "讲师是必填项", trigger: "blur" }],
});
const defaultTime = new Date(2000, 1, 1, 20, 30, 0);
const disabledDateFn = (value) => {
  const date = new Date();
  return date >= value; // true disabled  false 可以操作
};

// 关闭对话框
const close = () => {
  quitFn({}, () => {
    isOpen.value = false;
    formRef.validate.resetFields();
  });
};

// 打开对话框
const open = () => {
  isOpen.value = true;
  initQueryParams();
};
// 初始化
const initQueryParams = async () => {
  await nextTick();
  const liveObj = props.liveObj; //父组件传递的数据
  const queryParamsValue = queryParams.value; //获取用户输入的数据
  for (const key in queryParamsValue) {
    queryParamsValue[key] = liveObj[key];
  }
};
// 提交修改直播内容
const submitReviseLive = () => {
  // 通过表单校验
  formRef.value.validate(async (value) => {
    if (value) {
      const liveObj = props.liveObj;
      // 把修改课程需要条件的数据传递给后端,后端返回结果
      const { data } = await reviseLive({
        ...queryParams.value,
        _id: liveObj.id,
        id: liveObj._id,
      });
      if (!data.code) {
        // 成功了
        ElMessage.success(data.txt);
        isOpen.value = false;
        formRef.value.resetFields();
        emit("change");
      } else {
        ElMessage.error(data.txt);
      }
    }
  });
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
