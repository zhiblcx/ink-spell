<script setup lang="ts">
import { EditIcon, ExitIcon } from '@/assets/icons'
import { selectOneselfInfoQuery } from '@/features/user/select'
import { SERVER_URL } from '@/shared/constants/app'
import { useLanguageStore } from '@/shared/store/useLanguageStore'
import { logoutUtils } from '@/shared/utils/logoutUtils'
import { renderIcon } from '@/shared/utils/renderIcon'
import { useTranslation } from 'i18next-vue'
import { UpdatePasswordModal } from '..'

const languageStore = useLanguageStore()
const options = ref()
const { t } = useTranslation(['AUTH', 'COMMON'])
const { data: oneselfInfo } = selectOneselfInfoQuery()
const showModal = ref(false)

const keys = {
  change_password: 'change_password',
  logout: 'logout'
}

watch(
  () => languageStore.language,
  () => {
    options.value = [
      {
        label: t('COMMON:change_password'),
        key: keys.change_password,
        icon: renderIcon(EditIcon)
      },
      {
        label: t('AUTH:logout'),
        key: keys.logout,
        icon: renderIcon(ExitIcon)
      }
    ]
  },
  { immediate: true }
)

function handlerSelect(key: string) {
  switch (key) {
    case keys.change_password:
      showModal.value = true
      break
    case keys.logout:
      logoutUtils()
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
      :src="SERVER_URL + oneselfInfo?.data.avatar"
    />
  </n-dropdown>

  <UpdatePasswordModal v-model="showModal" />
</template>
