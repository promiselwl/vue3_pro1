// 动态排序
import { computed, ref } from "vue"
const dynamicRaw = [
    { label: '排名', prop: 'rank' },
    { label: '标题', prop: 'title' },
    { label: '作者', prop: 'author' },
    { label: '日期', prop: 'date' },
    { label: '描述', prop: 'description' },
]
// 导出筛选后的数据 供复选框使用
export const dynamicData = ref(dynamicRaw)//源数据

// 已选选项(勾选上的)展示
export const selectDynamic = ref([])
const initSelectDynamic = () => {
    // 返回值是label ===>["排名",'标题'，作者'，"日期"， '描述']
    selectDynamic.value = dynamicData.value.map(item => item.label)
}
initSelectDynamic()
// 当上面的勾选框改变后  下面的table也要跟着变 所以tableColumns要实时计算着selectDynamic的改变
// 其该变后 观察变化后的与原来的对比 取消的就不再selectDynamic中
// 所以selectDynamic.value.includes(item.label)返回false 然后将得到的给tableColumns
export const tableColumns = computed(() => {
    return dynamicData.value.filter(item => selectDynamic.value.includes(item.label))
})