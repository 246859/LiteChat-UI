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
import {useRouter} from "vue-router";

export default {
  name: "sideBarMsgList",
  components: {
    SideMsgCard
  },
  setup() {

    const chatStore = useChatStore();
    const router = useRouter();
    let sideMessageList = chatStore.messageList

    const jumpToMessage = (msg) => {//传递跳转信息

      let isGroup = msg.isGroup;
      if (isGroup ? msg.groupId === chatStore.chatting.groupId : msg.sender === chatStore.chatting.sender) {//判断点击的对象是否为正在会话的对象,避免重复请求
        if (router.currentRoute.value.path === '/chatPage') return;
      }

      chatStore.chatting.sender = msg.sender;
      chatStore.chatting.conversationName = msg.conversationName
      chatStore.chatting.isGroup = msg.isGroup;
      chatStore.chatting.avatar = msg.avatar;
      chatStore.chatting.groupId = msg.groupId;
      chatStore.sidePage.pageFlag = 0;
      chatStore.chatting.chattingMsgList.splice(0, chatStore.chatting.chattingMsgList.length);
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