<script setup lang="ts">
import { useTranslation } from 'i18next-vue'

const { t } = useTranslation(['COMMON', 'VALIDATION'])
const selectOptions = ref([
  { label: t('COMMON:bookshelf_name'), value: '书架名' },
  { label: t('COMMON:username'), value: '用户名' }
])
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
        <th>{{ t('COMMON:bookshelf_name') }}</th>
        <th>{{ t('COMMON:bookshelf_status') }}</th>
        <th>{{ t('COMMON:books_count') }}</th>
        <th>{{ t('COMMON:collected_users') }}</th>
        <th>{{ t('COMMON:bookshelf_details') }}</th>
        <th>{{ t('COMMON:actions') }}</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>放弃</td>
        <td>1529088692@qq.com</td>
        <td>22</td>
        <td>33</td>
        <td>1h</td>
        <td>33</td>
        <td>删除</td>
      </tr>
    </tbody>
  </n-table>
</template>

<style scoped></style>
