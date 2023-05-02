// 完成所有svg资源的注册
import SvgIcon from '@/components/SvgIcon/SvgIcon'

// 完成svg的注册 
// 要检索的文件目录./svg  是否检索子文件false  检索匹配规则 /\.svg$/
const svgRequire = require.context('./svg', false, /\.svg$/)

svgRequire.keys().forEach(icon => {
  svgRequire(icon) // 完整资源的注册
})

export default (app) => {
  // 完成组件的全局注册 注册的图标标签svg-icon     SvgIcon组件
  app.component('svg-icon', SvgIcon)
}

