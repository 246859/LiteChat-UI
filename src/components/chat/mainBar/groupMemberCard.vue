<template>
  <div class="group-member-card">
    <img :src="avatar" alt="" class="small-avatar">
    <div class="group-member-name text-hidden">{{ name }}</div>
    <icon :class="`group-member-icon ${role<3?role===1?'creator-color':'manager-color':''}`"
          symbol="icon-chengyuan"></icon>
  </div>
</template>

<script>
import Icon from "@/components/common/icon";
import {reactive} from "vue";

export default {
  name: "groupMemberCard",
  components: {Icon},
  props: {
    avatar: String,
    name: String,
    role: Number
  },
  setup(props) {

    const data = reactive({
      avatar: props.avatar,
      name: props.name,
      role: props.role
    });

    return {
      ...data
    }
  }
}
</script>

<style scoped>
.group-member-card {
  display: flex;
  align-items: center;
}

.group-member-icon {
  width: 20px;
  height: 20px;
  color: rgb(90, 156, 248);
}

.small-avatar {
  width: 30px;
  height: 30px;
  border-radius: 15%;
}

.group-member-name {
  width: 110px;
  font-size: 14px;
  margin: 0 10px;
  color: rgb(131, 131, 131);
}

.creator-color {
  color: gold;
}

.manager-color {
  color: rgb(142, 219, 160);
}
</style>