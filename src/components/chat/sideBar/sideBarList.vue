<template>
  <div class="sideBar-list border-right-light">
    <div class="border-bottom-light chat-search">
      <span class="nickName text-hidden">{{ `${nickName}` }}</span>
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
        <side-bar-msg-list v-if="pageFlag === 0" :key="chatKey"/>
        <side-bar-friend-list v-if="pageFlag === 1" :key="friendKey"/>
        <side-bar-group-list v-if="pageFlag === 2" :key="groupKey"/>
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
          v-model="addContent"
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
import {addFriendService, addGroupService, createGroupService} from "@/view/chat/service/chatService";
import {errorTips, infoTips, successTips} from "@/utils/messageTips";
import {LANG} from "@/config/lang";
import {getNickNameFromToken, getUserNameFromToken} from "@/utils/storage";

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

    let groupKey = ref(1);
    let friendKey = ref(1);
    let chatKey = ref(1);

    let userName = ref(getUserNameFromToken());
    let nickName = ref(getNickNameFromToken());

    chatStore.$subscribe((mutation, state) => {
      pageFlag.value = state.sidePage.pageFlag;
    });


    function add(type) {//根据下拉菜单判断
      dialogVisible.value = true;
      switchType = type;
      switch (type) {
        case "friend": {
          dialogTitle.value = "添加好友"
          dialogPlaceholder.value = "输入对方的用户名"
          addButtonContent.value = "添加"
        }
          break;
        case "group": {
          dialogTitle.value = "添加群聊"
          dialogPlaceholder.value = "输入对应的群号"
          addButtonContent.value = "添加"
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

      if (addContent.value === "") {//非空校验
        infoTips(LANG.FORM.NO_BLANK)
        return;
      }

      let userName = getUserNameFromToken();
      let target = addContent.value;

      switch (switchType) {
        case "friend": {
          addFriend(userName, target);
        }
          break;
        case "group": {
          addGroup(userName, target);
        }
          break;
        case "createGroup": {
          createGroup(userName, target);
        }
          break;
      }
      addContent.value = ""
    }

    //添加好友
    function addFriend(userName, friendName) {
      addFriendService(userName, friendName).then(res => {
        if (res.data.code === 200 && res.data.isSuccess) {
          successTips(res.data.msg);
          dialogVisible.value = false;
          friendKey.value++;
        } else {
          errorTips(res.data.msg);
        }
      }).catch(err => {
        console.log(err);
      })
    }

    //添加群聊
    function addGroup(userName, groupId) {
      addGroupService(userName, groupId).then(res => {
        if (res.data.code === 200 && res.data.isSuccess) {
          successTips(res.data.msg);
          dialogVisible.value = false;
          groupKey.value++;
        } else {
          errorTips(res.data.msg);
        }
      }).catch(err => {
        console.log(err);
      });
    }

    //创建群聊
    function createGroup(userName, groupName) {
      createGroupService(userName, groupName).then(res => {
        if (res.data.code === 200 && res.data.isSuccess) {
          successTips(res.data.msg);
          dialogVisible.value = false;
          groupKey.value++;
        } else {
          errorTips(res.data.msg);
        }
      }).catch(error => {
        console.log(error);
      });
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
      addEvent,
      groupKey,
      friendKey,
      chatKey,
      userName,
      nickName
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
  justify-content: space-between;
  align-items: center;
  height: 39px;
  padding: 10px 10px 10px 25px;
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

.user-info {
  display: flex;
  flex-wrap: wrap;
  width: 200px;
}

.nickName {
  color: #666666;
  font-size: 20px;
  width: 200px;
}

.userName {
  font-size: 12px;
  width: 200px;
}

</style>