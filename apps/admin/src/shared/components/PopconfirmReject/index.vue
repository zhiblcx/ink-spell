<script setup lang="ts">
import WarningIcon from '@/assets/icons/iconify/WarningIcon.vue'
import { useTranslation } from 'i18next-vue'

const { t } = useTranslation(['COMMON', 'PROMPT'])
const { content, style, type } = defineProps<{
  content?: string
  style?: Object
  type?: string
}>()
const emit = defineEmits(['confirm'])

function handlePositiveClick() {
  emit('confirm')
}
</script>

<template>
  <n-popconfirm
    :positive-text="t('COMMON:confirm')"
    :negative-text="t('COMMON:cancel')"
    @positive-click="handlePositiveClick"
  >
    <template #icon>
      <n-icon color="#f0a020">
        <WarningIcon />
      </n-icon>
    </template>
    <template #trigger>
      <n-button
        :type="type ?? 'error'"
        :style="style"
      >
        {{ content ?? t('COMMON:reject') }}
      </n-button>
    </template>
    {{ t('PROMPT:confirm_operate') }}
  </n-popconfirm>
</template>
