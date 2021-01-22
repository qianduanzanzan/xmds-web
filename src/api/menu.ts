import request from "@/utils/request";

export const getMenus = () =>
  request({
    url: "/service/menu/getMenus",
    method: "post",
  });

export const getMenuList = (data: any) =>
  request({
    url: "/service/menu/getMenuPage",
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
    data
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

  export const changeStatus = (data: any) =>
  request({
    url: "/service/menu/changeMenuStatus",
    method: "post",
    data,
  });

export const getDeatil = (data: any) =>
  request({
    url: "/service/menu/getDetail",
    method: "post",
    data,
  });

export const authMenu = (data: any) =>
  request({
    url: "/service/userMenu/add",
    method: "post",
    data,
  });

export const cancelAuth = (data: any) =>
  request({
    url: "/service/userMenu/del",
    method: "post",
    data,
  });

export const getAuthMenu = (data: any) =>
  request({
    url: "/service/menu/getMenuListByUserId",
    method: "post",
    data,
  });
