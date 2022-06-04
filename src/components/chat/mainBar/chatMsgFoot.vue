<template>
  <!--工具栏-->
  <div>
    <ul>
      <li class="color-hover-grey">
        <icon class="foot-icon" symbol="icon-xiaolian"/>
      </li>
      <li class="color-hover-grey">
        <icon class="foot-icon" symbol="icon-icon"/>
      </li>
      <li class="color-hover-grey">
        <icon class="foot-icon" symbol="icon-wenjian"/>
      </li>
    </ul>
  </div>
  <!--文本域-->
  <div>
    <textarea
        v-model="msg"
        class="gray-box input-box"
    />
  </div>
  <!--底部功能-->

  <div class="foot-button">
    <el-button class="button-size" type="primary">发送</el-button>
  </div>
</template>

<script>
import Icon from "@/components/common/icon";
import "../../../assets/style/common.css";
import {ref} from "vue";

export default {
  name: "chatMsgFoot",
  components: {Icon},
  setup() {
    let msg = ref("");
    return {
      msg
    }
  }
}
</script>

<style scoped>
.foot-icon {
  width: 25px;
  height: 25px;
}

ul {
  display: flex;
  padding: 6px 0;
}

li {
  margin: 0 20px 0 0;
  padding: 5px;
}

.foot-button {
  padding: 2px 0;
  float: right;
}

:deep(.el-button>span) {
  font-size: 12px;
}

:deep(.el-textarea__inner) {
  background: rgb(245, 246, 247);
  box-shadow: none;
}

.button-size {
  height: 25px;
  width: 50px;
}

.input-box {
  height: 110px;
}
</style>