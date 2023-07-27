<!--
 * @Author: yangyongqian
 * @Date: 2023-07-23 16:08:16
 * @Description:产品与服务
-->
<template>
  <div>
    <el-carousel v-if="loopList.length" height="calc(100vh - 59px)" direction="vertical" :autoplay="false">
      <el-carousel-item v-for="item in loopList" :key="item._id">
        <div class="item" :style="{
          backgroundImage: `url(http://localhost:3000${item.cover})`
        }">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <h3>{{ item.title }}</h3>
              </div>
            </template>
            <p>{{ item.indroduction }}</p>
            <div class="detail">{{ item.detail }}</div>
            <p class="more">
              更多信息：请查看
              http://www.fxgh.top/frondCode/#/
            </p>
          </el-card>
        </div>
      </el-carousel-item>
    </el-carousel>
    <el-empty v-else description="暂无产品" />
  </div>
</template>

<script setup name="Product">
import { onMounted, ref } from 'vue';
import axios from 'axios';

const loopList = ref([])
onMounted(async () => {
  const { data: { result } } = await axios.get('/webapi/product/getList')
  loopList.value = result
})

</script>

<style lang="scss" scoped>
.item {
  width: 100%;
  height: 100%;
  background-size: cover;

  .box-card {
    width: 50%;
    height: 100%;
    background: rgba(255, 255, 255, .7);

    .detail,
    .more {
      margin-top: 20px;
    }
  }
}
</style>

