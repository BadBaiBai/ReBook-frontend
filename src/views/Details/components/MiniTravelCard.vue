<template>
  <el-card class="mini-card hover-card" shadow="hover">
    <template #header>
      <div class="card-header">
        <span>{{ spot.spot }}</span>
      </div>
    </template>
    <p class="text item">地址：{{ spot.addr || '未知' }}</p>
    <p class="text item">电话：{{ spot.tel || '未知' }}</p>
    <p class="text item">营业时间：{{ spot.opentime || '未知' }}</p>
    <p class="text item">
      网址：
      <a :href="spot.url" target="_blank" v-if="spot.url">进入官网</a>
      <span v-else>未知</span>
    </p>
  </el-card>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  spot: {
    type: Object,
    required: true,
  }
});
</script>

<style scoped>
.mini-card {
  width: 220px;
  margin: 50px;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.mini-card:hover {
  background-color: #8ce2f4;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 1);
}

</style>
