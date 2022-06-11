import {globalConfig} from "@/config/config";

const localStorage = window.localStorage;

const sessionStorage = window.sessionStorage;

function clearToken() {
    localStorage.removeItem(globalConfig.tokenAddress);
}

function getToken() {
    return localStorage.getItem(globalConfig.tokenAddress);
}

function getNickName() {
    return localStorage.getItem(globalConfig.nickNameAddress);
}

function clearNickName() {
    localStorage.removeItem(globalConfig.nickNameAddress);
}

function getUserNameFromToken() {
    let decode = decodeURIComponent(escape(window.atob(getToken().split('.')[1])));
    return decode ? JSON.parse(decode).sub : undefined;
}

export {
    localStorage,
    sessionStorage,
    clearToken,
    getToken,
    clearNickName,
    getNickName,
    getUserNameFromToken
}