<template>
  <nut-config-provider theme="dark">
    <view class="index"> </view>
    <search @search="toSearchPage" @focus="toSearchPage"></search>
    <adSwiper></adSwiper>
    <songs></songs>
    <videos></videos>
  </nut-config-provider>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import search from '@/components/search.vue'
import songs from './components/songs.vue'
import adSwiper from './components/ad-swiper.vue'
import Videos from './components/videos.vue'
// import { useSystem, useUserInfo } from '@/stores'
import Taro from '@tarojs/taro'
import './index.scss'
// import request from '@/utils/request'

onMounted(() => {})

const toSearchPage = () => {
  Taro.navigateTo({ url: '/pages/search/index' })
}
</script>
