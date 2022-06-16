export const globalConfig = {
    request: {
        base_url: "/api",
        serve_url: {
            dev: "http://localhost:8088",
            pro: "",
            auth: {
                login: "/auth/login",
                register: "/auth/register",
                logout: "/auth/logout"
            }
        }
    },
    page: {
        side_menu: "siderBar-menu",
        sideBarMenuField: [0, 1, 2, 3],
        chatting: "chatting"
    },
    ws: {
        url: "ws://localhost:8088/Message",
        message_event: {
            chat: "CHAT_MESSAGE",
            info: {}
        },
    },
    message: {
        type: {
            raw_text: "RAW",
            img_text: "IMG",
            file_text: "FILE",
        },
    },
    tokenAddress: "94a2776e7bd6f611462bc4344e17773c65fc4c486401643b724d102a8936dff4",
    nickNameAddress: "nickName",


}