<template>
  <div ref="sendBox" class="send-box">
    <!--头像    -->
    <div v-if="!isSelf">
      <img :src="avatar" class="send-avatar">
    </div>
    <div class="send-msg-box">
      <!--名称      -->
      <div ref="sender" class="send-msg-name">{{ sender }}</div>
      <!--消息气泡-->
      <div ref="msgBox" class="send-content-box">
        {{ message }}
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

export default {
  name: "chatSendMsgCard",
  props: {
    sender: String,
    avatar: String,
    nickName: String,
    message: String
  },
  setup(props) {

    let src = "../../../assets/img/avatar/jojo.jpg";

    const userName = getUserNameFromToken();//从token中的payload获取用户名
    const sendBox = ref();
    const msgBox = ref();

    const data = reactive({
      isSelf: props.sender === userName,
      avatar: props.avatar,
      sender: props.nickName,
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
      msgBox
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
  margin-bottom: 5px;
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

.send-content-box-other::after {
  right: 100%;
  border-right-color: #fff;
}

.send-content-box-self::after {
  left: 100%;
  border-left-color: #fff;
}

</style>