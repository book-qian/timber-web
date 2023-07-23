<!--
 * @Author: yangyongqian
 * @Date: 2023-07-23 16:07:13
 * @Description:首页
-->
<template>
  <div class="container">
    <el-carousel height="calc(100vh - 59px)">
      <el-carousel-item :key="1">
        <div class="item" :style="{
          backgroundImage: `url(${require('@/assets/home1.jpeg')})`
        }">
        </div>
      </el-carousel-item>
      <el-carousel-item :key="2">
        <div class="item" :style="{
          backgroundImage: `url(${require('@/assets/home2.jpg')})`
        }">
        </div>
      </el-carousel-item>
      <el-carousel-item :key="3">
        <div class="item" :style="{
          backgroundImage: `url(${require('@/assets/home3.jpg')})`
        }">
        </div>
      </el-carousel-item>
    </el-carousel>

    <div class="center">互联网+时代</div>
  </div>
</template>

<script setup name="Home">
</script>

<style lang="scss" scoped>
.container {
  position: relative;

  .item {
    width: 100%;
    height: 100%;
    background-size: cover;
  }

  .center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 100px;
    line-height: 100px;
    text-align: center;
    font-size: 60px;
    color: white;
  }
}
</style>

