// 定义功能项目的接口
import request from '@/utils/request'
export const getFeature = () => {
    return request({
        url: '/data/feature'
    })
}