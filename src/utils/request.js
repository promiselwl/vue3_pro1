// 代理服务器
import axios from 'axios'//引入axios
// 默认导出   axios的配置
export default axios.create({
    timeout: 5000,//延迟时间
    withCredentials: true  //允许跨域
})