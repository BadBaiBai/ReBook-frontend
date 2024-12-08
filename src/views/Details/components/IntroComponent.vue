<template>
  <div>
    <div id="building">
      <h1 class="intro-header-title">简介</h1>
      <h2 class="wiki-text" type="primary">{{ truncatedWikiInfo }}</h2>
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch, defineProps, ref } from "vue";
import { getWikipediaInfo } from "@/apis/wikipediaapi.js";

const wikiInfo = ref(null);
const theWikiInfo = ref("");
const truncatedWikiInfo = ref("");

const props = defineProps({
  searchValue: {
    type: String,
    default: "",
  },
});

// 用于截断字符串并添加省略号
function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
}


onMounted(async () => {
  await fetchWikipediaInfo(props.searchValue);
});

watch(
  () => props.searchValue,
  async (newValue) => {
    if (newValue) {
      await fetchWikipediaInfo(newValue);
    }
  }
);

async function fetchWikipediaInfo(location) {
  try {
    const response = await getWikipediaInfo(location);
    const pages = response.query.pages;
    const pageId = Object.keys(pages)[0]; // 获取页面的 ID
    const searchResult = pages[pageId].extract; // 获取 extract 字段

    if (searchResult) {
      wikiInfo.value = {
        title: pages[pageId].title, // 你也可以获取标题
        snippet: searchResult,
      };
      // 清理 HTML 标签
      theWikiInfo.value = searchResult.replace(/<[^>]+>/g, "");
      // 截断文字并设置最大字符数
      truncatedWikiInfo.value = truncateText(theWikiInfo.value, 600);
    }
  } catch (error) {
    console.error("获取城市维基百科信息时出错:", error);
  }
}
</script>

<style scoped>
.wiki-text {
  text-align: left;
  font-size: 20px;
  line-height: 2;
  color: rgb(247, 247, 247);
  position: relative;
  z-index: 100;
  text-indent: 2em;
}

/* 设置背景容器 */
#building {
  background: url("@/assets/earthbackground.jpg") no-repeat center center;
  background-size: cover;
  width: 980px;
  height: 100%;
  position: relative;
  z-index: 1;

  border-radius: 50px;
  padding: 10px;
  
}

.intro-header-title{
  font-size: 2rem;
  margin-bottom: 0rem;
  text-align: center;
}
</style>
