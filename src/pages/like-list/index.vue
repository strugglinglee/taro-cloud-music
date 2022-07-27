<template>
  <view class="list">
    <view class="list-item" v-for="item in list" :key="item.id" @click="goToDetail(item)">
      <view class="list-item-title">{{ item.name }}</view>
      <view class="list-item-name">{{ computedSinger(item) }}</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import './index.scss'
import { onMounted, ref, computed, reactive } from 'vue'
import Taro from '@tarojs/taro'
import request from '@/utils/request'
import { useUserInfo } from '@/stores'
import { Profile } from '@/types/user'

const list = ref([])

let userInfo = reactive<Profile>({})

onMounted(() => {
  const { info } = useUserInfo()
  userInfo = info
  getList(info.userId)
  console.log(userInfo, 'user')
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

const getList = async (uid) => {
  if (!uid) return
  Taro.showLoading()
  const res = await request({
    url: '/user/playlist',
    params: {
      uid,
    },
  })
  console.log(res, 'kokoko')
  Taro.hideLoading()
}
</script>
