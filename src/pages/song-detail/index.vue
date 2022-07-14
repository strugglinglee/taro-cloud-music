<template>
  <view class="song-detail">
    <CustomHeader>
      <view class="title">
        <text>{{ detail.name }}</text>
        <text class="title-sub">{{ detail.singer }}</text>
      </view>
    </CustomHeader>
    <scroll-view :scroll-y="true" class="main" v-if="detail.lyric">
      <view
        v-for="(item, index) in detail.lyric"
        :key="item"
        :class="{ activeText: activeLyricIndex === index }"
        >{{ item.text }}
      </view>
    </scroll-view>
    <view class="footer">
      <nut-icon
        name="previous-song"
        font-class-name="iconfont"
        class-prefix="icon"
        class="previous-song"
        @click="audioStart"
      ></nut-icon>
      <nut-icon
        name="play"
        class="icon-song"
        v-if="!isPlaying"
        font-class-name="iconfont"
        class-prefix="icon"
        @click="audioPlay"
      ></nut-icon>
      <nut-icon
        name="pause"
        v-else
        class="icon-song"
        font-class-name="iconfont"
        class-prefix="icon"
        @click="audioPause"
      ></nut-icon>
      <nut-icon
        name="next-song"
        class="next-song"
        font-class-name="iconfont"
        class-prefix="icon"
        @click="audio14"
      ></nut-icon>
    </view>
  </view>
</template>

<script setup>
import './index.scss'
import { onMounted, ref, onUnmounted } from 'vue'
import Taro from '@tarojs/taro'
import CustomHeader from '@/components/header.vue'
import request from '@/utils/request'
import dayjs from 'dayjs'
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter')
dayjs.extend(isSameOrAfter)
const detail = ref({})
const isPlaying = ref(false)
const activeLyricIndex = ref(0)
let audioCtx = null

const currentTime = ref('00:00')

onMounted(() => {
  const ids = Taro.Current.router?.params?.id
  if (!ids) return
  dataInit(ids)
})

onUnmounted(() => {
  audioCtx && audioCtx.destroy()
})

const audioPlay = () => {
  audioCtx.play()
  isPlaying.value = true
  setTimeout(() => {
    console.log(audioCtx.currentTime)
  }, 100)
}
const audioPause = () => {
  audioCtx.pause()
  isPlaying.value = false
}
const audio14 = () => {
  audioCtx.seek(14)
}
const audioStart = () => {
  audioCtx.seek(0)
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
  // 创建音频上下文
  audioCtx = wx.createInnerAudioContext()
  audioCtx.src = songUrl
  audioCtx.loop = true
  audioCtx.onTimeUpdate(() => {
    handleTimeUpdate()
  }, 1000)
  Taro.hideLoading()
}

const handleTimeUpdate = () => {
  const targetTime = dayjs(audioCtx.currentTime * 1000).format('mm:ss')
  if (currentTime.value !== targetTime) {
    currentTime.value = targetTime
    const nextLyric = detail.value.lyric[activeLyricIndex.value + 1]
    if (!nextLyric) return
    // HACK: 时间计算
    const cTime = dayjs().format('YYYY/MM/DD hh:') + currentTime.value
    const nTime = dayjs().format('YYYY/MM/DD hh:') + nextLyric.time
    console.log(cTime, nTime)
    if (dayjs(cTime).isSameOrAfter(dayjs(nTime))) {
      activeLyricIndex.value++
    }
  }
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
