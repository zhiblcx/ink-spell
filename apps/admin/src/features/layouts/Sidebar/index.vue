<script setup lang="ts">
import { useChartsStore } from '@/shared/store/useChartsStore'
import { useRoute, useRouter } from 'vue-router'
import { menuOptions } from './menuDate.ts'
const chartsStore = useChartsStore()

const collapsed = ref(false)
const currentMenu = ref()
const router = useRouter()
const route = useRoute()

watch(
  () => route.path,
  (value) => {
    currentMenu.value = value
  },
  { immediate: true }
)

const handleSelectMenu = (value: string) => {
  currentMenu.value = value
  router.push(value)
}
</script>

<template>
  <n-layout-sider
    bordered
    show-trigger
    collapse-mode="width"
    :width="240"
    :native-scrollbar="false"
    :collapsed="collapsed"
    :on-after-enter="chartsStore.changeChartsRelyVariation"
    :on-after-leave="chartsStore.changeChartsRelyVariation"
    @collapse="collapsed = true"
    @expand="collapsed = false"
  >
    <n-menu
      :collapsed="collapsed"
      :value="currentMenu"
      :options="menuOptions"
      :on-update:value="handleSelectMenu"
    />
  </n-layout-sider>
</template>
