export default [
    {
      element: '#guide-start', // 需要被高亮的元素选择器
      popover: {
        title: '引导', // 弹窗的标题
        description: "打开引导功能",// 弹窗的主体内容
        position: 'bottom-right'  //位置
      }
    },
    {
      element: '#guide-hamburger',
      popover: {
        title: '汉堡按钮',
        description: "打开和关闭左侧菜单",
      }
    },
    {
      element: '#guide-breadcrumb',
      popover: {
        title: '面包屑',
        description: "指示当前页面位置",
      }
    },
    {
      element: '#guide-search',
      popover: {
        title: '搜索',
        description: "页面链接搜索",
        position: 'bottom-right'
      }
    },
    {
      element: '#guide-fullscreen',
      popover: {
        title: '全屏',
        description: "页面显示切换",
        position: 'bottom-right'
      }
    },
    {
      element: '#guide-tags',
      popover: {
        title: '标签',
        description: "已打开页面标签",
        position: 'bottom-left'
      }
    },
    {
      element: '#guide-menu',
      popover: {
        title: '菜单',
        description: "项目功能菜单",
        position: 'right-center'
      }
    },
  ]