import request from '@/utils/request'  //引入总路由

// 具名导出   data为调用接口传入的信息
export const login = (data) => {
    // return 返回一个promise到逻辑页面中去使用 
    return request({
        method: "POST",
        url: "/login",
        data,
    })
}

// 退出登录
export const logout = () => {
    return request({
        url: '/login/logout'
    })
}

// 验证登录
export const checkLogin = () => {
    return request({
        url: '/login/checkLogin',
    })
}