<template>
  <!--聊天页面右边容器-->
  <el-container>

    <!--聊天页面头部-->
    <el-header class="border-bottom-light chat-header-box gray-box">
      <chat-msg-header/>
    </el-header>

    <el-container>

      <el-container>
        <!--聊天页面聊天消息页面-->

        <el-main class="chat-message-box gray-box">
          <chat-msg-main/>
        </el-main>

        <!--聊天页面底部-->
        <el-footer class="chat-foot-box border-top-light gray-box" height="200px">
          <chat-msg-foot/>
        </el-footer>
      </el-container>

      <!--群聊成员列表-->
      <el-aside v-if="isGroup"
                class="border-left-light chat-right-sideBar gray-box"
                width="200px">

        <group-member-list :group-id="receiver"/>

      </el-aside>

    </el-container>

  </el-container>
</template>

<script>
import ChatMsgMain from "@/components/chat/mainBar/chatMsgMain";
import ChatMsgFoot from "@/components/chat/mainBar/chatMsgFoot";
import ChatMsgHeader from "@/components/chat/mainBar/chatMsgHeader";
import GroupMemberList from "@/components/chat/mainBar/groupMemberList";
import {useChatStore} from "@/sotre/chatStore";
import {onMounted, ref} from "vue";
import {globalConfig} from "@/config/config";

export default {
  name: "chatPage",
  components: {
    ChatMsgMain,
    ChatMsgFoot,
    ChatMsgHeader,
    GroupMemberList,
  },
  setup() {
    const chatStore = useChatStore();
    let sc = ref(null);
    //缓存isGroup标志
    let isGroup = ref(chatStore.chatting.isGroup);
    let receiver = ref(chatStore.chatting.receiver);

    let chatting = sessionStorage.getItem(globalConfig.page.chatting);

    if (chatting) {
      chatting = JSON.parse(chatting);
      isGroup.value = chatStore.chatting.isGroup = chatting.isGroup;
      receiver.value = chatStore.chatting.receiver = chatting.receiver;
    }

    //订阅state判断正在进行的会话
    chatStore.$subscribe((mutation, state) => {
      if (receiver !== state.chatting.receiver) {
        receiver.value = chatStore.chatting.receiver
        isGroup.value = state.chatting.isGroup;
      }
    });

    return {
      isGroup,
      receiver,
      sc,
    }

  }
}
</script>

<style scoped>
:deep(.el-main) {
  padding: 0;
}
</style>