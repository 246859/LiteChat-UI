<template>
  <common-page>
    <template v-slot:default>
      <div class="chat-big-box fade-in-fwd">
        <!--聊天页面容器 -->
        <el-container>
          <!--聊天左边侧边栏-->

          <el-aside width="400px">
            <chat-side-bar/>
          </el-aside>

          <!--聊天页面右边容器-->
          <el-container>

            <!--聊天页面头部-->
            <el-header class="border-bottom-light chat-header-box gray-box">
              <chat-msg-header/>
            </el-header>

            <el-container>

              <el-container>
                <!--聊天页面聊天消息页面-->
                <el-main class="chat-message-box gray-box">
                  <chat-msg-main/>
                </el-main>

                <!--聊天页面底部-->
                <el-footer class="chat-foot-box border-top-light gray-box" height="200px">
                  <chat-msg-foot/>
                </el-footer>
              </el-container>

              <el-aside
                  class="border-left-light chat-right-sideBar gray-box"
                  width="200px"
              >

              </el-aside>

            </el-container>

          </el-container>

        </el-container>
      </div>
    </template>
  </common-page>
</template>

<script>
import CommonPage from "@/components/common/commonPage";
import '../../assets/style/chatPage.css';
import {useAuthStore} from "@/sotre/authStore";
import {globalConfig} from "@/config/config";
import {useRouter} from "vue-router";
import {LANG} from "@/config/lang";
import {errorTips, successTips} from "@/utils/messageTips";
import chatSideBar from "@/components/chat/sideBar/chatSideBar";
import ChatMsgHeader from "@/components/chat/mainBar/chatMsgHeader";
import ChatMsgFoot from "@/components/chat/mainBar/chatMsgFoot";
import ChatMsgMain from "@/components/chat/mainBar/chatMsgMain";

export default {
  name: "chatIndex",
  components: {
    ChatMsgMain,
    ChatMsgFoot,
    ChatMsgHeader,
    CommonPage,
    chatSideBar
  },
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    function logout() {//用户退出登陆
      authStore.logout().then(res => {
        if (res.data.data && res.data.code === 200) {
          window.localStorage.removeItem(globalConfig.tokenAddress);
          router.push({name: "login"});
          successTips(LANG.AUTH.LOGOUT.OK);
        } else {
          errorTips(LANG.AUTH.LOGOUT.FAIL);
        }
      });
    }

    return {
      logout
    }
  }
}
</script>

<style scoped>
</style>