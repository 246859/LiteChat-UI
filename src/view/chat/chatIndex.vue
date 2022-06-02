<template>
  <common-page>
    <template v-slot:default>
      <div class="chat-big-box">
        <el-container>
          <el-aside width="400px">

          </el-aside>
          <el-container>
            <el-button type="primary" @click="logout">注销</el-button>
            <el-header style="background: #96fbc4">Header</el-header>
            <el-main>Main</el-main>
            <el-footer height="200px" style="background: aqua">Footer</el-footer>
          </el-container>
        </el-container>
      </div>
    </template>
  </common-page>
</template>

<script>
import CommonPage from "@/components/commonPage";
import '../../assets/style/chatPage.css';
import {useAuthStore} from "@/sotre/authStore";
import {globalConfig} from "@/config/config";
import {useRouter} from "vue-router";
import {LANG} from "@/config/lang";
import {errorTips, successTips} from "@/utils/messageTips";

export default {
  name: "chatIndex",
  components: {CommonPage},
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