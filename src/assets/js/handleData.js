import { useRouteStore } from '@/store/route'
import { computed } from 'vue'
// 默认导出
export default () => {
    const routeStore = useRouteStore()
    const menuRoute = computed(() => routeStore.menuRoute)  //触发menuRoute
    //1. 处理有没有子菜单项 给其添加一个titles属性
    // map()会分配内存空间存储数组并返回
    let newarr = menuRoute.value.map(item => {
        item.titles = [item.title]
        return item
    })
    // console.log(newarr);
    // 2.遍历有子菜单的
    menuRoute.value.forEach(item => {
        if (item.children.length) {
            // 代表二级路由{titles:['学生']}
            item.children.forEach(child => {
                // ['学生'，'学生管理']
                child.titles = item.titles.concat(child.title)  //合并数组
                // newarr.push(item.children)

            })
            newarr.push(...item.children)
        }

    })
    console.log(newarr);
    return  newarr
}


// {path:'/',children:[{},{}]}


// {path:'/'},
// {path:'/profile'},
// {path:'/student' titles:['学员']},
// {path:'/student/studentManage' titles:['学员','学员管理']},
