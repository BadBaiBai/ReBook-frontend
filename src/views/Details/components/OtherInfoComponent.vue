<template>
  <div id="building">
    <h1>你还想了解该城市哪方面的内容？</h1>
    <div class="button-group">
        <el-button plain type="primary" @click="handleButtonClick('经济')">经济</el-button>
        <el-button plain type="success" @click="handleButtonClick('环境')">环境</el-button>
        <el-button plain type="warning" @click="handleButtonClick('科技')">科技</el-button>
        <el-button plain type="info" @click="handleButtonClick('教育')">教育</el-button>
        <el-button plain type="danger" @click="handleButtonClick('人口')">人口</el-button>
        <el-button plain type="primary" @click="handleButtonClick('美食')">美食</el-button>
      </div>
      <div v-if="selectedInfo" class="info-display">
        <h2 class="info-title">{{ selectedCategory }}</h2>
        <p class="info-content" v-if="selectedInfo">{{ selectedInfo }}</p>
        <p class="info-content" v-else>没有找到相关信息。</p>
      </div>
  </div>
</template>

<script setup>
import { onMounted, watch, defineProps, ref } from "vue";
import { getErnieOtherInfo } from "@/apis/ernieapi.js";

const props = defineProps({
  searchValue: {
    type: String,
    default: "",
  },
});


const otherInfoArray = ref([]); //存储不同类别的信息
const selectedCategory = ref(""); //当前选中的类别
const selectedInfo = ref(""); //当前类别的具体信息
const categoryInfo = ref("");

onMounted(async () => {
  await fetchAllErnieInfo(props.searchValue);
});

// 当 searchValue 变化时，重新获取信息
watch(
  () => props.searchValue,
  async (newValue) => {
    if (newValue) {
      await fetchAllErnieInfo(newValue);
    }
  }
);

// 获取所有类别的信息
async function fetchAllErnieInfo(location) {
  const categories = ['经济', '环境', '科技', '教育', '人口', '美食'];
  otherInfoArray.value = [];
  for (const category of categories) {
    try {
    const response = await getErnieOtherInfo(location, category);
    console.log(response);
    otherInfoArray.value.push({ category, data: response.result }); // 存储类别和对应的数据
  } catch (error) {
    console.error("获取城市其他信息时出错:", error);
  }
  }
}

// 处理按钮点击事件
function handleButtonClick(category) {
  const foundCategoryInfo = otherInfoArray.value.find(info => info.category === category);
  
  if (foundCategoryInfo) {
    categoryInfo.value = foundCategoryInfo.data;
    selectedCategory.value = category;
    selectedInfo.value = "";
    print();
  } else {
    selectedCategory.value = category;
    selectedInfo.value = "";
    categoryInfo.value = "";
    console.log(`未找到 ${category} 的信息`);
  }
}

function print() {
  if (selectedInfo.value.length >= categoryInfo.value.length || !categoryInfo.value) {
    return;
  } else {
    setTimeout(() => {
      selectedInfo.value += categoryInfo.value.charAt(selectedInfo.value.length);
      print();
    }, 50);
  }
}

</script>

<style scoped>
#building {
  background: url("@/assets/aibackground.png") no-repeat center center;
  background-size: cover;
  width: 980px;
  height: 500px;
  position: relative; 
  z-index: 1;

  border-radius: 50px;
  padding: 10px; 
}

h1 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  padding: 10px;
}

.el-button {
  font-size: 1.2rem;

  width: 120px;
}

.info-display {
  margin-top: 20px;
  padding-left: 20px;
}

.info-title {
  font-size: 1.5rem;
  margin-bottom: 10px;
  font-weight: bold; 
}

.info-content {
  font-size: 1.2rem;
  text-align: left;
  text-indent: 2em;
  line-height: 1.5;
  font-weight: bold; 
}
</style>