import {defineStore} from "pinia/dist/pinia";
import {globalConfig} from "@/config/config";
import {errorTips} from "@/utils/messageTips";
import {LANG} from "@/config/lang";
import {useRouter} from "vue-router";
import {clearToken, getToken} from "@/utils/storage";
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
            let data = event.data;
            console.log(event)
            console.log(JSON.parse(data))
            if (data) {
                let msgData = JSON.parse(data);
                this.chatting.chattingMsgList.push(msgData);
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