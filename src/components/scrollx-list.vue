<template>
  <view :class="m['scroll-list']">
    <nut-cell :class="m['scroll-list-inner']">
      <view :class="m.title"> {{ title }} </view>
      <scroll-view :scroll-x="true" :class="m['scroll-list-wrap']" v-if="list && list.length">
        <view :class="m['list-item']" v-for="item in list" :key="item.title" @tap="jump(item)">
          <image :class="m['list-img']" :src="item.picUrl"></image>
          <br />
          <view :class="m['list-text']">
            {{ item.name }}
          </view>
        </view>
      </scroll-view>
    </nut-cell>
  </view>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'

const emit = defineEmits(['jump'])

defineProps<{
  title?: string // 标题
  list?: unknown[]
}>()

const jump = (item) => {
  emit('jump', item)
}
</script>

<style lang="scss" module="m">
.scroll-list {
  margin: 10px;

  &-inner {
    flex-direction: column;
  }

  .scroll-list-wrap {
    width: 100%;
    white-space: nowrap;
  }

  .list-item {
    display: inline-block;
    padding: 5px;
  }

  .list-img {
    width: 100px;
    height: 100px;
  }

  .list-text {
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
