import {defineStore} from "pinia/dist/pinia";

export const deviceStore = defineStore('deviceStore',{
    state:()=>{
        return{
            userDeviceInfo:{}
        }
    }
});