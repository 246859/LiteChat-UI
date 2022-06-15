<template>
  <el-scrollbar ref="sc" height="640px" @scroll="scroll">
    <ul ref="chattingMessageListDom">
      <li v-for="msg in chattingMsgList">
        <chat-send-msg-card
            :avatar="require('../../../assets/img/avatar/jojo.jpg')"
            :message="msg.message"
            :nick-name="msg.conversationName"
            :sender="msg.sender"
        />
      </li>
    </ul>
  </el-scrollbar>
</template>

<script>
import ChatSendMsgCard from "@/components/chat/mainBar/chatSendMsgCard";
import {onMounted, reactive, ref} from "vue";
import {useChatStore} from "@/sotre/chatStore";
import {getUserNameFromToken} from "@/utils/storage";

export default {
  name: "chatMsgMain",
  components: {ChatSendMsgCard},
  setup() {

    const chattingMessageListDom = ref();
    let sc = ref(null);

    const chatStore = useChatStore();
    let chattingMsgList = chatStore.chatting.chattingMsgList;


    function scroll(obj) {//滚轮滑倒顶部加载聊天记录
      //每次向上加载时加载10条聊天记录,一个li的高度为90px,相应的控制滚轮向下滑动900px
      //实际上为查出来多少条聊天记录，滚轮滑动多少 *90px
      if (obj && obj.scrollTop === 0) {
        // chattingMsgList.unshift(
        //     {
        //       message: "hhhh",
        //       conversationName: "笑死我了",
        //       sender: "aaa"
        //     },
        //     {
        //       message: "hhhh",
        //       conversationName: "笑死我了",
        //       sender: "aaa"
        //     },
        //     {
        //       message: "hhhh",
        //       conversationName: "笑死我了",
        //       sender: "aaa"
        //     },
        //     {
        //       message: "hhhh",
        //       conversationName: "笑死我了",
        //       sender: "aaa"
        //     },
        //     {
        //       message: "hhhh",
        //       conversationName: "笑死我了",
        //       sender: "aaa"
        //     },
        // )
        // console.log("到顶部了")
        // sc.value.setScrollTop(450)
      }
    }

    return {
      chattingMsgList,
      chattingMessageListDom,
      scroll,
      sc
    }
  }
}
</script>

<style scoped>
li {
  padding: 13px 0;
}

ul {
  padding: 20px;
}
</style>