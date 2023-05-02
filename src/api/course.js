import request from '@/utils/request'
// 获取课程列表
export const getCourseList = (params) => {
  return request({
    url: '/course/courseList',
    params
  })
}
// 修改课程基础信息
export const reviseCourseBase = (data) => {
  return request({
    url: '/course/reviseCourseBase',
    method: "POST",
    data,
  })
}
// 修改课程封面
export const reviseCourseCover = (data) => {
  return request({
    url: '/course/reviseCourseCover',
    method: "POST",
    data,
  })
}
