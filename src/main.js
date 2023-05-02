import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/scss/index.scss'//引入scss的入口文件
import installIcon from './icons'//引入icons
import { createPinia } from 'pinia'
import '@/utils/permission'//运行这个js文件
import zhCn from 'element-plus/es/locale/lang/zh-cn'//引入中文
const pinia = createPinia()
const app = createApp(App)
export default pinia  //导出pinia

installIcon(app)  //传入app
app.use(pinia).use(router).use(ElementPlus, { locale: zhCn }).mount('#app')
