import {defineStore} from "pinia/dist/pinia";
import {loginService} from "@/view/login/service/loginService";
import {registerService} from "@/view/register/service/registerService";
import sha1 from 'crypto-js/sha256';

//登陆和注册全局状态管理
export const useAuthStore = defineStore('authStore', {
    state: () => ({
        loginForm: {//登陆表单
            userName: '',
            password: '',
        },
        registerForm: {//注册表单
            userName: '',
            nickName: '',
            password: '',
            repassword: '',
        }
    }),
    actions: {
        reSetLoginForm() {//重置登陆表单状态
            this.loginForm = {
                userName: '',
                password: '',
            }
        },
        reSetRegisterForm() {//重置注册表单状态
            this.registerForm = {
                userName: '',
                nickName: '',
                password: '',
                repassword: '',
            }
        },
        login() {
            let data = {...this.loginForm};
            data.password = sha1(data.password).toString();//前台加密传输
            return loginService(data);
        },
        register() {
            let data = {...this.registerForm};
            data.password = sha1(data.password).toString();//前台加密传输
            return registerService(data)
        }
    },
    getters: {}
})