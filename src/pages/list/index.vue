<template>
  <view class="list">
    <view class="list-item" v-for="item in list" :key="item.id" @click="goToDetail(item)">
      <view class="list-item-title">{{ item.name }}</view>
      <view class="list-item-name">{{ computedSinger(item) }}</view>
    </view>
  </view>
</template>

<script setup>
import './index.scss'
import { onMounted, ref, computed } from 'vue'
import Taro from '@tarojs/taro'
import request from '@/utils/request'

const list = ref([])

onMounted(() => {
  getList(Taro.Current.router?.params?.id)
})

const computedSinger = computed(() => (item) => {
  return item.ar.map((er) => er.name).join(',')
})

const goToDetail = (item) => {
  const currentId = item.id
  // 记录列表ids
  Taro.setStorageSync('songs-ids', JSON.stringify(list.value.map((music) => music.id)))
  if (!currentId) return
  const url = `/pages/song-detail/index?id=${currentId}`
  Taro.navigateTo({ url })
}

const getList = async (id) => {
  if (!id) return
  Taro.showLoading()
  const { songs } = await request({
    url: '/playlist/track/all',
    params: {
      id,
    },
  })
  list.value = songs
  Taro.hideLoading()
}
</script>
