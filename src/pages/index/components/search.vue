<template>
  <SearchBar v-model="searchValue" @search="search" :placeholder="placeholder">
    <template v-slot:leftin>
      <nut-icon size="14" name="search2"></nut-icon>
    </template>
    <template v-slot:rightout> 搜索 </template>
  </SearchBar>
</template>

<script lang="ts" setup>
import { ref, defineEmits, onMounted } from 'vue'
import request from '@/utils/request'
import { SearchBar } from '@nutui/nutui-taro'

const searchValue = ref<string>('')

const placeholder = ref<string>('请输入')

const emit = defineEmits(['search'])

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
</script>
