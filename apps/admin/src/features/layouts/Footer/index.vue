<script setup lang="ts">
import { APP_NAME } from '@/shared/constants/app.ts'
import { useTranslation } from 'i18next-vue'
const { t } = useTranslation(['AUTH', 'COMMON'])
</script>

<template>
  <n-layout-footer
    bordered
    position="absolute"
    class="flex h-[30px] items-center justify-center"
  >
    {{ t('back_stage_management') }} &copy {{ APP_NAME }}
  </n-layout-footer>
</template>
