import request from "@/utils/request";

export const getUserInfoById = (data: any) =>
  request({
    url: "/service/user/getInfo",
    method: "post",
    data,
    headers: {
      "Content-Type": "application/json",
    },
  });

export const updateUserInfo = (data: any) =>
  request({
    url: "/service/user/edit",
    method: "post",
    data,
    headers: {
      "Content-Type": "application/json",
    },
  });
export const editAvatar = (data: any) =>
  request({
    url: "/service/user/editAvatar",
    method: "post",
    data,
    headers: {
      "Content-Type": "application/json",
    },
  });
  export const getUserList = (data: any) =>
  request({
    url: "/service/user/getList",
    method: "post",
    data,
    headers: {
      "Content-Type": "application/json",
    },
  });
  export const addUser = (data: any) =>
  request({
    url: "/service/user/add",
    method: "post",
    data,
    headers: {
      "Content-Type": "application/json",
    },
  });