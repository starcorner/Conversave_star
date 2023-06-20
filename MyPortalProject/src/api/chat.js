import request from "@/utils/request";

export function sendMsg(data) {
  return request({
    url: "https://api.openai.com/v1/chat/completions",
    method: "post",
    data
  });
}

export function fetchCase(data) {
  return request({
    url: process.env.VUE_APP_BACKEND_API + "/queryCase",
    method: "post",
    data
  });
}
