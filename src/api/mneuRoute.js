import request from "@/utils/request"


export  const  getRoute=()=>{
    return  request({
        url:'/data/route'  //后端接口
    })
}