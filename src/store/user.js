import { defineStore } from 'pinia'
import { login, logout, checkLogin } from "@/api/login";  //引用login接口
import { ElMessage } from "element-plus";
import { useRouteStore } from '@/store/route' //引入侧边栏接口
import router from '@/router'

import { getLocal, setLocal, removeAllItem } from "@/utils/storage";
import pinia from '@/main';  //引入pinia
export const useUserStore = defineStore('USER', {
    state: () => {
        return {
            userInfo: getLocal("__userInfo__", {}),  //存储用户信息
        }
    },
    actions: {
        //点击登录时传入登录信息 调用后端接口拿到数据根据后端的返回值来判断
        loginFn(value) {
            //调用后端接口并传入用户登录信息，然后.then接受后端解构的返回值来进行判断
            login(value).then(async ({ data }) => {
                if (!data.code) {
                    // 登录成功
                    this.userInfo = data.data   //把用户信息储存到store中
                    console.log(this.userInfo);
                    setLocal("__userInfo__", data.data); //本地存储
                    ElMessage.success(data.txt)
                    //..............登录成功后调用调用侧边栏store数据  触发函数
                    const routeStore = useRouteStore()
                    await routeStore.getMenuRouteFn()//触发 getMenuRouteFn函数
                    // 进行跳转路由
                    router.push('/') //进入主页面
                } else {
                    // 登录失败
                    ElMessage.error(data.txt)
                }
            })
        },

        // 退出登录
        logoutFn() {
            logout().then(({ data }) => {
                if (!data.code) {
                    // 退出登录
                    // 清空本地存储
                    removeAllItem()
                    console.log(pinia);
                    const allStore = [...pinia._s.values()]  //拿到Map伪类数组项
                    allStore.forEach(item => {
                        item.$reset();// //清空大菠萝数据   
                    })
                    // router.push('/login')//回到登录页
                } else {
                    ElMessage.error('退出登录失败!')
                }
            })
        },
        // 验证登录
        checkLoginFn() {
            // 因为在逻辑页面要判断验证是否登录,需要checkLoginFn()函数判断所以要return一个promise函数
            return new Promise((res, req) => {
                // 调用后端接口
                checkLogin().then(({ data }) => {
                    if (!data.code) {
                        // 已经登录，对大菠萝和store中的数据进行存储
                        this.userInfo = data.data
                        setLocal("__userInfo__", data.data);//本地存储
                    }
                    res(data.code) // 传递成功的状态 传值在逻辑页面去用
                })
            })
        }
    },
})