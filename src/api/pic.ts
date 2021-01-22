import request from "@/utils/request";

export const upload = (data: any) =>
  request({
    url: "/service/pic/upload",
    method: "post",
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const uploads = (data: any) =>
  request({
    url: "/service/pic/uploads",
    method: "post",
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const del = (data: any) =>
  request({
    url: "/service/pic/del",
    method: "post",
    data
  });