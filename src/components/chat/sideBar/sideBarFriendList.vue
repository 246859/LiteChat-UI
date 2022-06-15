<template>
  <ul class="friend-list">
    <li v-for="friend in friendList" class="color-hover-grey" @dblclick="jumpToMessage(friend)">
      <side-obj-card
          :avatar="require('../../../assets/img/avatar/avatar2.png')"
          :name="friend.nickName"
      />
    </li>
  </ul>
</template>

<script>
import '../../../assets/style/chatPage.css';
import SideObjCard from "@/components/chat/sideBar/sideObjCard";
import {reactive, ref} from "vue";
import {getFriendListService} from "@/view/chat/service/chatService";
import {getUserNameFromToken} from "@/utils/storage";
import {useRouter} from "vue-router";
import {useChatStore} from "@/sotre/chatStore";

export default {
  name: "sideBarFriendList",
  components: {SideObjCard},
  setup() {
    const router = useRouter();
    const chatStore = useChatStore();
    let friendList = reactive([]);
    let loading = ref(true);

    //加载好友列表
    getFriendListService(getUserNameFromToken()).then(res => {
      if (res.data.code === 200) {
        friendList.push(...res.data.data);
        loading.value = false;
      }
    }).catch(e => {
      console.log(e)
    });

    const jumpToMessage = (friend) => {//传递跳转信息
      chatStore.chatting.receiver = getUserNameFromToken();
      chatStore.chatting.conversationName = friend.nickName;
      chatStore.chatting.isGroup = false;
      chatStore.chatting.sender = friend.userName;
      chatStore.chatting.groupId = "";
      chatStore.chatting.chattingMsgList.splice(0, chatStore.chatting.chattingMsgList.length);
      chatStore.chatting.avatar = require('../../../assets/img/avatar/avatar2.png');
      chatStore.sidePage.pageFlag = 0;

      //在消息列表中是否已经存在
      let index = chatStore.messageList.findIndex((msg) => {
        return msg.sender === friend.userName;
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
      friendList,
      loading,
      jumpToMessage
    }
  }
}
</script>

<style scoped>
.friend-list {

}
</style>