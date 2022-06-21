<template>
  <view class="index"> </view>
  <search></search>
  <adSwiper></adSwiper>
  <songs></songs>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import search from './components/search.vue'
import songs from './components/songs.vue'
import adSwiper from './components/ad-swiper.vue'
// import { useSystem, useUserInfo } from '@/stores'
import './index.scss'
// import request from '@/utils/request'

onMounted(() => {})
</script>
