<template>
  <div class="container-header">
    <img src="../assets/logo.svg" alt="logo.png">
    <h3>轻言</h3>
  </div>
</template>

<script>
export default {
  name: "logoTitle"
}
</script>

<style scoped>
.container-header{
  display: flex;
  height: 50px;
  padding: 10px 140px;
}

.container-header img{
  width: 50px;
  height: 50px;
  margin: 0 5px;
}
.container-header h3{
  font-size: 25px;
  margin: 0 5px;
  color:black;
}
</style>