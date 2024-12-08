<template>
    <div
      class="banner-container"
      :style="{ height: height + 'px' }"
      @mouseenter="mouseenterEvent"
      @mouseleave="mouseleaveEvent"
    >
      <ul class="fade-banner">
        <li
          class="rotation-banner"
          ref="rotationRef"
          :style="{ height: height + 'px' }"
          v-for="(item, index) in listBanner"
          :key="index"
        >
          <img class="banner-img" @click="bannerLink" :src="item.img" :title="description" />
        </li>
      </ul>
      <span class="left-button" @click="switchBanner('left')"
        ><img src="@/assets/left-icon.png" class="icon"
      /></span>
      <span class="right-button" @click="switchBanner('right')"
        ><img src="@/assets/right-icon.png" class="icon"
      /></span>
      <ul class="banner-indicator">
        <span
          v-for="index in listBanner.length"
          :key="index"
          class="barExternal"
          @click="swatchIndicator(index - 1)"
        >
          <li
            ref="indicatorRef"
            class="default-indicator"
            :class="{ 'active-indicator': index - 1 === 0 }"
          ></li>
        </span>
      </ul>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, unref, onUnmounted } from "vue";
  
  export default {
    name: "RollBanner",
    props: {
      //播放的banner
      listBanner: {
        type: Array,
        default: () => []
      },
      //banner自动播放的间隔时间
      interval: {
        type: Number,
        default: 2000
      },
      //是否自动播放banner
      autoSwitch: {
        type: Boolean,
        default: true
      },
      //banner高度
      setHeight: {
        type: Number,
        default: 600
      }
    },
    setup(props) {
      let tiemr = ref(null);
      const switchIndex = ref(0);
      const rotationRef = ref();
      const indicatorRef = ref();
      const description = ref(null);
      let height = unref(props.setHeight);
  
      //banner播放方式
      const addTimer = () => {
        if (props.autoSwitch === true) {
          //自动播放
          tiemr = setInterval(() => {
            switchBanner("right");
          }, props.interval);
        }
      };
  
      // 清除定时器
      const stopInterval = () => {
        clearInterval(tiemr);
      };
  
      //banner文字提示
      const switchDescription = () => {
        if (props.listBanner) {
          props.listBanner.map((item, index) => {
            if (index === switchIndex.value) {
              description.value = item.description;
            }
          });
        }
      };
  
      //鼠标进入停止自动播放
      const mouseenterEvent = () => {
        stopInterval();
        switchDescription();
      };
  
      //鼠标离开自动播放
      const mouseleaveEvent = () => {
        addTimer();
      };
  
      //上一张和下一张图片透明度切换
      const changePicture = (num) => {
        for (let i of rotationRef.value) {
          i.style.opacity = "0";
        }
        toBannerBar(num);
        if (rotationRef.value.length !== 0) {
          rotationRef.value[num].style.opacity = "1";
        }
      };
  
      //底部小横条颜色切换
      const toBannerBar = (val) => {
        for (let i of indicatorRef.value) {
          i.style.backgroundColor = "rgba(221, 221, 221, 0.541)";
        }
        if (indicatorRef.value.length !== 0) {
          indicatorRef.value[val].style.backgroundColor = "#ffffff";
        }
      };
  
      //左右切换banner
      const switchBanner = (value) => {
        if (value === "right") {
          switchIndex.value++;
          if (switchIndex.value === props.listBanner.length) {
            switchIndex.value = 0;
          }
        } else {
          switchIndex.value--;
          if (switchIndex.value === -1) {
            switchIndex.value = props.listBanner.length - 1;
          }
        }
        changePicture(switchIndex.value);
        switchDescription();
      };
  
      const swatchIndicator = (value) => {
        switchIndex.value = value;
        changePicture(switchIndex.value);
        switchDescription();
      };
  
      const bannerLink = () => {
      };
  
      onMounted(() => {
        addTimer();
      });
      onUnmounted(() => {
        stopInterval();
      });
      return {
        addTimer,
        bannerLink,
        switchIndex,
        indicatorRef,
        swatchIndicator,
        changePicture,
        rotationRef,
        toBannerBar,
        height,
        switchBanner,
        stopInterval,
        mouseenterEvent,
        mouseleaveEvent,
        description,
        switchDescription
      };
    }
  };
  </script>
  
  <style lang="scss" scoped>
  .banner-container {
    position: relative;

    width: 100%;
    height: 100%;
    max-width: 1300px;
    margin: 0 auto;
    margin-top: 50px;
    margin-bottom: 50px;
    margin-left: 150px;
    margin-right: 100px;
    .fade-banner {
      position: relative;
      list-style: none;
    }
    .rotation-banner {
      position: absolute;
      opacity: 0;
      // transition-duration: 3s;
      transition-duration: 1.5s;
      width: 100%;
      &:first-child {
        opacity: 1;
      }
    }
    .banner-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      cursor: pointer;
    }
  
    .left-button {
      position: absolute;
      cursor: pointer;
      top: 50%;
      left: -20px;
      width: 36px;
      height: 36px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgb(31, 45, 61, 0.3);
      border-radius: 50%;
      opacity: 0;
    }
    .right-button {
      position: absolute;
      width: 36px;
      height: 36px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      top: 50%;
      right: -100px;
      background-color: rgb(31, 45, 61, 0.3);
      border-radius: 50%;
      opacity: 0;
    }
    .icon {
      height: 50px;
      width: 50px;
    }
    .banner-indicator {
      position: absolute;
      left: 50%;
      bottom: 15px;
      transform: translateX(-50%);
      cursor: pointer;
      display: flex;
      .barExternal {
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        .default-indicator {
          width: 30px;
          height: 2px;
          background: rgba(221, 221, 221, 0.541);
          display: block;
          float: left;
          margin-right: 10px;
          // &:first-child {
          //   background: #ffffff;
          // }
        }
        .active-indicator {
          background: #ffffff;
        }
      }
    }
    &:hover {
      .left-button {
        opacity: 1;
      }
      .right-button {
        opacity: 1;
      }
    }
  }
  </style>
  