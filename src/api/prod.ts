import request from "@/utils/request";

export const addProd = (data: any) =>
  request({
    url: "/service/prod/add",
    method: "post",
    data,
  });

export const getPage = (data: any) =>
  request({
    url: "/service/prod/getPage",
    method: "post",
    data,
    headers: {
      "Content-Type": "application/json",
    },
  });

export const editProd = (data: any) =>
  request({
    url: "/service/prod/eidt",
    method: "post",
    data,
    headers: {
      "Content-Type": "application/json",
    },
  });

export const changeStatus = (data: any) =>
  request({
    url: "/service/prod/changeStatus",
    method: "post",
    data,
  });

export const addProdAttr = (data: any) =>
  request({
    url: "/service/prodAttr/add",
    method: "post",
    data,
    headers: {
      "Content-Type": "application/json",
    },
  });

export const getAttrByProdId = (data: any) =>
  request({
    url: "/service/prodAttr/getAttrByProdId",
    method: "post",
    data,
  });

export const addProdSku = (data: any) =>
  request({
    url: "/service/prodSku/add",
    method: "post",
    data,
    headers: {
      "Content-Type": "application/json",
    },
  });
export const getSku = (data: any) =>
  request({
    url: "/service/prodSku/getSku",
    method: "post",
    data,
  });

export const editSku = (data: any) =>
  request({
    url: "/service/prodSku/edit",
    method: "post",
    data,
    headers: {
      "Content-Type": "application/json",
    },
  });
