<template>
  <div class="chat-header">
    <h5 class="message-sender text-hidden">{{ conversationName }}</h5>
    <el-dropdown trigger="click">
      <icon class="chat-set" symbol="icon-set"></icon>
      <template #dropdown>
        <el-dropdown-menu>
          <!--          <el-dropdown-item>查看资料</el-dropdown-item>-->
          <el-dropdown-item @click="closeConversation">关闭会话</el-dropdown-item>
          <el-dropdown-item @click="deleteConversation(isGroup)">{{ isGroup ? "退出该群" : "删除好友" }}</el-dropdown-item>
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
import router from "@/router/router";
import {getUserNameFromToken} from "@/utils/storage";
import {deleteFriendService, deleteGroupService} from "@/view/chat/service/chatService";
import {errorTips, successTips} from "@/utils/messageTips";

export default {
  name: "chatMsgHeader",
  components: {Icon},
  setup() {
    const chatStore = useChatStore();
    //缓存会话名称
    let conversationName = ref(chatStore.chatting.conversationName);
    let isGroup = ref(chatStore.chatting.isGroup);
    let sender = ref(chatStore.chatting.sender);
    let userName = getUserNameFromToken();


    let chatting = sessionStorage.getItem(globalConfig.page.chatting);

    if (chatting) {
      chatting = JSON.parse(chatting);//将缓存的字符串读取json对象
      //重新读取页面缓存的数据
      conversationName.value = chatStore.chatting.conversationName = chatting.conversationName;
      isGroup.value = chatStore.chatting.isGroup = chatting.isGroup;
      chatStore.chatting.sender = chatting.sender;
    }

    //订阅state变化
    chatStore.$subscribe((mutation, state) => {
      conversationName.value = state.chatting.conversationName;
      isGroup.value = state.chatting.isGroup;
    });

    function closeConversation() {//关闭会话
      router.push({name: "introduce"});
    }

    function deleteConversation(flag) {
      if (flag) {//判断是否是群聊
        deleteGroupService(userName, sender.value).then(res => {
          if (res.data.code === 200 && res.data.isSuccess) {
            successTips(res.data.msg);
            closeConversation();
          } else {
            errorTips(res.data.msg);
          }
        })
      } else {
        deleteFriendService(userName, sender.value).then(res => {
          if (res.data.code === 200 && res.data.isSuccess) {
            successTips(res.data.msg);
            closeConversation();
          } else {
            errorTips(res.data.msg);
          }
        }).catch(err => {
          console.log(err)
        });
      }
    }

    return {
      conversationName,
      isGroup,
      closeConversation,
      deleteConversation
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