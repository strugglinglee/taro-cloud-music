<template>
  <view class="login">
    <view class="form-item"> 手机号：<input v-model="userInfo.mobile" type="number" /> </view>
    <view class="form-item"> 密码：<input v-model="userInfo.password" type="text" /> </view>
    <button @tap="handleSubmit">立即登录</button>
  </view>
</template>

<script lang="ts" setup>
import './index.scss'
import { onMounted, reactive } from 'vue'
import Taro from '@tarojs/taro'
import request from '@/utils/request'

const userInfo = reactive({
  mobile: '',
  password: '',
})

onMounted(() => {})
const showToast = (title) => {
  Taro.showToast({
    title,
    icon: 'none',
    duration: 3000,
  })
}
const handleSubmit = async () => {
  if (!userInfo.mobile) showToast('请先输入手机号')
  if (!userInfo.password) showToast('请先输入密码')
  const res = await request({
    url: '/login/cellphone',
    params: {
      phone: userInfo.mobile,
      password: userInfo.password,
    },
  })
  console.log(res)
}
</script>
