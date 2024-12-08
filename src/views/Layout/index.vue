<template>
  <div class="wft-particles-container" :style="particlesContainerStyle">
    <vue-particles 
      id="wft-tsparticles"
      :particlesInit="particlesInit"
      :options="particlesOpt"
    />
  </div>
  <div class="sticky-search">
    <SearchInput @search="handleSearch" @go-home="handleGoHome"></SearchInput>
  </div>
  <RouterView />
</template>
<script setup  lang="ts">
import particlesOpt from './config/particles'
import { loadSlim } from "tsparticles-slim"
import { computed } from 'vue'
import SearchInput from './components/SearchInput.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
 
const props = withDefaults(defineProps<{
  width?: string | number,
  height?: string | number,
  backgroundColor?: string,
  backgroundImage?: string
}>(), {
  width: '100%',
  height: '100%',
  backgroundColor: '#002a3a',
  backgroundImage: ''
})
 
const particlesContainerStyle = computed(() => {
  return {
    width: typeof props.width === 'string' ? props.width : props.width + 'px',
    height: typeof props.height === 'string' ? props.height : props.height + 'px',
    backgroundColor: props.backgroundColor,
    backgroundImage: `url(${props.backgroundImage})`
  }
})
 
const particlesInit = async (engine: any) => {
  await loadSlim(engine);
}

//搜索函数
const handleSearch = (searchValue: string) => {
  console.log(`父组件接收: ${searchValue}`);
  router.push({ name: 'details' , query: { search: searchValue }});
  window.scrollTo(0, 0);
};

// 返回首页函数
const handleGoHome = () => {
  router.push('/');
};
</script>
<style scoped>
.wft-particles-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
 
#wft-tsparticles {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.sticky-search {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 100;
  padding-top: 1px;
  padding-bottom: 20px;
}
</style>