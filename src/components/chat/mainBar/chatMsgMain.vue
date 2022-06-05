<template>
  <div>
    <ul @click="add">
      <li v-for="msg in messageList">
        <chat-send-msg-card
            :avatar="msg.avatar"
            :is-self="msg.isSelf"
            :message="msg.message"
            :sender="msg.sender"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import ChatSendMsgCard from "@/components/chat/mainBar/chatSendMsgCard";
import {reactive} from "vue";

export default {
  name: "chatMsgMain",
  components: {ChatSendMsgCard},
  setup() {
    let messageList = reactive([
      {
        avatar: require('../../../assets/img/avatar/jojo.jpg'),
        isSelf: true,
        message: "我的梦想是成为一名秧歌star!",
        sender: "乔鲁诺.乔巴拿"
      },
      {
        avatar: require('../../../assets/img/avatar/jojo.jpg'),
        isSelf: true,
        message: "我的梦想是成为一名秧歌star!",
        sender: "乔鲁诺.乔巴拿"
      },
      {
        avatar: require('../../../assets/img/avatar/jojo.jpg'),
        isSelf: true,
        message: "我的梦想是成为一名秧歌star!",
        sender: "乔鲁诺.乔巴拿"
      },
      {
        avatar: require('../../../assets/img/avatar/jojo.jpg'),
        isSelf: false,
        message: "我的梦想是成为一名秧歌star!",
        sender: "乔鲁诺.乔巴拿"
      },
      {
        avatar: require('../../../assets/img/avatar/jojo.jpg'),
        isSelf: true,
        message: "我的梦想是成为一名秧歌star!",
        sender: "乔鲁诺.乔巴拿"
      },
      {
        avatar: require('../../../assets/img/avatar/jojo.jpg'),
        isSelf: true,
        message: "我的梦想是成为一名秧歌star!",
        sender: "乔鲁诺.乔巴拿"
      },
      {
        avatar: require('../../../assets/img/avatar/jojo.jpg'),
        isSelf: true,
        message: "我的梦想是成为一名秧歌star!",
        sender: "乔鲁诺.乔巴拿"
      },
      {
        avatar: require('../../../assets/img/avatar/jojo.jpg'),
        isSelf: false,
        message: "我的梦想是成为一名秧歌star!",
        sender: "乔鲁诺.乔巴拿"
      },
    ])

    function add() {
      messageList.push({
        avatar: require('../../../assets/img/avatar/jojo.jpg'),
        isSelf: false,
        message: "我的梦想是成为一名秧歌star!",
        sender: "乔鲁诺.乔巴拿"
      });
    }

    return {
      messageList,
      add
    }
  }
}
</script>

<style scoped>
li {
  margin: 10px 0;
}
</style>