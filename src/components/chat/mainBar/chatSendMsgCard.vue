<template>
  <div ref="sendBox" class="send-box">
    <!--头像    -->
    <div v-if="!isSelf">
      <img :src="avatar" class="send-avatar">
    </div>
    <div class="send-msg-box">
      <!--名称      -->
      <div ref="sender" class="send-msg-name">{{ senderNickName }}</div>
      <!--消息气泡-->
      <div ref="msgBox">
        <span v-if="isRaw" class="send-content-box">{{ message }}</span>
        <img v-if="isImg" :src="message" alt="图片消息" class="img-msg">
      </div>

    </div>
    <div v-if="isSelf">
      <img :src="avatar" class="send-avatar">
    </div>
  </div>
</template>

<script>
import {onMounted, reactive, ref} from "vue";
import {getUserNameFromToken} from "@/utils/storage";
import {globalConfig} from "@/config/config";

export default {
  name: "chatSendMsgCard",
  props: {
    sender: String,
    avatar: String,
    nickName: String,
    message: String,
    messageType: String,
  },
  setup(props) {

    let src = "../../../assets/img/avatar/jojo.jpg";

    const userName = getUserNameFromToken();//从token中的payload获取用户名
    const sendBox = ref();
    const msgBox = ref();
    const isRaw = ref(props.messageType === globalConfig.message.type.raw_text);
    const isImg = ref(props.messageType === globalConfig.message.type.img_text);

    const data = reactive({
      isSelf: props.sender === userName,
      avatar: props.avatar,
      senderNickName: props.nickName,
      message: props.message
    });


    onMounted(() => {
      if (data.isSelf) {
        sendBox.value.classList.add('self');
        msgBox.value.classList.add('send-content-box-self');
      } else {
        msgBox.value.classList.add('send-content-box-other');
      }
    });

    return {
      ...data,
      sendBox,
      msgBox,
      isRaw,
      isImg
    }
  }
}
</script>

<style scoped>
.send-avatar {
  width: 44px;
  height: 44px;
  border-radius: 15%;
}

.send-box {
  display: flex;
}

.self {
  justify-content: flex-end;
}

.self .send-msg-name {
  text-align: right;
}

.send-msg-box {
  margin: 0 10px;
}

.send-msg-name {
  font-size: 14px;
  margin-bottom: 12px;
  color: rgb(122, 123, 123);
}

.send-content-box {
  font-size: 15px;
  padding: 12px;
  background: white;
  border-radius: 5px 5px 5px 5px;
  position: relative;
  word-break: break-all;
}

.send-content-box::after {
  content: " ";
  position: absolute;
  top: 10px;
  margin-top: -2px;
  border: 7px solid transparent;
}

.img-msg {
  width: 100px;
  height: 100px;
  border-radius: 5%;
}

.send-content-box-other::after {
  right: 100%;
  border-right-color: #fff;
}

.send-content-box-self::after {
  left: 100%;
  border-left-color: #fff;
}

</style>