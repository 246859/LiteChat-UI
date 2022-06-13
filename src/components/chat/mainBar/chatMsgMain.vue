<template>
  <div>
    <ul>
      <li v-for="msg in chattingMsgList">
        <chat-send-msg-card
            :avatar="require('../../../assets/img/avatar/jojo.jpg')"
            :message="msg.message"
            :nick-name="msg.sendNickName"
            :sender="msg.senderName"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import ChatSendMsgCard from "@/components/chat/mainBar/chatSendMsgCard";
import {reactive} from "vue";
import {useChatStore} from "@/sotre/chatStore";
import {getUserNameFromToken} from "@/utils/storage";

export default {
  name: "chatMsgMain",
  components: {ChatSendMsgCard},
  setup() {

    const chatStore = useChatStore();
    let chattingMsgList = chatStore.chatting.chattingMsgList;

    return {
      chattingMsgList
    }
  }
}
</script>

<style scoped>
li {
  margin: 10px 0;
}
</style>