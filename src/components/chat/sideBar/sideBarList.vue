<template>
  <div class="sideBar-list border-right-light">
    <div class="border-bottom-light chat-search">
      <el-input
          v-model="searchContent"
          :prefix-icon="Search"
          class="w-50 m-2"
          size="small"
      />
      <el-dropdown trigger="click">
        <icon class="chat-add" symbol="icon-tianjia"></icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>添加好友</el-dropdown-item>
            <el-dropdown-item>添加群聊</el-dropdown-item>
            <el-dropdown-item>创建群聊</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <div class="sideBar-msg-list">
      <el-scrollbar height="840px">
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
      </el-scrollbar>
    </div>

  </div>
</template>

<script>
import ChatMsgCard from "@/components/chat/sideBar/sideMsgCard";
import SideMsgCard from "@/components/chat/sideBar/sideMsgCard";
import {Search} from '@element-plus/icons-vue'
import Icon from "@/components/common/icon";
import "../../../assets/style/common.css";
import {reactive, ref} from "vue";

export default {
  name: "sideBarList",
  components: {SideMsgCard, Icon, ChatMsgCard},
  setup() {
    let searchContent = ref("");
    const sideMessageList = reactive([
      {
        avatar: require('../../../assets/img/avatar/jojo.jpg'),
        sender: '半岛小镇服务器群聊',
        message: '我的梦想是成为一个秧歌star!',
        time: '0:50'
      },
      {
        avatar: require('../../../assets/img/avatar/jojo.jpg'),
        sender: '半岛小镇服务器群聊',
        message: '我的梦想是成为一个秧歌star!',
        time: '0:50'
      },
      {
        avatar: require('../../../assets/img/avatar/jojo.jpg'),
        sender: '半岛小镇服务器群聊',
        message: '我的梦想是成为一个秧歌star!',
        time: '0:50'
      },
      {
        avatar: require('../../../assets/img/avatar/jojo.jpg'),
        sender: '半岛小镇服务器群聊',
        message: '我的梦想是成为一个秧歌star!',
        time: '0:50'
      },
      {
        avatar: require('../../../assets/img/avatar/jojo.jpg'),
        sender: '半岛小镇服务器群聊',
        message: '我的梦想是成为一个秧歌star!',
        time: '0:50'
      },
      {
        avatar: require('../../../assets/img/avatar/jojo.jpg'),
        sender: '半岛小镇服务器群聊',
        message: '我的梦想是成为一个秧歌star!',
        time: '0:50'
      },
      {
        avatar: require('../../../assets/img/avatar/jojo.jpg'),
        sender: '半岛小镇服务器群聊',
        message: '我的梦想是成为一个秧歌star!',
        time: '0:50'
      },
      {
        avatar: require('../../../assets/img/avatar/jojo.jpg'),
        sender: '半岛小镇服务器群聊',
        message: '我的梦想是成为一个秧歌star!',
        time: '0:50'
      },
      {
        avatar: require('../../../assets/img/avatar/jojo.jpg'),
        sender: '半岛小镇服务器群聊',
        message: '我的梦想是成为一个秧歌star!',
        time: '0:50'
      },
      {
        avatar: require('../../../assets/img/avatar/jojo.jpg'),
        sender: '半岛小镇服务器群聊',
        message: '我的梦想是成为一个秧歌star!',
        time: '0:50'
      },
      {
        avatar: require('../../../assets/img/avatar/jojo.jpg'),
        sender: '半岛小镇服务器群聊',
        message: '我的梦想是成为一个秧歌star!',
        time: '0:50'
      },
      {
        avatar: require('../../../assets/img/avatar/jojo.jpg'),
        sender: '半岛小镇服务器群聊',
        message: '我的梦想是成为一个秧歌star!',
        time: '0:50'
      },
      {
        avatar: require('../../../assets/img/avatar/jojo.jpg'),
        sender: '半岛小镇服务器群聊',
        message: '我的梦想是成为一个秧歌star!',
        time: '0:50'
      },
      {
        avatar: require('../../../assets/img/avatar/jojo.jpg'),
        sender: '半岛小镇服务器群聊',
        message: '我的梦想是成为一个秧歌star!',
        time: '0:50'
      },
      {
        avatar: require('../../../assets/img/avatar/jojo.jpg'),
        sender: '半岛小镇服务器群聊',
        message: '我的梦想是成为一个秧歌star!',
        time: '0:50'
      },
      {
        avatar: require('../../../assets/img/avatar/jojo.jpg'),
        sender: '半岛小镇服务器群聊',
        message: '我的梦想是成为一个秧歌star!',
        time: '0:50'
      }, {
        avatar: require('../../../assets/img/avatar/jojo.jpg'),
        sender: '半岛小镇服务器群聊',
        message: '我的梦想是成为一个秧歌star!',
        time: '0:50'
      },
      {
        avatar: require('../../../assets/img/avatar/jojo.jpg'),
        sender: '半岛小镇服务器群聊',
        message: '我的梦想是成为一个秧歌star!',
        time: '0:50'
      }, {
        avatar: require('../../../assets/img/avatar/jojo.jpg'),
        sender: '半岛小镇服务器群聊',
        message: '我的梦想是成为一个秧歌star!',
        time: '0:50'
      },
      {
        avatar: require('../../../assets/img/avatar/jojo.jpg'),
        sender: '半岛小镇服务器群聊',
        message: '我的梦想是成为一个秧歌star!',
        time: '0:50'
      }, {
        avatar: require('../../../assets/img/avatar/jojo.jpg'),
        sender: '半岛小镇服务器群聊',
        message: '我的梦想是成为一个秧歌star!',
        time: '0:50'
      },
      {
        avatar: require('../../../assets/img/avatar/jojo.jpg'),
        sender: '半岛小镇服务器群聊',
        message: '我的梦想是成为一个秧歌star!',
        time: '0:50'
      }, {
        avatar: require('../../../assets/img/avatar/jojo.jpg'),
        sender: '半岛小镇服务器群聊',
        message: '我的梦想是成为一个秧歌star!',
        time: '0:50'
      },
      {
        avatar: require('../../../assets/img/avatar/jojo.jpg'),
        sender: '半岛小镇服务器群聊',
        message: '我的梦想是成为一个秧歌star!',
        time: '0:50'
      }, {
        avatar: require('../../../assets/img/avatar/jojo.jpg'),
        sender: '半岛小镇服务器群聊',
        message: '我的梦想是成为一个秧歌star!',
        time: '0:50'
      },
      {
        avatar: require('../../../assets/img/avatar/jojo.jpg'),
        sender: '半岛小镇服务器群聊',
        message: '我的梦想是成为一个秧歌star!',
        time: '0:50'
      }, {
        avatar: require('../../../assets/img/avatar/jojo.jpg'),
        sender: '半岛小镇服务器群聊',
        message: '我的梦想是成为一个秧歌star!',
        time: '0:50'
      },
      {
        avatar: require('../../../assets/img/avatar/jojo.jpg'),
        sender: '半岛小镇服务器群聊',
        message: '我的梦想是成为一个秧歌star!',
        time: '0:50'
      },
    ]);
    return {
      Search,
      searchContent,
      sideMessageList
    }
  }
}
</script>

<style scoped>
* {
  user-select: none;
}

.sideBar-list {
  /*background: aquamarine;*/
  height: 900px;
  width: 300px;
}

.sideBar-msg-list {
  height: 853px;
}

.sideBar-msg-list :hover {
  cursor: default;
}

.msg-list li {
  padding: 14px 20px 14px 15px;
}

.msg-list li:hover {
  background: rgb(242, 242, 242);
}

.chat-add:hover {
  background: rgb(245, 245, 245);
}

.sideBar-msg-list {
  height: 840px;
}

.sideBar-msg-list :hover {
  cursor: default;
}

.msg-list li {
  padding: 17px 20px 17px 15px;
}

.msg-list li:hover {
  background: rgb(242, 242, 242);
}

.chat-search {
  display: flex;
  align-items: center;
  height: 39px;
  padding: 10px 10px 10px 24px;
}

.chat-add {
  padding: 3px 3px;
  margin: 3px 3px;
  width: 17px;
  height: 17px;
}

.chat-add:hover {
  background: rgb(245, 245, 245);
}

</style>