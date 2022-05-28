import {createRouter,createWebHistory} from 'vue-router';
import login from "@/view/login/login";
import register from "@/view/register/register";
import chatIndex from "@/view/chat/chatIndex";

const router = createRouter({
    history:createWebHistory(),
    routes: [
        {//默认页面
            path: '/',
            redirect:'/login'
        },
        {//登陆页面
            path: '/login',
            name: 'login',
            component: login,
        },
        {//注册页面
            path:'/register',
            name:'register',
            component:register
        },
        {//聊天主页
            path:'/chatIndex',
            name:'chatIndex',
            component:chatIndex
        }
    ],
});

export default router;