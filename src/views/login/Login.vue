<template>
  
  <div class="login-container">
    <!-- model表单数据对象  rules	表单验证规则 -->
    <el-form
      class="login-form"
      ref="loginFormRef"
      :model="loginForm"
      :rules="rules"
    >
      <div class="title-container">
        <h3 class="title">用户登录</h3>
      </div>
      <!-- 用户名 -->
      <!-- prop用在el-form-item 他是model 的键名。对应登录信息对象的键名 -->
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon="user"></svg-icon>
        </span>
        <el-input
          placeholder="username"
          name="username"
          v-model="loginForm.username"
        />
      </el-form-item>
      <!-- 密码 -->
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon="password"></svg-icon>
        </span>
        <!-- :type="typeIput"文本框和密码框切换 -->
        <el-input
          placeholder="password"
          name="password"
          v-model="loginForm.password"
          :type="typeIput"
        />
        <!-- 眼睛是否闭合    -->
        <span class="show-pwd">
          <svg-icon :icon="eyeIcon" @click="changeShowEye"></svg-icon>
        </span>
      </el-form-item>
      <!-- 登录按钮 -->
      <el-button type="primary" style="width: 100%" @click="handleSubmit"
        >登录</el-button
      >
    </el-form>
  </div>

</template>


<script setup>
import { computed, ref } from "vue";
import { validatePassword } from "./validatePassword"; //引入自定义校验规则
import { ElMessage } from "element-plus";
import { useUserStore } from "@/store/user";
const userStore = useUserStore(); //调用
const loginFormRef = ref(null);
// 用户登录信息
const loginForm = ref({
  username: "郑依韩",
  password: "zyh123456",
});

// 表单校验
const rules = ref({
  username: [{ required: true, message: "用户名是必填项", trigger: "blur" }],
  password: [
    { required: true, message: "密码是必填项", trigger: "blur" },
    // 自定义校验规则
    {
      validator: validatePassword, // validator校验
      trigger: "blur",
    },
  ],
});
// 控制密码框的显示状态
const isShowEye = ref(false);
const eyeIcon = computed(() => (isShowEye.value ? "eye-open" : "eye")); //显示状态
const typeIput = computed(() => (isShowEye.value ? "text" : "password")); //切换文本还是密码框
const changeShowEye = () => {
  isShowEye.value = !isShowEye.value; //切换图标
};

// 登录按钮
const handleSubmit = () => {
  // 确保校验都成了 才能往下走
  loginFormRef.value.validate((valid) => {
    // 有数据时
    if (valid) {
      // 触发 actions中的loginFn函数 并传入数据
      userStore.loginFn(loginForm.value);
    } else {
      ElMessage({
        message: "请填写规范",
        type: "warning",
        grouping: true, //合并弹窗内容
      });
    }
  });
};
</script>

  <style lang="scss" scoped>
.login-container {
  min-height: 100%;
  width: 100%;
  position: relative;
  // background-image: url(../../assets/2.jpg);
  background-color: $menuBg;
  background-size: cover;
  
  .login-form {
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    :deep(.el-form-item) {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      position: relative;
    }

    // :deep深度解析
    :deep(.el-input) {
      // 修改element样式
      display: inline-block;
      height: 47px;
      width: 85%;
      div {
        width: 100%;
        background: transparent;
        box-shadow: 0 0 0 0;
        input {
          padding: 12px 5px 12px 15px;
          height: 47px;
          color: $light_gray;
        }
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
  }

  .title-container {
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}


</style>
  