import { createRouter, createWebHistory } from 'vue-router'
import studentManage from './modules/student'
import courseManage from './modules/course'
import articleManage from './modules/article'

const routes = [
  // 首页
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */  '@/layout/Layout.vue'),
    redirect: '/profile',//重定向二级路由个人中心
    children: [
      {
        path: '/profile',
        name: 'profile',
        meta: {
          title: '个人中心'
        },
        component: () => import(/* webpackChunkName: "profile" */ '@/views/profile')
      }
    ]
  },

  // 登录
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */  '../views/login/Login.vue')
  },

  // 401
  {
    path: '/401',
    component: () => import(/* webpackChunkName: "401" */'@/views/error-page/401')
  },
  // 404
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "404" */'@/views/error-page/404')
  },
  // 学员管理
  studentManage,
  // 班期管理
  courseManage,
  // 创建文章
  articleManage,


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
