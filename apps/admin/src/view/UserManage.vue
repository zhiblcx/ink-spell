<script setup lang="ts">
import { useTranslation } from 'i18next-vue'

const { t } = useTranslation(['COMMON', 'VALIDATION'])
</script>

<template>
  <n-input-group class="mb-4">
    <n-input
      :style="{ width: '200px' }"
      :placeholder="t('search_username')"
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
        <th>{{ t('COMMON:account') }}</th>
        <th>{{ t('COMMON:avatar') }}</th>
        <th>{{ t('COMMON:email') }}</th>
        <th>{{ t('COMMON:bookshelf_count') }}</th>
        <th>{{ t('COMMON:books_count') }}</th>
        <th>{{ t('COMMON:followers_count') }}</th>
        <th>{{ t('COMMON:following_count') }}</th>
        <th>{{ t('COMMON:reading_total_duration') }}</th>
        <th>{{ t('COMMON:recently_read_books') }}</th>
        <th>{{ t('COMMON:last_login_time') }}</th>
        <th>{{ t('COMMON:actions') }}</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>放弃</td>
        <td>1529088692@qq.com</td>
        <td>
          <n-avatar
            round
            size="small"
            src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
          />
        </td>
        <td>33</td>
        <td>1h</td>
        <td>22</td>
        <td>1h</td>
        <td>22</td>
        <td>33</td>
        <td>1529088692@qq.com</td>
        <td>查看</td>
        <td>
          <span>强制下线 </span>
          <span>重置密码</span>
        </td>
      </tr>
    </tbody>
  </n-table>
</template>

<style></style>
