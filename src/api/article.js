import request from "@/utils/request";
// 新增文章
export const addArticle = (data) => {
  return request({
    url: '/article/addArticle',
    method: 'POST',
    data
  })
}



// 获取文章列表数据
export const getArticleList = (params) => {
  return request({
    url: '/article/articleList',
    params
  })
}

// 修改排名 
export const reviseRank = (data) => {
  return request({
    url: '/article/reviseRank',
    method: 'POST',
    data
  })
}

// 删除文章 
export const deleteArticle = (data) => {
  return request({
    url: '/article/deleteArticle',
    method: 'POST',
    data
  })
}