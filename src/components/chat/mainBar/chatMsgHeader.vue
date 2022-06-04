<template>
  <div class="chat-header">
    <h5 class="message-sender text-hidden">{{ temp }}</h5>
    <el-dropdown trigger="click">
      <icon class="chat-set" symbol="icon-set"></icon>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>查看资料</el-dropdown-item>
          <el-dropdown-item>退出该群</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
import Icon from "@/components/common/icon";

export default {
  name: "chatMsgHeader",
  components: {Icon},
  setup() {
    const temp = "半岛小镇养老基地";
    return {
      temp
    }
  }
}
</script>

<style scoped>
.chat-header {
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
}

.chat-set {
  width: 17px;
  height: 17px;
}

.message-sender {
  width: 400px;
}
</style>