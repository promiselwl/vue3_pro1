export default
  {
    path: '/course',
    component: () => import('@/layout/Layout.vue'),
    redirect: '/course/courseManage',
    name: 'course',
    meta: {
      title: '课程',
      icon: 'role'
    },
    children: [
      {
        path: 'courseManage',
        component: () => import('@/views/course-manage'),
        meta: {
          title: '课程管理',
          icon: 'personnel-info'
        },
      },
      {
        path: 'classManage',
        component: () => import('@/views/course-class'),
        meta: {
          title: '班期管理',
          icon: 'link'
        },
      },
      {
        path: 'live',
        component: () => import('@/views/course-live'),
        meta: {
          title: '我的直播',
          icon: 'reward'
        },
      }
    ]
  }
