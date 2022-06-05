<template>
  <div class="msg-card">
    <img :src="avatar" alt="消息头像" class="msg-avatar">
    <div class="msg-content">
      <div class="msg-title">
        <p class="msg-name text-hidden">{{ sender }}</p>
        <p class="msg-sender text-hidden">{{ message }}</p>
      </div>
      <p class="msg-time">{{ time }}</p>
    </div>
  </div>
</template>

<script>
import "../../../assets/style/common.css";
import {reactive} from "vue";

export default {
  name: "sideMessageList",
  props: {
    avatar: String,
    sender: String,
    message: String,
    time: String
  },
  setup(props) {
    const data = reactive({
      avatar: props.avatar,
      sender: props.sender,
      message: props.message,
      time: props.time
    });

    return {
      ...data
    }
  }
}
</script>

<style scoped>
.msg-card {
  display: flex;
  align-items: center;
}

.msg-avatar {
  width: 50px;
  height: 50px;
  border-radius: 15%;
  margin: 0 10px;
}

.msg-content {
  display: flex;
}

.msg-name {
  font-size: 16px;
  font-weight: 400;
}

.msg-title {
  width: 145px;
}

.msg-time {
  padding-left: 5px;
  font-size: 14px;
  color: rgb(127, 127, 127);
}

.msg-sender {
  font-size: 14px;
  color: rgb(127, 127, 127);
}
</style>