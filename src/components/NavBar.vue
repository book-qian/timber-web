<!--
 * @Author: yangyongqian
 * @Date: 2023-07-23 17:17:45
 * @Description:导航栏组件
-->
<template>
  <div class="nav-bar">
    <el-menu :default-active="route.fullPath" mode="horizontal" :router="true">
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="/news">新闻中心</el-menu-item>
      <el-menu-item index="/product">产品与服务</el-menu-item>
      <el-menu-item index="" @click="loginHandler">登录</el-menu-item>
    </el-menu>
    <div class="right">
      企业门户官网
    </div>
  </div>
</template>

<script setup name="NavBar">
import { useRoute } from 'vue-router'
const route = useRoute()

const loginHandler = () => {
  window.location = 'http://localhost:8080/'
}
</script>

<style lang="scss" scoped>
.nav-bar {
  position: sticky;
  top: 0;
  z-index: 1000;

  .right {
    position: fixed;
    right: 20px;
    top: 0;
    width: 100px;
    height: 59px;
    line-height: 59px;
    text-align: center;
  }
}
</style>

