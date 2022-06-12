<template>
  <div class="obj-box">
    <img :src="avatar" alt="" class="obj-avatar">
    <div class="text-hidden obj-name">{{ name }}</div>
  </div>
</template>

<script>
import {reactive} from "vue";
import '../../../assets/style/common.css';

export default {
  name: "sideObjCard",
  props: {
    avatar: String,
    name: String
  },
  setup(props) {

    const data = reactive({
      avatar: props.avatar,
      name: props.name
    });

    return {
      ...data
    }
  }
}
</script>

<style scoped>
.obj-avatar {
  border-radius: 10%;
  width: 45px;
  height: 45px;
}

.obj-box {
  padding: 20px 20px;
  display: flex;
  align-items: center;
}

.obj-name {
  width: 190px;
  margin-left: 20px;
  font-size: 15px;
}

</style>