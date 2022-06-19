<template>
  <view class="index">
    <text>{{ msg }}</text>
  </view>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useSystem } from '@/stores'
import './index.scss'
import request from '@/utils/request'

const msg = ref('Hello world .')

onMounted(() => {
  const sys = useSystem()
  console.log(sys.options, 'sys')
  request({
    url: '/dj/program',
    params: {
      rid: 336355127,
    },
  })
})
</script>
