import {defineStore} from "pinia/dist/pinia";
import {globalConfig} from "@/config/config";
import {errorTips, infoTips} from "@/utils/messageTips";
import {LANG} from "@/config/lang";
import {clearToken, getToken, getUserNameFromToken} from "@/utils/storage";
import {reactive} from "vue";
import {getFirstMsgFromPayload} from "@/utils/utils";

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
                sender: "",
                receiver: "",
                firstMsg: "",
                chattingMsgList: [],
                isGroup: false,
                groupId: "",
                time: "",
            },
            chatRecord: {
                top: false,
                page: 0
            },
            messageList: []
        }
    },
    actions: {
        connect() {//手动建立连接
            try {
                this.wsClient = new WebSocket(`${globalConfig.ws.url}?${getToken()}`);
            } catch (e) {
                console.log(e)
                clearToken();
                errorTips(LANG.AUTH.LOGIN.TIME_OUT);
            }

            this.wsClient.onmessage = this.onMessage;
            this.wsClient.onclose = this.onClose;

        },
        onClose() {//手动关闭连接
            infoTips("与服务器断开连接,请刷新重试");
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
                            this.onChatMessage(payload);
                        }
                            break;
                        case globalConfig.ws.message_event.info : {

                        }
                            break;
                    }
                }

            }

        },
        onChatMessage(payload) {
            //判断接收的消息是否是正在进行的会话消息,是的话则渲染,否的话存入另外渲染
            console.log(payload)

            //判断当前左侧聊天列表是否为空,有消息发送过来时渲染页面
            if (this.messageList.length === 0) {
                Object.keys(payload).forEach(key => {
                    this.chatting[key] !== undefined ? this.chatting[key] = payload[key] : undefined;
                })
            }

            let isGroupNow = this.chatting.isGroup;
            let isGroupPayload = payload.isGroup;

            //是否是同一会话模式
            if (isGroupNow === isGroupPayload) {
                if (isGroupNow ? payload.groupId === this.chatting.groupId : (!payload.isGroup) && payload.sender === this.chatting.sender) {
                    this.chatting.chattingMsgList.push(payload);
                }
            }

            payload.firstMsg = getFirstMsgFromPayload(payload);
            console.log(payload.firstMsg);

            //是否存在
            let index = this.messageList.findIndex((msg) => {
                //在新消息到来时判断消息是否是正在会话的消息,或者是已经存在的消息,来决定是否在左侧消息列表新增卡片渲染
                return payload.isGroup ? msg.groupId === payload.groupId : msg.sender === payload.sender;
            });

            if (index > -1) {
                this.messageList[index].firstMsg = payload.firstMsg;
            } else {
                this.messageList.push(payload);
            }

        },
        renderSideBarMsgList(payload, isGroup) {

            //消息处理成渲染格式
            let index = this.messageList.findIndex((msg) => {
                return isGroup ? payload.groupId === msg.groupId : msg.sender === payload.receiver;
            });
            this.chatting.chattingMsgList.push(payload);
            this.messageList[index].firstMsg = getFirstMsgFromPayload(payload);
        },
        onError() {
            while (true) {
                this.connect();
                if (this.wsClient && this.wsClient.readyState === 1) {
                    break;
                }
            }
        },
        clearGroupList() {
            this.concat.groupList = reactive([]);
        },
    },
    getters: {}
});