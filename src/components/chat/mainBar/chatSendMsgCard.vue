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
        <span v-if="isFile" class="file-msg-card" @click="downLoadFile">
          <img :src="require('../../../assets/img/avatar/file.svg')" alt="文件" class="file-card">
          <p>{{ `文件名:${fileName}` }}</p>
        </span>

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
import {downloadFile, getOriginalNameService} from "@/view/chat/service/chatService";
import {downFileFromBlob} from "@/utils/utils";

export default {
  name: "chatSendMsgCard",
  props: {
    sender: String,
    avatar: String,
    nickName: String,
    message: String,
    messageType: String,
    fileName: String
  },
  setup(props) {

    let src = "../../../assets/img/avatar/jojo.jpg";

    const userName = getUserNameFromToken();//从token中的payload获取用户名
    const sendBox = ref();
    const msgBox = ref();
    const isRaw = ref(props.messageType === globalConfig.message.type.raw_text);
    const isImg = ref(props.messageType === globalConfig.message.type.img_text);
    const isFile = ref(props.messageType === globalConfig.message.type.file_text);
    let fileName = ref(props.fileName);

    const data = reactive({
      isSelf: props.sender === userName,
      avatar: props.avatar,
      senderNickName: props.nickName,
      message: props.message,
    });

    //代码写的太烂，只能在这里获取真实文件名
    function getOriginalName() {
      getOriginalNameService(data.message).then(res => {
        if (res.data.code === 200) {
          fileName.value = res.data.data;
        }
      }).catch(err => {
        console.log(err)
      });
    }


    onMounted(() => {
      if (data.isSelf) {
        sendBox.value.classList.add('self');
        msgBox.value.classList.add('send-content-box-self');
      } else {
        msgBox.value.classList.add('send-content-box-other');
      }
      if (isFile.value) {//仅仅当为文件时请求原始文件名
        getOriginalName()
      }
    });

    function downLoadFile() {
      downloadFile(props.message).then(res => {
        downFileFromBlob(res.data, fileName.value);
      }).catch(err => {
        console.log(err);
      });
    }

    return {
      ...data,
      sendBox,
      msgBox,
      isRaw,
      isImg,
      isFile,
      downLoadFile,
      fileName
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

.file-msg-card p {
  text-align: center;
  color: #666666;
  font-size: 13px;
}

.file-msg-card:hover {
  cursor: pointer;
}

.file-card {
  width: 100px;
  height: 100px;
  border-radius: 5%;
}

</style>