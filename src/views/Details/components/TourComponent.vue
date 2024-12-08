<template>
  <div class="building">
    <h1 class="tour-header-title">出行</h1>
    <el-table
      :data="selectedDetails"
      class="narrow-table"
      :row-class-name="tableRowClassName"
    >
      <el-table-column prop="name" label="名称" width="180" />
      <el-table-column prop="brief" label="简介" width="180" />
      <el-table-column prop="detail" label="详情" />
    </el-table>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, defineProps } from "vue";
import { getAreaCodeInfo } from "@/apis/areacodeapi";
import { getTourInfo } from "@/apis/tourapi";

const selectedDetails = ref([]);

const props = defineProps({
  searchValue: {
    type: String,
    default: "",
  },
});

const newsList = ref([]);

const tableRowClassName = ({ rowIndex }) => {
  if (rowIndex === 1) {
    return "warning-row";
  } else if (rowIndex === 3) {
    return "success-row";
  }
  return "";
};



onMounted(async () => {
  await fetchTourInfo(props.searchValue);
});

watch(
  () => props.searchValue,
  async (newValue) => {
    if (newValue) {
      await fetchTourInfo(newValue);
    }
  }
);

async function fetchTourInfo(searchValue) {
    try {
      let responseAreaCode_1 = await getAreaCodeInfo(searchValue);
      if (responseAreaCode_1.status === 0 && responseAreaCode_1.areaList.length === 0) {
        const modifiedSearchValue = searchValue.slice(0, -1);
        responseAreaCode_1 = await getAreaCodeInfo(modifiedSearchValue);
        console.log("Updated response:", responseAreaCode_1);
      }
      if (
        responseAreaCode_1.status === 0 &&
        responseAreaCode_1.areaList.length > 0
      ) {
        const areacode = responseAreaCode_1.areaList[0].areacode;
        console.log("Areacode:", areacode);
        const responseTourInfo = await getTourInfo(areacode);
        console.log("Tour Info:", responseTourInfo);
        const details = responseTourInfo.result.indexes[0].details.slice(3, 8);
        selectedDetails.value = details;
        console.log(selectedDetails.value);
      }
    } catch (error) {
      console.error("获取出行信息时出错:", error);
      newsList.value = [];
    }
}
</script>

<style scoped>
.building {
  
  background-size: cover;
  width: 980px;
  height: 100%;
  position: relative;
  z-index: 1;

  border-radius: 50px;
  padding: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.tour-header-title {
  font-size: 2rem;
  margin-bottom: 0rem;
  text-align: center;
}

.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}

.narrow-table {
  width: 980px;
  border-radius: 15px;
  overflow: hidden;
}
</style>
