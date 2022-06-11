import axios from "axios";
import {globalConfig} from '@/config/config';
import {errorTips} from "@/utils/messageTips";
import {LANG} from "@/config/lang";

export const service = axios.create({
    baseURL: globalConfig.request.base_url
});

service.interceptors.request.use(config => {//拦截每一次请求,如果本地存在Token的话则将请求头中加上Token
    let token = window.localStorage.getItem(globalConfig.tokenAddress);
    if (token) {
        config.headers[globalConfig.tokenAddress] = token;
    }
    return config;
}, error => {
    errorTips(LANG.AUTH.REQUEST.FAIL + error.toString())
    return Promise.reject(error);
});

service.interceptors.response.use(function (response) {//拦截每一次服务器的响应
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    console.log(response)
    let data = response.data.data;
    let token = data ? data.token : undefined;
    if (token) {//如果响应中携带有token,将其存入localStorage中
        localStorage.setItem(globalConfig.tokenAddress, token)
    }

    return response;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    console.log(error)
    errorTips(LANG.AUTH.RESPONSE.FAIL + error.toString());
    return Promise.reject(error);
});