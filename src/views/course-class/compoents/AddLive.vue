<!-- 新增直播 -->
<template>
  <div class="">
    <el-drawer v-model="isDrawer" size="50%" :before-close="close">
      <template #header> <h4>新增直播</h4> </template>
      <div class="header">
        <!--头部名称 -->
        <h3>{{ classObj.courseName }}</h3>
        <p><span>班期名称:</span> {{ classObj.className }}</p>
        <!--新增直播按钮 -->
        <el-button type="primary" @click="openAddLiveDialog"
          >新增直播</el-button
        >
      </div>
      <!-- 直播列表 -->
      <div class="live-list">
        <ul>
          <!-- 遍历直播 -->
          <li
            v-for="item in classObj.liveList.liveList"
            :key="item._id"
            class="live-item"
          >
            <!-- 判断是直播还是回放 -->
            <div class="tag">
              {{ item.liveTime - new Date() > 0 ? "直播" : "回放" }}
            </div>
            <div class="live-content">
              <h5>{{ item.liveName }}</h5>
              <div>
                <span>讲师:{{ item.teacher }}</span>
                <span>直播时间:{{ formatTime(item.liveTime) }}</span>
                <span>
                  时长:{{ item.liveTime - Date() > 0 ? "--.--" : "02:00:00" }}
                </span>
              </div>

              <!--  删除直播 点击触发@click="deleteLiveFn(item)删除 -->
              <div class="delete" @click="deleteLiveFn(item)">
                <el-icon><Delete /></el-icon>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!-- 对话框的组件  :classObj="classObj"父传子的数据-->
      <AddLiveDialog
        ref="addLiveDialogRef"
        :classObj="classObj"
        @change="refreshClassObj"
      ></AddLiveDialog>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, defineProps, defineExpose, defineEmits } from "vue";
import AddLiveDialog from "./AddLiveDialog.vue";
import { formatTime } from "@/utils/formatTime";
import { Delete } from "@element-plus/icons-vue";
import { deleteLive } from "@/api/live";
import { quitFn } from "@/hooks/quitFn";
import { ElMessage } from "element-plus";

const isDrawer = ref(false); //控制抽屉是否打开
const addLiveDialogRef = ref(null);
const props = defineProps(["classObj"]);
const emit = defineEmits(["change"]);

//1. 打开抽屉
const open = () => {
  isDrawer.value = true;
  console.log(props.classObj);
};
//2. 关闭后在进入回到顶部
const close = () => {
  document.querySelector(".el-drawer__body").scrollTo(0, 0);
  isDrawer.value = false;
};
// 新增直播窗口打开
const openAddLiveDialog = () => {
  addLiveDialogRef.value.open();
};
const refreshClassObj = () => {
  emit("change"); //触发父组件index的change
};
// 删除直播
const deleteLiveFn = async (item) => {
  const queryParams = {};
  queryParams._id = props.classObj.liveList._id; //外侧id
  queryParams.id = item._id; //内侧id
  const { data } = await deleteLive(queryParams);
  if (!data.code) {
    quitFn({ contentTxt: "确定要删除此项吗?" }, () => {
      ElMessage.success(data.txt);
      emit("change");
    });
  } else {
    ElMessage.error(data.txt);
  }
};
defineExpose({ open });
</script>

<style lang="scss" scoped>
:deep(.el-drawer__body) {
  padding-top: 0;
}
.header {
  position: absolute;
  box-sizing: border-box;
  width: 92%;
  top: 70px;
  border-bottom: 1px solid #eee;
  padding-bottom: 20px;
  background-color: #fff;
  z-index: 100;
  h3 {
    font-size: 15px;
    color: #000;
  }
  p {
    font-size: 13px;
    color: #666;
    margin-top: 20px;
    margin-bottom: 20px;
    span {
      color: #ccc;
    }
  }
}
.live-list {
  margin-top: 130px;
  .live-item {
    position: relative;
    padding: 25px 60px;
    &:hover {
      .delete {
        display: block;
      }
    }
    .live-content {
      h5 {
        font-size: 14px;
      }
      div {
        margin-top: 15px;
        font-size: 12px;
        color: #bfbfbf;
        span {
          margin-right: 50px;
        }
      }
    }
    .tag {
      position: absolute;
      left: 12px;
      top: 25px;
      width: 38px;
      height: 20px;
      border: 1px solid #eee;
      text-align: center;
      line-height: 20px;
      font-size: 12px;
      background-color: #fafafa;
      border-radius: 5px;
    }
    .delete {
      display: none;
      position: absolute;
      left: 50%;
      top: 26px;
      margin-left: 200px;
      width: 20px;
      height: 20px;
      color: #e37777 !important;
      cursor: pointer;
      font-size: 15px !important;
    }
  }
}
</style>
