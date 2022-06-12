import {createRouter, createWebHistory} from 'vue-router';
import login from "@/view/login/login";
import register from "@/view/register/register";
import chatIndex from "@/view/chat/chatIndex";
import introducePage from "@/view/chat/introducePage";
import chatPage from "@/view/chat/chatPage";
import {globalConfig} from "@/config/config";
import {errorTips} from "@/utils/messageTips";
import {LANG} from "@/config/lang";

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
            meta: {isAuth: true},
            redirect: "/introduce",
            children: [
                {
                    path: "/introduce",
                    name: "introduce",
                    component: introducePage,
                    meta: {isAuth: true}
                },
                {
                    path: "/chatPage",
                    name: "chatPage",
                    component: chatPage,
                    meta: {isAuth: true}
                }
            ]
        }
    ],
});

// 前置路由守卫
router.beforeEach((to, from, next) => {
    let isHasToken = localStorage.getItem(globalConfig.tokenAddress);
    if (to.meta.isAuth) {//该页面是否需要跳转

        if (isHasToken) {//用户是否携带token
            next();
        } else {
            next("/login");//否足额跳转到登陆界面
            errorTips(LANG.AUTH.LOGIN.NO_LOGIN)
        }

    } else if ((to.name === 'login' || to.name === 'register') && isHasToken) {
        next('/chatIndex');
    } else {
        next();
    }
});


export default router;