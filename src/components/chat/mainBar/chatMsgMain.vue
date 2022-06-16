<template>
  <el-scrollbar ref="sc" height="640px" @scroll="scroll">
    <ul :key="chatMainKey" ref="chattingMessageListDom">
      <li v-for="msg in chattingMsgList">
        <chat-send-msg-card
            :avatar="require('../../../assets/img/avatar/jojo.jpg')"
            :message="msg.message"
            :nick-name="msg.senderNickname"
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
import {getGroupMsgService, getPrivateMsgService} from "@/view/chat/service/chatService";
import {infoTips} from "@/utils/messageTips";

export default {
  name: "chatMsgMain",
  components: {ChatSendMsgCard},
  setup() {

    const chattingMessageListDom = ref();
    let sc = ref(null);
    let liHeight = 100;//一个li的高度为65
    let lastLength = 0;

    const chatStore = useChatStore();
    let chattingMsgList = chatStore.chatting.chattingMsgList;
    let isGroup = chatStore.chatting.isGroup;
    let page = chatStore.chatRecord.page;
    let lastSender = chatStore.chatting.sender;
    let groupId = chatStore.chatting.groupId;
    let top = chatStore.chatRecord.top;
    let chatMainKey = ref(1);

    //监测全局状态变化
    chatStore.$subscribe((mutation, state) => {

      isGroup = state.chatting.isGroup;
      page = state.chatRecord.page;
      groupId = state.chatting.groupId;
      top = state.chatRecord.top;

      if (lastSender !== state.chatting.sender) {
        loadMsg();
        lastSender = chatStore.chatting.sender;
      }
    });


    onMounted(() => {
      loadMsg();
    })

    function scroll(obj) {//滚轮滑倒顶部加载聊天记录
      //每次向上加载时加载10条聊天记录,一个li的高度为90px,相应的控制滚轮向下滑动900px
      //实际上为查出来多少条聊天记录，滚轮滑动多少 *90px
      if (obj && obj.scrollTop === 0) {
        console.log("到顶部了!-----------------------------------------")
        loadMsg();
      }
    }

    function loadMsg() {
      //聊天记录是否已经到达顶部
      if (!top) {
        if (isGroup) {
          getGroupMsg(groupId, page);
        } else {
          getPrivateMsg(getUserNameFromToken(), chatStore.chatting.sender, page);
        }
      } else {
        infoTips("没有更多聊天记录可以查询");
      }
    }

    //获取私聊消息
    function getPrivateMsg(userName, friendName, page) {
      getPrivateMsgService(userName, friendName, page).then(res => {
        if (res.data.code === 200) {
          processMsg(res.data.data);
        }
      }).catch(err => {
        console.log(err);
      })
    }

    //获取群聊消息
    function getGroupMsg(groupId, page) {
      getGroupMsgService(groupId, page).then(res => {
        if (res.data.code === 200) {
          processMsg(res.data.data);
        }
      }).catch(err => {
        console.log(err);
      })
    }

    //处理消息
    function processMsg(msgList) {
      console.log(msgList)
      let length = msgList.length;
      //如果小于10则下次没有必要再请求聊天记录
      chatStore.chatRecord.top = length < 10;
      chatStore.chatting.chattingMsgList.unshift(...msgList);
      chatMainKey.value++;//获取到聊天记录后必须刷新组件的key值，不然因为虚拟DOM的渲染问题会出现聊天记录渲染紊乱
      chatStore.chatRecord.page++;

    }


    return {
      chattingMsgList,
      chattingMessageListDom,
      scroll,
      sc,
      chatMainKey
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