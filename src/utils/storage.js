import {globalConfig} from "@/config/config";

const localStorage = window.localStorage;

const sessionStorage = window.sessionStorage;

function clearToken() {
    localStorage.removeItem(globalConfig.tokenAddress);
}

function getToken() {
    return localStorage.getItem(globalConfig.tokenAddress);
}

function clearNickName() {
    localStorage.removeItem(globalConfig.nickNameAddress);
}

function getUserNameFromToken() {
    let decode = decodeURIComponent(escape(window.atob(getToken().split('.')[1])));
    return decode ? JSON.parse(JSON.parse(decode).sub).userName : undefined;
}

function getNickNameFromToken() {
    let decode = decodeURIComponent(escape(window.atob(getToken().split('.')[1])));
    console.log(JSON.parse(decode).sub.nickName)
    return decode ? JSON.parse(JSON.parse(decode).sub).nickName : undefined;
}

export {
    localStorage,
    sessionStorage,
    clearToken,
    getToken,
    clearNickName,
    getNickNameFromToken,
    getUserNameFromToken
}