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