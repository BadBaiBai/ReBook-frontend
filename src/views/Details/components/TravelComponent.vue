<template>
  <div class="building">
    <h1 class="travel-title">旅游</h1>
    <div class="card-container">
      
      <MiniTravelCard 
        v-for="(spot, index) in travelSpots" 
        :key="index" 
        :spot="spot" 
      />
    </div>
  </div>
</template>

<script setup>
import MiniTravelCard from './MiniTravelCard.vue';
import { onMounted, watch, defineProps, ref } from "vue";
import { getTravelInfo } from "@/apis/travelapi";

const props = defineProps({
  searchValue: {
    type: String,
    default: '',
  }
});

// 存储获取到的旅游景点信息
const travelSpots = ref([]);

onMounted(async () => {
  await fetchTravelInfo(props.searchValue);
});

watch(
  () => props.searchValue,
  async (newValue) => {
    if (newValue) {
      await fetchTravelInfo(newValue);
    } else {
      travelSpots.value = []; // 如果没有搜索值，重置旅游景点为空
    }
  }
);

async function fetchTravelInfo(location) {
  try {
    const response = await getTravelInfo(location);
    // 如果没有获取到数据，设置为空数组
    travelSpots.value = response.data && response.data.record ? response.data.record.slice(0, 9) : [];
    console.log(travelSpots.value);
  } catch (error) {
    console.error("获取旅游信息时出错:", error);
    travelSpots.value = []; // 出错时也设置为空数组
  }
}
</script>

<style scoped>

.building{
  background: url("@/assets/travelbackground.jpg") no-repeat center center; 
  background-size: cover;
  width: 980px;
  height: 100%;
  position: relative;
  z-index: 1; 

  border-radius: 50px;
  padding: 10px;
}
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.travel-title{
  font-size: 2rem;
  margin-bottom: 0rem;
  text-align: center;
    
}
</style>
