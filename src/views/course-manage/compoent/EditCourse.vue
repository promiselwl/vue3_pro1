    <!--el-drawer抽屉  :before-close关闭之前时的函数 -->
<template>
  <div class="">
    <el-drawer v-model="isDrawer" size="50%" :before-close="close">
      <!-- 插槽 -->
      <template #header>
        <h4>编辑课程</h4>
      </template>
      <!-- el-tabs选项卡  v-model="activeName"选择打开哪个选项卡 :rules="rules"表规则-->
      <el-tabs v-model="activeName">
        <!-- 基础信息 -->
        <el-tab-pane name="first" label="基础信息">
          <!-- 表单绑定数据对象用:model 不是v-model -->
          <el-form :model="courseQuery" :rules="rules" ref="baseFormRef">
            <el-form-item label="项目">
              <el-input v-model="courseQuery.kindName" disabled></el-input>
            </el-form-item>
            <el-form-item label="课程名称">
              <el-input v-model="courseQuery.courseName" disabled></el-input>
            </el-form-item>
            <el-form-item label="原价" prop="originalPrice">
              <el-input v-model="courseQuery.originalPrice">
                <template #prefix>￥</template>
              </el-input>
            </el-form-item>
            <el-form-item label="售价" prop="sellingPrice">
              <el-input v-model="courseQuery.sellingPrice">
                <template #prefix>￥</template>
              </el-input>
            </el-form-item>
            <el-form-item label="低价" prop="downPrice">
              <el-input v-model="courseQuery.downPrice">
                <template #prefix>￥</template>
              </el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <!-- 课程封面 -->
        <el-tab-pane name="second" label="课程封面">
          <el-form :model="coverInfo">
            <el-form-item label="课程描述">
              <el-input
                v-model="coverInfo.description"
                :placeholder="course.description"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="更换封面">
              <!--  v-model:file-list默认上传文件 :auto-upload="false"是否自动上传   
             :limit="1"限制个数 accept=".png,.jpg"接受文件后缀 -->
              <el-upload
                v-model:file-list="coverInfo.file"
                :auto-upload="false"
                :limit="1"
                accept=".png,.jpg"
              >
                <el-button type="primary">选择文件</el-button>
                <template #tip>
                  建议:课程封面大小建议上传1125*633,不超过5M,格式为jpg、png
                </template>
              </el-upload>
            </el-form-item>
            <!-- image图片 preview-src-list	开启图片预览功能:initial-index="0"初始预览图像索引
            fit	确定图片如何适应容器框
            -->
            <div class="cover-image">
              <el-image
                style="width: 100px; height: 100px"
                :src="course.coverImage"
                :preview-src-list="[course.coverImage]"
                :initial-index="0"
                fit="cover"
              >
              </el-image>
            </div>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <!-- 底部取消 -->
      <template #footer>
        <el-button type="primary" @click="submitFn">确定</el-button>
        <el-button @click="close">取消</el-button>
      </template>
    </el-drawer>
  </div>
</template>

<script  setup>
import { nextTick, ref } from "vue";
import { quitFn } from "@/hooks/quitFn"; //引入退出提示函数
import { reviseCourseBase, reviseCourseCover } from "@/api/course"; //接口
import { ElMessage } from "element-plus";
const props = defineProps(["course"]); //接受父组件的数据
const emit = defineEmits(["change"]);
const isDrawer = ref(false);
const activeName = ref("first");
const baseFormRef = ref(null); //方便操作form表单
// 父组件传来的数据不能直接修改,所以要先定义传来的数据
const courseQueryRaw = {
  kindName: "",
  courseName: "",
  originalPrice: "",
  sellingPrice: "",
  downPrice: "",
};
const courseQuery = ref(courseQueryRaw); //处理数据 在上面选项卡中使用
const coverInfo = ref({
  description: "", //课程描述
  file: [], //文件列表
});
// 定义form表单校验
const rules = ref({
  originalPrice: [{ required: true, message: "原价是必填项", trigger: "blur" }],
  sellingPrice: [{ required: true, message: "售价是必填项", trigger: "blur" }],
  downPrice: [{ required: true, message: "低价是必填项", trigger: "blur" }],
});
// 初始化数据
const initCourseQuery = async () => {
  // 等待数据执行完毕再执行
  await nextTick();
  const courseQueryValue = courseQuery.value; //获取定义的数据
  const course = props.course; //获取父组件传来的数据
  for (const key in courseQueryValue) {
    courseQueryValue[key] = course[key];
  }
};

// 打开抽屉
const open = () => {
  isDrawer.value = true;
  initCourseQuery();
};
// 关闭抽屉
const close = () => {
  quitFn({}, () => {
    closeNoFn();
  });
};
// 关闭抽屉执行的逻辑操作
const closeNoFn = () => {
  isDrawer.value = false; //关闭抽屉
  activeName.value = "first"; //选项卡恢复初始值
  baseFormRef.value.clearValidate(); //清除表单数据clearValidate()
};
// 确认按钮
const submitFn = async () => {
  // 1.判断是基础封面还是课程封面2.通过表单校验
  if (activeName.value === "first") {
    // 表单校验
    baseFormRef.value.validate(async (value) => {
      if (value) {
        // 校验通过 调用后端接口传入修改的数据，后端返回数据解构用data接受
        const { data } = await reviseCourseBase(courseQuery.value);
        if (!data.code) {
          // 成功
          ElMessage.success(data.txt);
          closeNoFn(); //关闭抽屉
          emit("change"); //触发父组件的change函数
        }
      } else {
        ElMessage.warning("信息填写不规范");
      }
    });
  } else {
    // 修改封面
    const coverInfoValue = coverInfo.value;
    if (coverInfoValue.description || coverInfoValue.file.length) {
      // 任一个数据有值 走进来
      let formData = new FormData();
      formData.append("courseName", props.course.courseName); //键值对
      if (coverInfoValue.description) {
        formData.append("description", coverInfoValue.description);
      }
      if (coverInfoValue.file.length) {
        formData.append("file", coverInfoValue.file[0].raw); //coverInfoValue.file[0].raw文件名称
        // console.log(coverInfoValue.file);
      }
      // 调用后端接口,后端返回值解构出来
      const { data } = await reviseCourseCover(formData);
      console.log(data);
      if (!data.code) {
        ElMessage.success(data.txt);
        closeNoFn();
        emit("change");
        coverInfoValue.file = [];
      } else {
        ElMessage.error(data.txt);
      }
    }
  }
};
// 导出函数供给父组件用
defineExpose({ open });
</script>

<style lang="scss" scoped>
:deep(.el-drawer__footer) {
  border-top: 1px solid #eee;
}
:deep(.el-form-item__label) {
  width: 80px;
  text-align: right;
}
:deep(.el-input) {
  width: 380px;
}
.cover-image {
  width: 90px;
  margin-left: 80px;
  margin-top: -18px;
  img {
    width: 100%;
  }
}
</style>
