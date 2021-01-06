import request from "@/utils/request";

export const upload = (data: any) =>
  request({
    url: "/service/pic/upload",
    method: "post",
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });