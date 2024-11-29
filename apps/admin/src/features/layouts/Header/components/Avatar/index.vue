<script setup lang="ts">
import ExitIcon from '@/assets/icons/iconify/ExitIcon.vue'
import UserIcon from '@/assets/icons/iconify/UserIcon.vue'
import { PATH_LOGIN } from '@/shared/constants/router-path'
import { useLanguageStore } from '@/shared/store/useLanguageStore'
import { renderIcon } from '@/shared/utils/renderIcon'
import { useTranslation } from 'i18next-vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const languageStore = useLanguageStore()
const { t } = useTranslation(['AUTH', 'COMMON'])
const options = ref()

watch(
  () => languageStore.language,
  () => {
    options.value = [
      {
        label: t('COMMON:personal_profile'),
        key: 'profile',
        icon: renderIcon(UserIcon)
      },
      {
        label: t('AUTH:logout'),
        key: 'logout',
        icon: renderIcon(ExitIcon)
      }
    ]
  },
  { immediate: true }
)

function handlerSelect(key: string) {
  switch (key) {
    case 'profile':
      router.push('/profile')
      break
    case 'logout':
      router.push(PATH_LOGIN)
  }
}
</script>

<template>
  <n-dropdown
    :options="options"
    @select="handlerSelect"
  >
    <n-avatar
      round
      size="small"
      src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
    />
  </n-dropdown>
</template>

<style scoped></style>
