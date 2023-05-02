export default
  {
    path: '/student',
    component: () => import('@/layout/Layout.vue'),
    redirect: '/student/studentManage',
    name: 'student',
    meta: {
      title: '学员',
      icon: 'personnel'
    },
    children: [
      {
        path: 'studentManage',
        component: () => import('@/views/student-manage'),
        meta: {
          title: '学员管理',
          icon: 'personnel-manage'
        },
      },
      {
        path: 'import',
        component: () => import('@/views/student-import'),
        meta: {
          title: '导入学员',
          icon: 'introduce'
        },
      }
    ]
  }