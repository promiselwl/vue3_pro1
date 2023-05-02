import request from "@/utils/request";
// 新增直播 
export const addLive = (data) => {
  return request({
    url: '/live/addLive',
    method: 'POST',
    data
  })
}

// 删除直播 
export const deleteLive = (data) => {
  return request({
    url: '/live/deleteLive',
    method: 'POST',
    data
  })
}

// 获取直播列表数据  

export const getLiveList = (params) => {
  return request({
    url: '/live/liveList',
    params
  })
}

// 修改直播 
export const reviseLive = (data) => {
  return request({
    url: '/live/reviseLive',
    method: 'POST',
    data
  })
}