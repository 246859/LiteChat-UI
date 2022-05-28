<template>
  <div class="index-bac color-change-4x">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "commonPage"
}
</script>

<style scoped>

:deep(.el-form-item__label) {
  font-size: 18px;
  font-weight: bold;
}

:deep(.el-button--large.is-round) {
  padding: 20px 54px;
}

:deep(.el-button) {
  color: white;
}
</style>