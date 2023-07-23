<!--
 * @Author: yangyongqian
 * @Date: 2023-07-23 15:51:33
 * @Description:项目入口文件
-->
<template>
  <NavBar />
  <router-view />
</template>

<script setup name="App">
import NavBar from '@/components/NavBar';
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

// 滚动条美化
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  position: absolute;
}

::-webkit-scrollbar-thumb {
  background: #1890ff;
}

::-webkit-scrollbar-track {
  background: #ddd;
}
</style>
