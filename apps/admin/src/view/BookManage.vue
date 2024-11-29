<script setup lang="ts">
import { useLanguageStore } from '@/shared/store/useLanguageStore'
import { useTranslation } from 'i18next-vue'
const languageStore = useLanguageStore()
const { t } = useTranslation(['COMMON', 'VALIDATION'])
const selectOptions = ref()

watch(
  () => languageStore.language,
  () => {
    selectOptions.value = [
      { label: t('COMMON:bookshelf_name'), value: '书架名' },
      { label: t('COMMON:username'), value: '用户名' }
    ]
  },
  { immediate: true }
)
</script>

<template>
  <n-input-group class="mb-4">
    <n-select
      :style="{ width: '120px' }"
      :options="selectOptions"
      :placeholder="selectOptions[0].label"
    />
    <n-input
      :style="{ width: '200px' }"
      :placeholder="t('VALIDATION:search_keywords')"
    />
    <n-button type="primary"> {{ t('COMMON:search') }} </n-button>
  </n-input-group>

  <n-table
    :bordered="false"
    :single-line="false"
  >
    <thead>
      <tr>
        <th>{{ t('COMMON:username') }}</th>
        <th>{{ t('COMMON:book_name') }}</th>
        <th>{{ t('COMMON:belonging_bookshelf') }}</th>
        <th>{{ t('COMMON:book_introduction') }}</th>
        <th>{{ t('COMMON:book_detail') }}</th>
        <th>{{ t('COMMON:actions') }}</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>放弃</td>
        <td>1529088692@qq.com</td>
        <td>1529088692@qq.com</td>
        <td>1529088692@qq.com</td>
        <td>1529088692@qq.com</td>
        <td class="space-x-2">
          <span>{{ t('COMMON:delete') }}</span>
        </td>
      </tr>
    </tbody>
  </n-table>
</template>

<style></style>
