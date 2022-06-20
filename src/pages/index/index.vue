<template>
  <view class="index">
    <text>{{ msg }}</text>
  </view>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useSystem, useUserInfo } from '@/stores'
import './index.scss'
import request from '@/utils/request'

const msg = ref('Hello world .')

onMounted(() => {
  const sys = useSystem()
  const userInfo = useUserInfo()
  console.log(sys.options, userInfo, 'sys')
  request({
    url: '/dj/program',
    params: {
      rid: 336355127,
    },
  })
})
</script>
