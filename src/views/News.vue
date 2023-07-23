<!--
 * @Author: yangyongqian
 * @Date: 2023-07-23 16:07:48
 * @Description:新闻
-->
<template>
  <div class="container">
    <div class="news-header" :style="{
      backgroundImage: `url(${require('@/assets/news-bg.png')})`
    }">
      <h2 class="title">新闻咨询</h2>
      <p class="info">为你推荐公司及行业前沿咨询，让您随时了解行业动态</p>
    </div>
    <div class="search">
      <el-popover :visible="visible" placement="bottom" title="检索结果" width="50%">
        <template #reference>
          <el-input v-model="newsKeyWord" placeholder="请输入新闻关键字" :prefix-icon="Search" @input="visible = true"
            @blur="visible = false" type="search" size="large" />
        </template>
        <template v-if="searchList.length">
          <div v-for="item in searchList" :key="item._id" class="search-item">
            {{ item.title }}
          </div>
        </template>
        <div v-else class="no-data">
          <el-empty description="暂无数据" :image-size="50" />
        </div>
      </el-popover>

    </div>
  </div>
</template>

<script setup name="News">
import { onMounted, ref, computed } from 'vue';
import { Search } from '@element-plus/icons-vue'
import axios from 'axios';

const visible = ref(false)
const newsKeyWord = ref('')
const newsList = ref([])
const searchList = computed(() => newsList.value.filter(t => t.title.includes(newsKeyWord.value)))

onMounted(async () => {
  const { data: { result } } = await axios.get('/webapi/news/getList')
  newsList.value = result
})

</script>

<style lang="scss" scoped>
.container {
  position: relative;

  .news-header {
    width: 100%;
    height: 580px;
    background-size: cover;
    color: white;
    text-align: center;

    .title {
      padding-top: 100px;
      font-size: 70px;
    }

    .info {
      margin-top: 20px;
      font-size: 30px;
      color: cornsilk;
    }
  }

  .search {
    position: absolute;
    top: 400px;
    width: 100%;
    text-align: center;

    .el-input {
      width: 50%;
    }

  }

}

.search-item {
  height: 50px;
  line-height: 50px;
  padding: 0 10px;

  &:hover {
    color: red;
    background: whitesmoke;
  }
}
</style>

