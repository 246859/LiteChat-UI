<template>
  <div class="sideBar-list border-right-light">
    <el-scrollbar height="860px">
      <p v-for="item in 100" :key="item" class="scrollbar-demo-item">{{ item }}</p>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  name: "sideBarList"
}
</script>

<style scoped>
.sideBar-list {
  /*background: aquamarine;*/
  height: 860px;
  width: 260px;
  padding: 20px;
}

</style>