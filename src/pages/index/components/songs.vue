<template>
  <view class="songs">
    <nut-cell class="songs-inner">
      <view class="title"> 推荐歌单 </view>
      <scroll-view :scroll-x="true" class="songs-wrap">
        <view class="song-item" v-for="item in songs" :key="item.title" @tap="goList(item.id)">
          <image class="song-img" :src="item.picUrl"></image>
          <br />
          <view class="song-text">
            {{ item.name }}
          </view>
        </view>
      </scroll-view>
    </nut-cell>
  </view>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import request from '@/utils/request'
import Taro from '@tarojs/taro'

// const emit = defineEmits(['search'])

const songs = ref<unknown[]>([])

onMounted(async () => {
  const { result } = await request({
    url: '/personalized',
  })
  songs.value = result
})

const goList = (id) => {
  const url = `/pages/list/index?id=${id}`
  Taro.navigateTo({ url })
}
</script>

<style lang="scss">
.songs {
  margin: 10px;

  &-inner {
    flex-direction: column;
  }

  .songs-wrap {
    width: 100%;
    white-space: nowrap;
  }

  .song-item {
    display: inline-block;
    // flex-direction: column;
    padding: 5px;
  }

  .song-img {
    width: 100px;
    height: 100px;
  }

  .song-text {
    display: inline-block;
    max-width: 100px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}

.title {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
}
</style>
