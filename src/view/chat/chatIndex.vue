<template>
  <common-page>
    <template v-slot:default>
      <div class="chat-big-box">
        <!--聊天页面容器 -->
        <el-container style="border-radius: 5%">
          <!--聊天左边侧边栏-->
          <el-aside width="400px">
            <chat-side-bar/>
          </el-aside>
          <!--聊天页面右边容器-->
          <el-container>
            <!--聊天右边页面头部-->
            <el-header>
              Header
            </el-header>
            <!--聊天右边页面聊天消息页面-->
            <el-main>Main</el-main>
            <!--聊天右边页面底部消息输入框-->
            <el-footer height="200px">
              Footer
            </el-footer>

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

export default {
  name: "chatIndex",
  components: {
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