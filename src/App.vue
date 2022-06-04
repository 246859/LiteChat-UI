<template>
  <router-view/>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
  'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}

/*修改文本域滚动条样式*/
textarea {
  /*关闭自定义缩放*/
  resize: none;
  /*关闭边界*/
  border: none;
  /*关闭激活框*/
  outline: none;
  width: 100%;
  font-size: 14px;
}

textarea::-webkit-scrollbar {
  background: none;
  width: 8px;
}

textarea::-webkit-scrollbar-track {
  border-radius: 120px;
}

textarea::-webkit-scrollbar-thumb {
  background-color: rgb(200, 201, 204);
  border-radius: 120px;
  min-height: 40px;
}
</style>
