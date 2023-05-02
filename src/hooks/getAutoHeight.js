import { ref, onMounted, onActivated, onDeactivated, onUnmounted } from 'vue'

export const getAutoHeight = (marginTop) => {
  // marginTop每个组件传入的高度
  const tableHeight = ref(window.innerHeight - marginTop)

  // 1.
  const refreshHeight = () => {
    tableHeight.value = window.innerHeight - marginTop
  }
  const refresh = (margin) => {
    marginTop = margin
    tableHeight.value = window.innerHeight - margin
  }
  // 页面挂载
  onMounted(() => {
    // resize尺寸发生变化时
    window.addEventListener('resize', refreshHeight)
  })
  // 页面卸载
  onUnmounted(() => {
    window.removeEventListener('resize', refreshHeight)
  })
  // 页面激活
  onActivated(() => {
    window.addEventListener('resize', refreshHeight)
  })
  // 页面失活
  onDeactivated(() => {
    window.removeEventListener('resize', refreshHeight)
  })
  return { tableHeight, refresh }
} 