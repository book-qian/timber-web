<!--
 * @Author: yangyongqian
 * @Date: 2023-07-25 23:58:38
 * @Description:新闻详情组件
-->
<template>
  <el-row class="newsDetail">
    <el-col :span="17" :offset="1">
      <div class="newsDetail-header">
        <h2>{{ currentNews.title }}</h2>
        <div class="time">
          {{ timeFormat.dateFormat(currentNews.editTime) }}
        </div>
      </div>
      <el-divider>
        <el-icon><star-filled /></el-icon>
      </el-divider>
      <div class="newsDetail-body" v-html="currentNews.content"></div>
    </el-col>
    <el-col :span="4" :offset="1" :pull="1">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">最新动态</div>
        </template>
        <div v-for="item in topNews" :key="item._id" class="item" @click="goDetail(item)">
          <span class="title">{{ item.title }}</span>
          <div class="bottom">
            <time class="time">{{ timeFormat.dateFormat(item.editTime) }}</time>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup name="NewDetail">
import { ref, watchEffect, onBeforeUnmount } from 'vue';
import axios from 'axios';
import timeFormat from "@/utils/timeFormat";
import { useRoute, useRouter } from 'vue-router'
import { StarFilled } from '@element-plus/icons-vue'

const route = useRoute()
const currentNews = ref({})
const topNews = ref([]);
const stop = watchEffect(async () => {
  const { id } = route.params
  // id不存在不在执行
  if (!id) return
  const { data: { result } } = await axios(`/webapi/news/getList/${id}`)
  currentNews.value = result[0]

  const { data: { result: topNewsResult } } = await axios.get(`/webapi/news/topNews/?limit=${4}`)
  topNews.value = topNewsResult
})

const router = useRouter()
const goDetail = ({ _id }) => {
  router.push(`/news/${_id}`)
}

onBeforeUnmount(() => {
  stop()
})


</script>

<style lang="scss" scoped>
.el-row {
  margin-top: 30px;

  .time {
    font-size: 13px;
    color: gray;
  }

  .card-header {
    font-size: 16px;
    font-weight: bold;
  }

  .item {
    padding: 14px;
    cursor: pointer;
  }
}
</style>

