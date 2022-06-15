<template>
  <ul class="msg-list">
    <li v-for="msg in sideMessageList" @click="jumpToMessage(msg)">
      <side-msg-card
          :avatar="msg.avatar"
          :message="msg.firstMsg"
          :sender="msg.conversationName"
          :time="msg.time"
      />
    </li>
  </ul>
</template>

<script>
import SideMsgCard from "@/components/chat/sideBar/sideMsgCard";
import '../../../assets/style/chatPage.css';
import {useChatStore} from "@/sotre/chatStore";
import {getUserNameFromToken} from "@/utils/storage";

export default {
  name: "sideBarMsgList",
  components: {
    SideMsgCard
  },
  setup() {

    const chatStore = useChatStore();
    let sideMessageList = chatStore.messageList

    const jumpToMessage = (msg) => {//传递跳转信息
      chatStore.chatting.sender = msg.sender;
      chatStore.chatting.conversationName = msg.conversationName
      chatStore.chatting.isGroup = msg.isGroup;
      chatStore.chatting.avatar = msg.avatar;
      chatStore.sidePage.pageFlag = 0;
    }

    return {
      sideMessageList,
      jumpToMessage
    }
  }
}
</script>

<style scoped>
.msg-list li {
  padding: 17px 20px 17px 15px;
}

.msg-list li:hover {
  background: rgb(242, 242, 242);
}
</style>