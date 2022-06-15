<template>
  <ul class="group-list">
    <li v-for="group in groupList" class="color-hover-grey" @dblclick="jumpToMessage(group)">
      <side-obj-card
          :avatar="require('../../../assets/img/avatar/avatar1.png')"
          :name="group.groupName"
      />
    </li>
  </ul>
</template>

<script>
import SideObjCard from "@/components/chat/sideBar/sideObjCard";
import '../../../assets/style/chatPage.css';
import {reactive} from "vue";
import {getGroupListService} from "@/view/chat/service/chatService";
import {useChatStore} from "@/sotre/chatStore";
import {errorTips} from "@/utils/messageTips";
import {getUserNameFromToken} from "@/utils/storage";
import {useRouter} from "vue-router";

export default {
  name: "sideBarGroupList",
  components: {SideObjCard},
  setup() {
    let groupList = reactive([]);
    const router = useRouter();
    const chatStore = useChatStore();

    getGroupListService(getUserNameFromToken()).then(res => {
      if (res.data.code === 200) {
        groupList.push(...res.data.data)
      } else {
        errorTips("群聊列表加载异常");
      }
    }).catch(err => {
      console.log(err)
      errorTips("群聊请求异常");
    });

    const jumpToMessage = (group) => {//传递跳转信息
      chatStore.chatting.receiver = getUserNameFromToken();
      chatStore.chatting.conversationName = group.groupName
      chatStore.chatting.isGroup = true;
      chatStore.chatting.avatar = require('../../../assets/img/avatar/avatar1.png');
      chatStore.chatting.sender = group.groupId;
      chatStore.chatting.groupId = group.groupId;
      chatStore.chatting.chattingMsgList.splice(0, chatStore.chatting.chattingMsgList.length);
      chatStore.sidePage.pageFlag = 0;

      //在消息列表中是否已经存在
      let index = chatStore.messageList.findIndex((msg) => {
        return msg.groupId === group.groupId;
      });


      //如果存在则覆盖，否则添加
      if (index > -1) {
        chatStore.messageList[index] = {...chatStore.chatting};
      } else {
        chatStore.messageList.push({...chatStore.chatting});
      }

      router.push({name: "chatPage"});
    }

    return {
      groupList,
      jumpToMessage
    }
  }
}
</script>

<style scoped>

</style>