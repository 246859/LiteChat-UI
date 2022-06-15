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
            <el-dropdown-item @click="add('friend')">添加好友</el-dropdown-item>
            <el-dropdown-item @click="add('group')">添加群聊</el-dropdown-item>
            <el-dropdown-item @click="add('createGroup')">创建群聊</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <!--页面切换-->
    <div class="sideBar-msg-list">
      <el-scrollbar height="840px">
        <side-bar-msg-list v-if="pageFlag === 0"/>
        <side-bar-friend-list v-if="pageFlag === 1"/>
        <side-bar-group-list v-if="pageFlag === 2"/>
      </el-scrollbar>
    </div>
  </div>

  <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      center
  >
    <div class="add-dialog-foot">
      <el-input
          v-model="searchContent"
          :placeholder="dialogPlaceholder"
          :prefix-icon="Search"
          class="w-50 m-2"
          placeholder=""
          size="small"
      />
      <el-button class="add-button" @click="addEvent">
        {{ addButtonContent }}
      </el-button>
    </div>

    <div>

    </div>
  </el-dialog>
</template>

<script>
import {Search} from '@element-plus/icons-vue'
import Icon from "@/components/common/icon";
import "../../../assets/style/common.css";
import {reactive, ref, watch} from "vue";
import SideBarMsgList from "@/components/chat/sideBar/sideBarMsgList";
import '../../../assets/style/chatPage.css';
import SideBarFriendList from "@/components/chat/sideBar/sideBarFriendList";
import SideBarGroupList from "@/components/chat/sideBar/sideBarGroupList";
import {useChatStore} from "@/sotre/chatStore";
import {globalConfig} from "@/config/config";

export default {
  name: "sideBarList",
  components: {
    SideBarGroupList
    , SideBarFriendList, SideBarMsgList, Icon,
  },
  setup() {
    //因最初设计不佳，这里只能采用通过响应式切换侧边栏界面
    const chatStore = useChatStore();
    let pageFlag = ref(Number.parseInt(sessionStorage.getItem(globalConfig.page.side_menu)));
    let searchContent = ref("");
    let addContent = ref("");
    let dialogVisible = ref(false);
    let dialogTitle = ref("");
    let dialogPlaceholder = ref("");
    let addButtonContent = ref("");
    let switchType = "";

    chatStore.$subscribe((mutation, state) => {
      pageFlag.value = state.sidePage.pageFlag;
    });


    function add(type) {
      dialogVisible.value = true;
      switchType = type;
      switch (type) {
        case "friend": {
          dialogTitle.value = "添加好友"
          dialogPlaceholder.value = "输入对方的用户名"
          addButtonContent.value = "查找"
        }
          break;
        case "group": {
          dialogTitle.value = "添加群聊"
          dialogPlaceholder.value = "输入对应的群号"
          addButtonContent.value = "查找"
        }
          break;
        case "createGroup": {
          dialogTitle.value = "创建群聊"
          dialogPlaceholder.value = "输入群聊的名称"
          addButtonContent.value = "创建"
        }
          break;
      }

    }

    function addEvent() {

      switch (switchType) {
        case "friend": {

        }
          break;
        case "group": {

        }
          break;
        case "createGroup": {

        }
          break;
      }

    }

    return {
      Search,
      pageFlag,
      add,
      searchContent,
      addContent,
      dialogVisible,
      dialogTitle,
      dialogPlaceholder,
      addButtonContent,
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


.msg-list li {
  padding: 14px 20px 14px 15px;
}

.msg-list li:hover {
  background: rgb(242, 242, 242);
}

.chat-add:hover {
  background: rgb(245, 245, 245);
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

.add-dialog-foot {
  display: flex;
}

.add-button {
  background: rgb(30, 111, 255);
  color: white;
  margin-left: 10px;
}

.add-button:hover {
  background: rgb(83, 145, 255);
  color: white;
}

:deep(.el-button>span) {
  font-size: 14px;
}

:deep(.el-input__inner) {
  font-size: 13px;
}

</style>