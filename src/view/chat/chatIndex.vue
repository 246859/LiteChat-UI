<template>
  <common-page>
    <template v-slot:default>
      <div class="chat-big-box">
        <el-container>
          <el-aside width="400px">

          </el-aside>
          <el-container>
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
export default {
  name: "chatIndex",
  components: {CommonPage}
}
</script>

<style scoped>
</style>