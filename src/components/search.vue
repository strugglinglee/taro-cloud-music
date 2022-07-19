<template>
  <nut-config-provider theme="dark">
    <SearchBar
      :class="m.searchBar"
      v-model="searchValue"
      :placeholder="placeholder"
      @focus="handleFocus"
    >
      <template v-slot:leftin>
        <nut-icon size="14" name="search2" color="#333"></nut-icon>
      </template>
      <template v-slot:rightout> <view @click="search">搜索</view> </template>
    </SearchBar>
  </nut-config-provider>
</template>
<script lang="ts" setup>
import { ref, defineEmits, onMounted } from 'vue'
import request from '@/utils/request'
import { SearchBar } from '@nutui/nutui-taro'

const searchValue = ref<string>('')

const placeholder = ref<string>('请输入')

const emit = defineEmits(['search', 'focus'])

onMounted(async () => {
  const {
    data: { showKeyword },
  } = await request({
    url: '/search/default',
  })
  placeholder.value = showKeyword
  console.log(placeholder)
})

const search = () => {
  emit('search', searchValue.value)
}
const handleFocus = () => {
  emit('focus', searchValue.value)
}
</script>

<style lang="scss" module="m">
.searchBar {
  color: #333;
}
</style>
