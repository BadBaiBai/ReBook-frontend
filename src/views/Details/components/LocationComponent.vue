<template>
  <div>
    <baidu-map class="map" :center="searchValue" :zoom="10">
      <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
    </baidu-map>
  </div>
</template>


<script setup>
defineProps({
  searchValue: {
    type: String,
    default: '',
  }
});
</script>

<style>
.map {
  width: 100%;
  height: 500px;
  border-radius: 50px;
  overflow: hidden;
}
</style>
