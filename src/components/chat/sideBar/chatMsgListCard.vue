<template>
  <div class="msg-card">
    <img alt="消息头像" class="msg-avatar" src="../../../assets/img/avatar/jojo.jpg">
    <div class="msg-content">
      <div class="msg-title">
        <p class="msg-name text-hidden">半岛小镇养QAQ老基地</p>
        <p class="msg-sender text-hidden">wyh:什么牛马，我看到个很牛逼的东西</p>
      </div>
      <p class="msg-time">11:53</p>
    </div>
  </div>
</template>

<script>
import "../../../assets/style/common.css";

export default {
  name: "chatMsgCard"
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