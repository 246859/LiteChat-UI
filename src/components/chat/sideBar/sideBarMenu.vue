<template>
  <div class="sideBar-menu border-right-light">
    <ul>
      <!--头像-->
      <li>
        <img alt="头像" class="sideBar-avatar" src="../../../assets/img/avatar/girl.jpg">
      </li>
      <!--消息列表-->
      <li ref="message">
        <icon class="sideBar-icon" symbol="icon-xiaoxi2" @click="colorChange(0)"/>
      </li>
      <!--好友列表-->
      <li ref="friend">
        <icon class="sideBar-icon" symbol="icon-yonghu-yuan" @click="colorChange(1)"></icon>
      </li>
      <!--群聊列表-->
      <li ref="group">
        <icon class="sideBar-icon" symbol="icon-yonghu" @click="colorChange(2)"></icon>
      </li>
      <!--轻享空间-->
      <li ref="liteZone">
        <icon class="sideBar-icon" symbol="icon-pengyouquan" @click="colorChange(3)"></icon>
      </li>

      <!--账号设置-->
      <li class="sideBar-foot-menu">
        <el-dropdown trigger="click">
          <icon class="sideBar-icon" symbol="icon-caidan"></icon>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>安全设置</el-dropdown-item>

              <el-dropdown-item>
                <el-popconfirm
                    cancel-button-text="取消"
                    confirm-button-text="确认"
                    hide-icon
                    title="确认要退出登陆吗?"
                    @confirm="logout"
                >
                  <template #reference>
                   <span style="font-size: 14px">
                     退出登陆
                   </span>
                  </template>
                </el-popconfirm>
              </el-dropdown-item>

            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </li>
    </ul>
  </div>
</template>

<script>
import Icon from "@/components/common/icon";
import '../../../assets/style/common.css';
import {onMounted, ref} from "vue";
import {clearToken, sessionStorage} from "@/utils/storage";
import {useChatStore} from "@/sotre/chatStore";
import {useRouter} from "vue-router";
import {globalConfig} from "@/config/config";
import {logoutService} from "@/view/chat/service/chatService";
import {successTips} from "@/utils/messageTips";
import {LANG} from "@/config/lang";
import {useAuthStore} from "@/sotre/authStore";

export default {
  name: "sideBarMenu",
  components: {Icon},
  setup() {
    const message = ref();
    const friend = ref();
    const group = ref();
    const liteZone = ref();
    const dropdownMenu = ref();
    const chatStore = useChatStore();
    const authStore = useAuthStore();
    const router = useRouter();

    const clickClass = "sideBar-icon-click";

    const menu = [message, friend, group, liteZone];

    function colorChange(index) {//点击元素 变色保留

      menu[index].value.classList.add(clickClass);

      menu.forEach(other => {
        if (other !== menu[index]) {
          other.value.classList.remove(clickClass);
        }
      });

      index === 0 ?
          router.push({name: "chatPage"}) :
          router.push({name: "introduce"});

      chatStore.sidePage.pageFlag = index;

      sessionStorage.setItem(globalConfig.page.side_menu, index);//存入session 刷新时从session中读取
    }

    function logout() {//用户退出登陆
      logoutService().then(res => {
        if (res.data.code === LANG.NET_WORK.STATUS.OK) {
          authStore.clearCache();
          router.push({name: "login"});
          successTips(LANG.AUTH.LOGOUT.OK);
        } else {
          successTips(res.data.msg);
        }
      });
    }

    onMounted(() => {
      let index;
      if ((index = sessionStorage.getItem(globalConfig.page.side_menu)) in globalConfig.page.sideBarMenuField) {
        colorChange(Number.parseInt(index));
      }
    });

    return {
      colorChange,
      message,
      friend,
      group,
      liteZone,
      dropdownMenu,
      logout,
    }
  }
}
</script>

<style scoped>
ul li {
  padding: 20px;
  display: flex;
  justify-content: center;
}

.sideBar-avatar {
  width: 50px;
  height: 50px;
  border-radius: 15%;
}

.sideBar-icon {
  height: 35px;
  width: 35px;
}

.sideBar-icon:hover {
  color: #72afd3;
}

.sideBar-icon-click {
  color: #72afd3;
}

.sideBar-menu {
  height: 840px;
  width: 80px;
  padding: 30px 10px;
}

.sideBar-foot-menu {
  padding-top: 415px;
}

:deep(.el-popconfirm__main) {
  justify-content: center;
}
</style>