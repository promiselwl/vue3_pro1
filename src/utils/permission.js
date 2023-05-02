import { useUserStore } from '@/store/user'  //引入用户信息
import router from '@/router'  //拿到路由

// 定义白名单
const whiteList = ['/login', '/profile', '/401', '/404', '/']  //允许访问的路由

// 全局前置路由守卫，检验是否登录操作用async和 await
router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore()
    // 校验是否登录
    const isLoginCode = await userStore.checkLoginFn()
    // console.log(isLoginCode);  1为未登录 0为已经登录
    if (whiteList.includes(to.path)) {
        // 在白名单里
        // 在登录状态下 要返回登录页 不允许切换到 /login 路由  
        if (!isLoginCode && to.path === '/login') {
            return next('/')// 不继续往下运行 直接回到首页
        }
        next() // 白名单中其他情况 正常通行 
    } else {
        // 不在白名单里
        // 路由是否在路由表中 获取router的所有路由 getRoutes()方法
        const allRoute = router.getRoutes()
        console.log(allRoute);
        // findIndex 返回 满足return条件的数组项的下标   找不到就是 -1
        const routeIndex = allRoute.findIndex(item => item.path === to.path)
        // 在路由表中且登录状态
        if (routeIndex >= 0 && !isLoginCode) {
            next()
        }
        // 在路由表中未登录
        if (routeIndex >= 0 && isLoginCode) {
            next('/401')//没有权限
        }
        // 不在路由表
        if (routeIndex<0) {
            next('/404')
        }


    }
})
