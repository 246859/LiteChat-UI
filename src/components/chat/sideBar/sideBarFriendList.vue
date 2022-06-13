<template>
  <ul class="friend-list">
    <li v-for="friend in friendList" class="color-hover-grey" @click="jumpToMessage(friend)">
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
      chatStore.chatting.receiver = friend.userName;
      chatStore.chatting.conversationName = friend.nickName;
      chatStore.chatting.isGroup = false;
      chatStore.chatting.avatar = require("../../../assets/img/avatar/avatar1.png");
      chatStore.sidePage.pageFlag = 0;
      chatStore.messageList.push({...chatStore.chatting});
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