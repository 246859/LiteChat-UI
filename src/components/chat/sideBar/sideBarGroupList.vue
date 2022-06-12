<template>
  <ul class="group-list">
    <li v-for="group in groupList" class="color-hover-grey">
      <side-obj-card
          :avatar="group.avatar"
          :name="group.name"
      />
    </li>
  </ul>
</template>

<script>
import SideObjCard from "@/components/chat/sideBar/sideObjCard";
import '../../../assets/style/chatPage.css';
import {reactive} from "vue";

export default {
  name: "sideBarGroupList",
  components: {SideObjCard},
  setup() {
    const groupList = reactive([
      {
        avatar: require('../../../assets/img/avatar/jojo.jpg'),
        name: "半岛小镇养老群",
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
    ]);

    return {
      groupList
    }
  }
}
</script>

<style scoped>

</style>