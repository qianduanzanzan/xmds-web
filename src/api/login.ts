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
