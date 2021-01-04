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