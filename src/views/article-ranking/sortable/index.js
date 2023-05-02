// npm  i sortablejs拖拽的插件安装
import Sortable from "sortablejs";
import { nextTick, onMounted, ref } from "vue";
import { reviseRank } from "@/api/article";//修改文章的接口
import { ElMessage } from "element-plus";
// index.vue中的 el-table 上的ref ="tableRef" 拿到里面的数据
export const tableRef = ref(null)//获取el-table的dom
// 初始换排序函数
export const initSortable = (articleList, cb) => {
    if (tableRef.value && tableRef.value.$el) {
        let el = tableRef.value.$el.querySelector(".el-table__body tbody"); // 获取 拖拽表格的 tbody元素
        // 初始化sortable
        Sortable.create(el, {
            // 配置拖拽的类名
            ghostClass: 'sortable-ghost',
            // 拖拽后的钩子函数
            async onEnd(event) {
                const { newIndex, oldIndex } = event
                console.log('新', newIndex);
                console.log('旧', oldIndex);
                // reviseRank man被拖拽的人  woman 被挤开的人
                let man = articleList.value[newIndex]
                let woman = articleList.value[oldIndex]
                const { data } = await reviseRank({
                    man,
                    woman
                })

                // 在重新获取数据文章数据之前，清空articleList中的数据
                // 强制 el-table有感应 手动清空 再重新获取
                articleList.value = []
                ElMessage.success(data.txt);
                // 执行函数 cb就是index.vue中传过来的函数getArticleListFn 
                cb()




                
            }

        })
    }


}
initSortable()