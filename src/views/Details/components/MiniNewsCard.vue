<template>
  <el-card class="mini-card hover-card" shadow="hover">
    <img
      :src="theNew.picUrl || defaultImage"
      style="width: 100%;"
    />
    <p class="text item">标题：{{ theNew.title || "未知" }}</p>
    <p class="text item">时间：{{ theNew.ctime || "未知" }}</p>
    <p class="text item">来源：{{ theNew.source || "未知" }}</p>
    <p class="text item">
      网址：
      <a :href="theNew.url" target="_blank" v-if="theNew.url">进入原文</a>
      <span v-else>未知</span>
    </p>
  </el-card>
</template>

<script setup>
import { defineProps } from "vue";
import defaultImage from "@/assets/newspaper.jpg";

const props = defineProps({
  theNew: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.mini-card {
  width: 260px;
  margin: 20px;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.mini-card:hover {
  background-color: #27eb7c;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 1);
}
</style>
