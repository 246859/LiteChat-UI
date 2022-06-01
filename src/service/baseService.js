import axios from "axios";
import {config} from '@/config/config';
import {errorTips} from "@/utils/messageTips";

export const service = axios.create({
    baseURL: config.request.base_url
})
service.interceptors.request.use(config => {//拦截每一次请求,如果本地存在Token的话则将请求头中加上Token
    let token = window.localStorage.getItem("accessToken");
    if (token) {
        config.headers["accessToken"] = token;
    }
    return config;
}, error => {
    errorTips("请求失败:" + error.toString())
    return Promise.reject(error);
});

service.interceptors.response.use(function (response) {//拦截每一次服务器的响应
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    console.log(response)
    let data = response.data["data"];
    let token = data ? data["token"] : undefined;
    if (token) {//如果响应中携带有token,将其存入localStorage中
        window.localStorage.setItem("accessToken", token)
    }

    return response;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    console.log(error)
    errorTips("响应失败:" + error.toString());
    return Promise.reject(error);
});