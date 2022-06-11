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
        <el-scrollbar ref="sc" class="gray-box" height="640px">
          <el-main class="chat-message-box">
            <chat-msg-main/>
          </el-main>
        </el-scrollbar>

        <!--聊天页面底部-->
        <el-footer class="chat-foot-box border-top-light gray-box" height="200px">
          <chat-msg-foot/>
        </el-footer>
      </el-container>

      <!--群聊成员列表-->
      <el-aside v-if="false"
                class="border-left-light chat-right-sideBar gray-box"
                width="200px">

        <group-member-list/>

      </el-aside>

    </el-container>

  </el-container>
</template>

<script>
import ChatMsgMain from "@/components/chat/mainBar/chatMsgMain";
import ChatMsgFoot from "@/components/chat/mainBar/chatMsgFoot";
import ChatMsgHeader from "@/components/chat/mainBar/chatMsgHeader";
import GroupMemberList from "@/components/chat/mainBar/groupMemberList";

export default {
  name: "chatPage",
  components: {
    ChatMsgMain,
    ChatMsgFoot,
    ChatMsgHeader,
    GroupMemberList,
  }
}
</script>

<style scoped>

</style>