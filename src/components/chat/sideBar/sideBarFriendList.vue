<template>
  <ul class="friend-list">
    <li v-for="friend in friendList" class="color-hover-grey">
      <side-obj-card
          :avatar="friend.avatar"
          :name="friend.name"
      />
    </li>
  </ul>
</template>

<script>
import '../../../assets/style/chatPage.css';
import SideObjCard from "@/components/chat/sideBar/sideObjCard";
import {reactive} from "vue";

export default {
  name: "sideBarFriendList",
  components: {SideObjCard},
  setup() {
    const friendList = reactive([
      {
        avatar: require('../../../assets/img/avatar/jojo.jpg'),
        name: "一个终于玩到血源的stranger",
      },
      {
        avatar: require('../../../assets/img/avatar/jojo.jpg'),
        name: "hsy",
      },
      {
        avatar: require('../../../assets/img/avatar/jojo.jpg'),
        name: "wml",
      },
      {
        avatar: require('../../../assets/img/avatar/jojo.jpg'),
        name: "wyh",
      },
      {
        avatar: require('../../../assets/img/avatar/jojo.jpg'),
        name: "hsy",
      },
      {
        avatar: require('../../../assets/img/avatar/jojo.jpg'),
        name: "wml",
      },
      {
        avatar: require('../../../assets/img/avatar/jojo.jpg'),
        name: "wyh",
      },
      {
        avatar: require('../../../assets/img/avatar/jojo.jpg'),
        name: "hsy",
      },
      {
        avatar: require('../../../assets/img/avatar/jojo.jpg'),
        name: "wml",
      },
      {
        avatar: require('../../../assets/img/avatar/jojo.jpg'),
        name: "wyh",
      },
      {
        avatar: require('../../../assets/img/avatar/jojo.jpg'),
        name: "hsy",
      },
      {
        avatar: require('../../../assets/img/avatar/jojo.jpg'),
        name: "wml",
      },
      {
        avatar: require('../../../assets/img/avatar/jojo.jpg'),
        name: "wyh",
      },
      {
        avatar: require('../../../assets/img/avatar/jojo.jpg'),
        name: "hsy",
      },
      {
        avatar: require('../../../assets/img/avatar/jojo.jpg'),
        name: "wml",
      },
    ])

    return {
      friendList
    }
  }
}
</script>

<style scoped>
.friend-list {

}
</style>