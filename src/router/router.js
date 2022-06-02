import {createRouter, createWebHistory} from 'vue-router';
import login from "@/view/login/login";
import register from "@/view/register/register";
import chatIndex from "@/view/chat/chatIndex";
import {globalConfig} from "@/config/config";
import {errorTips} from "@/utils/messageTips";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {//默认页面
            path: '/',
            redirect: '/login',
        },
        {//登陆页面
            path: '/login',
            name: 'login',
            component: login,
        },
        {//注册页面
            path: '/register',
            name: 'register',
            component: register
        },
        {//聊天主页
            path: '/chatIndex',
            name: 'chatIndex',
            component: chatIndex,
            meta: {isAuth: true}
        }
    ],
});

//前置路由守卫
router.beforeEach((to, from, next) => {
    if (to.meta.isAuth) {//该页面是否需要跳转

        if (window.localStorage.getItem(globalConfig.tokenAddress)) {//用户是否携带token
            next();
        } else {
            next("/login");//否足额跳转到登陆界面
            errorTips("")
        }

    } else {
        next();
    }
});

export default router;