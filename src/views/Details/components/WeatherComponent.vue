<template>
  <div id="temp15day"></div>
</template>

<script setup>
import * as echarts from "echarts";
import { onMounted, watch, defineProps } from "vue";
import { getWeatherInfo } from "@/apis/weatherapi";

let weekData = []; //存储星期
let dateData = []; //存储日期
let windData = []; //存储风力
let weatherData = []; // 存储天气状况
let visibilityData = []; //存储能见度
let highestTempData = []; //存储最高气温
let lowestTempData = []; //存储最低气温

const props = defineProps({
  searchValue: {
    type: String,
    default: "",
  },
});

onMounted(async () => {
  console.log("searchValue:", props.searchValue);
  try {
    const response = await getWeatherInfo(props.searchValue);
    weekData = response.result.list.map((item) => item.week);
    dateData = response.result.list.map((item) => item.date);
    windData = response.result.list.map((item) => item.windsc);
    weatherData = response.result.list.map((item) => item.weather);
    visibilityData = response.result.list.map((item) => item.vis);
    highestTempData = response.result.list.map((item) =>
      item.highest.replace("℃", "")
    );
    lowestTempData = response.result.list.map((item) =>
      item.lowest.replace("℃", "")
    );

    console.log(response);
    initChart();
  } catch (error) {
    console.error("获取天气信息时出错:", error);
  }
});

watch(
  () => props.searchValue,
  async (newValue) => {
    if (newValue) {
      try {
        const response = await getWeatherInfo(props.searchValue);
        weekData = response.result.list.map((item) => item.week);
        dateData = response.result.list.map((item) => item.date);
        windData = response.result.list.map((item) => item.windsc);
        weatherData = response.result.list.map((item) => item.weather);
        visibilityData = response.result.list.map((item) => item.vis);
        highestTempData = response.result.list.map((item) =>
          item.highest.replace("℃", "")
        );
        lowestTempData = response.result.list.map((item) =>
          item.lowest.replace("℃", "")
        );
        console.log(response);
        initChart();
      } catch (error) {
        console.error("获取天气信息时出错:", error);
      }
    }
  }
);

const initChart = () => {
  const machart = echarts.init(document.getElementById("temp15day"));

  var option = {
    grid: {
      show: true,
      backgroundColor: "transparent",
      opacity: 0.3,
      borderWidth: "0",
      top: "220",
      bottom: "1%",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      show: false,
    },
    xAxis: [
      //星期
      {
        type: "category",
        boundaryGap: false,
        position: "top",
        offset: 133,
        zlevel: 100,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          interval: 0,
          formatter: ["{a|{value}}"].join("\n"),
          rich: {
            a: {
              color: "black",
              fontSize: 14,
            },
          },
        },
        nameTextStyle: {},
        data: weekData,
      },
      // 日期
      {
        type: "category",
        boundaryGap: false,
        position: "top",
        offset: 110,
        zlevel: 100,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          interval: 0,
          formatter: ["{a|{value}}"].join("\n"),
          rich: {
            a: {
              color: "black",
              fontSize: 14,
            },
          },
        },
        nameTextStyle: {},
        data: dateData,
      },
      
      // 天气图标
      {
        type: "category",
        boundaryGap: false,
        position: "top",
        offset: 39,
        zlevel: 100,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          interval: 0,
          formatter: function (value, index) {
            return "{" + index + "| }\n{b|" + value + "}";
          },
          rich: {
            ...weatherData.reduce((acc, weather, index) => {
              if (weather.includes("晴")) {
                acc[index] = {
                  backgroundColor: {
                    image: "https://d.scggqx.com/forecast/img/多云.png", // 晴天图标
                  },
                  height: 40,
                  width: 40,
                };
              } else if (weather.includes("雨")) {
                acc[index] = {
                  backgroundColor: {
                    image: "https://d.scggqx.com/forecast/img/小雨.png", // 雨天图标
                  },
                  height: 40,
                  width: 40,
                };
              } else {
                acc[index] = {
                  backgroundColor: {
                    image: "https://d.scggqx.com/forecast/img/阴.png", // 其余天气图标
                  },
                  height: 40,
                  width: 40,
                };
              }
              return acc;
            }, {}),
            b: {
              color: "black",
              fontSize: 12,
              lineHeight: 30,
              height: 20,
            },
          },
        },
        data: weatherData,
      },
      // 风力风向
      {
        type: "category",
        boundaryGap: false,
        position: "top",
        offset: 34,
        zlevel: 100,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          interval: 0,
          formatter: ["{a|{value}}"].join("\n"),
          rich: {
            img: {
              backgroundColor: {
                image: "https://example.com/icon.png",
              },
              width: 16,
              height: 16,
              align: "center",
            },
            a: {
              color: "black",
              fontSize: 12,
            },
          },
        },
        nameTextStyle: {},
        data: windData,
      },
      // 空气质量
      {
        type: "category",
        boundaryGap: false,
        position: "top",
        offset: 20,
        zlevel: 100,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          interval: 0,
          formatter: ["{a|{value}}"].join("\n"),
          rich: {
            a: {
              color: "black",
              fontSize: 12,
            },
          },
        },
        data: visibilityData,
      },
    ],
    yAxis: {
      type: "value",
      show: false,
      axisLabel: {
        formatter: "{value} °C",
        color: "white",
      },
    },
    series: [
      {
        name: "最高气温",
        type: "line",
        data: highestTempData,
        symbol: "emptyCircle",
        symbolSize: 10,
        showSymbol: true,
        smooth: true,
        itemStyle: {
          normal: {
            color: "#C95843",
          },
        },
        label: {
          show: true,
          position: "top",
          formatter: "{c} °C",
        },
        lineStyle: {
          width: 1,
        },
        areaStyle: {
          opacity: 1,
          color: "transparent",
        },
      },
      {
        name: "最低气温",
        type: "line",
        data: lowestTempData,
        symbol: "emptyCircle",
        symbolSize: 10,
        showSymbol: true,
        smooth: true,
        itemStyle: {
          normal: {
            color: "blue",
          },
        },
        label: {
          show: true,
          position: "bottom",
          formatter: "{c} °C",
        },
        lineStyle: {
          width: 1,
        },
        areaStyle: {
          opacity: 1,
          color: "transparent",
        },
      },
    ],
  };
  machart.setOption(option);
};
setTimeout(() => {
  initChart();
}, 800);
</script>

<style scoped>
#temp15day {
  width: 980px;
  height: 550px;
  background: url("@/assets/weatherbackground.jpg") no-repeat center center;
  background-size: cover;

  position: relative;
  z-index: 1;

  border-radius: 50px;
  padding: 10px;
}

</style>
