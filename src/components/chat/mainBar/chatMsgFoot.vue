<template>
  <!--工具栏-->
  <div>
    <ul>
      <li class="color-hover-deep-grey">
        <icon class="foot-icon" symbol="icon-xiaolian"/>
      </li>
      <li class="color-hover-deep-grey">
        <icon class="foot-icon" symbol="icon-icon"/>
      </li>
      <li class="color-hover-deep-grey">
        <icon class="foot-icon" symbol="icon-wenjian"/>
      </li>
    </ul>
  </div>
  <!--文本域-->
  <div>
    <textarea
        v-model="msg"
        class="gray-box input-box"
        @keyup.ctrl.enter="sendMsg"
    />
  </div>
  <!--底部功能-->

  <div class="foot-button">
    <el-button class="button-size" type="primary" @click="sendMsg">发送</el-button>
  </div>
</template>

<script>
import Icon from "@/components/common/icon";
import "../../../assets/style/common.css";
import {ref} from "vue";
import {useChatStore} from "@/sotre/chatStore";
import {infoTips} from "@/utils/messageTips";
import {LANG} from "@/config/lang";
import {getUserNameFromToken} from "@/utils/storage";
import {globalConfig} from "@/config/config";
import {WebSocketMessage} from "@/view/chat/service/WebSocketEvent";

export default {
  name: "chatMsgFoot",
  components: {Icon},
  setup() {
    const chatStore = useChatStore();
    let msg = ref("");

    function sendMsg() {
      if (msg.value !== "") {

        let wsMsg = new WebSocketMessage(globalConfig.ws.message_event.chat, {//将消息封装成json格式
          message: msg.value,
          isGroup: chatStore.chatting.isGroup,
          receiver: chatStore.chatting.receiver,
          sender: getUserNameFromToken(),
          MsgType: globalConfig.message.type.raw_text,
        });

        chatStore.sendMessage(wsMsg);

        msg.value = "";
      } else {
        infoTips(LANG.CHAT.BLANK_MSG);
      }
    }

    return {
      msg,
      sendMsg
    }
  }
}
</script>

<style scoped>
.foot-icon {
  width: 25px;
  height: 25px;
}

ul {
  display: flex;
  padding: 6px 0;
}

li {
  margin: 0 20px 0 0;
  padding: 5px;
}

.foot-button {
  padding: 2px 0;
  float: right;
}

:deep(.el-button>span) {
  font-size: 12px;
}

:deep(.el-textarea__inner) {
  background: rgb(245, 246, 247);
  box-shadow: none;
}

.button-size {
  height: 25px;
  width: 50px;
}

.input-box {
  height: 110px;
}
</style>