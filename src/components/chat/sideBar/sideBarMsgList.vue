<template>
  <ul class="msg-list">
    <li v-for="msg in sideMessageList">
      <side-msg-card
          :avatar="msg.avatar"
          :message="msg.message"
          :sender="msg.sender"
          :time="msg.time"
      />
    </li>
  </ul>
</template>

<script>
import SideMsgCard from "@/components/chat/sideBar/sideMsgCard";
import '../../../assets/style/chatPage.css';

export default {
  name: "sideBarMsgList",
  components: {
    SideMsgCard
  },
  setup() {
    const sideMessageList = [
      {
        avatar: require('../../../assets/img/avatar/jojo.jpg'),
        message: 'hhh',
        sender: 'wyh',
        time: '0:53'
      },
      {
        avatar: require('../../../assets/img/avatar/jojo.jpg'),
        message: 'hhh',
        sender: 'wyh',
        time: '0:53'
      },
      {
        avatar: require('../../../assets/img/avatar/jojo.jpg'),
        message: 'hhh',
        sender: 'wyh',
        time: '0:53'
      },
    ]
    return {
      sideMessageList
    }
  }
}
</script>

<style scoped>
.msg-list li {
  padding: 17px 20px 17px 15px;
}

.msg-list li:hover {
  background: rgb(242, 242, 242);
}
</style>