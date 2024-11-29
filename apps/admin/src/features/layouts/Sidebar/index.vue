<script setup lang="ts">
import { BookIcon, BookshelfIcon, HomeIcon, UserIcon } from '@/assets/icons'
import { useChartsStore } from '@/shared/store/useChartsStore'
import { useLanguageStore } from '@/shared/store/useLanguageStore'
import { renderIcon } from '@/shared/utils/renderIcon'
import { useTranslation } from 'i18next-vue'
import { useRoute, useRouter } from 'vue-router'
const { t } = useTranslation('SIDEBAR')
const chartsStore = useChartsStore()
const collapsed = ref(false)
const currentMenu = ref()
const router = useRouter()
const route = useRoute()
const languageStore = useLanguageStore()

const menuOptions = ref()

watch(
  () => languageStore.language,
  () => {
    menuOptions.value = [
      {
        label: t('home'),
        key: '/',
        icon: renderIcon(HomeIcon)
      },
      {
        label: t('user_management'),
        key: '/user/manage',
        icon: renderIcon(UserIcon)
      },
      {
        label: t('bookshelf_management'),
        key: '/bookshelf/manage',
        icon: renderIcon(BookshelfIcon)
      },
      {
        label: t('book_management'),
        key: '/book/manage',
        icon: renderIcon(BookIcon)
      }
    ]
  },
  { immediate: true }
)

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
