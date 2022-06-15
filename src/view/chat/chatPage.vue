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

        <group-member-list :group-id="isGroup?groupId:sender"/>

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
import {getUserNameFromToken} from "@/utils/storage";

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
    let sender = ref(chatStore.chatting.sender);
    let groupId = ref(chatStore.chatting.groupId);

    let chatting = sessionStorage.getItem(globalConfig.page.chatting);

    console.log(chatting)

    if (chatting) {
      chatting = JSON.parse(chatting);
      isGroup.value = chatStore.chatting.isGroup = chatting.isGroup;
      sender.value = chatStore.chatting.sender = chatting.sender;
      groupId.value = chatStore.chatting.groupId = chatting.groupId;
    }

    //订阅state判断正在进行的会话
    chatStore.$subscribe((mutation, state) => {
      if (sender !== state.chatting.sender) {
        sender.value = chatStore.chatting.sender
        isGroup.value = state.chatting.isGroup;
        groupId.value = state.chatting.groupId;
      }
    });

    return {
      isGroup,
      sender,
      sc,
      groupId
    }

  }
}
</script>

<style scoped>
:deep(.el-main) {
  padding: 0;
}
</style>