import { defineStore } from 'pinia'
import { getRoute } from '@/api/mneuRoute'  //引入接口
import { getLocal, setLocal } from '@/utils/storage'

export const useRouteStore = defineStore('ROUTE', {
    state: () => {
        return {
            menuRouteRaw: getLocal('__menuRoute__', []) //储存侧边栏路由接口
        }
    },
    actions: {
        getMenuRouteFn() {
            getRoute().then(({ data }) => {  //请求后端接口并解构后端返回的数据
                // 把数据存储到store中
                this.menuRouteRaw = data
                // console.log(this.menuRoute);   //查看 登录成功侧边栏数据
                //本地存储
                setLocal('__menuRoute__', data)//键值对
            })
        }
    },
    // 清空store数据的时候，访问主页只显示个人中心
    getters: {
        menuRoute() {
            return this.menuRouteRaw.length ? this.menuRouteRaw : [{
                children: []
                , icon: "user"
                , path: "/profile"
                , title: "个人中心"
            }]
        }
    }
}) 