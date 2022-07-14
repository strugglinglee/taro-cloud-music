<template>
  <view class="song-detail">
    <view class="header">
      <view class="icon" @click="back">&lt;</view>
      <view class="title">
        <text>{{ detail.name }}</text>
        <text>{{ detail.singer }}</text>
      </view>
    </view>
    <view v-if="detail.lyric">
      <view v-for="item in detail.lyric" :key="item">{{ item.text }} </view>
    </view>
    <view class="footer">
      <nut-icon
        name="next-song"
        class="icon-song"
        font-class-name="iconfont"
        class-prefix="icon"
        @click="audio14"
      ></nut-icon>
      <nut-icon
        name="play"
        class="icon-song"
        font-class-name="iconfont"
        class-prefix="icon"
        @click="audioPlay"
      ></nut-icon>
      <nut-icon
        name="pause"
        class="icon-song"
        font-class-name="iconfont"
        class-prefix="icon"
        @click="audioPause"
      ></nut-icon>
      <nut-icon
        name="previous-song"
        font-class-name="iconfont"
        class-prefix="icon"
        class="icon-song"
        @click="audioStart"
      ></nut-icon>
    </view>
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
  dataInit(ids)
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

const dataInit = async (ids) => {
  Taro.showLoading()
  const [
    {
      value: { songs },
    },
    {
      value: {
        lrc: { lyric },
      },
    },
    {
      value: { data },
    },
  ] = await Promise.allSettled([
    request({
      url: `/song/detail?ids=${ids}`,
    }),
    request({
      url: `/lyric?id=${ids}`,
    }),
    request({
      url: `/song/url?id=${ids}`,
    }),
  ])

  detail.value = songs[0]
  detail.value.singer = detail.value.ar[0]?.name
  detail.value.picUrl = detail.value.al?.picUrl
  detail.value.lyric = parseLyric(lyric)
  console.log(detail.value.lyric)
  const songUrl = data[0].url
  detail.value.songUrl = songUrl
  // wx.nextTick(() => {
  const audioInnerCtx = wx.createInnerAudioContext()
  audioInnerCtx.src = songUrl
  audioInnerCtx.loop = true
  audioCtx.value = audioInnerCtx
  Taro.hideLoading()
}

// 解析歌词的方法
const parseLyric = (lrc) => {
  const lyrics = lrc.split('\n')
  const lrcArr = lyrics.reduce((pre, item) => {
    const lyric = decodeURIComponent(item)

    const timeReg = /\[\d*:\d*((\.|:)\d*)*\]/g
    const timeRegExpArr = lyric.match(timeReg)
    const clause = lyric.replace(timeReg, '')
    // 歌词
    const currentObj = { text: clause }
    if (!timeRegExpArr || !timeRegExpArr.length || !currentObj.text) return pre
    timeRegExpArr.map((t) => {
      const min = Number(String(t.match(/\[\d*/i)).slice(1))
      const sec = Number(String(t.match(/:\d*/i)).slice(1))
      currentObj.time = timeToString(min * 60 + sec)
    })
    return [...pre, currentObj]
  }, [])
  return lrcArr
}

// 转换时间格式
const timeToString = (duration) => {
  let str = ''
  const minute =
    parseInt(duration / 60) < 10 ? '0' + parseInt(duration / 60) : parseInt(duration / 60)
  const second = duration % 60 < 10 ? '0' + (duration % 60) : duration % 60
  str = minute + ':' + second
  return str
}
</script>
