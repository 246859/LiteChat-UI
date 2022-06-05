<template>
  <div class="sideBar-menu border-right-light">
    <ul>
      <!--头像-->
      <li>
        <img alt="头像" class="sideBar-avatar" src="../../../assets/img/avatar/girl.jpg">
      </li>
      <!--消息列表-->
      <li ref="message">
        <icon class="sideBar-icon" symbol="icon-xiaoxi2" @click="colorChange(0)"/>
      </li>
      <!--好友列表-->
      <li ref="friend">
        <icon class="sideBar-icon" symbol="icon-yonghu-yuan" @click="colorChange(1)"></icon>
      </li>
      <!--群聊列表-->
      <li ref="group">
        <icon class="sideBar-icon" symbol="icon-yonghu" @click="colorChange(2)"></icon>
      </li>
      <!--轻享空间-->
      <li ref="liteZone">
        <icon class="sideBar-icon" symbol="icon-pengyouquan" @click="colorChange(3)"></icon>
      </li>

      <!--账号设置-->
      <li class="sideBar-foot-menu">
        <el-dropdown trigger="click">
          <icon class="sideBar-icon" symbol="icon-caidan"></icon>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>安全设置</el-dropdown-item>
              <el-dropdown-item>退出账号</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </li>
    </ul>
  </div>
</template>

<script>
import Icon from "@/components/common/icon";
import '../../../assets/style/common.css';
import {onMounted, ref} from "vue";
import {sessionStorage} from "@/utils/storage";

export default {
  name: "sideBarMenu",
  components: {Icon},
  setup() {
    const message = ref();
    const friend = ref();
    const group = ref();
    const liteZone = ref();
    const dropdownMenu = ref();

    const clickClass = "sideBar-icon-click";
    const sideBarKey = "siderBar-menu";

    const menu = [message, friend, group, liteZone];

    function colorChange(index) {//点击元素 变色保留

      menu[index].value.classList.add(clickClass);

      menu.forEach(other => {
        if (other !== menu[index]) {
          other.value.classList.remove(clickClass);
        }
      });
      sessionStorage.setItem(sideBarKey, index);
    }

    onMounted(() => {
      let index = sessionStorage.getItem(sideBarKey);

      if (index) {
        colorChange(Number.parseInt(index));
      }

    });

    return {
      colorChange,
      message,
      friend,
      group,
      liteZone,
      dropdownMenu
    }
  }
}
</script>

<style scoped>
ul li {
  padding: 20px;
  display: flex;
  justify-content: center;
}

.sideBar-avatar {
  width: 50px;
  height: 50px;
  border-radius: 15%;
}

.sideBar-icon {
  height: 35px;
  width: 35px;
}

.sideBar-icon:hover {
  color: #72afd3;
}

.sideBar-icon-click {
  color: #72afd3;
}

.sideBar-menu {
  height: 840px;
  width: 80px;
  padding: 30px 10px;
}

.sideBar-foot-menu {
  padding-top: 415px;
}
</style>