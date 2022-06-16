<template>
  <!--工具栏-->
  <div>
    <ul>
      <li class="color-hover-deep-grey">
        <icon class="foot-icon" symbol="icon-xiaolian"/>
      </li>
      <li class="color-hover-deep-grey">
        <el-upload
            ref="uploadImg"
            :before-upload="beforeUpload"
            :http-request="uploadHandler"
            :limit="1"
            :on-exceed="handleExceed"
            :show-file-list="false"
            accept="jpg"

        >
          <icon class="foot-icon" symbol="icon-icon"/>
        </el-upload>
      </li>
      <li class="color-hover-deep-grey">
        <el-upload
            :auto-upload="false"
            :limit="1"
            :show-file-list="false"
        >
          <icon class="foot-icon" symbol="icon-wenjian"/>
        </el-upload>
      </li>
    </ul>
  </div>
  <!--文本域-->
  <div>
    <textarea
        v-model="msg"
        class="gray-box input-box"
        @keyup.ctrl.enter="sendTextMsg"
    />
  </div>
  <!--底部功能-->

  <div class="foot-button">
    <el-button class="button-size" type="primary" @click="sendTextMsg">发送</el-button>
  </div>
</template>

<script>
import Icon from "@/components/common/icon";
import "../../../assets/style/common.css";
import {ref} from "vue";
import {useChatStore} from "@/sotre/chatStore";
import {errorTips, infoTips} from "@/utils/messageTips";
import {LANG} from "@/config/lang";
import {getNickNameFromToken, getUserNameFromToken} from "@/utils/storage";
import {globalConfig} from "@/config/config";
import {WebSocketMessage} from "@/view/chat/service/WebSocketEvent";
import {convertImgToBase64} from "@/utils/utils";

export default {
  name: "chatMsgFoot",
  components: {Icon},
  setup() {
    const chatStore = useChatStore();
    const uploadImg = ref(null);
    let msg = ref("");

    function sendTextMsg() {
      if (msg.value !== "") {

        let isGroup = chatStore.chatting.isGroup;

        let payload = {//将消息封装成json格式
          avatar: chatStore.chatting.avatar,
          message: msg.value,
          isGroup: chatStore.chatting.isGroup,
          receiver: chatStore.chatting.sender,//正在对话的用户即为接收者
          sender: getUserNameFromToken(),
          groupId: isGroup ? chatStore.chatting.groupId : "",
          conversationName: isGroup ? chatStore.chatting.conversationName : getNickNameFromToken(),
          senderNickname: getNickNameFromToken(),
          firstMsg: getNickNameFromToken() + ":" + msg.value,
          messageType: globalConfig.message.type.raw_text,
        };

        msg.value = "";

        let wsMsg = new WebSocketMessage(globalConfig.ws.message_event.chat, payload);
        chatStore.sendMessage(wsMsg);
        chatStore.renderSideBarMsgList(payload, isGroup);//渲染列表

      } else {
        infoTips(LANG.CHAT.BLANK_MSG);
      }
    }

    function handleExceed(fileList) {//直接上传文件
      submit(fileList[0]);
    }

    function beforeUpload(file) {
      if (file.type !== "image/png" && file.type !== "image/jpeg" && file.type !== "image/gif") {//仅允许gif jpg png
        errorTips("仅允许 gif/jpg/png 格式的图片")
        return false
      } else if (file.size / 1024 / 1024 > 5) {//小于5M
        errorTips("仅允许允许上传5MB以下的图片")
        return false
      }
    }


    function uploadHandler(event) {
      submit(event.file);
    }

    function submit(file) {
      convertImgToBase64(file, (base64Str) => {
        console.log(event.file)
        let isGroup = chatStore.chatting.isGroup;
        let payload = {//将消息封装成json格式
          avatar: chatStore.chatting.avatar,
          message: base64Str,
          isGroup: chatStore.chatting.isGroup,
          receiver: chatStore.chatting.sender,//正在对话的用户即为接收者
          sender: getUserNameFromToken(),
          groupId: isGroup ? chatStore.chatting.groupId : "",
          conversationName: isGroup ? chatStore.chatting.conversationName : getNickNameFromToken(),
          senderNickname: getNickNameFromToken(),
          firstMsg: getUserNameFromToken() + ":" + "图片",
          messageType: globalConfig.message.type.img_text,
        };

        let wsMsg = new WebSocketMessage(globalConfig.ws.message_event.chat, payload);

        chatStore.sendMessage(wsMsg);
        chatStore.renderSideBarMsgList(payload, isGroup);//渲染列表
      })
    }

    return {
      msg,
      sendTextMsg,
      uploadHandler,
      handleExceed,
      beforeUpload,
      uploadImg
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