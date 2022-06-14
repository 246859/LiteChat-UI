<template>
  <div class="chat-header">
    <h5 class="message-sender text-hidden">{{ conversationName }}</h5>
    <el-dropdown trigger="click">
      <icon class="chat-set" symbol="icon-set"></icon>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>查看资料</el-dropdown-item>
          <el-dropdown-item>关闭会话</el-dropdown-item>
          <el-dropdown-item>{{ isGroup ? "退出该群" : "删除好友" }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
import Icon from "@/components/common/icon";
import {useChatStore} from "@/sotre/chatStore";
import {onMounted, ref} from "vue";
import {globalConfig} from "@/config/config";

export default {
  name: "chatMsgHeader",
  components: {Icon},
  setup() {
    const chatStore = useChatStore();
    //缓存会话名称
    let conversationName = ref(chatStore.chatting.conversationName);
    let isGroup = ref(chatStore.chatting.isGroup);
    let receiver = ref(chatStore.chatting.receiver);


    let chatting = sessionStorage.getItem(globalConfig.page.chatting);
    console.log(chatting)

    if (chatting) {
      chatting = JSON.parse(chatting);//将缓存的字符串读取json对象
      //重新读取页面缓存的数据
      conversationName.value = chatStore.chatting.conversationName = chatting.conversationName;
      isGroup.value = chatStore.chatting.isGroup = chatting.isGroup;
    }

    //订阅state变化
    chatStore.$subscribe((mutation, state) => {
      conversationName.value = state.chatting.conversationName;
      isGroup.value = state.chatting.isGroup;
    });

    return {
      conversationName,
      isGroup
    }
  }
}
</script>

<style scoped>
.chat-header {
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
}

.chat-set {
  width: 17px;
  height: 17px;
}

.message-sender {
  width: 400px;
}
</style>