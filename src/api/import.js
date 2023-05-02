import request from "@/utils/request";
// 获取导入列表
export const getImportList = (params) => {
  return request({
    url: "/import/importList",
    params,
  });
};

// 获取模板 接口
export const importTemplate = () => {
  return request({
    url: "/import/template",
    // 一定要加 二进制数据
    responseType: "blob",
  });
};
