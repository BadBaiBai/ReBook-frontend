<template>
  <div class="building">
    <h1 class="news-header-title">新闻</h1>
  <div class="news-container">
    <MiniNewsCard 
      v-for="(newsItem, index) in newsList.slice(0, 9)"
      :key="index" 
      :theNew="newsItem" 
    />
  </div>
</div>
</template>

<script setup>
import { ref, onMounted, watch, defineProps } from "vue";
import MiniNewsCard from './MiniNewsCard.vue';
import { getNewsInfo } from "@/apis/newsapi";

const props = defineProps({
  searchValue: {
    type: String,
    default: '',
  }
});

const newsList = ref([]); // 保存新闻列表

onMounted(async () => {
  await fetchNewsInfo(props.searchValue);
});

watch(
  () => props.searchValue,
  async (newValue) => {
    if (newValue) {
      await fetchNewsInfo(newValue);
    }
  }
);

async function fetchNewsInfo(searchValue) {
  try {
    const response = await getNewsInfo(searchValue);
    if (response.result && response.result.list) {
      newsList.value = response.result.list;
    } else {
      newsList.value = [];
    }
  } catch (error) {
    console.error("获取新闻信息时出错:", error);
    newsList.value = [];
  }
}
</script>

<style scoped>
.building{
  background: url("@/assets/newsbackground.jpg") no-repeat center center;
  background-size: cover;
  width: 980px;
  height: 100%;
  position: relative;
  z-index: 1;

  border-radius: 50px;
  padding: 10px;
}

.news-header-title{
  font-size: 2rem;
  margin-bottom: 0rem;
  text-align: center;
}
.news-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
}
</style>
