import request from "@/utils/request";

export const getRouter = (data: any) =>
  request({
    url: "/service/menu/getList",
    method: "post",
    data,
    headers: {
      "Content-Type": "application/json",
    },
  });

export const getMenuList = (data: any) =>
  request({
    url: "/service/menu/getMenuList",
    method: "post",
    data,
    headers: {
      "Content-Type": "application/json",
    },
  });

export const addMenu = (data: any) =>
  request({
    url: "/service/menu/add",
    method: "post",
    data,
    headers: {
      "Content-Type": "application/json",
    },
  });

export const editMenu = (data: any) =>
  request({
    url: "/service/menu/edit",
    method: "post",
    data,
    headers: {
      "Content-Type": "application/json",
    },
  });

export const getDeatil = (data: any) =>
  request({
    url: "/service/menu/getDetail",
    method: "post",
    data,
    headers: {
      "Content-Type": "application/json",
    },
  });

  export const authMenu = (data: any) =>
  request({
    url: "/service/tbUserMenu/add",
    method: "post",
    data,
    headers: {
      "Content-Type": "application/json",
    },
  });

  export const cancelAuth = (data: any) =>
  request({
    url: "/service/tbUserMenu/del",
    method: "post",
    data,
    headers: {
      "Content-Type": "application/json",
    },
  });

  export const getAuthMenu = (data: any) =>
  request({
    url: "/service/tbUserMenu/getMenu",
    method: "post",
    data,
    headers: {
      "Content-Type": "application/json",
    },
  });
