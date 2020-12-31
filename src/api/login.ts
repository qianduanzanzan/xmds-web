import request from "@/utils/request";

export const login = (data: any) =>
  request({
    url: "/service/login",
    method: "post",
    data,
    headers: {
      "Content-Type": "application/json",
    },
  });

  export const logout = () =>
  request({
    url: "/service/logout",
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
  });

  export const checkLogin = (data: any) =>
  request({
    url: "/service/checkLogin",
    method: "post",
    data,
    headers: {
      "Content-Type": "application/json",
    },
  });
