<template>
  <view class="mine">
    <view class="mine-header">
      <image v-if="state.isLogin" class="avatar" :src="state.userInfo.avatarUrl" />
      <nut-icon v-else class="avatar" name="my2" color="pink"></nut-icon>
      <view class="mine-info" v-if="state.isLogin">
        <view> {{ state.userInfo.nickname }} </view>
        <view class="signature">
          {{ state.userInfo.signature }}
        </view>
      </view>
      <view class="login-btn" v-else @click="handleLogin">
        立即登录
        <nut-icon class="icon-arrow" name="arrow-right" color="#fff"></nut-icon>
      </view>
    </view>

    <view class="mine-love" v-if="state.isLogin" @click="toLikeList">
      <view class="mine-love-l">
        <view class="icon">
          <nut-icon class="icon-heart" name="heart-fill" color="#fff"></nut-icon>
        </view>
        <view class="main">
          <text class="title">
            我喜欢的音乐
          </text>
          <text class="num"> {{ state.userInfo.loveSongsNum }}首 </text>
        </view>
      </view>
      <nut-button size="small" type="primary" class="mine-love-r">心动模式</nut-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import './index.scss'
import Taro from '@tarojs/taro'
import { useUserInfo } from '@/stores'
import { Profile } from '@/types/user'

interface StateRes {
  isLogin: boolean
  userInfo: Profile
}
const state = reactive<StateRes>({
  isLogin: false,
  userInfo: {
    loveSongsNum: 0,
  },
})

onMounted(() => {
  const { info: userInfo } = useUserInfo()
  state.userInfo = userInfo
  state.isLogin = !!userInfo.nickname
  console.log(state.userInfo)
})

const handleLogin = () => {
  Taro.navigateTo({
    url: '/pages/login/index',
  })
}

const toLikeList = () => {
  Taro.navigateTo({
    url: '/pages/like-list/index',
  })
}
</script>
