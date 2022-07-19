<template>
  <view class="login">
    <nut-form>
      <nut-form-item label="手机号">
        <input
          class="nut-input-text"
          v-model="userInfo.mobile"
          placeholder="请输入手机号"
          type="number"
        />
      </nut-form-item>
      <nut-form-item label="密码">
        <input
          class="nut-input-text"
          v-model="userInfo.password"
          placeholder="请输入密码"
          type="password"
        />
      </nut-form-item>
    </nut-form>
    <nut-button
      :loading="btnLoading"
      class="loginBtn"
      size="large"
      type="primary"
      @click="handleSubmit"
    >
      立即登录
    </nut-button>
  </view>
</template>

<script lang="ts" setup>
import './index.scss'
import { onMounted, reactive, ref } from 'vue'
import Taro from '@tarojs/taro'
import request from '@/utils/request'

const userInfo = reactive({
  mobile: '',
  password: '',
})

const btnLoading = ref(false)

onMounted(() => {})

const showToast = (title) => {
  Taro.showToast({
    title,
    icon: 'none',
    duration: 3000,
  })
}

// 检查手机号正确性
const validatePhone = (phone) => {
  const regx = /^1\d{10}$/
  if (!phone) {
    showToast('请输入手机号')
    return false
  }
  if (!regx.test(phone)) {
    showToast('请输入正确手机号')
    return false
  }
  return true
}

// 检查密码正确性
const validatePassword = (password) => {
  if (!password) {
    showToast('请输入密码')
    return false
  }
  return true
}

const handleSubmit = async () => {
  if (!validatePhone(userInfo.mobile)) return
  if (!validatePassword(userInfo.password)) return
  try {
    btnLoading.value = true
    const res: UserResult = await request({
      url: '/login/cellphone',
      params: {
        phone: userInfo.mobile,
        password: userInfo.password,
      },
    })
    Taro.setStorageSync('userInfo', JSON.stringify(res.profile))
    Taro.setStorageSync('cookie', res.cookie)
    Taro.setStorageSync('token', res.token)
    console.log(res.profile, res.cookies)
    Taro.navigateBack()
  } catch (error) {
    console.log(`---login error---`, error)
  } finally {
    btnLoading.value = false
  }
}
</script>
