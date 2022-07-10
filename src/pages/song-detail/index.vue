<template>
  <view class="song-detail">
    <view class="header">
      <view class="icon" @click="back">&lt;</view>
      <view class="title">
        <text>{{ detail.name }}</text>
        <text>{{ detail.singer }}</text>
      </view>
    </view>

    <audio
      :poster="detail.picUrl"
      :name="detail.name"
      :author="detail.singer"
      :src="detail.songUrl"
      id="myAudio"
      controls
      loop
    ></audio>

    <button type="primary" @click="audioPlay">播放</button>
    <button type="primary" @click="audioPause">暂停</button>
    <button type="primary" @click="audio14">设置当前播放时间为14秒</button>
    <button type="primary" @click="audioStart">回到开头</button>
  </view>
</template>

<script setup>
import './index.scss'
import { onMounted, ref } from 'vue'
import Taro from '@tarojs/taro'
import request from '@/utils/request'

const detail = ref({})

const audioCtx = ref()

onMounted(() => {
  const ids = Taro.Current.router?.params?.id
  if (!ids) return
  getDetail(ids)
  getSongUrl(ids)
})

const back = () => {
  Taro.navigateBack()
}

const audioPlay = () => {
  audioCtx.value.play()
}
const audioPause = () => {
  audioCtx.value.pause()
}
const audio14 = () => {
  audioCtx.value.seek(14)
}
const audioStart = () => {
  audioCtx.value.seek(0)
}

const getDetail = async (ids) => {
  Taro.showLoading()
  const { songs } = await request({
    url: '/song/detail',
    params: {
      ids,
    },
  })
  //  /lyric?id=33894312 歌词
  if (!songs.length) return
  detail.value = songs[0]
  detail.value.singer = detail.value.ar[0]?.name
  detail.value.picUrl = detail.value.al?.picUrl
  console.log(detail.value.picUrl)
  Taro.hideLoading()
}
const getSongUrl = async (id) => {
  const { data } = await request({
    url: '/song/url',
    params: {
      id,
    },
  })
  if (!data.length) return
  const songUrl = data[0].url
  detail.value.songUrl = songUrl
  wx.nextTick(() => {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    audioCtx.value = wx.createAudioContext('myAudio')
  })
}
</script>
