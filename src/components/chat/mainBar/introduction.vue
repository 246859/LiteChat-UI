<template>
  <div class="introduction-box">
    <logo-title class="slide-in-bck-center"/>
  </div>
</template>

<script>
import LogoTitle from "@/components/common/logoTitle";
import "../../../assets/style/common.css";

export default {
  name: "introduction",
  components: {LogoTitle}
}
</script>

<style scoped>
.introduction-box {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
</style>