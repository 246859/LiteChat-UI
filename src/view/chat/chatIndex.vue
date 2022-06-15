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
          <el-container class="border-left-light">
            <router-view/>
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
import {useRouter} from "vue-router";
import {onMounted} from "vue";
import {useChatStore} from "@/sotre/chatStore";
import {globalConfig} from "@/config/config";
import chatSideBar from "@/components/chat/sideBar/chatSideBar";
import {io} from "socket.io-client";

export default {
  name: "chatIndex",
  components: {
    CommonPage,
    chatSideBar,
  },
  setup() {
    const authStore = useAuthStore();
    const chatStore = useChatStore();
    const router = useRouter();

    //连接ws服务器
    chatStore.connect();


    return {}
  }
}
</script>

<style scoped>
</style>