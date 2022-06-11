import {defineStore} from "pinia/dist/pinia";
import {globalConfig} from "@/config/config";
import {errorTips} from "@/utils/messageTips";
import {LANG} from "@/config/lang";
import {useRouter} from "vue-router";
import {getToken} from "@/utils/storage";

//聊天全局状态管理
export const useChatStore = defineStore('chatStore', {
    state: () => {
        return {
            wsClient: null,
            chattingMsgList: [],
            messageList: [
                {
                    avatar: '',
                    sender: '',
                    time: '',
                    messageList: [
                        {
                            avatar: '',
                            sender: '',
                            time: '',
                            message: ''
                        }
                    ]
                }
            ]
        }
    },
    actions: {
        connect() {//手动建立连接
            this.wsClient = new WebSocket(`${globalConfig.ws.url}?${getToken()}`);
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
                this.chattingMsgList.push(msgData);
            }
        },
        onClose() {
            const router = useRouter();
            errorTips(LANG.WS.DISCONNECT);
            router.push({name: "login"});
        }

    },
    getters: {
        sidBarMessageList: state => {

        }
    }
});