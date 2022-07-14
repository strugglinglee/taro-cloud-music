<template>
  <view class="search">
    <search @search="handleSearch"></search>
    <view class="list">
      <view class="list-item" v-for="item in songs" :key="item.id" @click="goToDetail(item)">
        <view class="list-item-title">{{ item.name }}</view>
        <view class="list-item-name">{{ computedSinger(item) }}</view>
      </view>
    </view>
  </view>
</template>

<script setup>
import request from '@/utils/request'
import search from '@/components/search.vue'
import { onMounted, ref, computed } from 'vue'
import Taro from '@tarojs/taro'
import './index.scss'
const songs = ref([])
onMounted(() => {})
const computedSinger = computed(() => (item) => {
  return item.artists.map((item) => item.name).join(',')
})
const handleSearch = async (keywords) => {
  Taro.showLoading()
  const { result } = await request({
    url: `/search?keywords=${keywords}`,
  })
  songs.value = result.songs
  Taro.hideLoading()
}
const goToDetail = (item) => {
  const currentId = item.id
  if (!currentId) return
  const url = `/pages/song-detail/index?id=${currentId}`
  Taro.navigateTo({ url })
}
</script>
