<template>
  <div class="input-div">
    <el-input
      v-model="input"
      class="input-class"
      size="large"
      placeholder="请输入您想要查询的城市"
      @input="filterSuggestions"
    >
      <template #prepend>
        <el-button :icon="House" @click="goHome" />
      </template>
      <template #append>
        <el-button type="primary" class="search-button" @click="handleSearch"
          >搜索</el-button
        >
      </template>
    </el-input>
    <ul v-if="filteredSuggestions.length > 0" class="suggestions-list">
      <li
        v-for="(suggestion, index) in filteredSuggestions"
        :key="index"
        @click="selectSuggestion(suggestion)"
      >
        {{ suggestion }}
      </li>
    </ul>
  </div>
</template>



<script setup>
import { onMounted, ref } from "vue";
import { House } from "@element-plus/icons-vue";
import { getPlaceNameInfo } from "@/apis/placenameapi";

const emit = defineEmits(['search', 'go-home']);
const input = ref("");
const suggestions = ref([]); // 存储所有的省、市、县名称
const filteredSuggestions = ref([]); // 存储过滤后的建议

// 获取城市名称信息
onMounted(async () => {
  try {
    const response = await getPlaceNameInfo();
    if (response.code === 1) {
      // 提取省、市、县的名称
      response.data.forEach((province) => {
        suggestions.value.push(province.name); // 省
        province.pchilds.forEach((city) => {
          if (city.name !== "市辖区") {
            suggestions.value.push(city.name); // 市
            city.cchilds.forEach((district) => {
              if (district.name !== "自治区直辖县级行政区划") {
                suggestions.value.push(district.name); // 县
              }
            });
          }
        });
      });
    }
  } catch (error) {
    console.error("获取城市名称出错:", error);
    ElMessage({
      message: "获取城市名称失败",
      type: "error",
    });
  }
});

// 过滤建议
const filterSuggestions = () => {
  const inputValue = input.value.trim().toLowerCase();
  if (inputValue) {
    filteredSuggestions.value = suggestions.value.filter((suggestion) =>
      suggestion.toLowerCase().includes(inputValue)
    );
  } else {
    filteredSuggestions.value = [];
  }
};

// 处理搜索
const handleSearch = () => {
  if (!input.value.trim()) {
    ElMessage({
      message: "搜索内容不能为空",
      type: "warning",
    });
    return;
  }

  // 检查输入的城市是否在建议列表中
  if (!suggestions.value.includes(input.value)) {
    ElMessage({
      message: "请输入完整的名称，如“上海市”、“新疆维吾尔自治区”、“成都市”",
      type: "error",
    });
    return;
  }

  console.log(`搜索城市: ${input.value}`);
  emit("search", input.value);
};

//回到主页
const goHome = () => {
  emit("go-home");
};

// 选择建议
const selectSuggestion = (suggestion) => {
  input.value = suggestion;
  filteredSuggestions.value = [];
};
</script>

<style lang="less">
.input-div {
  width: 700px;
  border-radius: 95px;
  background-color: #fff;
  margin-left: 30.4%;
  margin-top: 2%;
}

.input-class {
  .el-input-group__prepend,
  .el-input__wrapper,
  .el-input-group__append {
    border-radius: 95px;
    border: 0;
    box-shadow: 0 0 0 0px;
  }
}

.search-button {
  transition: background-color 0.3s, padding 0.3s;
  border-radius: 95px;
  border: none;
  box-shadow: none;
  padding: 10px 20px;
  height: 40px;
}

.search-button:hover {
  background-color: #8dedab !important;
  color: white !important;
}

.suggestions-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
  border: 1px solid #ddd;
  border-radius: 20px;
  max-height: 200px;
  overflow-y: auto;
  position: absolute;
  background-color: white;
  width: 700px;
  z-index: 1000;
}

.suggestions-list li {
  padding: 10px;
  cursor: pointer;
}

.suggestions-list li:hover {
  background-color: #f0f0f0;
}
</style>