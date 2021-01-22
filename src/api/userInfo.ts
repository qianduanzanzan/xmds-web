import request from "@/utils/request";

export const changePassword = (data:any) =>
  request({
    url: "/service/user/changePassword",
    method: "post",
    data,
    headers: {
      "Content-Type": "application/json",
    },
  });

export const getUserInfoByToken = () =>
  request({
    url: "/service/user/getUserInfoByToken",
    method: "post",
  });

export const getUserInfoById = (data: any) =>
  request({
    url: "/service/user/getUserInfo",
    method: "post",
    data,
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
// export const editAvatar = (data: any) =>
//   request({
//     url: "/service/user/editAvatar",
//     method: "post",
//     data,
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
  export const getUserList = (data: any) =>
  request({
    url: "/service/user/getUserList",
    method: "post",
    data,
    headers: {
      "Content-Type": "application/json",
    },
  });
  export const addUser = (data: any) =>
  request({
    url: "/service/user/addUser",
    method: "post",
    data,
  });
  export const changeUserStatus = (data:any) =>
  request({
    url: "/service/user/changeFlag",
    method: "post",
    data
  })