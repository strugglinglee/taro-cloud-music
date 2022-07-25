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
      <nut-form-item label="验证码">
        <input
          class="nut-input-text"
          v-model="userInfo.code"
          placeholder="请输入验证码"
          type="number"
        />
      </nut-form-item>
    </nut-form>
    <nut-cell>
      <nut-button v-if="hasSendCode && restSecond" size="small"
        >重新发送（{{ restSecond }}s）</nut-button
      >
      <nut-button v-else size="small" @click="sendCode">{{
        hasSendCode ? '重新发送' : '发送验证码'
      }}</nut-button>
    </nut-cell>
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
import { onMounted, reactive, ref, onUnmounted } from 'vue'
import Taro from '@tarojs/taro'
import request from '@/utils/request'
import { UserResult } from '@/types/user'

const hasSendCode = ref(false)
const userInfo = reactive({
  mobile: '',
  code: '',
})

const btnLoading = ref(false)
const restSecond = ref(0)
type Time = ReturnType<typeof setInterval> | null
let timer: Time = null

onMounted(() => {})
onUnmounted(() => {
  clearInterval(Number(timer))
})

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

// 检查验证码正确性
const validateCode = (code) => {
  if (!code) {
    showToast('请输入验证码')
    return false
  }
  return true
}

const handleSubmit = async () => {
  if (!validatePhone(userInfo.mobile)) return
  if (!validateCode(userInfo.code)) return
  try {
    btnLoading.value = true
    const res: UserResult = await request({
      url: '/login/cellphone',
      params: {
        phone: userInfo.mobile,
        captcha: userInfo.code,
      },
    })
    console.log(res, 'hihihih')
    // Taro.setStorageSync('userInfo', JSON.stringify(res.profile))
    // Taro.setStorageSync('cookie', res.cookie)
    // Taro.setStorageSync('token', res.token)
    // console.log(res.profile, res.cookies)
    // Taro.navigateBack()
  } catch (error) {
    console.log(`---login error---`, error)
  } finally {
    btnLoading.value = false
  }
}

const sendCode = async () => {
  if (!validatePhone(userInfo.mobile)) return

  try {
    const { data, code } = await request({
      url: '/captcha/sent',
      params: {
        phone: userInfo.mobile,
      },
    })
    if (code === 200) {
      hasSendCode.value = true
      restSecond.value = 10
      timer = setInterval(() => {
        restSecond.value--
        if (restSecond.value === 0) {
          clearInterval(Number(timer))
        }
      }, 1000)
    } else {
      showToast(data)
    }
  } catch (error) {
    console.log(`---login error---`, error)
  }
}
</script>
