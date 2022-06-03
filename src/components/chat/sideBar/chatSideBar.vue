<template>
  <div class="sideBar">
    <side-bar-menu/>
    <side-bar-list/>
  </div>
</template>

<script>
import '../../../assets/style/common.css';
import SideBarMenu from "@/components/chat/sideBar/sideBarMenu";
import SideBarList from "@/components/chat/sideBar/sideBarList";

export default {
  name: "chatSideBar",
  components: {SideBarList, SideBarMenu},
  setup() {
  }
}
</script>

<style scoped>

.sideBar {
  display: flex;
  flex-flow: row
}
</style>