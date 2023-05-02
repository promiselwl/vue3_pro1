export default
  {
    path: '/article',
    component: () => import('@/layout/Layout.vue'),
    redirect: '/article/ranking',
    name: 'article',
    meta: {
      title: '文章',
      icon: 'article'
    },
    children: [
      {
        path: 'ranking',
        component: () => import('@/views/article-ranking'),
        meta: {
          title: '文章排名',
          icon: 'article-ranking'
        },
      },
      {
        path: 'create',
        component: () => import('@/views/article-create'),
        meta: {
          title: '创建文章',
          icon: 'article-create'
        },
      }
    ]
  }
