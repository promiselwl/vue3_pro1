import request from "@/utils/request";
// 获取班期列表
export const getClassList = (params) => {
  return request({
    url: '/class/classList',
    params
  })
}

