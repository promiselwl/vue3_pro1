<!--  -->
<template >
  <div class="student-detail">
    <!--el-drawer抽屉面板  -->
    <el-drawer v-model="isDrawer" size="50%" :before-close="close">
      <!--使用template #header自定义头部 -->
      <template #header>
        <h4>学员详情</h4>
      </template>
      <div class="content-title">
        <!--  @click="toEditPage"点击编辑按钮来切换 -->
        <span v-if="!isEdit" @click="toEditPage" style="margin-left: 0px"
          >编辑</span
        >
        <template v-else>
          <span @click="submitEdit">保存</span>
          <span @click="cancelEdit">取消</span>
        </template>
      </div>
      <!-- 查看和编辑 -->
      <div class="content">
        <!-- 查看 -->
        <div v-if="!isEdit">
          <!-- 第一行 -->
          <el-row>
            <el-col :span="7">
              <span class="property">手机号:</span>
              <span class="value">{{ studentInfo.phoneNumber }}</span>
            </el-col>
            <el-col :span="7">
              <span class="property">姓名:</span>
              <span class="value">{{ studentInfo.name || "--" }}</span>
            </el-col>
            <el-col :span="8">
              <span class="property">QQ:</span>
              <span class="value">{{ studentInfo.QQ || "--" }}</span>
            </el-col>
          </el-row>
          <!-- 第二行 -->
          <el-row>
            <el-col :span="7">
              <span class="property">微信:</span>
              <span class="value">{{ studentInfo.wechat || "--" }}</span>
            </el-col>
            <el-col :span="8">
              <span class="property">身份证:</span>
              <span class="value">{{ studentInfo.card || "--" }}</span>
            </el-col>
            <el-col :span="8">
              <span class="property">年龄:</span>
              <span class="value">{{ studentInfo.age || "--" }}</span>
            </el-col>
          </el-row>
          <!-- 第三行 -->
          <el-row>
            <el-col :span="7">
              <span class="property">性别:</span>
              <span class="value">{{ studentInfo.sex || "--" }}</span>
            </el-col>
            <el-col :span="7">
              <span class="property">地域:</span>
              <span class="value">{{ studentInfo.location || "--" }}</span>
            </el-col>
            <el-col :span="8">
              <span class="property">原学历层次:</span>
              <span class="value">{{ studentInfo.education || "--" }}</span>
            </el-col>
          </el-row>
        </div>
        <!-- 编辑 -->
        <el-form
          v-else
          class="edit-page"
          :model="editQuery"
          :rules="rules"
          ref="formRef"
        >
          <!-- 第一行 -->
          <el-row>
            <el-col :span="8">
              <el-form-item label="手机号">
                <!-- disabled使不能编写 -->
                <el-input
                  v-model="editQuery.phoneNumber"
                  disabled
                  size="small"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="姓名" prop="name">
                <el-input
                  v-model="editQuery.name"
                  size="small"
                  placeholder="请输入姓名"
                ></el-input>
              </el-form-item> </el-col
            ><el-col :span="8">
              <el-form-item label="QQ">
                <el-input
                  v-model="editQuery.QQ"
                  size="small"
                  placeholder="请输入QQ"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 第二行 -->
          <el-row>
            <el-col :span="8">
              <el-form-item label="微信号">
                <el-input
                  v-model="editQuery.wechat"
                  placeholder="请输入微信号"
                  size="small"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="身份证号">
                <el-input
                  v-model="editQuery.card"
                  placeholder="请输入身份证号"
                  size="small"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="年龄">
                <el-input
                  v-model="editQuery.age"
                  placeholder="请输入年龄"
                  size="small"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 第三行 -->
          <el-row>
            <el-col :span="8">
              <el-form-item label="性别">
                <el-radio-group v-model="editQuery.sex">
                  <el-radio label="">未知</el-radio>
                  <el-radio label="男">男</el-radio>
                  <el-radio label="女">女</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="地域">
                <!-- ：options选项的数据源 -->
                <el-cascader
                  v-model="editQuery.location"
                  placeholder="请输入所在城市"
                  size="small"
                  :options="options"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="学历层次">
                <el-select v-model="editQuery.education" size="small">
                  <el-option
                    v-for="item in educationOptions"
                    :key="item.value"
                    :label="item.value"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, defineExpose, defineProps, computed, defineEmits } from "vue";
import options from "@/assets/js/city";
import { quitFn } from "@/hooks/quitFn";
import { ElMessage } from "element-plus";
import { reviseStudent } from "@/api/student"; //修改学生信息接口
const props = defineProps(["studentObj"]); //接受父组件传递的值
const emit = defineEmits(["change"]);

const isDrawer = ref(false); //定义抽屉是否打开
const isEdit = ref(false); //是否在编辑页面
const formRef = ref(null);
const rules = {
  //表单校验
  name: [{ required: true, message: "姓名是必填项", trigger: "blur" }],
};
const studentInfo = computed(() => props.studentObj && props.studentObj.info); //计算当前行的学员信息
const editQueryRaw = {
  //编辑的数据信息
  QQ: "",
  age: "",
  card: "",
  education: "",
  location: "",
  name: "",
  phoneNumber: "",
  sex: "",
  wechat: "",
};
const editQuery = ref(editQueryRaw); //编辑的数据信息
// 学历选项
const educationOptions = [
  { value: "无文凭", label: "无文凭" },
  { value: "小学", label: "小学" },
  { value: "初中", label: "初中" },
  { value: "高中/中专", label: "高中/中专" },
  { value: "大专", label: "大专" },
  { value: "本科", label: "本科" },
  { value: "硕士", label: "硕士" },
  { value: "博士", label: "博士" },
];
// 1.打开抽屉
const open = () => {
  isDrawer.value = true;
};
// 2.关闭抽屉
const close = () => {
  if (isEdit.value) {
    // 在编辑界面内
    quitFn({}, () => {
      isDrawer.value = false; //关闭抽屉
      isEdit.value = false; //关闭编辑
    });
  } else {
    // 不在编辑界面
    isDrawer.value = false; //关闭抽屉
  }
};
// 初始化editQuery
const innitEdit = () => {
  const editQueryValue = editQuery.value; //编辑时的数据
  const studentInfoValue = studentInfo.value; //当前行的学员数据信息
  for (const key in editQueryValue) {
    if (studentInfoValue.location && "location" === key) {
      editQueryValue.location = studentInfoValue.location.split("/");
    } else {
      editQueryValue[key] = studentInfoValue[key];
    }
  }
};
// 3.编辑
const toEditPage = () => {
  innitEdit(); //初始化函数
  isEdit.value = true;
};
// 4.保存
const submitEdit = () => {
  //通过表单校验调用后端接口
  formRef.value.validate(async (value, err) => {
    if (value) {
      // 校验通过调用后端接口,后端返回值解构出来 reviseStudent
      const { data } = await reviseStudent(editQuery.value);
      ElMessage.success(data.txt);
      isEdit.value = false;
      close(); //关闭面板
      emit("change"); //触发父组件的自定义函数
    } else {
      // console.log(err);
      ElMessage.error(err.name[0].message);
    }
  });
};
// 5.取消
const cancelEdit = () => {
  quitFn({}, () => {
    // 点击确认之后,执行的回调函数
    isEdit.value = false; //回到编辑页面
  });
};
// 局部暴露导出的对象 open,close,
defineExpose({
  open,
  close,
});
</script>

<style lang="scss" scoped>
.content-title {
  font-size: 14px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
  padding-left: 30px;
  span {
    color: #5281ba;
    cursor: pointer;
    margin-left: 10px;
  }
}
.content {
  margin-top: 10px;
  line-height: 50px;
  font-size: 14px;
  padding-left: 30px;
  .property {
    color: #999;
    margin-right: 5px;
  }
  .value {
    color: #666;
  }
  .edit-page {
    margin-top: 10px;
    :deep(.el-row) {
      text-align: right !important;
      .el-form-item__label {
        width: 70px;
      }
      .el-form-item {
        margin-top: 20px;
      }
      .el-radio {
        margin-right: 5px;
      }
      .el-input {
        width: 150px;
      }
    }
  }
}
</style>
