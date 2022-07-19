<template>
  <ScrollxList title="推荐mv" :list="songs" @jump="goList" />
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import request from '@/utils/request'
import Taro from '@tarojs/taro'
import ScrollxList from '@/components/scrollx-list.vue'

const songs = ref<unknown[]>([])

onMounted(async () => {
  const { result } = await request({
    url: '/personalized/mv',
  })
  songs.value = result
})

const goList = ({ id }) => {
  if (!id) return
  const url = `/pages/mv-detail/index?id=${id}`
  Taro.navigateTo({ url })
}
</script>
