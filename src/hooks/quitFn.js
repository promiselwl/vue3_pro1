import { ElMessageBox } from 'element-plus'
//contentTxt文本信息,titleTxt标题，confirmButtonText确认弹窗,cancelButtonText取消弹窗,type类型
//confirmCb确认的回调函数, cancelCb取消的回调函数
export const quitFn = ({ contentTxt, titleTxt, confirmButtonText, cancelButtonText, type }, confirmCb, cancelCb) => {
  ElMessageBox.confirm(contentTxt || '当前内容还未保存,确定取消吗', titleTxt || '取消保存', {
    confirmButtonText: confirmButtonText || '确认',
    cancelButtonText: cancelButtonText || '取消',
    type: type || 'warning'
  })
    .then(() => {
      // 用户点了 确认按钮 || 过假留真     过真留假 &&
      confirmCb && confirmCb()
    })
    .catch(() => {
      // 用户点了 取消按钮
      cancelCb && cancelCb()
    })
}

