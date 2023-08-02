<!--
 * @Author: yangyongqian
 * @Date: 2023-07-23 16:07:48
 * @Description:新闻
-->
<template>
  <div class="container">
    <div class="news-header" :style="{
      backgroundImage: `url(${require('@/assets/news-bg.png')})`,
    }">
      <h2 class="title">新闻咨询</h2>
      <p class="info">为你推荐公司及行业前沿咨询，让您随时了解行业动态</p>
    </div>
    <!-- 搜索区域 -->
    <div class="search">
      <el-popover :visible="visible" placement="bottom" title="检索结果" width="50%">
        <template #reference>
          <el-input v-model="newsKeyWord" placeholder="请输入新闻关键字" :prefix-icon="Search" @input="visible = true"
            @blur="visible = false" type="search" size="large" />
        </template>
        <template v-if="searchList.length">
          <div v-for="item in searchList" @click="goDetail(item._id)" :key="item._id" class="search-item">
            {{ item.title }}
          </div>
        </template>
        <div v-else class="no-data">
          <el-empty description="暂无数据" :image-size="50" />
        </div>
      </el-popover>
    </div>
    <!-- 新闻区块 -->
    <div class="news-block">
      <el-row :gutter="20">
        <el-col :span="6" v-for="item in newsBlock" :key="item._id">
          <el-card :body-style="{ padding: '0px' }" shadow="hover" @click="goDetail(item._id)">
            <div class="image-product" :style="{
              backgroundImage: `url(${API_URL}${item.cover})`,
            }"></div>
            <div style="padding: 14px">
              <span class="title">{{ item.title }}</span>
              <div class="bottom">
                <time class="time">{{ timeFormat.dateFormat(item.editTime) }}</time>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 标签页 -->
    <el-tabs v-model="activeName" class="news-tabs">
      <el-tab-pane v-for="item in tabList" :key="item.name" :label="item.label" :name="item.name">

        <el-row :gutter="20">
          <!-- 新闻卡片模块 -->
          <el-col :span="18">
            <div v-for="data in tabNews[item.name]" :key="data._id" class="tab-content">
              <el-card :body-style="{ padding: '0px' }" shadow="hover" @click="goDetail(data._id)">
                <div class="image-product" :style="{
                  backgroundImage: `url(${API_URL}${data.cover})`,
                }"></div>
                <div style="padding: 14px">
                  <span class="title">{{ data.title }}</span>
                  <div class="bottom">
                    <time class="time">{{ timeFormat.dateFormat(data.editTime) }}</time>
                  </div>
                </div>
              </el-card>
            </div>
          </el-col>
          <!-- 新闻时间线模块 -->
          <el-col :span="6">
            <el-timeline>
              <el-timeline-item v-for="(activity, index) in tabNews[item.name]" :key="index"
                :timestamp="timeFormat.dateFormat(activity.editTime)">
                {{ activity.title }}
              </el-timeline-item>
            </el-timeline>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>

    <!-- 回到顶部 -->
    <el-backtop :visibility-height="100" />
  </div>
</template>

<script setup name="News">
import _ from 'lodash'
import { onMounted, ref, computed } from "vue";
import { Search } from "@element-plus/icons-vue";
import axios from "axios";
import timeFormat from "@/utils/timeFormat";
import { useRouter } from 'vue-router'
import { API_URL } from '@/utils/app.config'

const visible = ref(false);
const newsKeyWord = ref("");
const newsList = ref([]);
const searchList = computed(() =>
  newsList.value.filter((t) => t.title.includes(newsKeyWord.value))
);
const newsBlock = computed(() => newsList.value.slice(0, 4));

onMounted(async () => {
  const {
    data: { result },
  } = await axios.get("/webapi/news/getList");
  newsList.value = result;
});

const activeName = ref(1);
const tabList = ref([
  {
    label: '最新动态',
    name: 1
  },
  {
    label: '通知公告',
    name: 2
  },
  {
    label: '典型案例',
    name: 3
  },
])
const tabNews = computed(() => _.groupBy(newsList.value, (item) => item.category))

const router = useRouter()
const goDetail = (id) => {
  router.push(`/news/${id}`)
}
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

  .news-block {
    margin: 20px;

    .image-product {
      width: 100%;
      height: 150px;
      background-size: cover;
    }

    .title {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2; // (两行文字)
      -webkit-box-orient: vertical;
    }

    .time {
      font-size: 13px;
      color: gray;
    }
  }

  .news-tabs {
    margin: 20px;
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

:deep(.tab-content) {
  padding: 10px;
  width: auto;

  .el-card__body {
    display: flex;
  }

  .image-product {
    width: 150px;
    height: 100px;
    background-size: cover;
  }

  .time {
    font-size: 13px;
    color: gray;
  }
}
</style>
