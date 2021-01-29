import request from "@/utils/request";

export const getCatePage = (data: any) =>
  request({
    url: "/service/prodCategory/getPage",
    method: "post",
    data,
    headers: {
      "Content-Type": "application/json",
    },
  });

export const addCategory = (data: any) =>
  request({
    url: "/service/prodCategory/add",
    method: "post",
    data,
  });

export const editCategory = (data: any) =>
  request({
    url: "/service/prodCategory/edit",
    method: "post",
    data,
  });

export const changeCateStatus = (data: any) =>
  request({
    url: "/service/prodCategory/changeStatus",
    method: "post",
    data,
  });

export const getAllCate = () =>
  request({
    url: "/service/prodCategory/getAllCategory",
    method: "post",
  });
