// 学员管理的相关接口
import request from "@/utils/request";

//1. 获取学员列表get方式(从数据库上获取数据)
export  const  getStudentList =(params)=>{
    return  request({
        url: '/student/studentList',
        params
    })
}
// 2.获取分类课程对象
export  const getCourseObj=()=>{
    return request({
        url: '/student/courseObj',
    })
}
// 3.修改学生信息post(把修改的数据传入数据库)
export  const  reviseStudent =(data)=>{
    return request({
        method:"POST",
        url: '/student/reviseStudent',
        data
    })
}
// 4.修改学员班期
export  const  reviseStudentClass =(data)=>{
    return  request({
        method:"POST",
        url: '/student/reviseStudentClass',
        data
    })
}
// 5.修改课程是否启用
export  const  reviseISEnable =(data)=>{
    return request({
        method:"POST",
        url: '/student/reviseIsEnable',
        data,
    })
}
