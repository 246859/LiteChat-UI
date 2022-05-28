import {defineStore} from "pinia/dist/pinia";

//登陆和注册全局状态管理
export const useLoginStore = defineStore('loginStore',{
    state : () =>{
        return{
           loginForm:{
               account:'',
               password:'',
           },
           registerForm:{
               account:'',
               password:'',
               repassword:'',
           }
        }
    },
    actions:{

    },
    getters:{

    }
})