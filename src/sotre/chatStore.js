import {defineStore} from "pinia/dist/pinia";
import {globalConfig} from "@/config/config";
import {errorTips} from "@/utils/messageTips";
import {LANG} from "@/config/lang";
import {useRouter} from "vue-router";
import {clearToken, getToken, getUserNameFromToken} from "@/utils/storage";
import router from "@/router/router";
import {reactive} from "vue";

//聊天全局状态管理
export const useChatStore = defineStore('chatStore', {
    state: () => {
        return {
            wsClient: null,
            sidePage: {
                pageFlag: 0
            },
            chatting: {
                avatar: "",
                conversationName: "",
                receiver: "",
                firstMsg: "我想来了一件很高兴的事情,哈哈哈哈",
                chattingMsgList: [],
                isGroup: false,
                time: "",
            },
            messageList: []
        }
    },
    actions: {
        connect() {//手动建立连接
            try {
                this.wsClient = new WebSocket(`${globalConfig.ws.url}?${getToken()}`);
            } catch (e) {
                clearToken();
                errorTips(LANG.AUTH.LOGIN.TIME_OUT);
            }

            this.wsClient.onmessage = this.onMessage;

        },
        close() {//手动关闭连接
            this.wsClient.close();
        },
        sendMessage(data) {//发送信息
            if (this.wsClient && this.wsClient.readyState === 1) {//不为undefined 且 为开启状态
                this.wsClient.send(JSON.stringify(data));
            } else {
                errorTips(LANG.WS.ERROR);
            }
        },
        onMessage(event) {
            //ws事件
            let data = event.data;
            if (data) {

                console.log(data)
                let msgData = JSON.parse(data);
                //数据合法校验
                if (msgData && msgData.event && msgData.payload) {

                    let payload = msgData.payload;

                    let userName = getUserNameFromToken();

                    switch (msgData["event"]) {
                        case globalConfig.ws.message_event.chat: {
                            let isNeedToRender = false;
                            //判断接收的消息是否是正在进行的会话消息,是的话则渲染,否的话存入另外渲染
                            if ((payload.sender === userName && payload.receiver === this.chatting.receiver) ||
                                (payload.sender === this.chatting.receiver && payload.receiver === userName)) {
                                this.chatting.chattingMsgList.push(payload);
                                isNeedToRender = true
                            } else if (payload.sender !== this.chatting.receiver && payload.receiver === userName) {
                                isNeedToRender = true;
                            }

                            if (isNeedToRender) {
                                //消息处理成渲染格式
                                payload.firstMsg = payload.message;
                                payload.avatar = require('../assets/img/avatar/girl.jpg')

                                //是否存在
                                let index = this.messageList.findIndex((msg) => {
                                    //在新消息到来时判断消息是否是正在会话的消息,或者是已经存在的消息,来决定是否在消息列表新增卡片渲染
                                    return msg.sender === payload.sender || (msg.receiver === payload.sender && msg.sender === payload.receiver);
                                });

                                if (index > -1) {
                                    this.messageList[index].firstMsg = payload.message
                                } else {
                                    this.messageList.push(payload);
                                }
                            }

                        }
                            break;
                        case globalConfig.ws.message_event.info : {

                        }
                            break;
                    }
                }

            }


        },
        onClose() {
            const router = useRouter();
            errorTips(LANG.WS.DISCONNECT);
            router.push({name: "login"});
        },
        clearGroupList() {
            this.concat.groupList = reactive([]);
        },
    },
    getters: {}
});