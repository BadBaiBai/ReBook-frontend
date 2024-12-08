<template>
  <div class="floor-warpper">
    <section class="floor-nav" id="floorNavList">
      <ul class="nav-list">
        <li
          class="nav-list-item"
          v-for="(item, index) in floorList"
          :key="item.id"
          :class="{ active: activeIndex === index }"
          @click="setFloorNavMountClick(index)"
        >
          {{ item.name }}
        </li>
      </ul>
    </section>
    <section class="floor-item" v-for="item in floorList" :key="item.id">
      <div class="floor-item-box">
        <!-- <component :is="floorComponents[item.id]" /> -->
        <component :is="floorComponents[item.id]" :search-value="searchValue" />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useRoute } from "vue-router";
import IntroComponent from './components/IntroComponent.vue';
import NewsComponent from './components/NewsComponent.vue';
import LocationComponent from './components/LocationComponent.vue';
import WeatherComponent from './components/WeatherComponent.vue';
import TourComponent from "./components/TourComponent.vue";
import TravelComponent from './components/TravelComponent.vue';
import OtherInfoComponent from './components/OtherInfoComponent.vue';


const route = useRoute();
const searchValue = ref(route.query.search || '');

console.log(searchValue.value);

watch(() => route.query.search, (newSearchValue) => {
  searchValue.value = newSearchValue || '';
  console.log(searchValue.value);
});


const floorComponents = {
  1: LocationComponent,
  2: WeatherComponent,
  3: IntroComponent,
  4: TourComponent,
  5: NewsComponent,
  6: TravelComponent,
  7: OtherInfoComponent,
};


//侧边导航栏
const floorList = ref([
  { id: 1, name: "位置" },
  { id: 2, name: "天气" },
  { id: 3, name: "简介" },
  { id: 4, name: "出行" },
  { id: 5, name: "新闻" },
  { id: 6, name: "旅游" },
  { id: 7, name: "其他" },
]);
const activeIndex = ref(0);
const element = ref({
  nav_item: null,
  floor_item: null,
});
let timer = null;

const setFloorNavMountClick = (index) => {
  const { floor_item } = element.value;
  const floor_offsetTop = floor_item[index].offsetTop - floor_item[0].offsetTop;
  const window_scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop;

  const timerConfig = {
    step: 60,
    times: 16,
    FLOOR_OFFSETTOP: floor_offsetTop,
  };

  if (window_scrollTop > floor_offsetTop) {
    setFloorScrollArrowUp(timerConfig);
  } else if (window_scrollTop === floor_offsetTop) {
    return false;
  } else {
    setFloorScrollArrowDown(timerConfig);
  }
};


const setFloorScrollArrowUp = (timerConfig) => {
  clearInterval(timer);
  timer = setInterval(() => {
    let window_scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    if (window_scrollTop <= timerConfig.FLOOR_OFFSETTOP) {
      document.documentElement.scrollTop = timerConfig.FLOOR_OFFSETTOP;
      document.body.scrollTop = timerConfig.FLOOR_OFFSETTOP;
      clearInterval(timer);
    } else {
      document.documentElement.scrollTop = window_scrollTop - timerConfig.step;
      document.body.scrollTop = window_scrollTop - timerConfig.step;
    }
  }, timerConfig.times);
};

const setFloorScrollArrowDown = (timerConfig) => {
  clearInterval(timer);
  timer = setInterval(() => {
    let window_scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    if (window_scrollTop >= timerConfig.FLOOR_OFFSETTOP) {
      document.documentElement.scrollTop = timerConfig.FLOOR_OFFSETTOP;
      document.body.scrollTop = timerConfig.FLOOR_OFFSETTOP;
      clearInterval(timer);
    } else {
      document.documentElement.scrollTop = window_scrollTop + timerConfig.step;
      document.body.scrollTop = window_scrollTop + timerConfig.step;
    }
  }, timerConfig.times);
};

const floorSrcollEventListener = () => {
  const { nav_item, floor_item } = element.value;
  const window_scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop;

  for (let i = 0; i < floor_item.length; i++) {
    const floor_offsetTop = floor_item[i].offsetTop - floor_item[0].offsetTop;
    if (window_scrollTop >= floor_offsetTop) {
      activeIndex.value = i;
    }
  }
};


onMounted(() => {
  element.value.nav_item = document.getElementsByClassName("nav-list-item");
  element.value.floor_item = document.getElementsByClassName("floor-item");
  window.addEventListener("scroll", floorSrcollEventListener);
});

onUnmounted(() => {
  window.removeEventListener("scroll", floorSrcollEventListener);
});
</script>

<style scoped>
.floor-warpper {
  width: 1000px;
  margin: auto;
}
.floor-nav {
  position: fixed;
  top: 200px;
  left: 50px;
}
.nav-list {
  width: 48px;
  padding: 0;
  display: inline-block;
  text-align: center;
  background-color: #f8f8f8;
}
.nav-list-item {
  display: inline-block;
  width: 100%;
  height: 100%;
  line-height: 48px;
  vertical-align: middle;
  align-self: center;
  border-bottom: 1px solid #fff;
  cursor: pointer;
}
.nav-list-item.active,
.nav-list-item:hover {
  color: #fff;
  background-color: #404040;
}

.floor-item {
  width: 100%;
  margin: 60px auto;
  min-height: 300px;
  text-align: center;
  color: #fff;
}



.floor-item:last-child {
  padding-bottom: 100px; /* 添加额外的滚动空间 */
}
</style>
