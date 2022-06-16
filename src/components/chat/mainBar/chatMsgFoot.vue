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
            :before-upload="imgBeforeUpload"
            :http-request="imgUploadHandler"
            :limit="1"
            :on-exceed="imgHandleExceed"
            :show-file-list="false"

        >
          <icon class="foot-icon" symbol="icon-icon"/>
        </el-upload>
      </li>
      <li class="color-hover-deep-grey">
        <el-upload
            ref="uploadFile"
            :before-upload="fileBeforeUpload"
            :http-request="fileUploadHandler"
            :limit="1"
            :on-exceed="fileHandleExceed"
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
import {convertImgToBase64, downFileFromBlob} from "@/utils/utils";
import {downloadFile, uploadFile} from "@/view/chat/service/chatService";

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

    function imgHandleExceed(fileList) {//直接上传文件
      submit(fileList[0]);
    }

    function imgBeforeUpload(file) {
      if (file.type !== "image/png" && file.type !== "image/jpeg" && file.type !== "image/gif") {//仅允许gif jpg png
        errorTips("仅允许 gif/jpg/png 格式的图片")
        return false
      } else if (file.size / 1024 / 1024 > 5) {//小于5M
        errorTips("仅允许允许上传5MB以下的图片")
        return false
      }
    }


    function imgUploadHandler(event) {
      submitImg(event.file);
    }

    function submitImg(file) {
      convertImgToBase64(file, (base64Str) => {
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

    function fileBeforeUpload(file) {
      if (file.size / 1024 / 1024 > 10) {//小于5M
        errorTips("仅允许允许上传10MB以下的文件")
        return false
      }
    }

    function fileHandleExceed(fileList) {
      submitFile(fileList[0]);
    }

    function fileUploadHandler(event) {
      submitFile(event.file);
    }

    function submitFile(file) {

      console.log(file)
      let formData = new FormData();
      formData.append("file", file);
      formData.append("user", getUserNameFromToken())
      uploadFile(formData).then(res => {
        console.log("文件上传----")
        console.log(res)
        if (res.data.code === 200) {
          let newName = res.data.data;
          let fileName = file.name;

          let isGroup = chatStore.chatting.isGroup;
          let payload = {//将消息封装成json格式
            avatar: chatStore.chatting.avatar,
            message: newName,
            fileName: fileName,
            isGroup: chatStore.chatting.isGroup,
            receiver: chatStore.chatting.sender,//正在对话的用户即为接收者
            sender: getUserNameFromToken(),
            groupId: isGroup ? chatStore.chatting.groupId : "",
            conversationName: isGroup ? chatStore.chatting.conversationName : getNickNameFromToken(),
            senderNickname: getNickNameFromToken(),
            firstMsg: getUserNameFromToken() + ":" + "文件",
            messageType: globalConfig.message.type.file_text,
          };

          let wsMsg = new WebSocketMessage(globalConfig.ws.message_event.chat, payload);

          chatStore.sendMessage(wsMsg);
          chatStore.renderSideBarMsgList(payload, isGroup);//渲染列表

        }
      });


    }

    return {
      msg,
      sendTextMsg,
      imgHandleExceed,
      imgBeforeUpload,
      imgUploadHandler,
      fileBeforeUpload,
      fileHandleExceed,
      fileUploadHandler,
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