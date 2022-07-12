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

    <view v-if="detail.lyric">
      <view v-for="item in detail.lyric.lyric" :key="item">{{ item }} </view>
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
  getDetail(ids)
  getSongUrl(ids)
  getLyric(ids)
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
  if (!songs.length) return
  detail.value = songs[0]
  detail.value.singer = detail.value.ar[0]?.name
  detail.value.picUrl = detail.value.al?.picUrl
  console.log(detail.value.picUrl)
  Taro.hideLoading()
}

const getLyric = async (id) => {
  const {
    lrc: { lyric },
  } = await request({
    url: '/lyric',
    params: {
      id,
    },
  })

  detail.value.lyric = parseLyric(lyric)
  console.log(detail.value.lyric.lyric)
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

// 解析歌词的方法
const parseLyric = (lrc) => {
  let lyrics = lrc.split('\n')
  let lrcObj = {}
  for (let i = 0; i < lyrics.length; i++) {
    let lyric = decodeURIComponent(lyrics[i])
    let timeReg = /\[\d*:\d*((\.|:)\d*)*\]/g
    let timeRegExpArr = lyric.match(timeReg)
    if (!timeRegExpArr) continue
    let clause = lyric.replace(timeReg, '')
    if (clause.length > 0) {
      for (let k = 0, h = timeRegExpArr.length; k < h; k++) {
        let t = timeRegExpArr[k]
        let min = Number(String(t.match(/\[\d*/i)).slice(1)),
          sec = Number(String(t.match(/:\d*/i)).slice(1))
        let time = timeToString(min * 60 + sec)
        lrcObj[time] = clause
      }
    }
  }

  return Object.entries(lrcObj).reduce(
    (pre, [m, v]) => {
      console.log(m, v)
      pre.mins.push(m)
      pre.lyric.push(v)
      return pre
    },
    { mins: [], lyric: [] }
  )
}

// 转换时间格式
const timeToString = (duration) => {
  var str = ''
  var minute =
    parseInt(duration / 60) < 10 ? '0' + parseInt(duration / 60) : parseInt(duration / 60)
  var second = duration % 60 < 10 ? '0' + (duration % 60) : duration % 60
  str = minute + ':' + second
  return str
}
</script>
